import React, { Component } from 'react'
import { LobbyApi } from 'api'
import Lobby from 'components/organisms/Lobby'
import { Flex, Button } from 'components'
import { ON_DEVELOPMENT, GAME_SERVER_URL } from 'config'
import { setGameToStorage, getGameFromStorage } from 'utils'

const api = new LobbyApi()

class LobbyContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gameID: props.gameId || props.match.params.id
    }
    this.server = ON_DEVELOPMENT
      ? GAME_SERVER_URL
      : `https://${window.location.hostname}`
    this.joinRoom = this.joinRoom.bind(this)
    this.checkRoomState = this.checkRoomState.bind(this)
    this.startGame = this.startGame.bind(this)
    this.leaveGame = this.leaveGame.bind(this)
    this.updatePlayerName = this.updatePlayerName.bind(this)
  }

  componentDidMount() {
    this.checkRoomStateAndJoin()
    this.interval = setInterval(this.checkRoomState, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  joinRoom(playerNo) {
    const { setPlayerInfo, playerName } = this.props
    const { gameID } = this.state
    if (!gameID) {
      return Promise.resolve()
    }

    const { history } = this.props

    return api.joinRoom(gameID, playerName, playerNo)
      .then((authToken) => {
        console.log('게임에 참가하였습니다. 플레이어: ', playerNo)
        setPlayerInfo(playerNo, authToken, () => {
          setGameToStorage(gameID, {
            playerID: playerNo,
            credentials: authToken
          })
        })
      },
        (err) => {
          console.log('게임 참가에 오류가 발생하였습니다.', err)
          history.push('/')
        }
      )
  }

  checkRoomStateAndJoin = () => {
    console.log("pinging room endpoint to check whos there...")
    const { gameID } = this.state
    const { updateJoinedPlayers, leaveGameRoom } = this.props
    if (!gameID) {
      return Promise.resolve()
    }

    const storedData = getGameFromStorage(gameID)

    return storedData && storedData.playerID !== undefined && storedData.credentials
      ? leaveGameRoom(gameID, storedData.playerID, storedData.credentials)
        .then(() => {
          setTimeout(() => { // leaveGameRoom이 완료되더라도 실제로 반영되는데 시차가 있기때문에 1초의 여유를 줘서 재진입
            this.joinRoom(storedData.playerID)
          }, 1000)
        })
      : api.whosInRoom(gameID)
        .then((players) => {
          const joinedPlayers = players.filter((p) => p.name)
          updateJoinedPlayers(joinedPlayers, () => {
            const myPlayerNum = joinedPlayers.length
            this.joinRoom(myPlayerNum)
          })
        },
          (err) => {
            console.log("room does not exist", err)
            this.setState({
              gameID: null,
            })
          }
        )
  }

  checkRoomState() {
    const { updateJoinedPlayers, myId, playerName, history } = this.props
    const { gameID } = this.state

    if (!gameID) {
      return
    }

    return api.whosInRoom(gameID).then(
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
        updateJoinedPlayers(joinedPlayers, () => {
          if (started) {
            history.push(`/game/${myId}/${gameID}/${playerName}`)
          }
        })
      },
      (err) => {
        console.log('room does not exist ', err)
        this.setState({
          gameID: null
        })
      }
    );
  }

  startGame() {
    const { gameId, myId, playerName, userAuthToken } = this.props
    if (!gameId) {
      return Promise.reject()
    }

    return api.startGame(gameId, myId, userAuthToken)
      .then(() => {
        const { history } = this.props
        clearInterval(this.interval)
        history.push(`/game/${myId}/${gameId}/${playerName}`)
      })
      .catch(err => {
        console.log('게임 시작 에러가 발생하였습니다. ', err)
      })
  }

  leaveGame() {
    const { leaveGameRoom, userAuthToken, myId } = this.props
    console.log("out at lobbyC", { gameId: this.state.gameID, userAuthToken })
    leaveGameRoom(this.state.gameID, myId, userAuthToken)
  }

  updatePlayerName(name) {
    const { updatePlayerName } = this.props
    const { gameID } = this.state

    updatePlayerName(gameID, name)
  }

  render() {
    const { gameID: id } = this.state
    const { history, joinedPlayers, gameId, myId } = this.props

    if (!gameId && !id) {
      return (
        <>
          <Flex>
            생성된 게임이 없습니다.
          </Flex>
          <Flex>
            <Button onClick={() => {
              history.push('/')
            }}>Back</Button>
          </Flex>
        </>
      )
    }

    return (
      <Lobby
        players={joinedPlayers}
        myId={myId}
        gameId={id}
        isHost={joinedPlayers[0]?.id === myId}
        serverURL={this.server}
        startGame={this.startGame}
        updatePlayerName={this.updatePlayerName}
      />
    )
  }
}

export default LobbyContainer
