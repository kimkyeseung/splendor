import React from 'react'
import { BoardTemplate, Icon } from 'components'
import Noble from './Noble'
import Token from './Token'
import DevelopmentRow from './DevelopmentRow'
import TokenController from './TokenController'
import DevelopmentController from './DevelopmentController'
import NobleController from './NobleController'
import MyField from './MyField'
import Result from './Result'
import Player from 'components/organisms/Player'
import { DEVELOPMENT_CARDS } from 'assets'

const Board = ({
  G, ctx,
  playerID,
  isMultiplayer,
  handleSpaceClick,
  deselectDevelopment,
  buySelectedDevelopment,
  reserveSelectedDevelopment,
  handleTokenClick,
  confirmSelectedToken,
  cancelSelectedToken,
  deselectToken,
  returnToken,
  handleNobleClick,
  watchPlayer,
  history,
  players,
  matchData,
  ...props
}) => {
  const { currentPlayer, gameover } = ctx
  const {
    board,
    tokenStore,
    fields,
    nobleTiles,
    developOneDeck,
    developTwoDeck,
    developThreeDeck,
    tokenOverloaded
  } = G

  const {
    dev10, dev11, dev12, dev13,
    dev20, dev21, dev22, dev23,
    dev30, dev31, dev32, dev33
  } = board
  const developmentOne = [dev10, dev11, dev12, dev13]
  const developmentTwo = [dev20, dev21, dev22, dev23]
  const developmentThree = [dev30, dev31, dev32, dev33]

  const { hand, tokenAssets } = fields[currentPlayer]
  const tokenIndex = ['white', 'blue', 'green', 'red', 'black', 'yellow']

  const isMyTurn = playerID === ctx.currentPlayer
  const controllerVisible = !isMultiplayer || isMyTurn

  return (
    <>
      <BoardTemplate
        opponents={
          Object.keys(fields)
            .reduce((list, key) => key !== playerID
              ? [...list, <Player
                key={key}
                G={G}
                watchPlayer={watchPlayer}
                player={{ id: key, name: isMultiplayer ? matchData[key]?.name : players[key]?.name }}
                field={fields[key]}
                ctx={ctx} />]
              : list,
              [])
        }
        developments={
          <>
            <DevelopmentRow
              deck={developThreeDeck}
              list={developmentThree}
              handler={handleSpaceClick}
              grade={3}
            />
            <DevelopmentRow
              deck={developTwoDeck}
              list={developmentTwo}
              handler={handleSpaceClick}
              grade={2}
            />
            <DevelopmentRow
              deck={developOneDeck}
              list={developmentOne}
              handler={handleSpaceClick}
              grade={1}
            />
          </>
        }
        tokens={
          tokenIndex.map(token => (
            <Token
              key={token}
              color={token}
              count={tokenStore[token]}
              onClick={() => {
                handleTokenClick(token)
              }} />
          ))
        }
        nobles={
          nobleTiles.map(noble => (
            <Noble key={noble} noble={noble} />
          ))
        }
        player={
          <MyField
            field={isMultiplayer
              ? fields[playerID]
              : fields[currentPlayer]}
            handler={handleSpaceClick} />
        } />
      {controllerVisible && hand.development
        ? <DevelopmentController
          message="What would you like to do with this development card?"
          deselectDevelopment={deselectDevelopment}
          buySelectedDevelopment={buySelectedDevelopment}
          reserveSelectedDevelopment={reserveSelectedDevelopment}
          focusedDevelopment={DEVELOPMENT_CARDS[hand.development.name]}
          type={hand.development.type} />
        : null}
      {controllerVisible && hand.gettableNobles && hand.gettableNobles.length
        ? <NobleController
          message="Select Noble tile to import"
          nobles={hand.gettableNobles}
          onNobleClick={handleNobleClick}
        />
        : null}
      {controllerVisible && hand.tokens.length
        ? <TokenController
          message="Select tokens to import"
          tokens={hand.tokens}
          onTokenClick={deselectToken}
          confirmSelectedToken={confirmSelectedToken}
          onClose={cancelSelectedToken} />
        : null}
      {controllerVisible && tokenOverloaded
        ? <TokenController
          message={`Return the exceeded tokens: ${tokenOverloaded}`}
          tokens={tokenAssets}
          deselectToken={deselectToken}
          onTokenClick={returnToken}
          confirmSelectedToken={confirmSelectedToken}
          onClose={cancelSelectedToken} />
        : null}
      {gameover && <Result
        G={G}
        ctx={ctx}
        playerID={playerID}
        winner={gameover.winner}
        history={history} />}
    </>
  )
}

export default Board
