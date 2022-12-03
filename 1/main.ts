const fs = require('fs')
const path = require('path')

export function processInput(filename: string): string[] {
  const input: string = fs.readFileSync(path.resolve(__dirname, filename), 'utf8')
  const arrayOfStrings: string[] = input.split('\n')
  return arrayOfStrings
}

export function createSums(arrayOfStrings: string[]): number[] {
  let sums: number[] = [0]
  let position: number = 0
  for (let i = 0; i < arrayOfStrings.length; i++) {
    if (arrayOfStrings[i] !== '') {
      sums[position] += parseInt(arrayOfStrings[i])
    } else {
      sums.push(0)
      position += 1
    }
  }
  return sums
}

const sums = createSums(processInput('puzzle.in'))

console.log('Highest Elf Calories: ', Math.max(...sums))

const topThree = sums.sort((a, b) => b - a).slice(0, 3)

let topThreeTotal = 0
for (let i = 0; i < topThree.length; i++) {
  topThreeTotal += topThree[i]
}

console.log('Top Three Elf Calories: ', topThreeTotal)
