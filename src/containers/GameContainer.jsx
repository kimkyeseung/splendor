import React, { Component } from 'react'
import { Client } from 'boardgame.io/react'
import Board from './BoardContainer'
import { LobbyApi } from 'api'
import { SocketIO } from 'boardgame.io/multiplayer'
import { ON_DEVELOPMENT, WEB_SERVER_URL } from 'config'
import { Beforeunload } from 'react-beforeunload'
import game from 'game'

const api = new LobbyApi()

class GameContainer extends Component {
  constructor(props) {
    super(props)
    this.gameID = props.match.params.id
    this.playerID = props.match.params.player
    this.playerName = props.match.params.name
    this.checkRoomStateAndJoin = this.checkRoomStateAndJoin.bind(this)
    this.joinGame = this.joinGame.bind(this)
    this.leaveGame = this.leaveGame.bind(this)
    this.leaveGameBeacon = this.leaveGameBeacon.bind(this)
  }

  componentDidMount() {
    const { userAuthToken } = this.props
    if (!userAuthToken) {
      this.checkRoomStateAndJoin()
    }
  }

  componentWillUnmount() {
    this.leaveGame()
  }

  checkRoomStateAndJoin() {
    const { updateJoinedPlayers } = this.props
    if (!this.gameID) {
      return
    }

    return api.whosInRoom(this.gameID)
      .then((players) => {
        const joinedPlayers = players.filter((p) => p.name)
        updateJoinedPlayers(joinedPlayers, () => {
          this.joinGame()
        })
      },
        (err) => {
          console.log("room does not exist", err)
        }
      )
  }

  leaveGame() {
    const { leaveGameRoom, userAuthToken } = this.props
    console.log("out", { gameId: this.gameID, userAuthToken })
    leaveGameRoom(this.gameID, this.playerID, userAuthToken)
  }

  // 새로고침/탭 종료로 페이지가 곧 사라지는 상황(beforeunload)에서 쓴다.
  // 일반 axios 요청은 브라우저가 언로드 도중에 끊어버릴 수 있어, 내 자리가
  // 서버에 "참가 중"으로 남아있게 되고, 그 상태로 재접속을 시도하면
  // "Player X not available"로 거부되어 홈으로 튕겨나갔었다. sendBeacon은
  // 페이지가 사라진 뒤에도 전송을 보장해준다.
  leaveGameBeacon() {
    const { userAuthToken } = this.props
    api.leaveRoomBeacon(this.gameID, this.playerID, userAuthToken)
  }

  joinGame() {
    const { setPlayerInfo } = this.props

    if (this.gameID) {
      const { history } = this.props
      api.joinRoom(this.gameID, this.playerName, this.playerID)
        .then(({ playerCredentials }) => {
          console.log('게임에 참가하였습니다. 플레이어: ', this.playerID)
          setPlayerInfo(this.playerID, playerCredentials)
        },
          (err) => {
            console.log('게임 참가에 오류가 발생하였습니다.', err)
            history.push('/')
          }
        )
    }
  }

  render() {
    const { history, userAuthToken, joinedPlayers } = this.props
    const Splendor = game()
    const SplendorGame = Client({
      game: Splendor,
      numPlayers: joinedPlayers.length,
      matchID: this.gameID,
      playerID: String(this.playerID),
      credentials: userAuthToken,
      debug: false,
      board: props => (
        <Board {...props} players={joinedPlayers} history={history} />
      ),
      multiplayer: SocketIO({
        server: ON_DEVELOPMENT
          ? WEB_SERVER_URL
          : `https://${window.location.hostname}`
      })
    })

    return (
      <Beforeunload onBeforeunload={ev => {
        this.leaveGameBeacon()
        ev.preventDefault()
      }}>
        <SplendorGame
          gameID={this.gameID}
          playerID={String(this.playerID)}
          credentials={userAuthToken}
        />
      </Beforeunload>
    )
  }
}

export default GameContainer
