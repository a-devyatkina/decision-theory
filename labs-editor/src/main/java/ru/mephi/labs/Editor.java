package ru.mephi.labs;

import com.sun.star.uno.UnoRuntime;
import com.sun.star.uno.Exception;
import com.sun.star.beans.PropertyValue;
import com.sun.star.beans.UnknownPropertyException;
import com.sun.star.beans.XPropertySet;
import com.sun.star.comp.helper.BootstrapException;
import com.sun.star.container.NoSuchElementException;
import com.sun.star.sheet.XNamedRanges;
import com.sun.star.frame.XComponentLoader;
import com.sun.star.frame.XStorable;
import com.sun.star.io.IOException;
import com.sun.star.lang.IllegalArgumentException;
import com.sun.star.lang.WrappedTargetException;
import com.sun.star.lang.XComponent;
import com.sun.star.sheet.XSpreadsheetDocument;
import com.sun.star.sheet.XCellRangeReferrer;
import com.sun.star.table.XCellRange;
import com.sun.star.sheet.XCellRangeData;
import com.sun.star.sheet.XSpreadsheet;
import com.sun.star.uno.XComponentContext;
import com.sun.star.util.CloseVetoException;
import com.sun.star.table.XColumnRowRange;
import com.sun.star.util.XCloseable;
import com.sun.star.graphic.XGraphicProvider;
import com.sun.star.drawing.XDrawPageSupplier;
import com.sun.star.drawing.XDrawPage;
import com.sun.star.drawing.XShape;
import com.sun.star.io.XInputStream;

import java.io.File;
import java.lang.ref.WeakReference;
import java.util.WeakHashMap;
import java.util.Base64;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONTokener;


public class Editor {
    static private WeakHashMap<String, WeakReference<Document>> _documents = new WeakHashMap<String, WeakReference<Document>>();

    private static Object readRange(XCellRange range) {

        XColumnRowRange colRowRange = UnoRuntime.queryInterface(XColumnRowRange.class, range);
        int cols = colRowRange.getColumns().getCount();
        int rows = colRowRange.getRows().getCount();

        Object[][] data = UnoRuntime.queryInterface(XCellRangeData.class, range).getDataArray();

        if (cols == 1 && rows == 1) {
            return data[0][0];
        }

        return data;
    }

    private static Object buildGroupOptions(Object data) {
        JSONArray ret = new JSONArray();
        if (data instanceof Object[][]) {
            Object[][] arr = (Object[][]) data;
            for (Object[] row : arr) {
                for (Object val : row) {
                    if (!val.toString().isEmpty()) {
                        JSONObject item = new JSONObject();
                        item.put("label", val);
                        item.put("value", val);
                        ret.put(item);
                    }
                }
            }
        }
        return ret;
    }

    private static Object buildGroupValue(Object data) {
        if (data instanceof Object[][]) {
            JSONArray ret = new JSONArray();
            Object[][] arr = (Object[][]) data;
            for (Object[] row : arr) {
                for (Object val : row) {
                    if (!val.toString().isEmpty()) {
                        ret.put(val);
                    }
                }
            }
            return ret;
        }
        return data;
    }

    private static void writeRange(Object content, XCellRange range) {
        XColumnRowRange colRowRange = UnoRuntime.queryInterface(XColumnRowRange.class, range);
        int cols = colRowRange.getColumns().getCount();
        int rows = colRowRange.getRows().getCount();

        Object[][] data = UnoRuntime.queryInterface(XCellRangeData.class, range).getDataArray();
        for (int i = 0; i < rows; ++i) {
            for (int j = 0; j < cols; ++j) {
                if (data[i][j].toString().isEmpty() == false) {
                    return;
                }
            }
        }

        if (content instanceof JSONArray) {
            for (int r = 0; r < ((JSONArray) content).length(); ++r) {
                Object item = ((JSONArray) content).get(r);
                if (item instanceof JSONArray) {
                    for (int c = 0; c < ((JSONArray) item).length(); ++c) {
                        data[r % rows][c % cols] = ((JSONArray) item).get(c);
                    }
                } else {
                    int row = r / cols % rows;
                    int col = r % cols;
                    data[row][col] = item;
                }
            }
            UnoRuntime.queryInterface(XCellRangeData.class, range).setDataArray(data);
            return;
        }

        UnoRuntime.queryInterface(XCellRangeData.class, range).setDataArray(new Object[][] { { content } });
    }

