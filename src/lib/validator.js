import DEVELOPMENT_CARDS from '../assets/developmentCards.json'
import { getDevelopmentValues } from './utils'

export const getTokenValidator = (tokens = [], tokenStore) => {
  switch (tokens.length) {
    case 2: {
      const [token1, token2] = tokens
      return token1 === token2 && tokenStore[token1] >= 2
    }
    case 3: {
      const [token1, token2, token3] = tokens
      return (token1 !== token2) && (token1 !== token3) && (token2 !== token3)
    }
    default:
      return false
  }
}

export const tokenLimitValidator = (token = {}) => {
  const limit = 10
  const total = Object.values(token).reduce((a, t) => a + t)

  return total <= limit
}

export const buyDevelopmentValidator = (G, ctx) => {
  const { fields } = G
  const { tokenAssets, hand } = fields[ctx.currentPlayer]
  const developmentValues = getDevelopmentValues(G, ctx)
  const total = {}

  Object.keys(developmentValues).forEach(color => {
    total[color] = developmentValues[color] + tokenAssets[color]
  })
  const { cost } = DEVELOPMENT_CARDS[hand.development.name]
  const lack = Object.keys(cost)
    .reduce((diffAmount, color) => cost[color] > total[color]
      ? diffAmount + (cost[color] - total[color])
      : diffAmount, 0)

  return tokenAssets.yellow >= lack
}

export const reserveDevelopmentValidator = (reserved = []) => reserved.length < 3
