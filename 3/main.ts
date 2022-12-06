import { CharMap, SackItem, SackSet } from './types'

const fs = require('fs')
const path = require('path')

const filename: string = 'puzzle.in'

/**
 * Process the input file and return an array of SackItems
 * broken into two compartments.
 * @param filename: string
 */
export function processInput(filename: string): SackItem[] {
  const input: string = fs.readFileSync(
    path.resolve(__dirname, filename),
    'utf8'
  )
  const arrayOfStrings: string[] = input.split('\n')
  let arrayOfSacks: SackItem[] = []
  for (let s of arrayOfStrings) {
    arrayOfSacks.push({
      first: s.slice(0, s.length / 2), // first half
      second: s.slice(s.length / 2, s.length), // second half
    })
  }

  return arrayOfSacks
}

/**
 * Return a map of shared characters and their frequencies
 *
 * @param sacks: SackItem[]
 */
export function findSharedItem(sacks: SackItem[]): string[] {
  const sharedItems: string[] = []
  for (let s of sacks) {
    let filteredArray = s.first.split('').filter(function (n) {
      return s.second.indexOf(n) !== -1
    })
    sharedItems.push(filteredArray[0])
  }
  return sharedItems
}

/** Process an input file and return a SackSet
 * @param: filename: string
 *
 * */
export function processInput2(filename: string): SackSet {
  const input: string = fs.readFileSync(
    path.resolve(__dirname, filename),
    'utf8'
  )
  const arrayOfStrings: string[] = input.split('\n')
  // console.log('arrayOfStrings: ', arrayOfStrings)

  let sackSet: SackSet = {}
  for (let n = 1; n <= arrayOfStrings.length / 3; n++) {
    let tempArray = []
    for (let i = 0; i <= 2; i++) {
      tempArray.push(arrayOfStrings[n * 3 - i - 1])
    }
    sackSet[n] = tempArray
  }
  return sackSet
}

/**
 * Return a number representing a letter
 * @param letter: string
 */
export function getLetterValue(letter: string): number {
  const charMap: CharMap = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 10,
    k: 11,
    l: 12,
    m: 13,
    n: 14,
    o: 15,
    p: 16,
    q: 17,
    r: 18,
    s: 19,
    t: 20,
    u: 21,
    v: 22,
    w: 23,
    x: 24,
    y: 25,
    z: 26,
    A: 27,
    B: 28,
    C: 29,
    D: 30,
    E: 31,
    F: 32,
    G: 33,
    H: 34,
    I: 35,
    J: 36,
    K: 37,
    L: 38,
    M: 39,
    N: 40,
    O: 41,
    P: 42,
    Q: 43,
    R: 44,
    S: 45,
    T: 46,
    U: 47,
    V: 48,
    W: 49,
    X: 50,
    Y: 51,
    Z: 52,
  }
  return charMap[letter]
}

/**
 *  Sum the number representation of an array of letters.
 * @param sharedItemArray: string[]
 */
export function getPrioritySum(sharedItemArray: string[]): number {
  let sum = 0
  for (let s of sharedItemArray) {
    sum += getLetterValue(s)
  }
  return sum
}

/**
 *
 * @param sacks: SackSet
 */
export function findBadgeItem(sacks: SackSet): string[] {
  let badgeItems: string[] = []
  const keys = Object.keys(sacks)
  for (let k of keys) {
    const one = sacks[k][0].split('')
    const two = sacks[k][1].split('')
    const three = sacks[k][2].split('')
    const group = [one, two, three]
    const result = group.reduce((a, b) => a.filter(c => b.includes(c)))

    badgeItems.push(result[0])
  }
  return badgeItems
}

console.log('Shared Items: ', findSharedItem(processInput(filename)))
console.log(
  'Shared Item Total: ',
  getPrioritySum(findSharedItem(processInput(filename)))
)
console.log('Badge Items: ', findBadgeItem(processInput2(filename)))
console.log(
  'Badge Item Total: ',
  getPrioritySum(findBadgeItem(processInput2(filename)))
)
