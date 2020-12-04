import { css } from 'styled-components'

const basicBlue = css`
  background: rgb(83,82,237);
  background: radial-gradient(circle, rgba(83,82,237,1) 0%, rgba(55,66,250,1) 100%);
  border-color: #192a56;
`

const basicWhite = css`
  background: rgb(255,255,255);
  background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(241,242,246,1) 100%);
  border-color: #dcdde1;
`

const basicRed = css`
  background: rgb(255,107,129);
  background: radial-gradient(circle, rgba(255,107,129,1) 0%, rgba(255,71,87,1) 100%);
  border-color: #c23616;
`

const basicYellow = css`
  background: rgb(236,204,104);
  background: radial-gradient(circle, rgba(236,204,104,1) 0%, rgba(255,165,2,1) 100%);
  border-color: #e1b12c;
`

const basicBlack = css`
  background: rgb(87,96,111);
  background: radial-gradient(circle, rgba(87,96,111,1) 0%, rgba(47,53,66,1) 100%);
  border-color: #2f3640;
`

const basicGreen = css`
  background: rgb(123,237,159);
  background: radial-gradient(circle, rgba(123,237,159,1) 0%, rgba(46,213,115,1) 100%);
  border-color: #44bd32;
`

export const GAME_NAME = 'splendor'
export const GAME_SERVER_PORT = 3000
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
  primary: ['#6c5ce7', '#a29bfe'],
  secondary: ['#34495e', '#2c3e50'],
  warning: ['#e74c3c', '#c0392b'],
  font: {
    title: 'Galada, Lobster',
    context: 'Comfortaa',
    vp: 'Lobster',
    cost: 'Lobster'
  },
  colorSet: {
    white: basicWhite,
    blue: basicBlue,
    red: basicRed,
    green: basicGreen,
    black: basicBlack,
    yellow: basicYellow
  }
}