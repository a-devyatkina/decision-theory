package ru.mephi.labs;

import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

import com.sun.star.comp.helper.BootstrapException;
import com.sun.star.uno.Exception;

import org.json.JSONObject;
import org.json.JSONTokener;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLClassLoader;

/**
 * Unit test for simple App.
 */
public class HelperTest extends TestCase {
    /**
     * Create the test case
     *
     * @param testName name of the test case
     */
    public HelperTest(String testName) {
        super(testName);
    }

    /**
     * @return the suite of tests being tested
     */
    public static Test suite() {
        return new TestSuite(HelperTest.class);
    }

    /**
     * Rigourous Test :-)
     *
     * @throws MalformedURLException
     * @throws SecurityException
     * @throws NoSuchMethodException
     * @throws InvocationTargetException
     * @throws IllegalArgumentException
     * @throws IllegalAccessException
     * @throws FileNotFoundException
     */
    public void testApp() throws MalformedURLException, NoSuchMethodException, SecurityException,
            IllegalAccessException, IllegalArgumentException, InvocationTargetException, FileNotFoundException {

        // URL url = new URL("file:///usr/lib/libreoffice/program/classes");
        // URLClassLoader classLoader = (URLClassLoader) ClassLoader.getSystemClassLoader();
        // Method method = URLClassLoader.class.getDeclaredMethod("addURL", URL.class);
        // method.setAccessible(true);
        // method.invoke(classLoader, url);

        // Editor.Document doc = Editor.open("/home/nine/projects/lab-explorer/dist/server/office/temp/example/pattern.ods");

        // FileInputStream fileInputStream = new FileInputStream("src/test/schema.json");
        // JSONObject json = new JSONObject(new JSONTokener(fileInputStream));
        // try {
        //     doc.put(json.getJSONObject("req").getJSONObject("put").toString());
        //     String ret = doc.get(json.getJSONObject("req").getJSONObject("get").toString());
        //     System.out.println(ret);
        //     System.out.println(doc.image("status", "girl"));
        // } catch (Exception | BootstrapException e) {
        //     e.printStackTrace();
        // }
        assertTrue(true);
    }
}
