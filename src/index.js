import React from 'react'
import reset from "styled-reset"
import ReactDOM from 'react-dom'
import App from './App'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import * as serviceWorker from './serviceWorker'
import { THEME } from './lib/config'

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    padding: 0;
    margin: 0;
    font-family: Comfortaa;
  }
`

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={THEME}>
      <GlobalStyle />
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
