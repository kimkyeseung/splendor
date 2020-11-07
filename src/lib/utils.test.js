import DEVELOPMENT_CARDS from '../assets/developmentCards.json'
import NOBLES from '../assets/nobles.json'

import {
  emptyHand
} from './utils'

describe('테스트가 실행은 되는지..', () => {
  function clickCell(G, ctx, id) {
    G.cells[id] = ctx.currentPlayer
  }

  it('should place the correct value in the cell', () => {
    // original state.
    const G = {
      cells: [null, null, null, null, null, null, null, null, null],
    }

    // make move.
    clickCell(G, { currentPlayer: '1' }, 3)

    // verify new state.
    expect(G).toEqual({
      cells: [null, null, null, '1', null, null, null, null, null],
    })
  })
})