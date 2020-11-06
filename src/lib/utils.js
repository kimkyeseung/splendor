export const emptyHand = (G, ctx) => {
  const { board, fields, tokenStore } = G
  const { hand } = fields[ctx.currentPlayer]

  if (hand.development) {
    const { grade, index } = hand.development
    if (index >= 0 && !board[`dev${grade}${index}`]) {
      board[`dev${grade}${index}`] = drawDevelopment(G, grade)
    }
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

export const holdDevelopment = (G, ctx, { name, grade, index }) => {
  const { fields } = G
  const { hand } = fields[ctx.currentPlayer]

  emptyHand(G, ctx)
  hand.development = { name, grade, index }
}

export const reserveDevelopment = (G, ctx) => {
  const { fields } = G
  const { reservedDevs, hand } = fields[ctx.currentPlayer]

  if (hand.development) {
    reservedDevs.push(hand.development.name)
  }
  emptyHand(G, ctx)
}

export const drawDevelopment = (G, grade) => {
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

export const gainTokensFromHand = (G, ctx) => { // hand => asset
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

export const holdToken = (G, ctx, token) => { // store => hand
  const { tokenStore, fields } = G
  const { hand } = fields[ctx.currentPlayer]
  if (tokenStore[token]) {
    tokenStore[token]--
    hand.tokens.push(token)
  }
}

export const gainTokenFromStore = (G, ctx, token) => { // store => asset
  const { tokenStore, fields } = G
  const { tokenAssets } = fields[ctx.currentPlayer]

  if (tokenStore[token]) {
    tokenStore[token]--
    tokenAssets[token]++
  }
}

export const loseTokenToStore = (G, ctx, token) => { // asset => store
  const { tokenStore, fields } = G
  const { tokenAssets } = fields[ctx.currentPlayer]

  if (tokenAssets[token]) {
    tokenStore[token]++
    tokenAssets[token]--
  }
}