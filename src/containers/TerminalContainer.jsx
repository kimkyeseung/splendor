import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { LobbyApi } from 'api'
import Terminal from 'components/organisms/Terminal'
import randomName from 'node-random-name'

const api = new LobbyApi()

class TerminalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      loading: true,
      playerName: randomName({ last: true }),
      rooms: []
    }
    this.createGame = this.createGame.bind(this)
    this.changePlayerName = this.changePlayerName.bind(this)
  }

  componentDidMount() {
    this.getRoomList()
      .then(() => {
        this.setState({ loading: false })
      })
  }

  getRoomList() {
    return api.getRooms()
      .then(rooms => {
        this.setState({ rooms })
      })
  }

  changePlayerName(name) {
    this.setState({
      playerName: name
    })
  }

  createGame() {
    const { loading } = this.state

    if (loading) {
      return
    }

    this.setState({
      loading: true,
    }, () => {
      api.createRoom()
        .then((roomId) => {
          const { history } = this.props
          this.setState({ loading: false }, () => {
            history.push(`/lobby/${roomId}`)
          })
        },
          (err) => {
            console.log(err)
            this.setState({ loading: false, error: true })
          }
        )
    })
  }

  render() {
    const { playerName, error, rooms } = this.state

    if (error) {
      return <div>Error!</div>
    }

    return (
      <Terminal
        playerName={playerName}
        changePlayerName={this.changePlayerName}
        rooms={rooms}
        {...this.props} />
    )
  }
}

TerminalContainer.propTypes = {
  playerNum: PropTypes.number
}

export default TerminalContainer
