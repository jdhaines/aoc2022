import {
  processInput,
  getMatchScore,
  getGameScore,
  createNewStrategyGuide,
} from './main'
import { test, expect, describe } from 'vitest'

const filename = 'test.in'

describe('Check Day 2 Functions', () => {
  test('Process Strategy Guide', () => {
    expect(processInput(filename)).toEqual({
      '0': {
        theirs: 'A',
        mine: 'Y',
      },
      '1': {
        theirs: 'B',
        mine: 'X',
      },
      '2': {
        theirs: 'C',
        mine: 'Z',
      },
    })
  })

  test('Get Game Scores', () => {
    expect(getGameScore(processInput(filename)['0'])).toEqual(8)
    expect(getGameScore(processInput(filename)['1'])).toEqual(1)
    expect(getGameScore(processInput(filename)['2'])).toEqual(6)
  })

  test('Get Match Score', () => {
    expect(getMatchScore(processInput(filename))).toEqual(15)
  })

  test('Create New Strategy Guide', () => {
    expect(createNewStrategyGuide(processInput(filename))).toEqual({
      '0': {
        theirs: 'A',
        mine: 'X',
      },
      '1': {
        theirs: 'B',
        mine: 'X',
      },
      '2': {
        theirs: 'C',
        mine: 'X',
      },
    })
  })

  test('Get Match Score of New Strategy Guide', () => {
    expect(
      getMatchScore(createNewStrategyGuide(processInput(filename)))
    ).toEqual(12)
  })
})
