import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import Board from 'components/organisms/Board'
import { toast } from 'react-toastify'

class BoardContainer extends Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
    isMultiplayer: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.getCurrentPlayerName = this.getCurrentPlayerName.bind(this)
    this.handleSpaceClick = this.handleSpaceClick.bind(this)
    this.deselectDevelopment = this.deselectDevelopment.bind(this)
    this.buySelectedDevelopment = this.buySelectedDevelopment.bind(this)
    this.reserveSelectedDevelopment = this.reserveSelectedDevelopment.bind(this)
    this.handleTokenClick = this.handleTokenClick.bind(this)
    this.confirmSelectedToken = this.confirmSelectedToken.bind(this)
    this.cancelSelectedToken = this.cancelSelectedToken.bind(this)
    this.deselectToken = this.deselectToken.bind(this)
    this.returnToken = this.returnToken.bind(this)
    this.handleNobleClick = this.handleNobleClick.bind(this)
  }

  componentDidUpdate(prevProps) {
    const { ctx, playerID } = this.props
    if (ctx.turn !== prevProps.ctx.turn) {
      toast(`Turn ${ctx.turn}`, {
        position: 'top-left',
        pauseOnHover: false,
        autoClose: 2000
      })
    }
    if (ctx.currentPlayer !== prevProps.ctx.currentPlayer) {
      const isMyTurn = playerID === ctx.currentPlayer

      isMyTurn
        ? toast.success(`It's My Turn`)
        : toast(`It's ${this.getCurrentPlayerName()}'s Turn`)
    }
  }

  componentDidMount() {
    toast('The game is on: Turn 1', {
      position: 'top-left',
      pauseOnHover: false,
      autoClose: 2000
    })
  }

  getCurrentPlayerName() {
    const { ctx, players } = this.props

    return players.find(({ id }) => ctx.currentPlayer === `${id}`).name || ctx.currentPlayer
  }

  handleSpaceClick(dev, meta) {
    const { moves } = this.props
    const { selectDevelopment } = moves

    selectDevelopment(dev, meta)
  }

  handleReservedDevelopmentClick(dev) {
    const { moves } = this.props
    const { selectDevelopment } = moves

    selectDevelopment(dev, { isExtra: true })
  }

  deselectDevelopment() {
    const { moves } = this.props
    const { deselectDevelopment } = moves

    deselectDevelopment()
  }

  buySelectedDevelopment() {
    const { moves } = this.props
    const { buyDevelopment } = moves

    buyDevelopment()
  }

  reserveSelectedDevelopment() {
    const { moves } = this.props
    const { reserveDevelopment } = moves

    reserveDevelopment()
  }

  handleTokenClick(token) {
    if (token === 'yellow') {
      return
    }
    const { G, ctx, moves } = this.props
    const { selectToken } = moves

    selectToken(token)
  }

  deselectToken(index) {
    const { G, ctx, moves } = this.props
    const { deselectToken } = moves

    deselectToken(index)
  }

  confirmSelectedToken() {
    const { G, ctx, moves } = this.props
    const { getTokens } = moves

    getTokens()
  }

  cancelSelectedToken() {
    const { G, ctx, moves } = this.props
    const { cancelSelectedToken } = moves

    cancelSelectedToken()
  }

  returnToken(token) {
    const { G, ctx, moves } = this.props
    const { returnTokens } = moves

    returnTokens(token)
  }

  handleNobleClick(noble) {
    const { G, ctx, moves } = this.props
    const { selectGetNoble } = moves

    selectGetNoble(noble)
  }

  render() {
    return (
      <Board
        handleSpaceClick={this.handleSpaceClick}
        deselectDevelopment={this.deselectDevelopment}
        buySelectedDevelopment={this.buySelectedDevelopment}
        reserveSelectedDevelopment={this.reserveSelectedDevelopment}
        handleTokenClick={this.handleTokenClick}
        confirmSelectedToken={this.confirmSelectedToken}
        cancelSelectedToken={this.cancelSelectedToken}
        deselectToken={this.deselectToken}
        returnToken={this.returnToken}
        handleNobleClick={this.handleNobleClick}
        handleReservedDevelopmentClick={this.handleReservedDevelopmentClick}
        {...this.props}
      />
    )
  }
}

export default withRouter(BoardContainer)
