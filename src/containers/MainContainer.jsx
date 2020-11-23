import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Main from 'components/organisms/Main'
import qs from 'query-string'

class MainContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      loading: false,
      playModal: false,
      playerNum: 2,
      playerNames: ['0', '1', '2', '3']
    }
    this.setPlayerNum = this.setPlayerNum.bind(this)
    this.setPlayerName = this.setPlayerName.bind(this)
    this.startGame = this.startGame.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
  }

  setPlayerNum(num) {
    this.setState({ playerNum: num })
  }

  setPlayerName(name, index) {
    this.setState(({ playerNames }) => {
      const next = [...playerNames]
      next[index] = name

      return { playerNames: next }
    })
  }

  toggleModal(modalName, cb) {
    if (!modalName) {
      return
    }
    this.setState(prevState => ({
      [modalName]: !prevState[modalName]
    }), cb)
  }

  startGame() {
    const { playerNum, playerNames } = this.state
    const { history } = this.props

    if (playerNum > 4 || playerNum < 2) {
      return alert('최소 2인이상 4인 이하로 입력해주세요.')
    }

    history.push({
      pathname: '/play',
      search: qs.stringify({
        gameId: new Date().getTime(),
        players: playerNames.slice(0, playerNum)
      })
    })
  }

  render() {
    const { playerNum, playerNames, playModal, error } = this.state

    if (error) {
      return <div>Error!</div>
    }

    return (
      <Main
        toggleModal={this.toggleModal}
        playModal={playModal}
        playerNum={playerNum}
        playerNames={playerNames}
        setPlayerNum={this.setPlayerNum}
        setPlayerName={this.setPlayerName}
        startGame={this.startGame}
        {...this.props} />
    )
  }
}

MainContainer.propTypes = {
  playerNum: PropTypes.number
}

export default MainContainer
