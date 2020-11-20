import React, { Component } from 'react'
import { LobbyApi } from 'api'
import Lobby from 'components/organisms/Lobby'
import { Box, Flex, Button } from 'components'
import { ON_DEVELOPMENT, GAME_SERVER_URL, WEB_SERVER_URL } from 'config'

const api = new LobbyApi()

class LobbyContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.gameId || props.match.params.id
    }
    this.server = ON_DEVELOPMENT
      ? GAME_SERVER_URL
      : `https://${window.location.hostname}`
    this.joinRoom = this.joinRoom.bind(this)
    this.checkRoomState = this.checkRoomState.bind(this)
    this.startGame = this.startGame.bind(this)
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
    const { id } = this.state

    if (id) {
      const { history } = this.props
      api.joinRoom(id, playerName, playerNo)
        .then((authToken) => {
          console.log('게임에 참가하였습니다. 플레이어: ', playerNo)
          setPlayerInfo(playerNo, authToken)
        },
          (err) => {
            console.log('게임 참가에 오류가 발생하였습니다.', err)
            history.push('/')
          }
        )
    }
  }

  checkRoomStateAndJoin = () => {
    console.log("pinging room endpoint to check whos there...")
    const { id } = this.state
    const { updateJoinedPlayers } = this.props
    if (!id) {
      return
    }

    api.whosInRoom(id)
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
            id: null,
          })
        }
      )
  }

  checkRoomState() {
    const { updateJoinedPlayers, myId, playerName, history } = this.props
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
        updateJoinedPlayers(joinedPlayers, () => {
          if (started) {
            history.push(`/game/${myId}/${id}/${playerName}`)
          }
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

  startGame() {
    const { gameId, myId, playerName, userAuthToken } = this.props
    if (!gameId) {
      return
    }

    api.startGame(gameId, myId, userAuthToken)
      .then(() => {
        const { history } = this.props
        clearInterval(this.interval)
        history.push(`/game/${myId}/${gameId}/${playerName}`)
      })
      .catch(err => {
        console.log('게임 시작 에러가 발생하였습니다. ', err)
      })
  }

  render() {
    const { id } = this.state
    const { history, joinedPlayers, gameId, myId, updatePlayerName } = this.props

    if (!gameId && !id) {
      return (
        <Box>
          <Flex>
            생성된 게임이 없습니다.
          </Flex>
          <Flex>
            <Button onClick={() => {
              history.push('/')
            }}>Back</Button>
          </Flex>
        </Box>
      )
    }

    return (
      <Lobby
        players={joinedPlayers}
        myId={myId}
        gameId={id}
        isHost={gameId && gameId === id}
        serverURL={this.server}
        startGame={this.startGame}
        updatePlayerName={updatePlayerName}
      />
    )
  }
}

export default LobbyContainer
