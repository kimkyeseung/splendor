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
      loading: false,
      playModal: false
    }
    this.createGame = this.createGame.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal(modalName, cb) {
    if (!modalName) {
      return
    }
    this.setState(prevState => ({
      [modalName]: !prevState[modalName]
    }), cb)
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
    const { playModal, error } = this.state

    if (error) {
      return <div>Error!</div>
    }

    return (
      <Terminal
        createGame={this.createGame}
        toggleModal={this.toggleModal}
        playModal={playModal}
        {...this.props} />
    )
  }
}

TerminalContainer.propTypes = {
  playerNum: PropTypes.number
}

export default TerminalContainer
