import { Server } from 'boardgame.io/server'
import game from './lib/game'

const server = Server({ games: [game(4)] })

server.run(8000)
