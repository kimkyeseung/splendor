import React, { Component } from 'react'
import MainContainer from './container/MainContainer'
import LobbyContainer from './container/LobbyContainer'
import { ToastContainer } from 'react-toastify'
import Game from './components/Game'
import styled from 'styled-components'
import {
  Switch,
  Route
} from 'react-router-dom'
import { Block } from './components/units'
import { withRouter } from 'react-router'
import qs from 'query-string'
import 'react-toastify/dist/ReactToastify.css'

const Body = styled(Block)`
  position: fixed;
  height: 100%;
  background: ${({ theme }) => theme.background};
  color:  ${({ theme }) => theme.white};
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
      <Body>
        <Switch>
          <Route path="/" exact>
            <MainContainer
              playerNum={playerNum}
              setPlayerNum={this.setPlayerNum}
              setPlayerName={this.setPlayerName}
              playerNames={playerNames}
              startGame={this.startGame}
              {...this.props} />
          </Route>
          <Route path="/game">
            <Game {...qs.parse(location.search)} />
          </Route>
          <Route path="/lobby/:id" render={props => <LobbyContainer {...props} />} />
        </Switch>
        <ToastContainer />
      </Body>
    )
  }
}

export default withRouter(App)
