import React from 'react'
import { Client } from 'boardgame.io/react'
import Board from '../container/BoardContainer'
import { SocketIO } from 'boardgame.io/multiplayer'
import { game } from '../lib'

const Game = ({ players, gameId }) => {
  const Splendor = game(players)
  const SplendorGame = Client({
    game: Splendor,
    board: (props) => <Board {...props} />,
    numPlayers: players.length,
    multiplayer: SocketIO({ server: 'localhost:8000' }),
  })

  return (
    <SplendorGame />
  )
}

export default Game
