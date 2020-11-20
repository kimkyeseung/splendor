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

    api.whosInRoom(this.gameID)
      .then((players) => {
        console.log({ players })
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

  joinGame() {
    const { setPlayerInfo } = this.props

    if (this.gameID) {
      const { history } = this.props
      api.joinRoom(this.gameID, this.playerName, this.playerID)
        .then((authToken) => {
          console.log('게임에 참가하였습니다. 플레이어: ', this.playerID)
          setPlayerInfo(this.playerID, authToken)
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
        this.leaveGame()
        // history.push('/')
        ev.preventDefault()
      }}>
        <SplendorGame
          gameID={this.gameID}
          players={joinedPlayers.filter(player => player.name)}
          playerID={String(this.playerID)}
          credentials={userAuthToken}
        />
      </Beforeunload>
    )
  }
}

export default GameContainer
