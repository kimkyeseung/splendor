import React from 'react'
import { Client } from 'boardgame.io/react'
import Board from 'containers/BoardContainer'
import game from 'game'

const Game = ({ players = [0, 1] }) => {
  const Splendor = game()
  const SplendorGame = Client({
    game: Splendor,
    board: (props) => <Board {...props} players={players.map((p, i) => ({ id: i, name: p }))} />,
    numPlayers: players.length
  })

  return (
    <SplendorGame />
  )
}

export default Game
