export const GAME_NAME = 'splendor'
export const GAME_SERVER_PORT = 8000
export const GAME_SERVER_URL = `http://localhost:${GAME_SERVER_PORT}`
export const WEB_SERVER_URL = 'http://localhost:8000'
export const ON_DEVELOPMENT = process.env.NODE_ENV === 'development'
export const DEFAULT_SETTING = {
  victoryPointGoal: 15,
  maximumPlayerNumber: 4,
  minimumPlayerNumber: 2,
  playerTokenLimit: 10,
  playerReserveDevelopmentLimit: 3,
  playerDefaultToken: {
    red: 0,
    blue: 0,
    green: 0,
    white: 0,
    black: 0,
    yellow: 0
  },
  "player.defaultDevelopments": [],
  "field.tokenStoreDefaultToken": {
    red: 0,
    blue: 0,
    green: 0,
    white: 0,
    black: 0,
    yellow: 0
  }
}
export const THEME = {
  main: '#2c3e50',
  background: '#131920',
  white: '#fff',
  black: '#000',
  grayscale: [
    '#f8fafb',
    '#f1f5f5',
    '#eaeeef',
    '#e1e4e6',
    '#ced3d6',
    '#a9afb3',
    '#878d91',
    '#4d5256',
    '#363a3c',
    '#292a2b'
  ],
  title: '#face41',
  boxBorder: '#6ea791',
  boxBackground: '#367c69',
  primary: ['#2ecc71', '#27ae60'],
  secondary: ['#34495e', '#2c3e50'],
  warning: ['#e74c3c', '#c0392b'],
  font: {
    title: 'Galada, Lobster',
    context: 'Comfortaa',
    vp: 'Lobster',
    cost: 'Lobster'
  },
}