import DEVELOPMENT_CARDS from '../assets/developmentCards.json'
import { buyDevelopmentValidator } from './validator'

describe('개발 카드 구매 유효성 검사', () => {
  const G = {}
  const initialTokenAssets = {
    red: 0, green: 0, blue: 0,
    white: 0, black: 0, yellow: 0
  }
  const currentPlayer = '1'
  it('개발카드 비용만큼 수량이 있는 경우', () => {
    const tokenAssets = {
      ...initialTokenAssets,
      black: 4
    }
    const target = {
      grade: 1,
      id: '110G',
      value: 'green',
      valueAmount: 1,
      victoryPoint: 1,
      cost: {
        black: 4
      },
      set: 'original'
    }

    G.fields = {
      [currentPlayer]: {
        developments: [],
        tokenAssets,
        hand: {
          development: {
            name: target.id
          }
        }
      }
    }
    const ctx = { currentPlayer }
    const result = buyDevelopmentValidator(G, ctx)

    expect(result).toBe(true)
  })

  it('개발카드 비용에 수량이 모자란 경우', () => {
    const tokenAssets = {
      ...initialTokenAssets,
      black: 3
    }
    const target = {
      grade: 1,
      id: '110G',
      value: 'green',
      valueAmount: 1,
      victoryPoint: 1,
      cost: {
        black: 4
      },
      set: 'original'
    }

    G.fields = {
      [currentPlayer]: {
        developments: [],
        tokenAssets,
        hand: {
          development: {
            name: target.id
          }
        }
      }
    }
    const ctx = { currentPlayer }
    const result = buyDevelopmentValidator(G, ctx)

    expect(result).toBe(false)
  })


  it('개발카드 비용에 수량이 모자라지만 할인 받은 경우', () => {
    const tokenAssets = {
      ...initialTokenAssets,
      black: 3
    }
    const target = {
      grade: 1,
      id: '110G',
      value: 'green',
      valueAmount: 1,
      victoryPoint: 1,
      cost: {
        black: 4
      },
      set: 'original'
    }

    G.fields = {
      [currentPlayer]: {
        developments: [
          Object.keys(DEVELOPMENT_CARDS).find(dev => DEVELOPMENT_CARDS[dev].value === 'black')
        ],
        tokenAssets,
        hand: {
          development: {
            name: target.id
          }
        }
      }
    }
    const ctx = { currentPlayer }
    const result = buyDevelopmentValidator(G, ctx)

    expect(result).toBe(true)
  })

  it('개발카드 비용에 수량이 모자라지만 황금토큰이 그만큼 경우', () => {
    const tokenAssets = {
      ...initialTokenAssets,
      black: 2,
      yellow: 2
    }
    const target = {
      grade: 1,
      id: '110G',
      value: 'green',
      valueAmount: 1,
      victoryPoint: 1,
      cost: {
        black: 4
      },
      set: 'original'
    }

    G.fields = {
      [currentPlayer]: {
        developments: [],
        tokenAssets,
        hand: {
          development: {
            name: target.id
          }
        }
      }
    }
    const ctx = { currentPlayer }
    const result = buyDevelopmentValidator(G, ctx)

    expect(result).toBe(true)
  })
})
