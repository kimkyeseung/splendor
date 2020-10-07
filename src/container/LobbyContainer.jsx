import React, { Component } from 'react'
import { LobbyApi } from '../lib/api'

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

    api.whosInRoom(id).then(
      (players) => {
        const joinedPlayers = players.filter((p) => p.name);
        this.setState({
          joined: joinedPlayers,
        });
        const myPlayerNum = joinedPlayers.length;
        this.joinRoom(myPlayerNum);
      },
      (error) => {
        console.log("room does not exist");
        this.setState({
          id: null,
        });
      }
    )
  }

  checkRoomState = () => {
    if (this.state.id) {
      api.whosInRoom(this.state.id).then(
        (players) => {
          const joinedPlayers = players.filter((p) => p.name);
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
  };

  render() {
    return (
      <div>로비입니다.</div>
    )
  }
}

export default LobbyContainer
