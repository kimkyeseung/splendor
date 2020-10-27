import DEVELOPMENT_CARDS from '../assets/developmentCards.json'
import NOBLES from '../assets/nobles.json'
import {
  getTokenValidator,
  tokenLimitValidator,
  buyDevelopmentValidator,
  reserveDevelopmentValidator
} from './validator'
import { INVALID_MOVE } from 'boardgame.io/core'
import { takeTokens, returnTokens, getLackAmount, getWinner } from '../lib/utils'

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

const game = (playerNames) => {
  const Splendor = {
    name: "splendor",

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
      const tokenCount = numPlayers * 2 - 1 + (numPlayers === 2 ? 1 : 0)
      tokenStore.red
        = tokenStore.blue
        = tokenStore.black
        = tokenStore.white
        = tokenStore.green
        = tokenCount
      tokenStore.yellow = 5

      const fields = {}
      const defaultValues = { white: 0, red: 0, blue: 0, green: 0, black: 0, yellow: 0 }
      Array(numPlayers).fill(1).forEach((a, i) => {
        fields[i] = {
          name: playerNames[i],
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
      selectDevelopment(G, ctx, dev, position) {
        const {
          fields,
          board,
          targetDevelopment,
          developOneDeck,
          developTwoDeck,
          developThreeDeck
        } = G
        const { hand } = fields[ctx.currentPlayer]
        if (hand.development) {
          const { development } = DEVELOPMENT_CARDS[hand.development]
          const { grade, index } = targetDevelopment
          board[`dev${grade}${index}`] = development
        }
        hand.development = dev
        const { grade, index } = position
        G.targetDevelopment = position
        if (index >= 0) {
          board[`dev${grade}${index}`] = null
        } else {
          const deck = {
            '1': developOneDeck,
            '2': developTwoDeck,
            '3': developThreeDeck
          }
          deck[grade].pop()
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
        G.targetDevelopment = null
        hand.development = null
      },

      buyDevelopment(G, ctx) {
        const {
          fields,
          developOneDeck,
          developTwoDeck,
          developThreeDeck,
          board,
          tokenStore,
          nobleTiles,
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

          const deck = {
            '1': developOneDeck,
            '2': developTwoDeck,
            '3': developThreeDeck
          }
          const { grade, index } = targetDevelopment
          board[`dev${grade}${index}`] = deck[grade].pop()
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
          developOneDeck,
          developTwoDeck,
          developThreeDeck,
          board,
          tokenStore,
          targetDevelopment
        } = G
        const currentPlayer = fields[ctx.currentPlayer]
        const { reservedDevs, tokenAssets, hand } = currentPlayer

        const able = reserveDevelopmentValidator(reservedDevs)
        if (able) {
          if (tokenStore.yellow) {
            tokenStore.yellow--
            tokenAssets.yellow++
          }
          reservedDevs.push(DEVELOPMENT_CARDS[hand.development].id)

          const { grade, index } = targetDevelopment
          if (index >= 0) {
            const deck = {
              '1': developOneDeck,
              '2': developTwoDeck,
              '3': developThreeDeck
            }
            board[`dev${grade}${index}`] = deck[grade].pop()
          }
          hand.development = null

          const tokenLimit = 10
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
        const { tokenStore, fields } = G
        const { hand } = fields[ctx.currentPlayer]
        if (tokenStore[token]) {
          tokenStore[token]--
          hand.tokens.push(token)
        }
      },

      deselectToken(G, ctx, index, cb = () => { }) {
        const { tokenStore, fields } = G
        const { hand } = fields[ctx.currentPlayer]
        const [token] = hand.tokens.splice(index, 1)
        tokenStore[token]++
        const result = getTokenValidator(hand.tokens, tokenStore)
        cb(result)
      },

      cancelSelectedToken(G, ctx, cb = () => { }) {
        const { tokenStore, fields } = G
        const { hand } = fields[ctx.currentPlayer]
        hand.tokens.forEach(token => {
          tokenStore[token]++
        })
        hand.tokens.length = 0
        cb()
      },

      getTokens(G, ctx) {
        const { tokenStore, fields } = G
        const currentPlayer = fields[ctx.currentPlayer]
        const { hand, tokenAssets } = currentPlayer
        if (!getTokenValidator(hand.tokens, tokenStore)) {
          console.log('invalid Move yeah')
          return INVALID_MOVE
        }
        hand.tokens.forEach(token => {
          tokenAssets[token]++
        })
        hand.tokens = []

        const tokenLimit = 10
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
      // endIf: (G, ctx) => ({ next: '3' }),
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
        const { developments, tokenAssets, hand, done } = currentPlayer
        if (!done) {
          return
        }

        const gettableNobles = nobleTiles.filter(
          noble => Object.keys(NOBLES[noble].condition)
            .every(color => developments[color] >= NOBLES[noble].condition[color])
        )

        G.isFinal = G.isFinal || Object.keys(fields).some(
          player => fields[player].victoryPoints >= 15
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
      },
      stages: {
        returnTokens: {
          moves: {
            returnTokens(G, ctx, token) {
              const { fields, tokenStore } = G
              const { tokenAssets } = fields[ctx.currentPlayer]
              tokenAssets[token]--
              tokenStore[token]++
              G.tokenOverloaded--
              const tokenCount = Object.values(tokenAssets).reduce((a, t) => a + t)
              const tokenLimit = 10
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
