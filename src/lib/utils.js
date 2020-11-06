export const emptyHand = (G, ctx) => {
  const { fields, tokenStore } = G
  const { hand } = fields[ctx.currentPlayer]

  if (hand.development) {
    hand.development = null
  }

  if (hand.tokens.length) {
    hand.tokens.forEach(token => {
      tokenStore[token]++
    })
    hand.tokens.length = 0
  }
}

export const getLackAmount = ({ developments, token }, cost) => {
  const total = {}
  Object.keys(developments).forEach(color => {
    total[color] = developments[color] + token[color]
  })
  const lack = Object.keys(cost)
    .reduce((diffAmount, color) => cost[color] > total[color]
      ? diffAmount + (cost[color] - total[color])
      : diffAmount, 0)

  return lack
}

export const getWinner = G => {
  const { fields } = G
  let highest = 0
  const winners = Object.keys(fields).reduce((group, playerId) => {
    const { victoryPoints } = fields[playerId]
    if (victoryPoints > highest) {
      highest = victoryPoints
      group = [playerId]
    } else if (victoryPoints === highest) {
      group.push(playerId)
    }

    return group
  }, [])

  if (winners.length === 1) {
    return { winner: winners[0] }
  }
  const devCounts = winners.map(player => {
    const devCount = Object.values(fields[player].developments).reduce(
      (count, value) => count + value
    )

    return { player, count: devCount }
  })

  const [winner] = devCounts.sort((a, b) => a.count - b.count)

  return { winner }
}

export const holdDevelopment = (G, ctx, dev) => {
  const { fields } = G
  const { hand } = fields[ctx.currentPlayer]

  emptyHand(G, ctx)
  hand.development = dev
}

export const drawOne = (G, grade) => {
  const {
    developOneDeck,
    developTwoDeck,
    developThreeDeck
  } = G

  const deck = {
    '1': developOneDeck,
    '2': developTwoDeck,
    '3': developThreeDeck
  }

  return deck[grade].pop()
}

export const gainTokensFromHand = (G, ctx) => {
  const { fields } = G
  const { hand, tokenAssets } = fields[ctx.currentPlayer]

  hand.tokens.forEach(token => {
    tokenAssets[token]++
  })
  hand.tokens.length = 0
}

export const restoreTokenStore = (G, token) => {
  const { tokenStore } = G
  tokenStore[token]++
}

export const holdToken = ({ G, ctx, token}) => {
  const { tokenStore, fields } = G
  const { hand } = fields[ctx.currentPlayer]
  if (tokenStore[token]) {
    tokenStore[token]--
    hand.tokens.push(token)
  }
}