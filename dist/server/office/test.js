var office = require("./index.js");

let schema = [
  {
    state: 'none',
    name: 'step1',
    title: 'Первый шаг',
    subtitle: 'Цветовые пространства',
    content: [
      {
        layout: 'col-3',
        name: 'question',
        element: 'label',
        value: ''
      },
      {
        layout: 'col-1',
        name: 'answer',
        element: 'input',
        type: 'number',
        value: 0,
        style: 'width: 50px',
        class: 'shadow-2 round-borders'
      },
      { layout: 'col-6' },
      {
        layout: 'col-2',
        name: 'picture',
        element: 'image',
        value: ''
      }
    ],
    button: {
      label: 'Применить'
    }
  },
  {
    state: 'none',
    name: 'step2',
    title: 'Второй шаг',
    subtitle: 'Цветовые пространства',
    content: [
      {
        layout: 'col-3',
        name: 'question',
        element: 'label',
        value: ''
      },
      {
        layout: 'col-1',
        name: 'answer',
        element: 'input',
        type: 'number',
        value: '',
        style: 'width: 50px',
        class: 'shadow-2 round-borders'
      },
      { layout: 'col-6' },
      {
        layout: 'col-2',
        name: 'picture',
        element: 'image',
        value: ''
      }
    ],
    button: {
      label: 'Применить'
    }
  },
  {
    state: 'none',
    name: 'step3',
    title: 'Третий шаг',
    subtitle: 'Цветовые пространства',
    content: [
      {
        layout: 'col-12',
        name: 'question',
        element: 'label',
        value: ''
      },
      {
        layout: 'col-10',
        name: 'answer',
        element: 'group',
        type: 'checkbox',
        value: [],
        options: []
      },
      {
        layout: 'col-2',
        name: 'picture',
        element: 'image',
        value: ''
      },
    ],
    button: {
      label: 'Применить'
    }
  },
  {
    state: 'none',
    name: 'step4',
    title: 'Четвертый шаг',
    subtitle: 'Цветовые пространства',
    content: [
      {
        layout: 'col-12',
        name: 'question',
        element: 'label',
        value: ''
      },
      {
        layout: 'col-10',
        name: 'answer',
        element: 'group',
        type: 'radio',
        value: '',
        options: []
      },
      {
        layout: 'col-2',
        name: 'picture',
        element: 'image',
        value: ''
      },
    ],
    button: {
      label: 'Применить'
    }
  },
  {
    state: 'none',
    name: 'step5',
    title: 'Пятый шаг',
    subtitle: 'Матрицы',
    content: [
      {
        layout: 'col-12',
        name: 'question',
        element: 'label',
        value: ''
      },
      {
        layout: 'col-3',
        name: 'answer',
        element: 'table',
        caption: 'Единичная матрица',
        value: [[]],
        type: 'number',
        style: 'width: 75%',
        cellclass: 'shadow-2 round-borders'
      },
      { layout: 'col-7' },
      {
        layout: 'col-2',
        name: 'picture',
        element: 'image',
        value: ''
      }
    ],
    button: {
      label: 'Применить'
    }
  },
  {
    state: 'none',
    name: 'step6',
    title: 'Шестой шаг',
    subtitle: 'Матрицы',
    content: [
      {
        layout: 'col-12',
        name: 'question',
        element: 'label',
        value: ''
      },
      {
        layout: 'col-3',
        name: 'matrix',
        element: 'table',
        caption: 'Матрица',
        value: [[]],
        type: 'label',
        style: 'width: 75%',
        cellclass: 'shadow-2 round-borders bg-grey-1'
      },
      {
        layout: 'col-1',
        name: 'vector',
        element: 'table',
        caption: 'Вершина',
        value: [[]],
        type: 'label',
        style: 'width: 50px',
        cellclass: 'shadow-2 round-borders bg-grey-1'
      },
      {
        layout: 'col-1',
        name: 'answer',
        element: 'table',
        caption: 'Результат',
        value: [[]],
        type: 'number',
        style: 'width: 50px',
        cellclass: 'shadow-2 round-borders'
      },
      { layout: 'col-5' },
      {
        layout: 'col-2',
        name: 'picture',
        element: 'image',
        value: ''
      }
    ],
    button: {
      label: 'Применить'
    }
  },
  {
    state: 'none',
    name: 'status',
    title: 'Результат',
    subtitle: '',
    content: [
      {
        layout: 'col-10',
        name: 'message',
        element: 'label',
        value: ''
      },
      {
        layout: 'col-2',
        name: 'picture',
        element: 'image',
        value: ''
      }
    ]
  }
]

let put = {
  step1: {
    state: 'none',
    name: 'step1',
    title: 'Первый шаг',
    subtitle: 'Цветовые пространства',
    content: [
      {
        layout: 'col-3',
        name: 'question',
        element: 'label',
        value: ''
      },
      {
        layout: 'col-1',
        name: 'answer',
        element: 'input',
        type: 'number',
        value: 3,
        style: 'width: 50px',
        class: 'shadow-2 round-borders'
      },
      { layout: 'col-6' },
      {
        layout: 'col-2',
        name: 'picture',
        element: 'image',
        value: ''
      }
    ],
    button: {
      label: 'Применить'
    }
  }
}

let get = {
  step2: {
    state: 'none',
    name: 'step2',
    title: 'Второй шаг',
    subtitle: 'Цветовые пространства',
    content: [
      {
        layout: 'col-3',
        name: 'question',
        element: 'label',
        value: ''
      },
      {
        layout: 'col-1',
        name: 'answer',
        element: 'input',
        type: 'number',
        value: '',
        style: 'width: 50px',
        class: 'shadow-2 round-borders'
      },
      { layout: 'col-6' },
      {
        layout: 'col-2',
        name: 'picture',
        element: 'image',
        value: ''
      }
    ],
    button: {
      label: 'Применить'
    }
  }
}

office.setPattern("example", "/home/nine/projects/lab-explorer/dist/server/office/temp/example/pattern.ods", (err) => {
  if (err) {
    return console.log("error: " + err);
  }

  office.setPatternSchema("example", schema, (err) => {
    if (err) {
      return console.log("error: " + err);
    }

    office.createLab("example", "-LYNZ-u3ZOy-M8C72foJ", (err) => {
      if (err) {
        return console.log("error: " + err);
      }

      office.setLabData("example", "-LYNZ-u3ZOy-M8C72foJ", put, (err) => {
        if (err) {
          return console.log("error: " + err);
        }

        office.getLabData("example", "-LYNZ-u3ZOy-M8C72foJ", get, (err, res) => {
          if (err) {
            return console.log("error: " + err);
          }

          console.log("state: " + JSON.stringify(res, null, "\t"));
          office.getLabImage("example", "-LYNZ-u3ZOy-M8C72foJ", "step2", "excuse", (err, res) => {
            if (err) {
              console.log("error: " + err);
            } else {
              console.log("state: " + JSON.stringify(res, null, "\t"));
            }
          });
        });
      });
    });
  });
});
