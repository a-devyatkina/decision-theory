const varPreview = {
  data: [
    {
      name: 'Матрица по цели',
      value: [['1', '0.5', '4', '2'], ['2', '1', '4', '3'], ['0.25', '0.25', '1', '2'], ['0.5', '0.33', '0.5', '1']]
    },
    {
      name: 'Матрица по 1 критерию',
      value: [['1', '5', '8'], ['0.2', '1', '3'], ['0.125', '0.33', '1']]
    },
    {
      name: 'Матрица по 2 критерию',
      value: [['1', '4', '6'], ['0.25', '1', '7'], ['0.17', '0.14', '1']]
    },
    {
      name: 'Матрица по 3 критерию',
      value: [['1', '1', '3'], ['1', '1', '3'], ['0.33', '0.33', '1']]
    },
    {
      name: 'Матрица по 4 критерию',
      value: [['1', '0.5', '0.2'], ['2', '1', '0.33'], ['5', '3', '1']]
    }
  ],
  input: {
    target_matrix: [
      {
        name: 'priority',
        answer: ['0', '0', '0', '0']
      },
      {
        name: 'weight',
        answer: ['0', '0', '0', '0']
      },
      {
        name: 'mweight',
        answer: ['0', '0', '0', '0']
      },
      {
        name: 'lambda',
        answer: ['0', '0', '0', '0']
      },
      {
        name: 'lambda_max',
        answer: '0'
      },
      {
        name: 'ci',
        answer: '0'
      },
      {
        name: 'cc',
        answer: '0'
      }
    ],
    criterion_matrix1: [
      {
        name: 'priority',
        answer: ['0', '0', '0']
      },
      {
        name: 'weight',
        answer: ['0', '0', '0']
      },
      {
        name: 'mweight',
        answer: ['0', '0', '0']
      },
      {
        name: 'lambda',
        answer: ['0', '0', '0']
      },
      {
        name: 'lambda_max',
        answer: '0'
      },
      {
        name: 'ci',
        answer: '0'
      },
      {
        name: 'cc',
        answer: '0'
      }
    ],
    criterion_matrix2: [
      {
        name: 'priority',
        answer: ['0', '0', '0']
      },
      {
        name: 'weight',
        answer: ['0', '0', '0']
      },
      {
        name: 'mweight',
        answer: ['0', '0', '0']
      },
      {
        name: 'lambda',
        answer: ['0', '0', '0']
      },
      {
        name: 'lambda_max',
        answer: '0'
      },
      {
        name: 'ci',
        answer: '0'
      },
      {
        name: 'cc',
        answer: '0'
      }
    ],
    criterion_matrix3: [
      {
        name: 'priority',
        answer: ['0', '0', '0']
      },
      {
        name: 'weight',
        answer: ['0', '0', '0']
      },
      {
        name: 'mweight',
        answer: ['0', '0', '0']
      },
      {
        name: 'lambda',
        answer: ['0', '0', '0']
      },
      {
        name: 'lambda_max',
        answer: '0'
      },
      {
        name: 'ci',
        answer: '0'
      },
      {
        name: 'cc',
        answer: '0'
      }
    ],
    criterion_matrix4: [
      {
        name: 'priority',
        answer: ['0', '0', '0']
      },
      {
        name: 'weight',
        answer: ['0', '0', '0']
      },
      {
        name: 'mweight',
        answer: ['0', '0', '0']
      },
      {
        name: 'lambda',
        answer: ['0', '0', '0']
      },
      {
        name: 'lambda_max',
        answer: '0'
      },
      {
        name: 'ci',
        answer: '0'
      },
      {
        name: 'cc',
        answer: '0'
      }
    ]
  }
}
const introTestPreview = {
  question: 'Кто придумал метод анализа иерархий?',
  answers: [
    'Томас Саати',
    'Оскар Моргенштерн',
    'Джон фон Нейман'
  ],
  correct: 'Томас Саати'
}
const practiceTestPreview = {
  question: 'Каким образом производится расчет вектора приоритетов?',
  answers: [
    'Умножить n элементов каждой строки и извлечь корень n-й степени. Нормализовать полученные числа',
    'Разделить n элементов каждой строки и извлечь корень n-й степени. Нормализовать полученные числа',
    'Умножить n элементов каждой строки и извлечь корень n-й степени'
  ],
  correct: 'Умножить n элементов каждой строки и извлечь корень n-й степени. Нормализовать полученные числа'
}
const addTestPreview = {
  question: 'Определить соотношение между величинами ИС и ОС (равны или один и параметров больше/меньше, в каких случаях). Ответить, каким способом получают значение СС',
  answers: [
    'При размерности матрицы от 5 и более ОС меньше',
    'При размерности матрицы от 7 и более ОС больше',
    'При размерности матрицы от 9 и более ОС меньше'
  ],
  correct: 'При размерности матрицы от 5 и более ОС меньше'
}
export { varPreview, introTestPreview, practiceTestPreview, addTestPreview }
