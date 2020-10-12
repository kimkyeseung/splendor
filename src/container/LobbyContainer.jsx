import React, { Component } from 'react'
import { LobbyApi } from '../lib/api'
import { Client } from 'boardgame.io/react'
import Board from './BoardContainer'
import { SocketIO } from 'boardgame.io/multiplayer'
import { game } from '../lib'
import Lobby from '../components/Lobby'
import qs from 'query-string'

const api = new LobbyApi()

class LobbyContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.match.params.id,
      joined: []
    }
    this.joinRoom = this.joinRoom.bind(this)
    this.checkRoomState = this.checkRoomState.bind(this)
    this.getGameClient = this.getGameClient.bind(this)
    this.startGame = this.startGame.bind(this)
  }

  componentDidMount() {
    this.checkRoomStateAndJoin();
    this.interval = setInterval(this.checkRoomState, 1000);
    window.addEventListener("beforeunload", this.cleanup.bind(this));
  }

  componentWillUnmount() {
    this.cleanup()
    window.removeEventListener("beforeunload", this.cleanup.bind(this));
  }

  cleanup() {
    console.log("cleaning up");
    const { id, myID, userAuthToken } = this.state

    api.leaveRoom(id, myID, userAuthToken)
    clearInterval(this.interval)
  }

  joinRoom = playerNo => {
    const username = "Player " + playerNo
    const { id } = this.state

    if (id) {
      const { location, history } = this.props
      const { isHost } = qs.parse(location.search)
      api.joinRoom(id, username, playerNo, isHost)
        .then((authToken) => {
          console.log('게임에 참가하였습니다. 플레이어: ', playerNo)
          this.setState({
            myID: playerNo,
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
        (error) => {
          console.log("room does not exist", error)
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
        });
      },
      (error) => {
        console.log("room does not exist");
        this.setState({
          id: null,
        });
      }
    );
  }

  getGameClient = () => {
    const { joined, id, myID, userAuthToken, } = this.state

    const Splendor = game(joined.length)
    const SplendorGame = Client({
      game: Splendor,
      board: props => <Board {...props} />,
      multiplayer: SocketIO({ server: 'localhost:8000' })
    })

    return (
      <SplendorGame
        gameID={id}
        players={joined}
        playerID={String(myID)}
        credentials={userAuthToken}
      ></SplendorGame>
    )
  }

  startGame() {
    const { id, myID, userAuthToken, joined } = this.state
    if (!id) {
      return
    }

    api.startGame(id, myID, userAuthToken)
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
    const { joined, id, started } = this.state
    const { history } = this.props

    if (started) {
      return this.getGameClient()
    }

    if (!id) {
      return <div>생성된 게임이 없습니다.</div>
    }

    return (
      <Lobby players={joined} gameId={id} startGame={() => {
        this.startGame()
      }} />
    )
  }
}

export default LobbyContainer