    static public synchronized Document open(String path) {
        try {
            WeakReference<Document> weak = _documents.get(path);
            if (weak == null || weak.get() == null) {
                weak = new WeakReference<Document>(new Document("file:///" + path));
                _documents.put(path, weak);
            }
            return weak.get();
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
        }
        return null;
    }

    static public synchronized boolean used(String path) {
        WeakReference<Document> weak = _documents.get(path);
        return weak != null && weak.get() != null;
    }

    static public class Document {
        private String _url = null;
        private XComponentContext _context = null;
        private XSpreadsheetDocument _document = null;

        protected Document(String url) {
            _url = url.replace('\\', '/');
            System.out.println("creating document " + _url);
        }

        private void put(JSONObject put) {
            System.out.println("executing put request on " + _url);
            try {
                for (String key : JSONObject.getNames(put)) {
                    JSONObject step = put.getJSONObject(key);

                    if (step.has("content")) {

                        XSpreadsheet sheet = UnoRuntime.queryInterface(XSpreadsheet.class, _document.getSheets().getByName(key));
                        Object data = readRange(sheet.getCellRangeByName("state"));

                        if (data.toString().equals("edit")) {

                            JSONArray content = step.getJSONArray("content");

                            for (Object c : content) {
                                if (c instanceof JSONObject) {

                                    JSONObject item = (JSONObject) c;
                                    if (!item.has("element")) {
                                        continue;
                                    }

                                    String element = item.getString("element");
                                    if (element.equals("label") || element.equals("image")) {
                                        continue;
                                    }

                                    if (element.equals("table") && item.getString("type").equals("label")) {
                                        continue;
                                    }

                                    String name = item.getString("name");
                                    Object value = item.get("value");

                                    if (element.equals("group")) {
                                        name += "_value";
                                    }

                                    writeRange(value, sheet.getCellRangeByName(name));
                                }
                            }
                        }
                    }
                }
            } catch (NoSuchElementException | WrappedTargetException e) {
                e.printStackTrace();
            }
        }

        private JSONObject get(JSONObject get) {
            System.out.println("executing get request on " + _url);
            try {
                for (String key : JSONObject.getNames(get)) {
                    if (key.equals("state") || key.equals("score")) {

                        XPropertySet props = UnoRuntime.queryInterface(XPropertySet.class, _document);
                        XNamedRanges ranges = UnoRuntime.queryInterface(XNamedRanges.class, props.getPropertyValue("NamedRanges"));
                        XCellRangeReferrer referer = UnoRuntime.queryInterface(XCellRangeReferrer.class, ranges.getByName(key));
                        get.put(key, readRange(referer.getReferredCells()));

                    } else {

                        JSONObject step = get.getJSONObject(key);
                        XSpreadsheet sheet = UnoRuntime.queryInterface(XSpreadsheet.class, _document.getSheets().getByName(key));

                        JSONArray content = step.getJSONArray("content");
                        for (Object c : content) {
                            JSONObject elem = (JSONObject) c;

                            if (!elem.has("element")) {
                                continue;
                            }

                            String element = elem.getString("element");
                            String name = elem.getString("name");

                            if (element.equals("group")) {
                                elem.put("options", buildGroupOptions(readRange(sheet.getCellRangeByName(name + "_choice"))));
                                elem.put("value", buildGroupValue(readRange(sheet.getCellRangeByName(name + "_value"))));
                            } else {
                                elem.put("value", readRange(sheet.getCellRangeByName(name)));
                            }
                        }

                        step.put("state", readRange(sheet.getCellRangeByName("state")));
                    }
                }
            } catch (NoSuchElementException | WrappedTargetException | UnknownPropertyException e) {
                e.printStackTrace();
            }
            return get;
        }

        public synchronized String get(String request) throws Exception, BootstrapException {
            load();
            String result = get(new JSONObject(new JSONTokener(request))).toString();
            close();
            return result;
        }

        public synchronized void put(String request) throws Exception, BootstrapException {
            load();
            put(new JSONObject(new JSONTokener(request)));
            store();
            close();
        }

