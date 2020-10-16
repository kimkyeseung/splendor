import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { LobbyApi } from '../lib/api'
import Main from '../components/Main'
import qs from 'query-string'

const api = new LobbyApi()

class MainContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
    this.createGame = this.createGame.bind(this)
  }

  createGame = () => {
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
          console.log("Created room with roomID = ", roomId);
          this.setState({ loading: false }, () => {
            history.push(`/lobby/${roomId}?${qs.stringify({ isHost: true })}`);
          })
        },
          (err) => {
            console.log(err);
            this.setState({ loading: false });
          }
        )
    })
  }

  render() {
    return (
      <Main
        createGame={this.createGame}
        {...this.props} />
    )
  }
}

MainContainer.propTypes = {
  playerNum: PropTypes.number
}

export default MainContainer
