import DEVELOPMENT_CARDS from '../assets/developmentCards.json'
import NOBLES from '../assets/nobles.json'

import {
  emptyHand, getDevelopmentValues, payDevelopmentPrice
} from './utils'

describe('개별 기능 작동 검사', () => {
  const G = {}
  const initialValues = Object.freeze({
    red: 0, green: 0, blue: 0, white: 0, black: 0
  })
  const initialTokenAssets = Object.freeze({
    red: 0, green: 0, blue: 0,
    white: 0, black: 0, yellow: 0
  })
  const currentPlayer = '1'
  const ctx = { currentPlayer }

  G.fields = {
    [currentPlayer]: {}
  }

  it('getDevelopmentValues', () => {
    G.fields[currentPlayer].developments = ['101B', '109G']
    const values = getDevelopmentValues(G, ctx)
    expect(values).toEqual({
      ...initialValues,
      green: 1, blue: 1
    })
  })

  describe('emptyHand', () => {
    G.tokenStore = {
      ...initialTokenAssets,
      yellow: 5
    }

    it('손에 가지고 있는 토큰이 없어야 한다.', () => {
      G.fields[currentPlayer].hand = {
        tokens: [],
        development: null
      }
      G.fields[currentPlayer].hand.tokens.push('white')
      G.fields[currentPlayer].hand.tokens.push('green')
      G.fields[currentPlayer].hand.tokens.push('blue')
      emptyHand(G, ctx)

      expect(G.fields[currentPlayer].hand.tokens).toHaveLength(0)
    })

    it('손에 가지고 있는 개발카드가 없어야 한다.', () => {
      G.fields[currentPlayer].hand.development = { name: '127R' }
      emptyHand(G, ctx)

      expect(G.fields[currentPlayer].hand.development).toBeNull()
    })
  })

  describe('payDevelopmentPrice', () => {
    G.fields[currentPlayer].hand = {
      development: null
    }

    const setTargetDevelopment = development => {
      G.fields[currentPlayer].hand.development = {
        ...development
      }
    }
    const setTokenAssets = tokens => {
      Object.assign(G.fields[currentPlayer].tokenAssets, { ...tokens })
    }
    const setDevelopments = (...items) => {
      items.forEach(item => {
        G.fields[currentPlayer].developments.push(item)
      })
    }

    beforeEach(() => {
      G.tokenStore = { ...initialTokenAssets }
      G.fields[currentPlayer].developments = []
      G.fields[currentPlayer].tokenAssets = { ...initialTokenAssets }
      G.fields[currentPlayer].hand = {
        tokens: [],
        development: {}
      }
    })

    // it('토큰만으로 단일 비용 개발 카드 구매', () => {
    //   const target = {
    //     grade: 1,
    //     id: '110G',
    //     value: 'green',
    //     valueAmount: 1,
    //     victoryPoint: 1,
    //     cost: {
    //       black: 4
    //     },
    //     set: 'original'
    //   }

    //   setTokenAssets({ black: 5 })
    //   setTargetDevelopment({ name: target.id })

    //   payDevelopmentPrice(G, ctx)

    //   expect(G.tokenStore).toEqual({
    //     ...initialTokenAssets,
    //     black: 4
    //   })
    //   expect(G.fields[currentPlayer].tokenAssets).toEqual(initialTokenAssets)
    // })

    // it('개발 카드로 비용을 할인받아 단일 비용 개발 카드 구매', () => {
    //   const target = {
    //     grade: 1,
    //     id: '110G',
    //     value: 'green',
    //     valueAmount: 1,
    //     victoryPoint: 1,
    //     cost: {
    //       black: 4
    //     },
    //     set: 'original'
    //   }

    //   setDevelopments(Object.keys(DEVELOPMENT_CARDS).find(dev => DEVELOPMENT_CARDS[dev].value === 'black'))
    //   setTokenAssets({ black: 3 })
    //   setTargetDevelopment({ name: target.id })

    //   payDevelopmentPrice(G, ctx)

    //   expect(G.tokenStore).toEqual({
    //     ...initialTokenAssets,
    //     black: 3
    //   })
    //   expect(G.fields[currentPlayer].tokenAssets).toEqual(initialTokenAssets)
    // })

    // it('토큰만으로 복합 비용 개발 카드 구매', () => {
    //   const target = {
    //     grade: 3,
    //     id: '312K',
    //     value: 'black',
    //     valueAmount: 1,
    //     victoryPoint: 3,
    //     cost: {
    //       red: 3,
    //       green: 5,
    //       blue: 3,
    //       white: 3
    //     },
    //     set: 'original'
    //   }

    //   setTokenAssets({
    //     red: 5,
    //     green: 5,
    //     blue: 5,
    //     white: 5
    //   })
    //   setTargetDevelopment({ name: target.id })

    //   payDevelopmentPrice(G, ctx)

    //   expect(G.tokenStore).toEqual({
    //     ...initialTokenAssets,
    //     red: 3,
    //     green: 5,
    //     blue: 3,
    //     white: 3
    //   })
    //   expect(G.fields[currentPlayer].tokenAssets).toEqual({
    //     ...initialTokenAssets,
    //     red: 2, blue: 2, white: 2
    //   })
    // })

    // it('개발 카드로 비용을 할인받아 복합 비용 개발 카드 구매', () => {
    //   const target = {
    //     grade: 3,
    //     id: '312K',
    //     value: 'black',
    //     valueAmount: 1,
    //     victoryPoint: 3,
    //     cost: {
    //       red: 3,
    //       green: 5,
    //       blue: 3,
    //       white: 3
    //     },
    //     set: 'original'
    //   }

    //   setDevelopments(
    //     Object.keys(DEVELOPMENT_CARDS).find(dev => DEVELOPMENT_CARDS[dev].value === 'red'),
    //     Object.keys(DEVELOPMENT_CARDS).find(dev => DEVELOPMENT_CARDS[dev].value === 'green'),
    //     Object.keys(DEVELOPMENT_CARDS).find(dev => DEVELOPMENT_CARDS[dev].value === 'blue')
    //   )
    //   setTokenAssets({
    //     red: 2,
    //     green: 4,
    //     blue: 2,
    //     white: 3
    //   })
    //   setTargetDevelopment({ name: target.id })

    //   payDevelopmentPrice(G, ctx)

    //   expect(G.tokenStore).toEqual({
    //     ...initialTokenAssets,
    //     red: 2,
    //     green: 4,
    //     blue: 2,
    //     white: 3
    //   })
    //   expect(G.fields[currentPlayer].tokenAssets).toEqual({ ...initialTokenAssets })
    // })

    // it('토큰이 부족하지만 황금토큰 사용으로 단일 비용 개발 카드 구매', () => {
    //   const target = {
    //     grade: 1,
    //     id: '110G',
    //     value: 'green',
    //     valueAmount: 1,
    //     victoryPoint: 1,
    //     cost: {
    //       black: 4
    //     },
    //     set: 'original'
    //   }

    //   setTokenAssets({
    //     red: 4,
    //     black: 3,
    //     yellow: 1
    //   })
    //   setTargetDevelopment({
    //     name: target.id
    //   })

    //   payDevelopmentPrice(G, ctx)

    //   expect(G.tokenStore).toEqual({
    //     ...initialTokenAssets,
    //     black: 3,
    //     yellow: 1
    //   })
    //   expect(G.fields[currentPlayer].tokenAssets).toEqual(initialTokenAssets)
    // })

    it('토큰이 부족하지만 황금토큰 사용으로 복합 비용 개발 카드 구매', () => {
      const target = {
        grade: 3,
        id: '320W',
        value: 'white',
        valueAmount: 1,
        victoryPoint: 3,
        cost: {
          red: 5,
          green: 3,
          blue: 3,
          black: 3
        },
        set: 'original'
      }

      setTokenAssets({
        red: 4,
        green: 1,
        blue: 3,
        black: 3,
        white: 1,
        yellow: 3
      })
      setTargetDevelopment({
        name: target.id
      })

      payDevelopmentPrice(G, ctx)

      expect(G.tokenStore).toEqual({
        ...initialTokenAssets,
        red: 4,
        green: 1,
        blue: 3,
        black: 3,
        yellow: 3
      })
      expect(G.fields[currentPlayer].tokenAssets).toEqual(initialTokenAssets)
    })
  })
})