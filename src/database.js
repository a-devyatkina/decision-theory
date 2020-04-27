var variant1 = {
  number: 1,
  data: {
    goal: 'Выбрать город, наиболее пригодный для жизни, по значениям заданных критериев и их функциям принадлежности',
    criterion: [
      {
        tytle: 'С1 Население',
        description: 'С1 Население – количество человек (в млн), проживающих в данном городе',
        function: '../../statics/1.11.png',
        path: '../../statics/1.1.png',
        count: 3,
        graphic: '',
        koef: [-0.02, 0.286, 0],
        functioncompute: '-0.02*x**2+0.286*x'
      },
      {
        tytle: 'С2 Средняя з/п',
        description: 'С2 Средняя з/п – показатель средней заработной платы (в тысячах рублей) по профессии нашего клиента',
        function: '../../statics/1.12.png',
        path: '../../statics/1.2.png',
        count: 3,
        graphic: '',
        koef: [0.125, 2, 1],
        functioncompute: 'Math.log(x+1)/(8*Math.log(2))'
      },
      {
        tytle: 'С3 Количество свободных вакансий',
        description: 'С3 Количество свободных вакансий – показатель относительного количества свободных вакансий по профессии нашего клиента',
        function: '../../statics/1.13.png',
        path: '../../statics/1.3.png',
        count: 0,
        graphic: '',
        koef: [],
        functioncompute: 'x**2/16'
      },
      {
        tytle: 'С4 Уровень загрязнения',
        description: 'С4 Уровень загрязнения – показатель содержания вредных примесей в атмосфере, почве и воде',
        function: '../../statics/1.14.png',
        path: '../../statics/1.4.png',
        count: 0,
        graphic: '',
        koef: [],
        functioncompute: '1-x/4'
      }
    ],
    alternative: [
      {
        description: 'А1 Москва',
        1: 13,
        2: 120,
        3: ['низкое', 1],
        4: ['средний', 2]
      },
      {
        description: 'А2 Питер',
        1: 4,
        2: 52,
        3: ['среднее', 2],
        4: ['высокий', 3]
      },
      {
        description: 'А3 Краснодар',
        1: 0.9,
        2: 40,
        3: ['среднее', 2],
        4: ['средний', 2]
      }
    ],
    tables: {
      importance: [
      ],
      linguistic: []
    }
  }
}

module.exports.variant1 = variant1
