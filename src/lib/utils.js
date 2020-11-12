import DEVELOPMENT_CARDS from '../assets/developmentCards.json'
import NOBLES from '../assets/nobles.json'

export const emptyHand = (G, ctx) => {
  const { board, fields, tokenStore } = G
  const { hand } = fields[ctx.currentPlayer]

  if (hand.development) {
    const { grade, index } = hand.development
    if (index >= 0 && !board[`dev${grade}${index}`]) {
      board[`dev${grade}${index}`] = drawDevelopment(G, grade)
    } else if (index === -1) {

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

    const devCount = Object.values(getDevelopmentValues(G, { currentPlayer: player })).reduce(
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

export const gainDevelopment = (G, ctx) => {
  const { fields } = G
  const { hand, developments } = fields[ctx.currentPlayer]

  if (hand.development) {
    developments.push(hand.development.name)
  }
  emptyHand(G, ctx)
}

export const deselectDevelopment = (G, ctx) => {
  const {
    fields,
    board,
    developOneDeck,
    developTwoDeck,
    developThreeDeck
  } = G
  const { hand } = fields[ctx.currentPlayer]

  if (hand.development) {
    const { name, grade, index } = hand.development

    if (index >= 0) {
      board[`dev${grade}${index}`] = name
    } else {
      const deck = {
        '1': developOneDeck,
        '2': developTwoDeck,
        '3': developThreeDeck
      }
      deck[grade].push(name)
    }

    emptyHand(G, ctx)
  }
}

export const payToken = (G, ctx, token, amount = 1) => {
  const { tokenStore, fields } = G
  const { tokenAssets } = fields[ctx.currentPlayer]
  if (tokenAssets[token] && tokenAssets[token] >= amount) {
    tokenStore[token] += amount
    tokenAssets[token] -= amount
  }
}

export const payDevelopmentPrice = (G, ctx) => {
  const { fields } = G
  const { tokenAssets, hand } = fields[ctx.currentPlayer]
  const { cost } = DEVELOPMENT_CARDS[hand.development.name]
  const developmentsValues = getDevelopmentValues(G, ctx)

  const lack = Object.keys(tokenAssets).reduce((diff, value) => {
    const individualCost = cost[value] || 0
    const discountedIndividualCost = (developmentsValues && developmentsValues[value] || 0) > individualCost
      ? 0
      : individualCost - developmentsValues[value] || 0

    if (discountedIndividualCost > tokenAssets[value]) {
      diff += discountedIndividualCost - tokenAssets[value]

      payToken(G, ctx, value, Math.min(discountedIndividualCost, tokenAssets[value]))
    } else {
      payToken(G, ctx, value, discountedIndividualCost)
    }

    return diff
  }, 0)

  payToken(G, ctx, 'yellow', lack)
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

export const getVictoryPoints = (G, ctx) => {
  const { fields } = G
  const { developments, nobles } = fields[ctx.currentPlayer]

  const devScore = developments.reduce(
    (victoryPoint, dev) => victoryPoint + DEVELOPMENT_CARDS[dev].victoryPoint, 0
  )
  const nobleScore = nobles.reduce(
    (victoryPoint, noble) => victoryPoint + NOBLES[noble].victoryPoint, 0
  )

  return devScore + nobleScore
}

export const getDevelopmentValues = (G, ctx) => {
  const { fields } = G
  const { developments } = fields[ctx.currentPlayer]

  const values = {}
  values.red = 0
  values.green = 0
  values.blue = 0
  values.black = 0
  values.white = 0

  developments.forEach(dev => {
    const { value, valueAmount } = DEVELOPMENT_CARDS[dev]

    values[value] += valueAmount
  })

  return values
}