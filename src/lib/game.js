import DEVELOPMENT_CARDS from '../assets/developmentCards.json'
import NOBLES from '../assets/nobles.json'
import {
  getTokenValidator,
  tokenLimitValidator,
  buyDevelopmentValidator,
  reserveDevelopmentValidator
} from './validator'
import { INVALID_MOVE } from 'boardgame.io/core'
import {
  getLackAmount, getWinner, emptyHand,
  holdDevelopment, drawOne, gainTokensFromHand,
  restoreTokenStore, holdToken,
  gainTokenFromStore, loseTokenToStore
} from '../lib/utils'
import { DEFAULT_SETTING } from './config'

const developCards = Object.keys(DEVELOPMENT_CARDS).reduce((cards, cardId) => {
  const { grade, id } = DEVELOPMENT_CARDS[cardId]
  switch (grade) {
    case 1:
      cards.gradeOne.push(id)
      break
    case 2:
      cards.gradeTwo.push(id)
      break
    case 3:
      cards.gradeThree.push(id)
      break
    default:
  }
  return cards
}, { gradeOne: [], gradeTwo: [], gradeThree: [] })

const tokenLimit = DEFAULT_SETTING.playerTokenLimit

const game = (playerNames) => {
  const Splendor = {
    name: 'splendor',

    setup: ({ numPlayers, random, ...G }) => {
      const developOneDeck = random.Shuffle(developCards.gradeOne)
      const developTwoDeck = random.Shuffle(developCards.gradeTwo)
      const developThreeDeck = random.Shuffle(developCards.gradeThree)

      const board = {}
      board.dev10 = developOneDeck.pop()
      board.dev11 = developOneDeck.pop()
      board.dev12 = developOneDeck.pop()
      board.dev13 = developOneDeck.pop()

      board.dev20 = developTwoDeck.pop()
      board.dev21 = developTwoDeck.pop()
      board.dev22 = developTwoDeck.pop()
      board.dev23 = developTwoDeck.pop()

      board.dev30 = developThreeDeck.pop()
      board.dev31 = developThreeDeck.pop()
      board.dev32 = developThreeDeck.pop()
      board.dev33 = developThreeDeck.pop()

      const tokenStore = {}
      const initialTokenCount = numPlayers * 2 - 1 + (numPlayers === 2 ? 1 : 0)
      tokenStore.red
        = tokenStore.blue
        = tokenStore.black
        = tokenStore.white
        = tokenStore.green
        = initialTokenCount
      tokenStore.yellow = 5

      const fields = {}
      const defaultValues = { white: 0, red: 0, blue: 0, green: 0, black: 0, yellow: 0 }
      Array(numPlayers).fill(1).forEach((a, i) => {
        fields[i] = {
          name: playerNames[i] || i,
          developments: { ...defaultValues },
          tokenAssets: { ...defaultValues },
          reservedDevs: [],
          nobles: [],
          hand: {
            tokens: [],
            development: null,
            gettableNobles: []
          },
          victoryPoints: 0,
          done: true
        }
      })

      const nobleLimit = numPlayers + 1
      const nobleTiles = random.Shuffle(Object.keys(NOBLES)).slice(0, nobleLimit)

      return {
        fields,
        board,
        tokenStore,
        developOneDeck,
        developTwoDeck,
        developThreeDeck,
        nobleTiles,
        tokenOverloaded: 0,
        focusedDevelopment: {}
      }
    },

    moves: {
      selectDevelopment(G, ctx, dev, { grade, index }) {
        const { board } = G

        holdDevelopment(G, ctx, dev)
        G.targetDevelopment = { grade, index }
        if (index >= 0) {
          board[`dev${grade}${index}`] = null
        } else {
          drawOne(G, grade)
        }
      },

      deselectDevelopment(G, ctx) {
        const {
          fields,
          board,
          targetDevelopment,
          developOneDeck,
          developTwoDeck,
          developThreeDeck
        } = G
        const { hand } = fields[ctx.currentPlayer]

        if (!hand.development || !targetDevelopment) {
          return
        }

        const { grade, index } = targetDevelopment
        if (index >= 0) {
          board[`dev${grade}${index}`] = hand.development
        } else {
          const deck = {
            '1': developOneDeck,
            '2': developTwoDeck,
            '3': developThreeDeck
          }
          deck[grade].push(hand.development)
        }

        emptyHand(G, ctx)
        G.targetDevelopment = null
      },

      buyDevelopment(G, ctx) {
        const {
          fields,
          board,
          tokenStore,
          targetDevelopment
        } = G
        const currentPlayer = fields[ctx.currentPlayer]
        const { developments, tokenAssets, hand } = currentPlayer

        const { value, valueAmount, victoryPoint, cost } = DEVELOPMENT_CARDS[hand.development]

        const lackAmount = getLackAmount({ developments, token: tokenAssets }, cost)
        const buyable = tokenAssets.yellow >= lackAmount

        if (buyable) {
          const lack = Object.keys(tokenAssets).reduce((diff, color) => {
            const individualCost = cost[color] || 0
            const discountedIndividualCost = individualCost > developments[color] ? individualCost - developments[color] : 0
            if (discountedIndividualCost > tokenAssets[color]) {
              const toPay = discountedIndividualCost - tokenAssets[color]
              const payable = tokenAssets[color]
              diff += (toPay - payable)
              tokenAssets[color] -= payable
              tokenStore[color] += payable
            } else {
              tokenAssets[color] -= discountedIndividualCost
              tokenStore[color] += discountedIndividualCost
            }

            return diff
          }, 0)
          tokenAssets.yellow -= lack
          tokenStore.yellow += lack

          developments[value] += valueAmount
          currentPlayer.victoryPoints += victoryPoint

          const { grade, index } = targetDevelopment
          board[`dev${grade}${index}`] = drawOne(G, grade)
          G.targetDevelopment = null
          hand.development = null

          currentPlayer.done = true
        } else {
          if (typeof window === 'object') {
            window.alert('비용이 모자랍니다.')
          }
          return INVALID_MOVE
        }
      },

      reserveDevelopment(G, ctx) {
        const {
          fields,
          board,
          tokenStore,
          targetDevelopment
        } = G
        const currentPlayer = fields[ctx.currentPlayer]
        const { reservedDevs, tokenAssets, hand } = currentPlayer

        const able = reserveDevelopmentValidator(reservedDevs)
        if (able) {
          gainTokenFromStore(G, ctx, 'yellow')
          reservedDevs.push(DEVELOPMENT_CARDS[hand.development].id)

          const { grade, index } = targetDevelopment
          if (index >= 0) {
            board[`dev${grade}${index}`] = drawOne(G, grade)
          }
          hand.development = null

          const tokenCount = Object.values(tokenAssets).reduce((count, token) => count + token)
          if (tokenCount > tokenLimit) {
            ctx.events.setStage('returnTokens')
            G.tokenOverloaded = tokenCount - tokenLimit
          } else {
            currentPlayer.done = true
          }
        } else {
          return INVALID_MOVE
        }
      },

      selectToken(G, ctx, token) {
        holdToken(G, ctx, token)
      },

      deselectToken(G, ctx, index) {
        const { fields } = G
        const { hand } = fields[ctx.currentPlayer]
        const [token] = hand.tokens.splice(index, 1)

        restoreTokenStore(G, token)
      },

      cancelSelectedToken(G, ctx) {
        emptyHand(G, ctx)
      },

      getTokens(G, ctx) {
        const { tokenStore, fields } = G
        const currentPlayer = fields[ctx.currentPlayer]
        const { hand, tokenAssets } = currentPlayer
        if (!getTokenValidator(hand.tokens, tokenStore)) {
          return INVALID_MOVE
        }

        gainTokensFromHand(G, ctx)

        const tokenCount = Object.values(tokenAssets).reduce((count, token) => count + token)
        if (tokenCount > tokenLimit) {
          G.tokenOverloaded = tokenCount - tokenLimit
          ctx.events.setStage('returnTokens')
        } else {
          currentPlayer.done = true
        }
      }
    },

    turn: {
      onBegin: (G, ctx) => {
        console.log('onBegin')
        const { fields } = G
        const currentPlayer = fields[ctx.currentPlayer]
        currentPlayer.done = false
      },

      onMove: (G, ctx) => {
        console.log('onMove')
        const { fields, nobleTiles } = G
        const currentPlayer = fields[ctx.currentPlayer]
        const { developments, hand, done } = currentPlayer

        if (done) {
          const gettableNobles = nobleTiles.filter(
            noble => Object.keys(NOBLES[noble].condition)
              .every(color => developments[color] >= NOBLES[noble].condition[color])
          )
  
          G.isFinal = G.isFinal || Object.keys(fields).some(
            player => fields[player].victoryPoints >= DEFAULT_SETTING.victoryPointGoal
          )
  
          if (gettableNobles.length) {
            hand.gettableNobles = gettableNobles
            ctx.events.setStage('getNoble')
          } else if (hand.tokens.length !== 0 || hand.development) {
            console.log('still hand')
          } else {
  
            G.isFinal && ctx.playOrderPos === ctx.playOrder.length - 1
              ? ctx.events.endGame(getWinner(G))
              : ctx.events.endTurn()
          }
        }
      },
      stages: {
        returnTokens: {
          moves: {
            returnTokens(G, ctx, token) {
              const { fields } = G
              const { tokenAssets } = fields[ctx.currentPlayer]
              loseTokenToStore(G, ctx, token)
              G.tokenOverloaded--
              const tokenCount = Object.values(tokenAssets).reduce((a, t) => a + t)
              if (tokenCount <= tokenLimit && G.tokenOverloaded === 0) {
                ctx.events.endTurn()
              }
            }
          }
        },
        getNoble: {
          moves: {
            selectGetNoble(G, ctx, noble) {
              const { fields, nobleTiles } = G
              const currentPlayer = fields[ctx.currentPlayer]
              const { hand, nobles } = currentPlayer
              nobles.push(noble)
              hand.gettableNobles = []
              const targetIndex = nobleTiles.findIndex(n => n === noble)
              nobleTiles.splice(targetIndex, 1)
              currentPlayer.victoryPoints += NOBLES[noble].victoryPoint

              ctx.events.endTurn()
            }
          }
        }
      }
    },

    ai: {
      enumerate: G => {
        let moves = [];
        for (let i = 0; i < 9; i++) {
          if (G.cells[i] === null) {
            moves.push({ move: "clickCell", args: [i] })
          }
        }
        return moves
      }
    }
  }
  
  return Splendor
}

export default game
