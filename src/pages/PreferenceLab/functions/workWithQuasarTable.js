export function rightMatrixFill () {
  const arr = []
  for (let j = 0; j < this.rightMatrix.length / 3; j++) {
    arr.push({
      name: `a${j + 1}`,
      a1: this.rightMatrix[j * 3 + 0],
      a2: this.rightMatrix[j * 3 + 1],
      a3: this.rightMatrix[j * 3 + 2]
    })
  }
  return (arr)
}
