import {
  createMoves,
  createStacks,
  getAnswer,
  performMoves,
  performMoves2,
  processInput,
} from './main'
import { test, expect, describe } from 'vitest'

const filename = 'test.in'

describe('Check Day 5 Functions', () => {
  test('Verify base input file processing', () => {
    expect(processInput(filename)).toEqual([
      '    [D]',
      '[N] [C]',
      '[Z] [M] [P]',
      ' 1   2   3',
      '',
      'move 1 from 2 to 1',
      'move 3 from 1 to 3',
      'move 2 from 2 to 1',
      'move 1 from 1 to 2',
    ])
  })

  test('Verify moves processing', () => {
    expect(createMoves(processInput(filename))).toEqual([
      [1, 2, 1],
      [3, 1, 3],
      [2, 2, 1],
      [1, 1, 2],
    ])
  })

  test('Verify stacks processing', () => {
    expect(createStacks(processInput(filename))).toEqual({
      '1': ['Z', 'N'],
      '2': ['M', 'C', 'D'],
      '3': ['P'],
    })
  })

  test('Verify Moves Produce Correct Output', () => {
    expect(
      performMoves(
        createStacks(processInput(filename)),
        createMoves(processInput(filename))
      )
    ).toEqual({
      '1': ['C'],
      '2': ['M'],
      '3': ['P', 'D', 'N', 'Z'],
    })
  })

  test('Verify Part 2 Moves Produce Correct Output', () => {
    expect(
      performMoves2(
        createStacks(processInput(filename)),
        createMoves(processInput(filename))
      )
    ).toEqual({
      '1': ['M'],
      '2': ['C'],
      '3': ['P', 'Z', 'N', 'D'],
    })
  })

  test('Verify Part 1 Answer', () => {
    expect(
      getAnswer(
        performMoves(
          createStacks(processInput(filename)),
          createMoves(processInput(filename))
        )
      )
    ).toEqual('CMZ')
  })

  test('Verify Part 2 Answer', () => {
    expect(
      getAnswer(
        performMoves2(
          createStacks(processInput(filename)),
          createMoves(processInput(filename))
        )
      )
    ).toEqual('MCD')
  })
})