        public synchronized String image(String step, String image) throws Exception, BootstrapException {

            load();

            System.out.println("reading image " + step + "@" + image + " from " + _url);

            Object o = _context.getServiceManager().createInstanceWithContext("com.sun.star.graphic.GraphicProvider", _context);
            XGraphicProvider gp = UnoRuntime.queryInterface(XGraphicProvider.class, o);

            XSpreadsheet sheet = UnoRuntime.queryInterface(XSpreadsheet.class, _document.getSheets().getByName(step));
            XDrawPageSupplier pageSupplier = UnoRuntime.queryInterface(XDrawPageSupplier.class, sheet);

            XDrawPage drawPage = pageSupplier.getDrawPage();
            int numShapes = drawPage.getCount();

            for (int i = 0; i < numShapes; i++) {
                XShape shape = UnoRuntime.queryInterface(XShape.class, drawPage.getByIndex(i));
                XPropertySet props = (XPropertySet) UnoRuntime.queryInterface(XPropertySet.class, shape);

                if (image.equals(props.getPropertyValue("Name"))) {
                    String url = (String) props.getPropertyValue("GraphicURL");

                    XInputStream stream = UnoRuntime.queryInterface(XInputStream.class, props.getPropertyValue("GraphicStream"));

                    PropertyValue[] properties = new PropertyValue[1];
                    properties[0] = new PropertyValue();
                    properties[0].Name = "URL";
                    properties[0].Value = url;

                    props = gp.queryGraphicDescriptor(properties);
                    String mime = (String) props.getPropertyValue("MimeType");

                    byte[] raw = new byte[stream.available()];
                    int copied = 0;
                    while (stream.available() > 0) {
                        byte[][] buffer = new byte[1][4096];
                        int read = stream.readSomeBytes(buffer, 4096);
                        if (read > 0) {
                            System.arraycopy(buffer[0], 0, raw, copied, read);
                            copied += read;
                        }
                    }

                    close();

                    JSONObject ret = new JSONObject();
                    ret.put("mime", mime);
                    ret.put("data", Base64.getEncoder().encodeToString(raw));

                    return ret.toString();
                }
            }

            close();
            return "";
        }

        private void load() throws Exception, BootstrapException {
            System.out.println("loading document " + _url);

            _context = com.sun.star.comp.helper.Bootstrap.bootstrap();

            Object desktop = _context.getServiceManager().createInstanceWithContext("com.sun.star.frame.Desktop", _context);
            XComponentLoader loader = UnoRuntime.queryInterface(XComponentLoader.class, desktop);

            PropertyValue[] loadProps = new PropertyValue[3];
            loadProps[0] = new PropertyValue();
            loadProps[0].Name = "Hidden";
            loadProps[0].Value = Boolean.TRUE;

            loadProps[1] = new PropertyValue();
            loadProps[1].Name = "MacroExecutionMode";
            loadProps[1].Handle = -1;
            loadProps[1].Value = com.sun.star.document.MacroExecMode.ALWAYS_EXECUTE_NO_WARN;
            loadProps[1].State = com.sun.star.beans.PropertyState.DIRECT_VALUE;

            loadProps[2] = new PropertyValue();
            loadProps[2].Name = "DocumentService";
            loadProps[2].Handle = -1;
            loadProps[2].Value = "com.sun.star.sheet.SpreadsheetDocument";
            loadProps[2].State = com.sun.star.beans.PropertyState.DIRECT_VALUE;

            _document = UnoRuntime.queryInterface(
                XSpreadsheetDocument.class,
                loader.loadComponentFromURL(_url, "_blank", 0, loadProps)
                );
        }

        private void store() throws IOException, CloseVetoException {
            System.out.println("storing document " + _url);

            XStorable storable = UnoRuntime.queryInterface(XStorable.class, _document);
            storable.store();
        }

        private void close() throws IOException, CloseVetoException {
            System.out.println("closing document " + _url);

            XCloseable closeable = UnoRuntime.queryInterface(XCloseable.class, _document);

            if (closeable != null) {
                closeable.close(false);
            } else if (_document != null) {
                XComponent component = UnoRuntime.queryInterface(XComponent.class, _document);
                if (component != null) {
                    component.dispose();
                }
            }
        }
    }
}
