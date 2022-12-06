import {
  findBadgeItem,
  findSharedItem,
  getLetterValue,
  getPrioritySum,
  processInput,
  processInput2,
} from './main'
import { describe, expect, test } from 'vitest'

const filename = 'test.in'

describe('Check Day 3 Functions', () => {
  test('Verify Item Arrays', () => {
    expect(processInput('test.in')).toEqual([
      {
        first: 'vJrwpWtwJgWr',
        second: 'hcsFMMfFFhFp',
      },
      {
        first: 'jqHRNqRjqzjGDLGL',
        second: 'rsFMfFZSrLrFZsSL',
      },
      {
        first: 'PmmdzqPrV',
        second: 'vPwwTWBwg',
      },
      {
        first: 'wMqvLMZHhHMvwLH',
        second: 'jbvcjnnSBnvTQFn',
      },
      {
        first: 'ttgJtRGJ',
        second: 'QctTZtZT',
      },
      {
        first: 'CrZsJsPPZsGz',
        second: 'wwsLwLmpwMDw',
      },
    ])
  })

  test('Verify Shared Item', () => {
    expect(findSharedItem(processInput(filename))).toEqual([
      'p',
      'L',
      'P',
      'v',
      't',
      's',
    ])
  })

  test('Verify Letter Value', () => {
    expect(getLetterValue('p')).toBe(16)
    expect(getLetterValue('L')).toBe(38)
    expect(getLetterValue('P')).toBe(42)
    expect(getLetterValue('v')).toBe(22)
    expect(getLetterValue('t')).toBe(20)
    expect(getLetterValue('s')).toBe(19)
  })

  test('Verify Total Value', () => {
    expect(getPrioritySum(findSharedItem(processInput(filename)))).toBe(157)
  })

  test('Verify Input on Part 2', () => {
    expect(processInput2(filename)).toEqual({
      '1': [
        'PmmdzqPrVvPwwTWBwg',
        'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
        'vJrwpWtwJgWrhcsFMMfFFhFp',
      ],
      '2': [
        'CrZsJsPPZsGzwwsLwLmpwMDw',
        'ttgJtRGJQctTZtZT',
        'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
      ],
    })
  })

  test('Verify Badge Item Type', () => {
    expect(findBadgeItem(processInput2(filename))).toEqual(['r', 'Z'])
  })

  test('Verify Sum of Part 2 Badge Items', () => {
    expect(getPrioritySum(findBadgeItem(processInput2(filename)))).toEqual(70)
  })
})
