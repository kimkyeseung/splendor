import React, { Component } from 'react'
import { LobbyApi } from '../lib/api'
import { Client } from 'boardgame.io/react'
import Board from './BoardContainer'
import { SocketIO } from 'boardgame.io/multiplayer'
import { game } from '../lib'

const api = new LobbyApi()

const GameClient = () => {
  const Splendor = game(2)
  const SplendorGame = Client({
    game: Splendor,
    board: props => <Board {...props} />,
    multiplayer: SocketIO({ server: 'localhost:8000' }),
  })

  const playerId = new Date().getTime().toString(36)

  return (
    <SplendorGame playerID={playerId} />
  )
}


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
  }

  componentDidMount() {
    this.checkRoomStateAndJoin();
    this.interval = setInterval(this.checkRoomState, 1000);
    window.addEventListener("beforeunload", this.cleanup.bind(this));
  }

  cleanup() {
    console.log("cleaning up");
    api.leaveRoom(this.state.id, this.state.myID, this.state.userAuthToken);
    clearInterval(this.interval);
  }

  joinRoom = playerNo => {
    const username = "Player " + playerNo
    const { id } = this.state

    if (id) {
      api.joinRoom(id, username, playerNo)
        .then(
          (authToken) => {
            console.log("Joined room as player ", playerNo)
            this.setState({
              myID: playerNo,
              userAuthToken: authToken
            })
          },
          (err) => {
            console.log(err)
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
        console.log(111, players)
        const joinedPlayers = players.filter((p) => p.name);
        this.setState({
          joined: joinedPlayers,
        });
        const myPlayerNum = joinedPlayers.length;
        this.joinRoom(myPlayerNum);
      },
        (error) => {
          console.log("room does not exist", error);
          this.setState({
            id: null,
          });
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
        const joinedPlayers = players.filter((p) => p.name);
        this.setState({
          joined: joinedPlayers,
        });
      },
      (error) => {
        console.log("room does not exist");
        // this.setState({
        //   id: null,
        // });
      }
    );
  }

  getGameClient = () => {
    return (
      <GameClient
        gameID={this.state.id}
        players={this.state.joined}
        playerID={String(this.state.myID)}
        credentials={this.state.userAuthToken}
      ></GameClient>
    );
  };

  render() {
    const { joined } = this.state

    if (joined.length === 2) {
      return this.getGameClient()
    }

    return (
      <div>로비입니다.</div>
    )
  }
}

export default LobbyContainer
