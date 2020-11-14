import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Layout, Icon } from 'components'
import Noble from './Noble'
import Token from './Token'
import BoardLayout from '../layouts/BoardLayout'
import DevelopmentRow from './DevelopmentRow'
import TokenController from './TokenController'
import DevelopmentController from './DevelopmentController'
import NobleController from './NobleController'
import Aside from './Aside'
import Result from './Result'
import Player from 'containers/Player'
import { DEVELOPMENT_CARDS } from 'assets'

const Header = styled.header`
  padding: 1rem;
  background: ${({ theme }) => theme.main};
  & > a { color: ${({ theme }) => theme.white}; }
`

const Hand = styled.section`
  padding: 2rem;
  background: ${({ theme }) => theme.main};
  display: flex;
  justify-content: center;
  position: relative;
  & > .icon {
    position: absolute;
    left: 20px;
    font-size: 10em;
    opacity: 0.1;
  }
`

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
  history
}) => {
  const { currentPlayer, gameover } = ctx
  const {
    board,
    tokenStore,
    selectedTokens,
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
      <Layout
        Header={
          <Header>
            <Link to="/">로비</Link>
          </Header>
        }
        LeftPanel={
          <Aside>
            {Object.keys(G.fields).map(player => (
              <Player
                key={player}
                field={G.fields[player]}
                G={G}
                selectedTokens={selectedTokens}
                player={player}
                ctx={ctx} />
            ))}
          </Aside>
        }
        Main={
          <BoardLayout
            Developments={
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
            Tokens={
              <Token.Wrapper>
                {tokenIndex.map(token => (
                  <Token
                    key={token}
                    color={token}
                    count={tokenStore[token]}
                    onClick={() => {
                      handleTokenClick(token)
                    }} />
                ))}
              </Token.Wrapper>
            }
            Nobles={
              <Noble.Wrapper>
                {nobleTiles.map(noble => (
                  <Noble key={noble} noble={noble} />
                ))}
              </Noble.Wrapper>
            }
          />
        }
        Footer={
          <Hand>
            <Icon name="cart" />
            <DevelopmentRow
              list={isMultiplayer
                ? fields[playerID].reservedDevs
                : fields[currentPlayer].reservedDevs}
              handler={handleSpaceClick}
              isExtra />
          </Hand>
        } />
      {controllerVisible && hand.development
        ? <DevelopmentController
          message="What would you like to do with this development card?"
          deselectDevelopment={deselectDevelopment}
          buySelectedDevelopment={buySelectedDevelopment}
          reserveSelectedDevelopment={reserveSelectedDevelopment}
          focusedDevelopment={DEVELOPMENT_CARDS[hand.development.name]}
          reserved={hand.development.isExtra}
          blind={hand.development.index === -1} />
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
