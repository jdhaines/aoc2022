import { processInput, createSums } from './main'
import { test, expect, describe } from 'vitest'

const filename = 'test.in'

describe('Check Day 1 Functions', () => {
  test('should return an array of strings including new lines', () => {
    expect(processInput(filename)).toEqual([
      '1000',
      '2000',
      '3000',
      '',
      '4000',
      '',
      '5000',
      '6000',
      '',
      '7000',
      '8000',
      '9000',
      '',
      '10000',
    ])
  })

  test('should return an array of sums', () => {
    expect(createSums(processInput(filename))).toEqual([
      6000, 4000, 11000, 24000, 10000,
    ])
  })
})
