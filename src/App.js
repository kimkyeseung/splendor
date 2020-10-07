import React, { Component } from 'react'
import Lobby from './container/LobbyContainer'
import Game from './components/Game'
import GameClient from './components/GameClient'
import styled from 'styled-components'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { Box } from './components/units'
import { withRouter } from 'react-router'
import qs from 'query-string'

const Main = styled(Box)`
  position: fixed;
  background: linear-gradient(#e66465, #9198e5);
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
      search: qs.stringify({
        gameId: new Date().getTime(),
        players: playerNames.slice(0, playerNum)
      })
    })
  }

  render() {
    const { playerNum, playerNames } = this.state
    const { location } = this.props

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
            <Game {...qs.parse(location.search)} />
          </Route>
          <Route path="/play" exact render={(props) => GameClient()} />
        </Switch>
      </Main>
    )
  }
}

export default withRouter(App)
