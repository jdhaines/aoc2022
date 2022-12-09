import { StacksItem } from './types'

const fs = require('fs')
const path = require('path')

const filename = 'puzzle.in'

/** Process the input file and return an array of strings representing
 * each line.
 *
 * @param {string} filename - The name of the input file
 */
export function processInput(filename: string): string[] {
  const input: string = fs.readFileSync(
    path.resolve(__dirname, filename),
    'utf8'
  )
  return input.split('\n')
}

/**
 * Take in an array of strings from the processInput function and create
 * the moves array.
 * @param input - The array of strings from processInput function
 */
export function createMoves(input: string[]): [number, number, number][] {
  let moves: [number, number, number][] = []
  for (const s of input) {
    if (s.split(' ').includes('move')) {
      moves.push(
        s
          .split(' ')
          .slice(1)
          .filter(val => val !== 'from')
          .filter(val => val !== 'to')
          .map(val => parseInt(val, 10)) as [number, number, number]
      )
    }
  }
  return moves
}

/**
 * Take in an array of strings from the processInput function and create
 * the initial stacks array
 * @param originalInput - The array of strings from processInput function
 */
export function createStacks(originalInput: string[]): StacksItem {
  let input: string[] = []
  let stacks: StacksItem = {}

  // Remove the moves section and blank line from array
  for (const [, s] of originalInput.entries()) {
    if (!s.split(' ').includes('move') && s !== '') {
      input.push(s)
    }
  }

  // Process stack labels
  for (const i of input[input.length - 1]
    .split(' ')
    .filter(val => val !== '')) {
    stacks[i] = []
  }
  input.pop() // remove label row

  // Process Containers
  const labelPositions: number[] = [1, 5, 9, 13, 17, 21, 25, 29, 33]
  let numberOfStacks = input[input.length - 1].split('[').length - 1
  let numberOfRows = input.length
  input.reverse() // deal with bottom row first
  // console.log('input: ', input)
  for (let r = 1; r <= numberOfRows; r++) {
    // console.log('Row # ', r)
    // let row = input[r - 1].split('')
    // console.log('row: ', row)
    for (let s = 1; s <= numberOfStacks; s++) {
      // console.log('Stack # ', s)
      const val = input[r - 1].slice(
        labelPositions[s - 1],
        labelPositions[s - 1] + 1
      )
      if (val !== ' ' && val !== '') {
        stacks[s.toString()].push(val)
      }
    }
  }
  return stacks
}

/**
 * Take in the stacks and moves arrays, perform the moves,
 * and return the final stacks array
 * @param stacks
 * @param moves
 */
export function performMoves(
  stacks: StacksItem,
  moves: [number, number, number][]
): StacksItem {
  for (const [count, from, to] of moves) {
    for (let i = 0; i < count; i++) {
      stacks[to.toString()].push(stacks[from.toString()].pop() as string)
    }
  }
  return stacks
}

/**
 * Take in the stacks and moves arrays, perform the moves except with new
 * information that the crane can move more than one container at a time.
 * @param stacks
 * @param moves
 */
export function performMoves2(
  stacks: StacksItem,
  moves: [number, number, number][]
): StacksItem {
  for (const [count, from, to] of moves) {
    stacks[to.toString()] = stacks[to.toString()].concat(
      stacks[from.toString()].splice(-count)
    )
  }
  return stacks
}

/**
 * Take in the stacks array and return a string representing the top container
 * in each stack.
 * @param stacks
 */
export function getAnswer(stacks: StacksItem): string {
  let answer: string = ''
  for (const s in stacks) {
    answer += stacks[s][stacks[s].length - 1]
  }
  return answer
}

/**
 * Main function to solve the problem
 */
export function main() {
  const input = processInput(filename)
  const moves = createMoves(input)
  const stacks = createStacks(input)
  const afterMoves = performMoves(stacks, moves)
  const result = getAnswer(afterMoves)
  console.log('Part1: ', result)

  const input2 = processInput(filename)
  const moves2 = createMoves(input2)
  const stacks2 = createStacks(input2)
  const afterMoves2 = performMoves2(stacks2, moves2)
  const result2 = getAnswer(afterMoves2)
  console.log('Part2: ', result2)
}

main()
