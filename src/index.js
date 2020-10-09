import React from 'react'
import reset from "styled-reset";
import ReactDOM from 'react-dom'
import App from './App';
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import * as serviceWorker from './serviceWorker'

const GlobalStyle = createGlobalStyle`
  ${reset}
  @import url('https://fonts.googleapis.com/css2?family=Galada');
  @import url('https://fonts.googleapis.com/css2?family=Lobster');
  * {
    box-sizing: border-box;
  }
  body {
    padding: 0;
    margin: 0;
    font-family: 'Galada', 'Lobster', 'serif' !important;
  }
  font-family: 'Galada','Lobster', 'serif';
`

const theme = {
  main: '#2c3e50',
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
  font: '#363a3c',
  fontWhite: '#fafafa'
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
