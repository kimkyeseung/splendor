import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { LobbyApi } from 'api'
import Terminal from 'components/organisms/Terminal'

const api = new LobbyApi()

class TerminalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      loading: true,
      rooms: []
    }
    this.createGame = this.createGame.bind(this)
    this.getRoomList = this.getRoomList.bind(this)
  }

  componentDidMount() {
    this.getRoomList()
      .then(() => {
        this.setState({ loading: false })
      })
    this.interval = setInterval(this.getRoomList, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  getRoomList() {
    return api.getRooms()
      .then((rooms = []) => {
        this.setState({
          rooms: [
            ...rooms.filter(({ players }) => players.every(({ data }) => !data?.started))
          ]
        })
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
    const { error, rooms } = this.state
    const { playerName, changePlayerName } = this.props

    if (error) {
      return <div>Error!</div>
    }

    return (
      <Terminal
        playerName={playerName}
        changePlayerName={changePlayerName}
        rooms={rooms}
        {...this.props} />
    )
  }
}

TerminalContainer.propTypes = {
  playerNum: PropTypes.number
}

export default TerminalContainer
