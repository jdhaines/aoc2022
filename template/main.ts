const fs = require('fs')
const path = require('path')

export function processInput(filename: string): string[] {
  const input: string = fs.readFileSync(path.resolve(__dirname, filename), 'utf8')
  const arrayOfStrings: string[] = input.split('\n')
  return arrayOfStrings
}