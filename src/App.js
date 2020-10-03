import React, { Component } from 'react'
import Lobby from './container/LobbyContainer'
import Game from './components/Game'
import styled, { createGlobalStyle } from 'styled-components'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import { withRouter } from 'react-router'


const Main = styled.div`
  background: linear-gradient(#e66465, #9198e5);
  position: fixed;
  height: 100%;
  width: 100%;
  margin: 0;
`

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playerNum: 2,
      config: {},
      playerNames: ['0', '1', '2', '3']
    }
    this.setPlayerNum = this.setPlayerNum.bind(this)
    this.setPlayerName = this.setPlayerName.bind(this)
    this.startGame = this.startGame.bind(this)
  }

  setPlayerNum(num) {
    this.setState({ playerNum: num })
  }

  setPlayerName(name, index) {
    this.setState(({ playerNames }) => {
      const next = [...playerNames]
      next[index] = name
      console.log({ next, name })
      return { playerNames: next }
    })
  }

  startGame() {
    const { playerNum, playerNames } = this.state
    const { history } = this.props

    if (playerNum > 4 || playerNum < 2) {
      return alert('최소 2인이상 4인 이하로 입력해주세요.')
    }

    history.push({
      pathname: '/game',
      query: {
        gameId: new Date().getTime(),
        players: playerNames.slice(0, playerNum)
      }
    })
  }

  render() {
    const { playerNum, playerNames } = this.state

    return (
      <Main>
        <Switch>
          <Route path="/" exact>
            <Lobby
              playerNum={playerNum}
              setPlayerNum={this.setPlayerNum}
              setPlayerName={this.setPlayerName}
              playerNames={playerNames}
              startGame={this.startGame} />
          </Route>
          <Route path="/game">
            <Game />
          </Route>
        </Switch>
      </Main>
    )
  }
}

export default withRouter(App)
