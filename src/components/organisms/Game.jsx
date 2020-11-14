import React from 'react'
import { Client } from 'boardgame.io/react'
import Board from '../../containers/BoardContainer'
import { game } from '../../lib'

const Game = ({ players, history }) => {
  const Splendor = game(players)
  const SplendorGame = Client({
    game: Splendor,
    board: (props) => <Board {...props} history={history} />,
    numPlayers: players.length
  })

  return (
    <SplendorGame />
  )
}

export default Game
