import React, { Component } from 'react'
import { LobbyApi } from 'api'
import Lobby from 'components/organisms/Lobby'
import { Flex, Button } from 'components'
import { ON_DEVELOPMENT, GAME_SERVER_URL, PROD_SERVER_URL } from 'config'
import { setGameToStorage, getGameFromStorage } from 'utils'

const api = new LobbyApi()

class LobbyContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gameID: props.gameId || props.match.params.id,
      // 방 생성 시 정해진 전체 자리 수. whosInRoom이 돌려주는 players 배열은
      // (참가 여부와 무관하게) 항상 이 개수만큼의 슬롯을 담고 있다.
      totalSeats: null
    }
    this.server = ON_DEVELOPMENT
      ? GAME_SERVER_URL
      : (PROD_SERVER_URL || window.location.origin)
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

  // playerNo를 생략하면 서버가 빈 자리를 원자적으로 배정해준다(신규 참가).
  // 실제로 배정된 playerID는 응답으로 돌아오므로, 미리 추측한 값이 아니라
  // 그 값을 그대로 사용해야 한다.
  joinRoom(playerNo) {
    const { setPlayerInfo, playerName } = this.props
    const { gameID } = this.state
    if (!gameID) {
      return Promise.resolve()
    }

    const { history } = this.props

    return api.joinRoom(gameID, playerName, playerNo)
      .then(({ playerID, playerCredentials }) => {
        console.log('게임에 참가하였습니다. 플레이어: ', playerID)
        setPlayerInfo(playerID, playerCredentials, () => {
          setGameToStorage(gameID, {
            playerID,
            credentials: playerCredentials
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
    const { updateJoinedPlayers, setPlayerInfo } = this.props
    if (!gameID) {
      return Promise.resolve()
    }

    const storedData = getGameFromStorage(gameID)

    if (storedData && storedData.playerID !== undefined && storedData.credentials) {
      // 이미 이 방에 내 자리가 있으면 서버에 leave를 보내지 않고 저장된
      // 정보로 세션만 복원한다. leave 후 잠시 뒤 rejoin하는 방식은
      // 그 사이 다른 참가자가 내 자리를 가져가거나(재접속 시 "Player X not
      // available"로 튕겨나고 그 자리를 남이 차지), 혼자 대기 중이던 방이
      // 참가자가 0명이 되어 서버에서 통째로 삭제되는 문제가 있었다.
      setPlayerInfo(storedData.playerID, storedData.credentials)
      return api.whosInRoom(gameID)
        .then((players) => {
          this.setState({ totalSeats: players.length })
          updateJoinedPlayers(players.filter((p) => p.name))
        },
          (err) => {
            console.log("room does not exist", err)
            this.setState({
              gameID: null,
            })
          }
        )
    }

    return api.whosInRoom(gameID)
      .then((players) => {
        this.setState({ totalSeats: players.length })
        const joinedPlayers = players.filter((p) => p.name)
        updateJoinedPlayers(joinedPlayers, () => {
          // 신규 참가자는 클라이언트에서 인원수로 자리 번호를 추측하지 않고,
          // playerID를 생략해 서버가 원자적으로 빈 자리를 배정하도록 한다.
          this.joinRoom(undefined)
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
        this.setState({ totalSeats: players.length })
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
    const { gameID: id, totalSeats } = this.state
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
        totalSeats={totalSeats}
        myId={myId}
        gameId={id}
        // 서버가 자리를 자동 배정할 때는 playerID를 문자열로 돌려주는데
        // (getFirstAvailablePlayerID), whosInRoom이 돌려주는 player.id는
        // 항상 숫자다. 타입을 맞춰서 비교해야 한다.
        isHost={joinedPlayers[0] && String(joinedPlayers[0].id) === String(myId)}
        serverURL={this.server}
        startGame={this.startGame}
        updatePlayerName={this.updatePlayerName}
      />
    )
  }
}

export default LobbyContainer
