export const GAME_NAME = 'splendor'
export const GAME_SERVER_PORT = 8000
export const GAME_SERVER_URL = `http://localhost:${GAME_SERVER_PORT}`
export const WEB_SERVER_URL = "http://localhost:8000"
export const APP_PRODUCTION = false
export const DEFAULT_SETTING = {
  victoryPointGoal: 1, // 15
  maximumPlayerNumber: 4,
  minimumPlayerNumber: 2,
  playerTokenLimit: 10,
  playerReserveDevelopmentLimit: 3,
  playerDefaultToken: {
    "red": 0,
    "blue": 0,
    "green": 0,
    "white": 0,
    "black": 0,
    "yellow": 0
  },
  "player.defaultDevelopments": [],
  "field.tokenStoreDefaultToken": {
    "red": 0,
    "blue": 0,
    "green": 0,
    "white": 0,
    "black": 0,
    "yellow": 0
  }
}