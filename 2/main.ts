const fs = require('fs')
const path = require('path')
import { GameItem, newChoiceItem, StrategyGuideItem } from './types'

const filename = 'puzzle.in'

export function processInput(filename: string): StrategyGuideItem {
  const input: string = fs.readFileSync(
    path.resolve(__dirname, filename),
    'utf8'
  )
  const arrayOfStrings: string[] = input.split('\n')
  let strategyGuide: StrategyGuideItem = {}
  for (let i = 0; i < arrayOfStrings.length; i++) {
    strategyGuide[i.toString()] = {
      mine: arrayOfStrings[i].charAt(2).toString(),
      theirs: arrayOfStrings[i].charAt(0).toString(),
    }
  }
  return strategyGuide
}

export function getGameScore(game: GameItem): number {
  const win = 6
  const draw = 3
  const loss = 0
  const x = 1 //rock
  const y = 2 // paper
  const z = 3 // scissors
  let score = 0

  if (game.mine === 'X' && game.theirs === 'A') {
    score = x + draw
  } else if (game.mine === 'X' && game.theirs === 'B') {
    score = x + loss
  } else if (game.mine === 'X' && game.theirs === 'C') {
    score = x + win
  } else if (game.mine === 'Y' && game.theirs === 'A') {
    score = y + win
  } else if (game.mine === 'Y' && game.theirs === 'B') {
    score = y + draw
  } else if (game.mine === 'Y' && game.theirs === 'C') {
    score = y + loss
  } else if (game.mine === 'Z' && game.theirs === 'A') {
    score = z + loss
  } else if (game.mine === 'Z' && game.theirs === 'B') {
    score = z + win
  } else if (game.mine === 'Z' && game.theirs === 'C') {
    score = z + draw
  }
  return score
}

export function getMatchScore(strategyGuide: StrategyGuideItem): number {
  const keys = Object.keys(strategyGuide)
  let total = 0
  for (let key in keys) {
    total += getGameScore(strategyGuide[key])
  }
  return total
}

export function createNewStrategyGuide(
  strategyGuide: StrategyGuideItem
): StrategyGuideItem {
  const newChoice: newChoiceItem = {
    X: {
      // lose
      A: 'Z',
      B: 'X',
      C: 'Y',
    },
    Y: {
      // draw
      A: 'X',
      B: 'Y',
      C: 'Z',
    },
    Z: {
      // win
      A: 'Y',
      B: 'Z',
      C: 'X',
    },
  }
  const keys = Object.keys(strategyGuide)
  let newStrategyGuide: StrategyGuideItem = {}
  for (let key in keys) {
    newStrategyGuide[key] = {
      mine: newChoice[strategyGuide[key].mine][strategyGuide[key].theirs],
      theirs: strategyGuide[key].theirs,
    }
  }
  return newStrategyGuide
}

console.log('Initial Match Score: ', getMatchScore(processInput(filename)))
console.log(
  'New Match Score: ',
  getMatchScore(createNewStrategyGuide(processInput(filename)))
)
