import React, { Component } from 'react'
import { LobbyApi } from '../lib/api'
import { Client } from 'boardgame.io/react'
import Board from './BoardContainer'
import { SocketIO } from 'boardgame.io/multiplayer'
import { game } from '../lib'
import Lobby from '../components/Lobby'
import { ON_DEVELOPMENT, GAME_SERVER_URL } from '../lib/config'

const api = new LobbyApi()

class LobbyContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.match.params.id,
      joined: []
    }
    this.server = ON_DEVELOPMENT
      ? GAME_SERVER_URL
      : `https://${window.location.hostname}`
    this.joinRoom = this.joinRoom.bind(this)
    this.checkRoomState = this.checkRoomState.bind(this)
    this.getGameClient = this.getGameClient.bind(this)
    this.startGame = this.startGame.bind(this)
    this.cleanup = this.cleanup.bind(this)
  }

  componentDidMount() {
    this.checkRoomStateAndJoin();
    this.interval = setInterval(this.checkRoomState, 1000);
    window.addEventListener('beforeunload', this.cleanup)
  }

  componentWillUnmount() {
    this.cleanup()
    window.removeEventListener('beforeunload', this.cleanup)
  }

  cleanup() {
    console.log('cleaning up')
    const { id, myId, userAuthToken } = this.state

    api.leaveRoom(id, myId, userAuthToken).then(() => {
      clearInterval(this.interval)
    })
  }

  joinRoom(playerNo) {
    const username = 'Player ' + playerNo
    const { id } = this.state

    if (id) {
      const { history } = this.props
      api.joinRoom(id, username, playerNo)
        .then((authToken) => {
          console.log('게임에 참가하였습니다. 플레이어: ', playerNo)
          this.setState({
            myId: playerNo,
            userAuthToken: authToken
          })
        },
          (err) => {
            console.log('게임 창가에 오류가 발생하였습니다.', err)
            history.push('/')
          }
        )
    }
  }

  checkRoomStateAndJoin = () => {
    console.log("pinging room endpoint to check whos there...")
    const { id } = this.state
    if (!id) {
      return
    }

    api.whosInRoom(id)
      .then((players) => {
        const joinedPlayers = players.filter((p) => p.name)
        this.setState({
          joined: joinedPlayers,
        }, () => {
          const myPlayerNum = joinedPlayers.length
          this.joinRoom(myPlayerNum)
        })
      },
        (err) => {
          console.log("room does not exist", err)
          this.setState({
            id: null,
          })
        }
      )
  }

  checkRoomState = () => {
    const { id } = this.state
    if (!id) {
      return
    }

    api.whosInRoom(id).then(
      (players) => {
        const joinedPlayers = []
        let started = false
        players.forEach(p => {
          if (p.name) {
            joinedPlayers.push(p)
          }
          if (p.data?.started) {
            started = true
          }
        })
        if (started) {
          return this.setState({
            started: true,
            joined: joinedPlayers
          }, () => {
            clearInterval(this.interval)
          })
        }
        this.setState({
          joined: joinedPlayers,
        })
      },
      (err) => {
        console.log('room does not exist ', err)
        this.setState({
          id: null,
        })
      }
    );
  }

  getGameClient = () => {
    const { joined, id, myId, userAuthToken, } = this.state
    const { history } = this.props

    const Splendor = game(joined.length)
    const SplendorGame = Client({
      game: Splendor,
      board: props => (
        <Board {...props} history={history} />
      ),
      multiplayer: SocketIO({ server: this.server })
    })

    return (
      <SplendorGame
        gameID={id}
        players={joined.filter(player => player.name && player.id)}
        playerID={String(myId)}
        credentials={userAuthToken}
      ></SplendorGame>
    )
  }

  startGame() {
    const { id, myId, userAuthToken, joined } = this.state
    if (!id) {
      return
    }

    api.startGame(id, myId, userAuthToken)
      .then(() => {
        this.setState({ started: true }, () => {
          clearInterval(this.interval)
        })
      })
      .catch(err => {
        console.log('게임 시작 에러가 발생하였습니다. ', err)
      })
  }

  render() {
    const { joined, myId, id, started } = this.state

    if (started) {
      return this.getGameClient()
    }

    if (!id) {
      return <div>생성된 게임이 없습니다.</div>
    }

    return (
      <Lobby
        players={joined}
        myId={myId}
        gameId={id}
        isHost={joined.length && joined[0].id === myId}
        serverURL={this.server}
        startGame={() => {
          this.startGame()
        }} />
    )
  }
}

export default LobbyContainer
