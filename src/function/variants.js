export const variants = [
  {
    goal: 'Выбрать город, наиболее пригодный для конкретного клиента',
    criterion: [
      {
        title: 'C1 Население',
        description: 'С1 Население – количество человек (в млн), проживающих в данном городе',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F1.11.png?alt=media&token=1d31f7da-762d-4c22-adb3-0e36e079df52',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F1.1.png?alt=media&token=33d0bb9a-4808-4865-ae47-8c6950d4d2bb',
        count: 3,
        graphic: '',
        koef: [-0.020, 0.286, 0],
        functioncompute: '-0.02*x**2+0.286*x'
      },
      {
        title: 'C2 Средняя з/п',
        description: 'С2 Средняя з/п – показатель средней заработной платы (в тысячах рублей) по профессии нашего клиента',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F1.12.png?alt=media&token=28c9e39c-06b1-443e-8fb7-675918ae318d',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F1.2.png?alt=media&token=f56c928b-38a2-4f02-b095-360857b5fe76',
        count: 3,
        graphic: '',
        koef: [0.125, 2, 1],
        functioncompute: 'Math.log(x+1)/(8*Math.log(2))'
      },
      {
        title: 'С3 Уровень загрязнения',
        description: 'С3 Уровень загрязнения – показатель содержания вредных примесей в атмосфере, почве и воде',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F1.14.png?alt=media&token=af3d0f91-f896-4dc0-ab12-8bf7ab94b1cf',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F1.4.png?alt=media&token=ff05900f-79d2-4ded-b631-448d74ccfc93',
        count: 0,
        graphic: '',
        koef: [],
        functioncompute: '1-x/4'
      },
      {
        title: 'С4 Количество свободных вакансий',
        description: 'С4 Количество свободных вакансий – показатель относительного количества свободных вакансий по профессии нашего клиента',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F1.13.png?alt=media&token=beb81db3-ee02-4d9e-bd75-10855daa1c43',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F1.3.png?alt=media&token=fd415f68-64d4-49be-adde-23496b9b3485',
        count: 0,
        graphic: '',
        koef: [],
        functioncompute: 'x**2/16'
      }
    ],
    alternative: [
      {
        description: 'A1 Москва',
        1: 12,
        2: 81,
        3: ['высокое', 3],
        4: ['высокое', 3]
      },
      {
        description: 'A2 Питер',
        1: 5,
        2: 57,
        3: ['низкое', 1],
        4: ['среднее', 2]
      },
      {
        description: 'A3 Краснодар',
        1: 0.8,
        2: 30,
        3: ['низкое', 1],
        4: ['среднее', 2]
      }
    ],
    weight: [],
    rules: {
      text: ['Если и С3 = подходящее, и (или С1 = неподходящее, или С2 = неподходящее), то Y = удовлетворительный', 'Если и С2 = неподходящее, и С3 = неподходящее, то Y = неудовлетворительный', 'Если и С1 = подходящее, и С3 = подходящее, и С4 = подходящее, то Y = безупречный'],
      formula: ['Math.min(m[2],Math.max(1-m[0],1-m[1]))', 'Math.min(1-m[1],1-m[2])', 'Math.min(m[0],m[2],m[3])']
    },
    tables: {
      importance: [0.1, 0.4, 0.7],
      linguistic: [0.1, 0.35, 0.5, 0.65, 0.75]
    }
  },
  {
    goal: 'Выбрать город, наиболее пригодный для конкретного клиента',
    criterion: [
      {
        title: 'C1 Население',
        description: 'С1 Население – количество человек (в млн), проживающих в данном городе',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F1.11.png?alt=media&token=1d31f7da-762d-4c22-adb3-0e36e079df52',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F1.1.png?alt=media&token=33d0bb9a-4808-4865-ae47-8c6950d4d2bb',
        count: 3,
        graphic: '',
        koef: [-0.020, 0.286, 0],
        functioncompute: '-0.02*x**2+0.286*x'
      },
      {
        title: 'C2 Средняя з/п',
        description: 'С2 Средняя з/п – показатель средней заработной платы (в тысячах рублей) по профессии нашего клиента',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F1.12.png?alt=media&token=28c9e39c-06b1-443e-8fb7-675918ae318d',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F1.2.png?alt=media&token=f56c928b-38a2-4f02-b095-360857b5fe76',
        count: 3,
        graphic: '',
        koef: [0.125, 2, 1],
        functioncompute: 'Math.log(x+1)/(8*Math.log(2))'
      },
      {
        title: 'С3 Уровень загрязнения',
        description: 'С3 Уровень загрязнения – показатель содержания вредных примесей в атмосфере, почве и воде',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunc1_xdel2.png?alt=media&token=405df5e1-6905-4942-8ae9-7bbd34e37395',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunc1_xdel2graph.png?alt=media&token=076e3076-24b9-4261-b1c8-cb666b729279',
        count: 0,
        graphic: '',
        koef: [],
        functioncompute: '1-x/2'
      },
      {
        title: 'С4 Количество свободных вакансий',
        description: 'С4 Количество свободных вакансий – показатель относительного количества свободных вакансий по профессии нашего клиента',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffuncsqrxdel4.png?alt=media&token=caae3f4e-80fc-477f-85eb-0db90a7ef13d',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffuncsqrxdel4graph.png?alt=media&token=f94c8fc1-e696-4add-9a97-38087d458161',
        count: 0,
        graphic: '',
        koef: [],
        functioncompute: 'x**2/4'
      }
    ],
    alternative: [
      {
        description: 'A1 Москва',
        1: 15,
        2: 79,
        3: ['среднее', 2],
        4: ['среднее', 2]
      },
      {
        description: 'A2 Питер',
        1: 6,
        2: 77,
        3: ['высокое', 3],
        4: ['низкое', 1]
      },
      {
        description: 'A3 Краснодар',
        1: 1.1,
        2: 60,
        3: ['низкое', 1],
        4: ['высокое', 3]
      }
    ],
    weight: [],
    rules: {
      text: ['Если и С3 = подходящее, и (или С1 = неподходящее, или С2 = неподходящее), то Y = удовлетворительный', 'Если и С2 = неподходящее, и С3 = неподходящее, то Y = неудовлетворительный', 'Если и С1 = подходящее, и С3 = подходящее, и С4 = подходящее, то Y = безупречный'],
      formula: ['Math.min(m[2],Math.max(1-m[0],1-m[1]))', 'Math.min(1-m[1],1-m[2])', 'Math.min(m[0],m[2],m[3])']
    },
    tables: {
      importance: [0.1, 0.4, 0.7],
      linguistic: [0.2, 0.4, 0.5, 0.6, 0.8]
    }
  },
  {
    goal: 'Выбрать город, наиболее пригодный для конкретного клиента',
    criterion: [
      {
        title: 'C1 Население',
        description: 'С1 Население – количество человек (в млн), проживающих в данном городе',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F1.11.png?alt=media&token=1d31f7da-762d-4c22-adb3-0e36e079df52',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F1.1.png?alt=media&token=33d0bb9a-4808-4865-ae47-8c6950d4d2bb',
        count: 3,
        graphic: '',
        koef: [-0.020, 0.286, 0],
        functioncompute: '-0.02*x**2+0.286*x'
      },
      {
        title: 'C2 Средняя з/п',
        description: 'С2 Средняя з/п – показатель средней заработной платы (в тысячах рублей) по профессии нашего клиента',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F1.12.png?alt=media&token=28c9e39c-06b1-443e-8fb7-675918ae318d',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F1.2.png?alt=media&token=f56c928b-38a2-4f02-b095-360857b5fe76',
        count: 3,
        graphic: '',
        koef: [0.125, 2, 1],
        functioncompute: 'Math.log(x+1)/(8*Math.log(2))'
      },
      {
        title: 'С3 Уровень загрязнения',
        description: 'С3 Уровень загрязнения – показатель содержания вредных примесей в атмосфере, почве и воде',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunc1_xdel2.png?alt=media&token=405df5e1-6905-4942-8ae9-7bbd34e37395',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunc1_xdel2graph.png?alt=media&token=076e3076-24b9-4261-b1c8-cb666b729279',
        count: 0,
        graphic: '',
        koef: [],
        functioncompute: '1-x/2'
      },
      {
        title: 'С4 Количество свободных вакансий',
        description: 'С4 Количество свободных вакансий – показатель относительного количества свободных вакансий по профессии нашего клиента',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffuncsqrxdel4.png?alt=media&token=caae3f4e-80fc-477f-85eb-0db90a7ef13d',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffuncsqrxdel4graph.png?alt=media&token=f94c8fc1-e696-4add-9a97-38087d458161',
        count: 0,
        graphic: '',
        koef: [],
        functioncompute: 'x**2/4'
      }
    ],
    alternative: [
      {
        description: 'A1 Москва',
        1: 13,
        2: 120,
        3: ['среднее', 2],
        4: ['низкое', 1]
      },
      {
        description: 'A2 Питер',
        1: 4,
        2: 52,
        3: ['высокое', 3],
        4: ['среднее', 2]
      },
      {
        description: 'A3 Краснодар',
        1: 0.9,
        2: 40,
        3: ['среднее', 2],
        4: ['среднее', 2]
      }
    ],
    weight: [],
    rules: {
      text: ['Если и С3 = подходящее, и (или С1 = неподходящее, или С2 = неподходящее), то Y = удовлетворительный', 'Если и С2 = неподходящее, и С3 = неподходящее, то Y = неудовлетворительный', 'Если и С1 = подходящее, и С3 = подходящее, и С4 = подходящее, то Y = безупречный'],
      formula: ['Math.min(m[2],Math.max(1-m[0],1-m[1]))', 'Math.min(1-m[1],1-m[2])', 'Math.min(m[0],m[2],m[3])']
    },
    tables: {
      importance: [0.1, 0.5, 0.7],
      linguistic: [0.1, 0.35, 0.45, 0.55, 0.7]
    }
  },
  {
    goal: 'Выбрать одну из трёх жилых застроек в зависимости от потребности конкретного клиента',
    criterion: [
      {
        title: 'C1 Этажность',
        description: 'С1 Этажность – показатель количества этажей в доме',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F2.11.png?alt=media&token=3bfc8f3e-807c-422f-a9bb-2cca6b002c93',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F2.1.png?alt=media&token=b3094c24-dc3f-45d3-a7db-83c1c182f6dc',
        count: 3,
        graphic: '',
        koef: [0.2, 1, 0.5],
        functioncompute: '0.2*Math.sqrt(x+1)'
      },
      {
        title: 'С2 Стоимость квартир',
        description: 'С2 Стоимость квартир – средняя стоимость квартиры в застройке (в млн рублей)',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F2.12.png?alt=media&token=e2dbad8c-ce7b-4d9e-931d-e4e8009d93c7',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F2.2.png?alt=media&token=9c3d700c-64ff-42fb-89fc-dcad70cfb49f',
        count: 2,
        graphic: '',
        koef: [2, 2],
        functioncompute: '2/(x+2)'
      },
      {
        title: 'С3 Расположение учреждение',
        description: 'С3 Расположение учреждение – показатель близости медицинских учреждений, школ, садиков, магазинов и т.д.',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F2.14.png?alt=media&token=2a0f889c-5bc2-4c80-8dfc-bea58a9a4061',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F2.4.png?alt=media&token=0931875d-6c1c-453b-a084-339686eb23a7',
        count: 0,
        graphic: '',
        koef: [],
        functioncompute: '1-2**(-(x+0.5))'
      },
      {
        title: 'С4 Плотность заселения',
        description: 'С4 Плотность заселения – показатель плотности заселения',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunc1_xdel4.png?alt=media&token=f118d13a-9bc5-4bd6-9a6c-7bc525e0d3be',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunc1_xdel4graph.png?alt=media&token=3ee46e11-6a1e-4bb7-add9-4621be8e174c',
        count: 0,
        graphic: '',
        koef: [],
        functioncompute: '1-x/4'
      }
    ],
    alternative: [
      {
        description: 'A1 Радуга',
        1: 24,
        2: 15,
        3: ['близко', 3],
        4: ['средняя', 2]
      },
      {
        description: 'A2 Зиларт',
        1: 16,
        2: 9,
        3: ['средне', 2],
        4: ['средняя', 2]
      },
      {
        description: 'A3 Английский квартал',
        1: 20,
        2: 4,
        3: ['близко', 3],
        4: ['высокая', 3]
      }
    ],
    weight: [],
    rules: {
      text: ['Если С3 = подходящее, и С2 = подходящее, и С1 = неподходящее, то Y = удовлетворительный', 'Если и С2 = неподходящее, и (или С3 = неподходящее, или С4 = неподходящее), то Y = неудовлетворительный', 'Если С1 = подходящее, С2 = подходящее, и С3 = подходящее, и С4 = подходящее, то Y = безупречный'],
      formula: ['Math.min(m[2],m[1],1-m[0]', 'Math.min(1-m[1],Math.max(1-m[2],1-m[3]))', 'Math.min(m[0],m[1],m[2],m[3])']
    },
    tables: {
      importance: [0.2, 0.5, 0.75],
      linguistic: [0.15, 0.35, 0.5, 0.65, 0.75]
    }
  },
  {
    goal: 'Выбрать одну из трёх жилых застроек в зависимости от потребности конкретного клиента',
    criterion: [
      {
        title: 'C1 Этажность',
        description: 'С1 Этажность – показатель количества этажей в доме',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F2.11.png?alt=media&token=3bfc8f3e-807c-422f-a9bb-2cca6b002c93',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F2.1.png?alt=media&token=b3094c24-dc3f-45d3-a7db-83c1c182f6dc',
        count: 3,
        graphic: '',
        koef: [0.2, 1, 0.5],
        functioncompute: '0.2*Math.sqrt(x+1)'
      },
      {
        title: 'С2 Стоимость квартир',
        description: 'С2 Стоимость квартир – средняя стоимость квартиры в застройке (в млн рублей)',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F2.12.png?alt=media&token=e2dbad8c-ce7b-4d9e-931d-e4e8009d93c7',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F2.2.png?alt=media&token=9c3d700c-64ff-42fb-89fc-dcad70cfb49f',
        count: 2,
        graphic: '',
        koef: [2, 2],
        functioncompute: '2/(x+2)'
      },
      {
        title: 'С3 Расположение учреждение',
        description: 'С3 Расположение учреждение – показатель близости медицинских учреждений, школ, садиков, магазинов и т.д.',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F2.14.png?alt=media&token=2a0f889c-5bc2-4c80-8dfc-bea58a9a4061',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F2.4.png?alt=media&token=0931875d-6c1c-453b-a084-339686eb23a7',
        count: 0,
        graphic: '',
        koef: [],
        functioncompute: '1-2**(-(x+0.5))'
      },
      {
        title: 'С4 Плотность заселения',
        description: 'С4 Плотность заселения – показатель плотности заселения',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunc1_xdel4.png?alt=media&token=f118d13a-9bc5-4bd6-9a6c-7bc525e0d3be',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunc1_xdel4graph.png?alt=media&token=3ee46e11-6a1e-4bb7-add9-4621be8e174c',
        count: 0,
        graphic: '',
        koef: [],
        functioncompute: '1-x/4'
      }
    ],
    alternative: [
      {
        description: 'A1 Радуга',
        1: 20,
        2: 14,
        3: ['средне', 2],
        4: ['средняя', 2]
      },
      {
        description: 'A2 Зиларт',
        1: 14,
        2: 6,
        3: ['далеко', 1],
        4: ['низкая', 1]
      },
      {
        description: 'A3 Английский квартал',
        1: 16,
        2: 7,
        3: ['далеко', 1],
        4: ['средняя', 2]
      }
    ],
    weight: [],
    rules: {
      text: ['Если С3 = подходящее, и С2 = подходящее, и С1 = неподходящее, то Y = удовлетворительный', 'Если и С2 = неподходящее, и (или С3 = неподходящее, или С4 = неподходящее), то Y = неудовлетворительный', 'Если С1 = подходящее, С2 = подходящее, и С3 = подходящее, и С4 = подходящее, то Y = безупречный'],
      formula: ['Math.min(m[2],m[1],1-m[0]', 'Math.min(1-m[1],Math.max(1-m[2],1-m[3]))', 'Math.min(m[0],m[1],m[2],m[3])']
    },
    tables: {
      importance: [0.2, 0.5, 0.75],
      linguistic: [0.1, 0.25, 0.5, 0.65, 0.75]
    }
  },
  {
    goal: 'Выбрать одну из трёх жилых застроек в зависимости от потребности конкретного клиента',
    criterion: [
      {
        title: 'C1 Этажность',
        description: 'С1 Этажность – показатель количества этажей в доме',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F2.11.png?alt=media&token=3bfc8f3e-807c-422f-a9bb-2cca6b002c93',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F2.1.png?alt=media&token=b3094c24-dc3f-45d3-a7db-83c1c182f6dc',
        count: 3,
        graphic: '',
        koef: [0.2, 1, 0.5],
        functioncompute: '0.2*Math.sqrt(x+1)'
      },
      {
        title: 'С2 Стоимость квартир',
        description: 'С2 Стоимость квартир – средняя стоимость квартиры в застройке (в млн рублей)',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F2.12.png?alt=media&token=e2dbad8c-ce7b-4d9e-931d-e4e8009d93c7',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F2.2.png?alt=media&token=9c3d700c-64ff-42fb-89fc-dcad70cfb49f',
        count: 2,
        graphic: '',
        koef: [2, 2],
        functioncompute: '2/(x+2)'
      },
      {
        title: 'С3 Расположение учреждение',
        description: 'С3 Расположение учреждение – показатель близости медицинских учреждений, школ, садиков, магазинов и т.д.',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F2.14.png?alt=media&token=2a0f889c-5bc2-4c80-8dfc-bea58a9a4061',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F2.4.png?alt=media&token=0931875d-6c1c-453b-a084-339686eb23a7',
        count: 0,
        graphic: '',
        koef: [],
        functioncompute: '1-2**(-(x+0.5))'
      },
      {
        title: 'С4 Плотность заселения',
        description: 'С4 Плотность заселения – показатель плотности заселения',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunc1_xdel4.png?alt=media&token=f118d13a-9bc5-4bd6-9a6c-7bc525e0d3be',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunc1_xdel4graph.png?alt=media&token=3ee46e11-6a1e-4bb7-add9-4621be8e174c',
        count: 0,
        graphic: '',
        koef: [],
        functioncompute: '1-x/4'
      }
    ],
    alternative: [
      {
        description: 'A1 Радуга',
        1: 24,
        2: 25,
        3: ['близко', 3],
        4: ['низкая', 1]
      },
      {
        description: 'A2 Зиларт',
        1: 20,
        2: 12,
        3: ['средне', 2],
        4: ['высокая', 3]
      },
      {
        description: 'A3 Английский квартал',
        1: 22,
        2: 14,
        3: ['далеко', 1],
        4: ['низкая', 1]
      }
    ],
    weight: [],
    rules: {
      text: ['Если С3 = подходящее, и С2 = подходящее, и С1 = неподходящее, то Y = удовлетворительный', 'Если и С2 = неподходящее, и (или С3 = неподходящее, или С4 = неподходящее), то Y = неудовлетворительный', 'Если С1 = подходящее, С2 = подходящее, и С3 = подходящее, и С4 = подходящее, то Y = безупречный'],
      formula: ['Math.min(m[2],m[1],1-m[0]', 'Math.min(1-m[1],Math.max(1-m[2],1-m[3]))', 'Math.min(m[0],m[1],m[2],m[3])']
    },
    tables: {
      importance: [0.1, 0.4, 0.7],
      linguistic: [0.15, 0.35, 0.5, 0.65, 0.75]
    }
  },
  {
    goal: 'Выбрать наиболее подходящую операционную систему для смартфона',
    criterion: [
      {
        title: 'С1 Средняя стоимость модели ',
        description: 'С1 Средняя стоимость модели – средняя стоимость (в десятках тысяч рублей) телефона, имеющего данную операционную систему',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunc1del_axb.png?alt=media&token=965c5d68-ad3c-4486-8189-3fc216bd212c',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunc1del_axbgraph.png?alt=media&token=6d168729-b84c-4741-9be6-7e9d3fa99a42',
        count: 2,
        graphic: '',
        koef: [2, 1],
        functioncompute: '1/(2*(x+1))+0.5'
      },
      {
        title: 'С2 Среднее количество приложений',
        description: 'С2 Среднее количество приложений – количество предложений (в десятках тысяч) от поставщика для данной операционной системы в среднем. ',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunckxa.png?alt=media&token=cb46b5aa-d566-411e-8ff7-c65728e3a569',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunckxagraph.png?alt=media&token=77bdc2c9-1675-483d-ac75-ec52af5f7a27',
        count: 2,
        graphic: '',
        koef: [0.25, 0.5],
        functioncompute: '0.25*(x**0.5)'
      },
      {
        title: 'С3 Защищённость',
        description: 'С3 Защищённость – показатель, отражающий насколько система уязвима к сбоям и атакам',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffuncxdel4.png?alt=media&token=7c9298d1-288e-4ac4-ac70-d88c9a5c27f1',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffuncxdel4graph.png?alt=media&token=828d1f2c-57fb-4003-9c10-7d2efa7cbaa6',
        functioncompute: 'x/4'
      },
      {
        title: 'С4 Открытость',
        description: 'С4 Открытость – показатель того, насколько компоненты ОС доступны в исходных кодах для любого пользователя',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunc1_xdel4.png?alt=media&token=f118d13a-9bc5-4bd6-9a6c-7bc525e0d3be',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunc1_xdel4graph.png?alt=media&token=3ee46e11-6a1e-4bb7-add9-4621be8e174c',
        functioncompute: '1-x/4'
      }
    ],
    alternative: [
      {
        description: 'A1 IOS',
        1: 60,
        2: 20,
        3: ['высокая', 3],
        4: ['низкая', 1]
      },
      {
        description: 'A2 Android',
        1: 20,
        2: 100,
        3: ['средняя', 2],
        4: ['средняя', 2]
      },
      {
        description: 'A3 Windows Phone',
        1: 40,
        2: 10,
        3: ['высокая', 3],
        4: ['высокая', 3]
      }
    ],
    weight: [0.2, 0.4, 0.05, 0.35],
    rules: {
      text: ['Если или С2 = подходящее, или (и С4 = подходящее, и С1 = подходящее, и С3 = неподходящее), то Y = удовлетворительный', 'Если и С4 = неподходящее, и С2 = неподходящее, то Y = неудовлетворительный', 'Если и С1 = подходящее, и С2 = подходящее, и (или С3 = подходящее, или С4 = подходящее), то Y = безупречный'],
      formula: ['Math.max(m[1],Math.min(m[0],1-m[2],m[3]))', 'Math.min(1-m[1],1-m[3])', 'Math.min(m[0],m[1],Math.max(m[2],m[3]))']
    },
    tables: {
      importance: [0.1, 0.5, 0.7],
      linguistic: [0.2, 0.4, 0.5, 0.6, 0.8]
    }
  },
  {
    goal: 'Выбрать наиболее подходящую операционную систему для смартфона',
    criterion: [
      {
        title: 'С1 Средняя стоимость модели ',
        description: 'С1 Средняя стоимость модели – средняя стоимость (в десятках тысяч рублей) телефона, имеющего данную операционную систему',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunc1del_axb.png?alt=media&token=965c5d68-ad3c-4486-8189-3fc216bd212c',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunc1del_axbgraph.png?alt=media&token=6d168729-b84c-4741-9be6-7e9d3fa99a42',
        count: 2,
        graphic: '',
        koef: [2, 1],
        functioncompute: '1/(2*(x+1))+0.5'
      },
      {
        title: 'С2 Среднее количество приложений',
        description: 'С2 Среднее количество приложений – количество предложений (в десятках тысяч) от поставщика для данной операционной системы в среднем. ',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunckxa.png?alt=media&token=cb46b5aa-d566-411e-8ff7-c65728e3a569',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunckxagraph.png?alt=media&token=77bdc2c9-1675-483d-ac75-ec52af5f7a27',
        count: 2,
        graphic: '',
        koef: [0.25, 0.5],
        functioncompute: '0.25*(x**0.5)'
      },
      {
        title: 'С3 Защищённость',
        description: 'С3 Защищённость – показатель, отражающий насколько система уязвима к сбоям и атакам',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffuncxdel4.png?alt=media&token=7c9298d1-288e-4ac4-ac70-d88c9a5c27f1',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffuncxdel4graph.png?alt=media&token=828d1f2c-57fb-4003-9c10-7d2efa7cbaa6',
        functioncompute: 'x/4'
      },
      {
        title: 'С4 Открытость',
        description: 'С4 Открытость – показатель того, насколько компоненты ОС доступны в исходных кодах для любого пользователя',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunc1_xdel4.png?alt=media&token=f118d13a-9bc5-4bd6-9a6c-7bc525e0d3be',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunc1_xdel4graph.png?alt=media&token=3ee46e11-6a1e-4bb7-add9-4621be8e174c',
        functioncompute: '1-x/4'
      }
    ],
    alternative: [
      {
        description: 'A1 IOS',
        1: 70,
        2: 40,
        3: ['высокая', 3],
        4: ['средняя', 2]
      },
      {
        description: 'A2 Android',
        1: 25,
        2: 90,
        3: ['низкая', 1],
        4: ['высокая', 3]
      },
      {
        description: 'A3 Windows Phone',
        1: 30,
        2: 15,
        3: ['средняя', 2],
        4: ['средняя', 2]
      }
    ],
    weight: [0.2, 0.4, 0.05, 0.35],
    rules: {
      text: ['Если или С2 = подходящее, или (и С4 = подходящее, и С1 = подходящее, и С3 = неподходящее), то Y = удовлетворительный', 'Если и С4 = неподходящее, и С2 = неподходящее, то Y = неудовлетворительный', 'Если и С1 = подходящее, и С2 = подходящее, и (или С3 = подходящее, или С4 = подходящее), то Y = безупречный'],
      formula: ['Math.max(m[1],Math.min(m[0],1-m[2],m[3]))', 'Math.min(1-m[1],1-m[3])', 'Math.min(m[0],m[1],Math.max(m[2],m[3]))']
    },
    tables: {
      importance: [0.2, 0.5, 0.75],
      linguistic: [0.1, 0.35, 0.5, 0.65, 0.75]
    }
  },
  {
    goal: 'Выбрать наиболее подходящую операционную систему для смартфона',
    criterion: [
      {
        title: 'С1 Средняя стоимость модели ',
        description: 'С1 Средняя стоимость модели – средняя стоимость (в десятках тысяч рублей) телефона, имеющего данную операционную систему',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunc1del_axb.png?alt=media&token=965c5d68-ad3c-4486-8189-3fc216bd212c',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunc1del_axbgraph.png?alt=media&token=6d168729-b84c-4741-9be6-7e9d3fa99a42',
        count: 2,
        graphic: '',
        koef: [2, 1],
        functioncompute: '1/(2*(x+1))+0.5'
      },
      {
        title: 'С2 Среднее количество приложений',
        description: 'С2 Среднее количество приложений – количество предложений (в десятках тысяч) от поставщика для данной операционной системы в среднем. ',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunckxa.png?alt=media&token=cb46b5aa-d566-411e-8ff7-c65728e3a569',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunckxagraph.png?alt=media&token=77bdc2c9-1675-483d-ac75-ec52af5f7a27',
        count: 2,
        graphic: '',
        koef: [0.25, 0.5],
        functioncompute: '0.25*(x**0.5)'
      },
      {
        title: 'С3 Защищённость',
        description: 'С3 Защищённость – показатель, отражающий насколько система уязвима к сбоям и атакам',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffuncxdel4.png?alt=media&token=7c9298d1-288e-4ac4-ac70-d88c9a5c27f1',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffuncxdel4graph.png?alt=media&token=828d1f2c-57fb-4003-9c10-7d2efa7cbaa6',
        functioncompute: 'x/4'
      },
      {
        title: 'С4 Открытость',
        description: 'С4 Открытость – показатель того, насколько компоненты ОС доступны в исходных кодах для любого пользователя',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunc1_xdel4.png?alt=media&token=f118d13a-9bc5-4bd6-9a6c-7bc525e0d3be',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunc1_xdel4graph.png?alt=media&token=3ee46e11-6a1e-4bb7-add9-4621be8e174c',
        functioncompute: '1-x/4'
      }
    ],
    alternative: [
      {
        description: 'A1 IOS',
        1: 50,
        2: 60,
        3: ['средняя', 2],
        4: ['низкая', 1]
      },
      {
        description: 'A2 Android',
        1: 15,
        2: 60,
        3: ['низкая', 1],
        4: ['средняя', 2]
      },
      {
        description: 'A3 Windows Phone',
        1: 20,
        2: 30,
        3: ['низкая', 1],
        4: ['средняя', 2]
      }
    ],
    weight: [0.2, 0.4, 0.05, 0.35],
    rules: {
      text: ['Если или С2 = подходящее, или (и С4 = подходящее, и С1 = подходящее, и С3 = неподходящее), то Y = удовлетворительный', 'Если и С4 = неподходящее, и С2 = неподходящее, то Y = неудовлетворительный', 'Если и С1 = подходящее, и С2 = подходящее, и (или С3 = подходящее, или С4 = подходящее), то Y = безупречный'],
      formula: ['Math.max(m[1],Math.min(m[0],1-m[2],m[3]))', 'Math.min(1-m[1],1-m[3])', 'Math.min(m[0],m[1],Math.max(m[2],m[3]))']
    },
    tables: {
      importance: [0.1, 0.4, 0.7],
      linguistic: [0.1, 0.25, 0.5, 0.65, 0.75]
    }
  },
  {
    goal: 'Выбрать франшизу, внёсшую наибольший вклад в культурное наследие',
    criterion: [
      {
        title: 'С1 Средний возраст аудитории',
        description: 'С1 Средний возраст аудитории – показатель, отражающий в насколько сознательном возрасте находится среднестатистический зритель ',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F1.11.png?alt=media&token=1d31f7da-762d-4c22-adb3-0e36e079df52',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Fpolinomgraph.png?alt=media&token=0ec96405-10cd-43a7-a2f2-7a803866a936',
        count: 3,
        graphic: '',
        koef: [-0.0025, 0.1, 0],
        functioncompute: '-x**2/400+x/10'
      },
      {
        title: 'С2 Количество зрителей ',
        description: 'С2 Количество зрителей  – количество зрителей (в млн), посмотревших все части/серии данной франшизы',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Flogformula.png?alt=media&token=8e5e880d-8d78-409e-8e14-c88450ae25b9',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Flogformulagraph.png?alt=media&token=d80678a0-053a-437f-badc-db5b3be839c7',
        count: 2,
        graphic: '',
        koef: [0.2, 1],
        functioncompute: 'Math.log2(x+1)*0.2'
      },
      {
        title: 'С3 Отзывы',
        description: 'С3 Отзывы – показатель оценок со стороны зрителей',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffuncxdel4.png?alt=media&token=7c9298d1-288e-4ac4-ac70-d88c9a5c27f1',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffuncxdel4graph.png?alt=media&token=828d1f2c-57fb-4003-9c10-7d2efa7cbaa6',
        functioncompute: 'x/4'
      },
      {
        title: 'С4 Общая длительность',
        description: 'С4 Общая длительность – показатель общей длительности франшизы',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunc1delxand1.png?alt=media&token=0bfd07d9-f6cc-4cf4-9bd8-90024e299385',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunc1delxand1graph.png?alt=media&token=df66c0b3-65ae-48db-aedc-d8da0c20324d',
        functioncompute: '1/(x+1)'
      }
    ],
    alternative: [
      {
        description: 'A1 Гарри Поттер',
        1: 13,
        2: 10,
        3: ['cредние', 2],
        4: ['низкая', 1]
      },
      {
        description: 'A2 Игра Престолов',
        1: 26,
        2: 16,
        3: ['высокие', 3],
        4: ['средняя', 2]
      },
      {
        description: 'A3 Время приключений',
        1: 11,
        2: 6,
        3: ['высокие', 3],
        4: ['высокая', 3]
      }
    ],
    weight: [0.24, 0.14, 0.43, 0.19],
    rules: {
      text: ['Если и С3 = подходящее, и (или С2 = подходящее, или (и С1 = неподходящее, и С4 = подходящее), то Y = удовлетворительный', 'Если или С3 = неподходящее, или (и С1 = неподходящее, и С4 = неподходящее), то Y = неудовлетворительный', 'Если и С1 = подходящее, и С2 = подходящее, и С3 = подходящее, и С4 = подходящее, то Y = безупречный'],
      formula: ['Math.min(m[2],Math.max(m[1],Math.min(1-m[0],m[3])))', 'Math.max(1-m[2],Math.min(1-m[0],1-m[3]))', 'Math.min(m[0],m[1],m[2],m[3])']
    },
    tables: {
      importance: [0.2, 0.5, 0.75],
      linguistic: [0.1, 0.35, 0.45, 0.55, 0.7]
    }
  },
  {
    goal: 'Выбрать франшизу, внёсшую наибольший вклад в культурное наследие',
    criterion: [
      {
        title: 'С1 Средний возраст аудитории',
        description: 'С1 Средний возраст аудитории – показатель, отражающий в насколько сознательном возрасте находится среднестатистический зритель  ',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F1.11.png?alt=media&token=1d31f7da-762d-4c22-adb3-0e36e079df52',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Fpolinomgraph.png?alt=media&token=0ec96405-10cd-43a7-a2f2-7a803866a936',
        count: 3,
        graphic: '',
        koef: [-0.0025, 0.1, 0],
        functioncompute: '-x**2/400+x/10'
      },
      {
        title: 'С2 Количество зрителей ',
        description: 'С2 Количество зрителей  – количество зрителей (в млн), посмотревших все части/серии данной франшизы',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Flogformula.png?alt=media&token=8e5e880d-8d78-409e-8e14-c88450ae25b9',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Flogformulagraph.png?alt=media&token=d80678a0-053a-437f-badc-db5b3be839c7',
        count: 2,
        graphic: '',
        koef: [0.2, 1],
        functioncompute: 'Math.log2(x+1)*0.2'
      },
      {
        title: 'С3 Отзывы',
        description: 'С3 Отзывы – показатель оценок со стороны зрителей',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffuncxdel4.png?alt=media&token=7c9298d1-288e-4ac4-ac70-d88c9a5c27f1',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffuncxdel4graph.png?alt=media&token=828d1f2c-57fb-4003-9c10-7d2efa7cbaa6',
        functioncompute: 'x/4'
      },
      {
        title: 'С4 Общая длительность',
        description: 'С4 Общая длительность – показатель общей длительности франшизы',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunc1delxand1.png?alt=media&token=0bfd07d9-f6cc-4cf4-9bd8-90024e299385',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunc1delxand1graph.png?alt=media&token=df66c0b3-65ae-48db-aedc-d8da0c20324d',
        functioncompute: '1/(x+1)'
      }
    ],
    alternative: [
      {
        description: 'A1 Гарри Поттер',
        1: 16,
        2: 15,
        3: ['высокие', 3],
        4: ['средняя', 2]
      },
      {
        description: 'A2 Игра Престолов',
        1: 20,
        2: 16,
        3: ['высокие', 3],
        4: ['высокая', 3]
      },
      {
        description: 'A3 Время приключений',
        1: 10,
        2: 14,
        3: ['высокие', 3],
        4: ['высокая', 3]
      }
    ],
    weight: [0.24, 0.14, 0.43, 0.19],
    rules: {
      text: ['Если и С3 = подходящее, и (или С2 = подходящее, или (и С1 = неподходящее, и С4 = подходящее), то Y = удовлетворительный', 'Если или С3 = неподходящее, или (и С1 = неподходящее, и С4 = неподходящее), то Y = неудовлетворительный', 'Если и С1 = подходящее, и С2 = подходящее, и С3 = подходящее, и С4 = подходящее, то Y = безупречный'],
      formula: ['Math.min(m[2],Math.max(m[1],Math.min(1-m[0],m[3])))', 'Math.max(1-m[2],Math.min(1-m[0],1-m[3]))', 'Math.min(m[0],m[1],m[2],m[3])']
    },
    tables: {
      importance: [0.2, 0.5, 0.75],
      linguistic: [0.1, 0.3, 0.5, 0.7, 0.75]
    }
  },
  {
    goal: 'Выбрать франшизу, внёсшую наибольший вклад в культурное наследие',
    criterion: [
      {
        title: 'С1 Средний возраст аудитории',
        description: 'С1 Средний возраст аудитории – показатель, отражающий в насколько сознательном возрасте находится среднестатистический зритель  ',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F1.11.png?alt=media&token=1d31f7da-762d-4c22-adb3-0e36e079df52',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Fpolinomgraph.png?alt=media&token=0ec96405-10cd-43a7-a2f2-7a803866a936',
        count: 3,
        graphic: '',
        koef: [-0.0025, 0.1, 0],
        functioncompute: '-x**2/400+x/10'
      },
      {
        title: 'С2 Количество зрителей ',
        description: 'С2 Количество зрителей  – количество зрителей (в млн), посмотревших все части/серии данной франшизы',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Flogformula.png?alt=media&token=8e5e880d-8d78-409e-8e14-c88450ae25b9',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Flogformulagraph.png?alt=media&token=d80678a0-053a-437f-badc-db5b3be839c7',
        count: 2,
        graphic: '',
        koef: [0.2, 1],
        functioncompute: 'Math.log2(x+1)*0.2'
      },
      {
        title: 'С3 Отзывы',
        description: 'С3 Отзывы – показатель оценок со стороны зрителей',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffuncxdel4.png?alt=media&token=7c9298d1-288e-4ac4-ac70-d88c9a5c27f1',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffuncxdel4graph.png?alt=media&token=828d1f2c-57fb-4003-9c10-7d2efa7cbaa6',
        functioncompute: 'x/4'
      },
      {
        title: 'С4 Общая длительность',
        description: 'С4 Общая длительность – показатель общей длительности франшизы',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunc1delxand1.png?alt=media&token=0bfd07d9-f6cc-4cf4-9bd8-90024e299385',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunc1delxand1graph.png?alt=media&token=df66c0b3-65ae-48db-aedc-d8da0c20324d',
        functioncompute: '1/(x+1)'
      }
    ],
    alternative: [
      {
        description: 'A1 Гарри Поттер',
        1: 12,
        2: 13,
        3: ['низкие', 1],
        4: ['низкая', 1]
      },
      {
        description: 'A2 Игра Престолов',
        1: 16,
        2: 11,
        3: ['средние', 2],
        4: ['средняя', 2]
      },
      {
        description: 'A3 Время приключений',
        1: 8,
        2: 9,
        3: ['высокие', 3],
        4: ['средняя', 2]
      }
    ],
    weight: [0.24, 0.14, 0.43, 0.19],
    rules: {
      text: ['Если и С3 = подходящее, и (или С2 = подходящее, или (и С1 = неподходящее, и С4 = подходящее), то Y = удовлетворительный', 'Если или С3 = неподходящее, или (и С1 = неподходящее, и С4 = неподходящее), то Y = неудовлетворительный', 'Если и С1 = подходящее, и С2 = подходящее, и С3 = подходящее, и С4 = подходящее, то Y = безупречный'],
      formula: ['Math.min(m[2],Math.max(m[1],Math.min(1-m[0],m[3])))', 'Math.max(1-m[2],Math.min(1-m[0],1-m[3]))', 'Math.min(m[0],m[1],m[2],m[3])']
    },
    tables: {
      importance: [0.1, 0.5, 0.7],
      linguistic: [0.15, 0.3, 0.5, 0.7, 0.75]
    }
  },
  {
    goal: 'Выбрать лучшую экономическую стратегию',
    criterion: [
      {
        title: 'С1 Производительность',
        description: 'С1 Производительность - объём товаров и услуг (в сотнях в час), создаваемых в единицу времени',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F1.11.png?alt=media&token=1d31f7da-762d-4c22-adb3-0e36e079df52',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffuncfor13graph.png?alt=media&token=de97c7c6-28d2-4040-a2bc-614e835352d4',
        count: 3,
        graphic: '',
        koef: [100, 20, 0.05],
        functioncompute: '100*x**2+20*x+0.05'
      },
      {
        title: 'С2 Финансовая осуществимость стратегии',
        description: 'С2 Финансовая осуществимость стратегии – средства (в млн долл), которые потребуются организации для того, чтобы проводить конкретную стратегию',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Fxaplusb.png?alt=media&token=6eb0aa60-1e59-4b5a-b2b7-8309b10d2c10',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Fxaplusbgraph.png?alt=media&token=281736df-180e-4d89-b254-81f42ebc2173',
        count: 2,
        graphic: '',
        koef: [0.5, 0.1],
        functioncompute: 'x**0.5+0.1'
      },
      {
        title: 'С3 Конкурентоспособность',
        description: 'С3 Конкурентоспособность – преимущество одного предприятия по отношению к другим данной отрасли внутри страны и за ее пределами',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F2x_1.png?alt=media&token=9ed526ea-3e16-4ce7-ba44-3943644fcec6',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F2x_1graph.png?alt=media&token=573b2204-4619-463c-aef0-0c9ac65ff67f',
        functioncompute: '2**x-1'
      },
      {
        title: 'С4 Риск',
        description: 'С4 Риск – возможность невыполнения фирмой своих обязательств перед заказчиком',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F1.14.png?alt=media&token=af3d0f91-f896-4dc0-ab12-8bf7ab94b1cf',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunc1_xdel4graph.png?alt=media&token=3ee46e11-6a1e-4bb7-add9-4621be8e174c',
        functioncompute: '1-x/4'
      }
    ],
    alternative: [
      {
        description: 'Концентрированный рост',
        1: 100,
        2: 0.4,
        3: ['высокая', 0.75],
        4: ['низкий', 1]
      },
      {
        description: 'A2 Интеграция',
        1: 90,
        2: 0.1,
        3: ['низкая', 0.25],
        4: ['высокий', 3]
      },
      {
        description: 'A3 Диверсификация',
        1: 140,
        2: 0.28,
        3: ['высокая', 0.75],
        4: ['средний', 2]
      }
    ],
    weight: [0.31, 0.23, 0.15, 0.31],
    rules: {
      text: ['Если и С2 = подходящее, и С4 = подходящее, С3 = подходящее, то Y = удовлетворительный', 'Если и С2 = неподходящее, и С4 = неподходящее, и С1 = неподходящее, то Y = неудовлетворительный', 'Если и С2 = подходящее, и С4 = подходящее, и С1 = подходящее, и С3 = подходящее, то Y = безупречный'],
      formula: ['Math.min(m[1],m[3],m[2])', 'Math.min(1-m[1],1-m[3],1-m[0])', 'Math.min(m[0],m[1],m[2],m[3])']
    },
    tables: {
      importance: [0.2, 0.5, 0.75],
      linguistic: [0.2, 0.4, 0.55, 0.7, 0.75]
    }
  },
  {
    goal: 'Выбрать лучшую экономическую стратегию',
    criterion: [
      {
        title: 'С1 Производительность',
        description: 'С1 Производительность - объём товаров и услуг (в сотнях в час), создаваемых в единицу времени',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F1.11.png?alt=media&token=1d31f7da-762d-4c22-adb3-0e36e079df52',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffuncfor13graph.png?alt=media&token=de97c7c6-28d2-4040-a2bc-614e835352d4',
        count: 3,
        graphic: '',
        koef: [100, 20, 0.05],
        functioncompute: '100*x**2+20*x+0.05'
      },
      {
        title: 'С2 Финансовая осуществимость стратегии',
        description: 'С2 Финансовая осуществимость стратегии – средства (в млн долл), которые потребуются организации для того, чтобы проводить конкретную стратегию',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Fxaplusb.png?alt=media&token=6eb0aa60-1e59-4b5a-b2b7-8309b10d2c10',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Fxaplusbgraph.png?alt=media&token=281736df-180e-4d89-b254-81f42ebc2173',
        count: 2,
        graphic: '',
        koef: [0.5, 0.1],
        functioncompute: 'x**0.5+0.1'
      },
      {
        title: 'С3 Конкурентоспособность',
        description: 'С3 Конкурентоспособность – преимущество одного предприятия по отношению к другим данной отрасли внутри страны и за ее пределами',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F2x_1.png?alt=media&token=9ed526ea-3e16-4ce7-ba44-3943644fcec6',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F2x_1graph.png?alt=media&token=573b2204-4619-463c-aef0-0c9ac65ff67f',
        functioncompute: '2**x-1'
      },
      {
        title: 'С4 Риск',
        description: 'С4 Риск – возможность невыполнения фирмой своих обязательств перед заказчиком',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F1.14.png?alt=media&token=af3d0f91-f896-4dc0-ab12-8bf7ab94b1cf',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunc1_xdel4graph.png?alt=media&token=3ee46e11-6a1e-4bb7-add9-4621be8e174c',
        functioncompute: '1-x/4'
      }
    ],
    alternative: [
      {
        description: 'A1 Концентрированный рост',
        1: 80,
        2: 0.35,
        3: ['высокая', 0.75],
        4: ['средний', 2]
      },
      {
        description: 'A2 Интеграция',
        1: 120,
        2: 0.15,
        3: ['средняя', 0.5],
        4: ['высокий', 3]
      },
      {
        description: 'A3 Диверсификация',
        1: 130,
        2: 0.38,
        3: ['низкая', 0.25],
        4: ['средний', 2]
      }
    ],
    weight: [0.31, 0.23, 0.15, 0.31],
    rules: {
      text: ['Если и С2 = подходящее, и С4 = подходящее, С3 = подходящее, то Y = удовлетворительный', 'Если и С2 = неподходящее, и С4 = неподходящее, и С1 = неподходящее, то Y = неудовлетворительный', 'Если и С2 = подходящее, и С4 = подходящее, и С1 = подходящее, и С3 = подходящее, то Y = безупречный'],
      formula: ['Math.min(m[1],m[3],m[2])', 'Math.min(1-m[1],1-m[3],1-m[0])', 'Math.min(m[0],m[1],m[2],m[3])']
    },
    tables: {
      importance: [0.1, 0.4, 0.7],
      linguistic: [0.2, 0.4, 0.6, 0.7, 0.75]
    }
  },
  {
    goal: 'Выбрать лучшую экономическую стратегию',
    criterion: [
      {
        title: 'С1 Производительность',
        description: 'С1 Производительность - объём товаров и услуг (в сотнях в час), создаваемых в единицу времени',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F1.11.png?alt=media&token=1d31f7da-762d-4c22-adb3-0e36e079df52',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffuncfor13graph.png?alt=media&token=de97c7c6-28d2-4040-a2bc-614e835352d4',
        count: 3,
        graphic: '',
        koef: [100, 20, 0.05],
        functioncompute: '100*x**2+20*x+0.05'
      },
      {
        title: 'С2 Финансовая осуществимость стратегии',
        description: 'С2 Финансовая осуществимость стратегии – средства (в млн долл), которые потребуются организации для того, чтобы проводить конкретную стратегию',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Fxaplusb.png?alt=media&token=6eb0aa60-1e59-4b5a-b2b7-8309b10d2c10',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Fxaplusbgraph.png?alt=media&token=281736df-180e-4d89-b254-81f42ebc2173',
        count: 2,
        graphic: '',
        koef: [0.5, 0.1],
        functioncompute: 'x**0.5+0.1'
      },
      {
        title: 'С3 Конкурентоспособность',
        description: 'С3 Конкурентоспособность – преимущество одного предприятия по отношению к другим данной отрасли внутри страны и за ее пределами',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F2x_1.png?alt=media&token=9ed526ea-3e16-4ce7-ba44-3943644fcec6',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F2x_1graph.png?alt=media&token=573b2204-4619-463c-aef0-0c9ac65ff67f',
        functioncompute: '2**x-1'
      },
      {
        title: 'С4 Риск',
        description: 'С4 Риск – возможность невыполнения фирмой своих обязательств перед заказчиком',
        function: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2F1.14.png?alt=media&token=af3d0f91-f896-4dc0-ab12-8bf7ab94b1cf',
        path: 'https://firebasestorage.googleapis.com/v0/b/decision-theory-simulator.appspot.com/o/statics%2Ffunc1_xdel4graph.png?alt=media&token=3ee46e11-6a1e-4bb7-add9-4621be8e174c',
        functioncompute: '1-x/4'
      }
    ],
    alternative: [
      {
        description: 'A1 Концентрированный рост',
        1: 70,
        2: 0.2,
        3: ['высокая', 0.75],
        4: ['средний', 2]
      },
      {
        description: 'A2 Интеграция',
        1: 50,
        2: 0.26,
        3: ['средняя', 0.5],
        4: ['средний', 2]
      },
      {
        description: 'A3 Диверсификация',
        1: 60,
        2: 0.17,
        3: ['высокая', 0.75],
        4: ['низкий', 1]
      }
    ],
    weight: [0.31, 0.23, 0.15, 0.31],
    rules: {
      text: ['Если и С2 = подходящее, и С4 = подходящее, С3 = подходящее, то Y = удовлетворительный', 'Если и С2 = неподходящее, и С4 = неподходящее, и С1 = неподходящее, то Y = неудовлетворительный', 'Если и С2 = подходящее, и С4 = подходящее, и С1 = подходящее, и С3 = подходящее, то Y = безупречный'],
      formula: ['Math.min(m[1],m[3],m[2])', 'Math.min(1-m[1],1-m[3],1-m[0])', 'Math.min(m[0],m[1],m[2],m[3])']
    },
    tables: {
      importance: [0.1, 0.5, 0.7],
      linguistic: [0.15, 0.25, 0.5, 0.7, 0.75]
    }
  }
]