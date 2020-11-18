import React from 'react'
import { Client } from 'boardgame.io/react'
import Board from 'containers/BoardContainer'
import game from 'game'

const Game = ({ players, history }) => {
  const Splendor = game()
  const SplendorGame = Client({
    game: Splendor,
    board: (props) => <Board {...props} players={players.map((p, i) => ({ id: i, name: p }))} history={history} />,
    numPlayers: players.length
  })

  return (
    <SplendorGame />
  )
}

export default Game
