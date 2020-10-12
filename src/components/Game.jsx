import React from 'react'
import { Client } from 'boardgame.io/react'
import Board from '../container/BoardContainer'
import { SocketIO } from 'boardgame.io/multiplayer'
import { game } from '../lib'
import qs from 'query-string'

const GameClient = ({ players, playerId, props }) => {
  const gameId = props.match.params.id
  console.log({ gameId })

  const Splendor = game(players.length)
  const SplendorGame = Client({
    game: Splendor,
    board: props => <Board {...props} />,
    multiplayer: SocketIO({ server: 'localhost:8000' }),
  })
  

  return (
    <SplendorGame playerID={playerId}
      gameID={this.state.id}
      players={this.state.joined}
      playerID={String(this.state.myID)}
      credentials={this.state.userAuthToken} />
  )
}

// const Game = ({ gameId, players, playerId, location }) => {

//   return (
//     <GameClient playerId={playerId} players={players}/>
//   )
// }

export default GameClient
