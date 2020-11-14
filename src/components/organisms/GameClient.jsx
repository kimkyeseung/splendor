import React from 'react'
import { Client } from 'boardgame.io/react'
import Board from '../container/BoardContainer'
import { SocketIO } from 'boardgame.io/multiplayer'
import { game } from '../lib'

const GameClient = () => {
  const Splendor = game(2)
  const SplendorGame = Client({
    game: Splendor,
    board: props => <Board {...props} />,
    multiplayer: SocketIO({ server: 'localhost:8000' }),
  })

  const playerId = new Date().getTime().toString(36)

  return (
    <SplendorGame playerID={playerId} />
  )
}

export default GameClient
