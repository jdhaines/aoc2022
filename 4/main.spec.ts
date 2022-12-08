import {
  processInput,
  shorterItemFirst,
  sumCompleteOverlaps,
  sumPartialOverlaps,
} from './main'
import { test, expect, describe } from 'vitest'

const filename = 'test.in'

describe('Check Day 4 Functions', () => {
  test('Verify Input File Parsed with Dashes', () => {
    expect(processInput(filename)).toEqual({
      0: {
        first: '2-4',
        second: '6-8',
      },
      1: {
        first: '2-3',
        second: '4-5',
      },
      2: {
        first: '5-7',
        second: '7-9',
      },
      3: {
        first: '2-8',
        second: '3-7',
      },
      4: {
        first: '6-6',
        second: '4-6',
      },
      5: {
        first: '2-6',
        second: '4-8',
      },
      6: {
        first: '22-34',
        second: '23-24',
      },
      7: {
        first: '7-52',
        second: '7-8',
      },
    })
  })

  test('Verify Items in the right order', () => {
    expect(shorterItemFirst(processInput(filename))).toEqual({
      0: {
        first: '2-4',
        second: '6-8',
      },
      1: {
        first: '2-3',
        second: '4-5',
      },
      2: {
        first: '5-7',
        second: '7-9',
      },
      3: {
        first: '3-7',
        second: '2-8',
      },
      4: {
        first: '6-6',
        second: '4-6',
      },
      5: {
        first: '2-6',
        second: '4-8',
      },
      6: {
        first: '23-24',
        second: '22-34',
      },
      7: {
        first: '7-8',
        second: '7-52',
      },
    })
  })

  test('Verify Sum of Complete Overlaps', () => {
    expect(sumCompleteOverlaps(shorterItemFirst(processInput(filename)))).toBe(
      4
    )
  })

  test('Verify Sum of Partial Overlaps', () => {
    expect(sumPartialOverlaps(shorterItemFirst(processInput(filename)))).toBe(6)
  })
})
