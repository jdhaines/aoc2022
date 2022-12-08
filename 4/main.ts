import { ElfPairs, Pair } from './types'

const fs = require('fs')
const path = require('path')

const filename = 'puzzle.in'

/**
 * Process the input file and return an object with the pairs
 * @param filename
 */
export function processInput(filename: string): ElfPairs {
  const input: string = fs.readFileSync(
    path.resolve(__dirname, filename),
    'utf8'
  )
  let elfPair: ElfPairs = {}
  let n = 0
  for (let i of input.split('\n')) {
    elfPair[n.toString()] = {
      first: i.split(',')[0],
      second: i.split(',')[1],
    }
    n += 1
  }
  return elfPair
}

/**
 * Take each ElfObject and determine check if the first item has more
 * digits than the second.  If so, flip the order.  We need the first
 * item to be the same or shorter length to do our next check.
 *
 * @param originalElfPairs
 */
export function shorterItemFirst(originalElfPairs: ElfPairs): ElfPairs {
  let newElfPairs: ElfPairs = {}
  const keys = Object.keys(originalElfPairs)
  for (let k of keys) {
    // get length of first item
    const firstLength =
      parseInt(originalElfPairs[k].first.split('-')[1]) -
      parseInt(originalElfPairs[k].first.split('-')[0]) +
      1
    // get length of second item
    const secondLength =
      parseInt(originalElfPairs[k].second.split('-')[1]) -
      parseInt(originalElfPairs[k].second.split('-')[0]) +
      1
    // if first item is longer, flip the order
    if (firstLength > secondLength) {
      newElfPairs[k] = {
        first: originalElfPairs[k].second,
        second: originalElfPairs[k].first,
      }
    } else {
      newElfPairs[k] = originalElfPairs[k]
    }
  }
  return newElfPairs
}

/**
 * Take each ElfObject and determine if the first item is a subset of the
 * second item.  If so, add 1.  The total sum is the number of pairs with
 * complete overlap.
 * @param ElfPairs
 */
export function sumCompleteOverlaps(ElfPairs: ElfPairs): number {
  const keys = Object.keys(ElfPairs)
  let sum = 0
  for (let k of keys) {
    // console.log('item: ', ElfPairs[k], '--', CheckCompleteOverlap(ElfPairs[k]))
    sum += CheckCompleteOverlap(ElfPairs[k])
  }
  return sum
}

/**
 * Take each ElfObject and determine if the first item is a subset of the
 * second item.  If so, add 1.  The total sum is the number of pairs with
 * partial overlap.
 * @param ElfPairs
 */
export function sumPartialOverlaps(ElfPairs: ElfPairs): number {
  const keys = Object.keys(ElfPairs)
  let sum = 0
  for (let k of keys) {
    sum += checkPartialOverlap(ElfPairs[k])
  }
  return sum
}

/**
 * Check if the two items overlap.  Jenny's Algorithm:
 *   "First Number of Second Item <= First Number of First Item"
 *   "Second Number of Second Item >= Second Number of First Item"
 *  If both these things are true, then they overlap
 * @param pair
 */
export function CheckCompleteOverlap(pair: Pair): number {
  // they overlap if they are the same
  if (pair.first === pair.second) {
    return 1
  }

  if (
    parseInt(pair.second.split('-')[0]) <= parseInt(pair.first.split('-')[0]) &&
    parseInt(pair.second.split('-')[1]) >= parseInt(pair.first.split('-')[1])
  ) {
    return 1
  } else {
    return 0
  }
}

/**
 * Check if the two items partially overlap.  Jenny's Algorithm:
 * Turn the longer item (second) into an array of all the numbers within it.
 * If the first number of the other item (first) is in the array or the second
 * number of the other item (first) is in the array, then they partially overlap.
 *
 * @param pair
 */
export function checkPartialOverlap(pair: Pair): number {
  const secondArray = createArray(
    parseInt(pair.second.split('-')[0]),
    parseInt(pair.second.split('-')[1])
  )
  if (
    secondArray.includes(parseInt(pair.first.split('-')[0])) ||
    secondArray.includes(parseInt(pair.first.split('-')[1]))
  ) {
    return 1
  } else {
    return 0
  }
}

export function createArray(start: number, end: number): number[] {
  const arr = []
  for (let i = start; i <= end; i++) {
    arr.push(i)
  }
  return arr
}

console.log(
  'Result Part 1: ',
  sumCompleteOverlaps(shorterItemFirst(processInput(filename)))
)

console.log(
  'Result Part 2: ',
  sumPartialOverlaps(shorterItemFirst(processInput(filename)))
)
