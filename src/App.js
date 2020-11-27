import React, { Component } from 'react'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Game from 'components/organisms/Game'
import { Block, LobbyPage, JoinPage, MainPage, GamePage } from 'components'
import { withRouter } from 'react-router'
import { LobbyApi } from 'api'
import qs from 'query-string'
import randomName from 'node-random-name'
import 'react-toastify/dist/ReactToastify.css'

const Body = styled(Block)`
  height: 100%;
  box-sizing: border-box;
  background: ${({ theme }) => theme.black};
  color:  ${({ theme }) => theme.white};
  position: fixed;
  font-size: 20px;
  display: flex;
  justify-content: center;
`

const api = new LobbyApi()

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      error: false,
      myId: null,
      gameId: null,
      playerName: randomName({ last: true }),
      userAuthToken: '',
      joinedPlayers: []
    }
    this.createGame = this.createGame.bind(this)
    this.leaveGameRoom = this.leaveGameRoom.bind(this)
    this.updateJoinedPlayers = this.updateJoinedPlayers.bind(this)
    this.setPlayerInfo = this.setPlayerInfo.bind(this)
    this.updatePlayerName = this.updatePlayerName.bind(this)
  }

  componentWillUnmount() {
    this.leaveGameRoom()
  }

  createGame() {
    const { loading, joinedPlayers } = this.state

    if (loading) {
      return
    }

    this.setState({
      loading: true,
    }, () => {
      api.createRoom()
        .then((gameId) => {
          const { history } = this.props
          this.setState({ gameId, loading: false }, () => {
            history.push(`/lobby/${gameId}`)
          })
        },
          (err) => {
            console.log(err)
            this.setState({ loading: false, error: true })
          }
        )
    })
  }

  leaveGameRoom(
    gameId = this.state.gameId,
    myId = this.state.myId,
    userAuthToken = this.state.userAuthToken
  ) {
    console.log('try leave gameroom', { gameId, myId, userAuthToken })
    if (!myId || !userAuthToken) {
      return Promise.resolve()
    }

    return api.leaveRoom(gameId, myId, userAuthToken)
  }

  updatePlayerName(gameId = this.state.gameId, name) {
    const { myId, userAuthToken } = this.state

    this.setState({
      playerName: name
    }, () => {
      api.updatePlayerMeta(gameId, myId, userAuthToken, name)
        .catch(err => {
          console.log('게임 시작 에러가 발생하였습니다. ', err)
        })
    })

  }

  updateJoinedPlayers(players, cb) {
    this.setState({
      joinedPlayers: players
    }, cb)
  }

  setPlayerInfo(playerId, token, cb) {
    this.setState({
      userAuthToken: token,
      myId: playerId
    }, cb)
  }

  render() {
    const { gameId, myId, playerName, userAuthToken, joinedPlayers } = this.state
    const { location } = this.props

    return (
      <Body width="100%">
        <Switch>
          <Route path="/" exact>
            <MainPage
              createGame={this.createGame}
              {...this.props} />
          </Route>
          <Route path="/play">
            <Game {...qs.parse(location.search)} />
          </Route>
          <Route path="/join" render={props => (
            <JoinPage
              playerName={playerName}
              changePlayerName={name => { this.setState({ playerName: name }) }} />
          )} />
          <Route path="/lobby/:id" render={props => (
            <LobbyPage
              myId={myId}
              gameId={gameId}
              userAuthToken={userAuthToken}
              playerName={playerName}
              updatePlayerName={this.updatePlayerName}
              leaveGameRoom={this.leaveGameRoom}
              updateJoinedPlayers={this.updateJoinedPlayers}
              setPlayerInfo={this.setPlayerInfo}
              joinedPlayers={joinedPlayers}
              {...props} />
          )}>
          </Route>
          <Route path="/game/:player/:id/:name" render={props => (
            <GamePage
              gameId={gameId}
              userAuthToken={userAuthToken}
              leaveGameRoom={this.leaveGameRoom}
              setPlayerInfo={this.setPlayerInfo}
              updateJoinedPlayers={this.updateJoinedPlayers}
              joinedPlayers={joinedPlayers}
              {...props} />
          )}>
          </Route>
        </Switch>
        <ToastContainer />
      </Body>
    )
  }
}

export default withRouter(App)
