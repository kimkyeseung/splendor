import DEVELOPMENT_CARDS from '../assets/developmentCards.json'
import NOBLES from '../assets/nobles.json'
import { HIDDEN_DEVELOPMENT_CARD } from '../assets'
import {
  getTokenValidator,
  buyDevelopmentValidator,
} from './validator'
import { INVALID_MOVE } from 'boardgame.io/core'
import {
  getWinner, emptyHand,
  holdDevelopment, drawDevelopment, deselectDevelopment,
  reserveDevelopment, gainDevelopment,
  gainTokensFromHand,
  restoreTokenStore, holdToken, payDevelopmentPrice,
  gainTokenFromStore, loseTokenToStore,
  getDevelopmentValues
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

const game = () => {
  const Splendor = {
    name: 'splendor',

    setup: ({ numPlayers, random, ...ctx }, setupData) => {
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
          developments: [],
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
      }
    },

    moves: {
    },

    // 덱에 남은 카드의 순서/정체는 어떤 플레이어에게도 공개되지 않아야 하는
    // 비공개 정보이므로, 서버가 각 클라이언트에 보내는 상태에서 실제 카드
    // id 대신 길이만 유지한 뒷면 placeholder로 치환한다. (실제 게임 로직이
    // 사용하는 G는 이 필터를 거치지 않은 원본이므로 서버 쪽 동작에는 영향 없음)
    playerView: G => ({
      ...G,
      developOneDeck: G.developOneDeck.map(() => HIDDEN_DEVELOPMENT_CARD),
      developTwoDeck: G.developTwoDeck.map(() => HIDDEN_DEVELOPMENT_CARD),
      developThreeDeck: G.developThreeDeck.map(() => HIDDEN_DEVELOPMENT_CARD),
    }),

    turn: {
      onBegin: (G, ctx) => {
        console.log('onBegin')
        const { fields } = G
        const currentPlayer = fields[ctx.currentPlayer]
        currentPlayer.done = false
        ctx.events.setActivePlayers({
          currentPlayer: 'basic',
          others: 'watch'
        })
      },

      onMove: (G, ctx) => {
        console.log('onMove')
        const { fields, nobleTiles } = G
        const currentPlayer = fields[ctx.currentPlayer]
        const { hand, done } = currentPlayer

        if (done) {
          const developmentValues = getDevelopmentValues(G, ctx)
          const gettableNobles = nobleTiles.filter(
            noble => Object.keys(NOBLES[noble].condition)
              .every(color => developmentValues[color] >= NOBLES[noble].condition[color])
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
        basic: {
          moves: {
            selectDevelopment(G, ctx, type, dev, meta = {}) {
              const { board } = G

              deselectDevelopment(G, ctx)
              const { index, grade } = meta

              if (type === 'deck') {
                // 덱의 실제 순서는 클라이언트에 공개되지 않으므로(playerView),
                // 클라이언트가 보낸 dev 값을 신뢰하지 않고 서버가 직접 뽑은 카드를 사용한다.
                const drawnDevelopment = drawDevelopment(G, grade)
                holdDevelopment(G, ctx, type, { ...meta, name: drawnDevelopment })
                return
              }

              holdDevelopment(G, ctx, type, { ...meta, name: dev })
              if (type === 'board') {
                board[`dev${grade}${index}`] = null
              }
            },

            deselectDevelopment(G, ctx) {
              deselectDevelopment(G, ctx)
            },

            buyDevelopment(G, ctx) {
              const { fields } = G
              const currentPlayer = fields[ctx.currentPlayer]
              const { hand } = currentPlayer

              if (hand.development) {
                const buyable = buyDevelopmentValidator(G, ctx)

                if (buyable) {
                  payDevelopmentPrice(G, ctx)
                  gainDevelopment(G, ctx)
                  currentPlayer.done = true
                } else {
                  if (typeof window === 'object') {
                    window.alert('비용이 모자랍니다.')
                  }
                  return INVALID_MOVE
                }
              }
            },

            reserveDevelopment(G, ctx) {
              const { fields } = G
              const currentPlayer = fields[ctx.currentPlayer]
              const { reservedDevs, tokenAssets, hand } = currentPlayer

              if (hand.development && reservedDevs.length < DEFAULT_SETTING.playerReserveDevelopmentLimit) {
                gainTokenFromStore(G, ctx, 'yellow')
                reserveDevelopment(G, ctx)

                const tokenCount = Object.values(tokenAssets).reduce((count, token) => count + token)
                if (tokenCount > tokenLimit) {
                  G.tokenOverloaded = tokenCount - tokenLimit
                  ctx.events.setStage('returnTokens')
                } else {
                  currentPlayer.done = true
                }
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
            },

            watchSomething(G, ctx, target) {
              console.log('watching', target)
              const { fields } = G
            }
          }
        },
        watch: {
          moves: {
            watchSomething(G, ctx, target) {
              console.log('watching', target)
              const { fields } = G
            }
          }
        },
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
