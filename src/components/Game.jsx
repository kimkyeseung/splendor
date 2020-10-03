import React from 'react'
import { Client } from 'boardgame.io/react'
import Board from '../container/BoardContainer'
import { game } from '../lib'

const Game = ({ players, gameId, ...props }) => {
  const Splendor = game(players)
  const SplendorGame = Client({
    game: Splendor,
    board: (props) => <Board {...props} />,
    numPlayers: players.length
  })

  return (
    <SplendorGame />
  )
}

export default Game
