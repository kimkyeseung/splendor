import React from 'react'
import { Client } from 'boardgame.io/react'
import Board from '../container/BoardContainer'
import { game } from '../lib'

const Game = ({ ...props }) => {
  // const { players } = query
  const players = [1,2,3]
  console.log(props)
  // if (!players) {
  //   // router.push('/kimkyeseung')
  //   return null
  // }
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
