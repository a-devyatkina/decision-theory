function randomInteger (min, max) {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}
function generateVariant () {
  let linguistic = []
  let first = Math.random() * (0.2 - 0.1) + 0.1
  // first = Math.round(first * 100) / 100
  first = Number(first.toFixed(2))

  let cur = 0
  for (let i = 0; i < 4; i++) {
    linguistic.push(first.toFixed(2))
    // first += 0.2
    cur = Math.random() * (0.25 - 0.15) + 0.15
    // first += Math.round(cur * 100) / 100
    first += Number(cur.toFixed(2))
  }

  let importance = []
  first = Math.random() * (0.2 - 0.1) + 0.1
  // first = Math.round(first * 100) / 100

  for (let i = 0; i < 3; i++) {
    importance.push(first.toFixed(2))
    cur = Math.random() * (0.3 - 0.2) + 0.2
    // first += Math.round(cur * 100) / 100
    first += Number(cur.toFixed(2))
  }
  return {
    importance,
    linguistic
  }
}
export function generate (variant, dict1, dict2) {
  let alt = [0, 0, 0]
  let sup = [0, 0, 0]
  for (let i = 0; i < variant['data']['alternative'].length; i++) {
    alt[i] = [0, 0, 0, 0]
    sup[i] = [0, 0, 0, 0]
    for (let k = 1; k < 5; k++) {
      if (variant['data']['criterion'][k - 1]['typeof'][0] === 'undependent') {
        if (k === 1 || k === 2) {
          let newRandom = randomInteger(0, 4)
          if (newRandom === 4) {
            newRandom = 3
          }
          sup[i][k - 1] = newRandom
          let begin = variant['data']['alternative'][i][k][newRandom]['begin']
          let end = variant['data']['alternative'][i][k][newRandom]['end']
          let arr = []
          for (let j = begin; j < end; j += (end - begin) / 100) {
            arr.push(+j.toFixed(2))
          }
          let randomChoice = randomInteger(0, arr.length - 1)
          alt[i][k - 1] = arr[randomChoice]
        } else {
          let begin = variant['data']['alternative'][i][k]['begin']
          let end = variant['data']['alternative'][i][k]['end']
          let arr = []
          for (let j = begin; j < end; j += (end - begin) / 100) {
            arr.push(+j.toFixed(2))
          }
          let randomChoice = randomInteger(0, arr.length - 1)
          alt[i][k - 1] = Math.floor(arr[randomChoice])
          sup[i][k - 1] = alt[i][k - 1]
        }
      }
    }
  }

  for (let i = 0; i < variant['data']['alternative'].length; i++) {
    for (let k = 1; k < 5; k++) {
      let buf = variant['data']['criterion'][k - 1]['typeof']
      let numb = 0
      let weight = 0
      if (buf[0] === 'dependent') {
        for (let key = 0; key < buf.length; key++) {
          if (key !== 0) {
            numb += buf[key]['weight'] * sup[i][buf[key]['criterion']]
            weight += buf[key]['weight']
          }
        }
        let arr = []
        numb = Math.round(numb / weight)
        if (numb === 0) {
          arr = [0, 1]
        } else if ((numb === 3 || numb === 4) && (k === 1 || k === 2)) {
          arr = [2, 3]
        } else if ((numb === 4) && (k === 1 || k === 2)) {
          arr = [3, 4]
        } else {
          arr = [numb - 1, numb, numb + 1]
        }
        let newRandom = randomInteger(0, arr.length)
        sup[i][k - 1] = arr[newRandom]
        if (k === 1 || k === 2) {
          let begin = variant['data']['alternative'][i][k][newRandom]['begin']
          let end = variant['data']['alternative'][i][k][newRandom]['end']
          let arrChoice = []
          for (let j = begin; j < end; j += (end - begin) / 100) {
            arrChoice.push(+j.toFixed(2))
          }
          let randomChoice = randomInteger(0, arrChoice.length - 1)
          alt[i][k - 1] = arrChoice[randomChoice]
          sup[i][k - 1] = alt[i][k - 1]
        } else {
          let begin = variant['data']['alternative'][i][k]['begin']
          let end = variant['data']['alternative'][i][k]['end']
          let arrChoice = []
          for (let j = begin; j < end; j += (end - begin) / 100) {
            arrChoice.push(+j.toFixed(2))
          }
          let randomChoice = randomInteger(0, arrChoice.length - 1)
          alt[i][k - 1] = Math.floor(arrChoice[randomChoice])
          sup[i][k - 1] = alt[i][k - 1]
        }
      }
    }
  }

  let newVariant = { ...variant['data'] }
  for (let i = 0; i < 3; i++) {
    for (let j = 1; j < 5; j++) {
      if (j === 1 || j === 2) {
        newVariant['alternative'][i][j] = alt[i][j - 1]
      } else if (j === 3) {
        newVariant['alternative'][i][j] = [dict1[alt[i][j - 1]], alt[i][j - 1]]
      } else {
        newVariant['alternative'][i][j] = [dict2[alt[i][j - 1]], alt[i][j - 1]]
      }
    }
  }
  newVariant['tables'] = generateVariant()
  return newVariant
}
