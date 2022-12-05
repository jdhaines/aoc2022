export interface GameItem {
  [key: string]: string
  theirs: string
  mine: string
}

export type StrategyGuideItem = {
  [key: string]: GameItem
}

export type newChoiceItem = {
  [key: string]: {
    [key: string]: string
  }
}
