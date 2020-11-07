import DEVELOPMENT_CARDS from '../assets/developmentCards.json'
import NOBLES from '../assets/nobles.json'

import {
  emptyHand, getDevelopmentValues
} from './utils'

describe('개별 기능 작동 검사', () => {
  const G = {}
  const initialValues = {
    red: 0, green: 0, blue: 0, white: 0, black: 0
  }
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
    G.fields[currentPlayer].hand = {
      tokens: [],
      development: null
    }
    G.tokenStore = {
      green: 0, white: 0, black: 0,
      blue: 0, red: 0, yellow: 5
    }

    it('손에 가지고 있는 토큰이 없어야 한다.', () => {
      G.fields[currentPlayer].hand.tokens.push('white')
      G.fields[currentPlayer].hand.tokens.push('green')
      G.fields[currentPlayer].hand.tokens.push('blue')
      emptyHand(G, ctx)

      expect(G.fields[currentPlayer].hand.tokens).toHaveLength(0)
    })

    it('손에 가지고 있는 개발카드가 없어야 한다.', () => {
      G.fields[currentPlayer].hand.development = { name: "127R" }
      emptyHand(G, ctx)

      expect(G.fields[currentPlayer].hand.development).toBeNull()
    })
  })
})