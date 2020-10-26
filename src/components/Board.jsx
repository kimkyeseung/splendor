import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Flex } from './units'
import { toast } from 'react-toastify'
import Noble from './Noble'
import Token from './Token'
import Layout from './Layout'
import BoardLayout from './BoardLayout'
import DevelopmentRow from './DevelopmentRow'
import TokenController from './TokenController'
import DevelopmentController from './DevelopmentController'
import NobleController from './NobleController'
import Aside from './Aside'
import Player from '../container/Player'
import { Box, Button, Modal } from './ui'
import DEVELOPMENT_CARDS from '../assets/developmentCards.json'

const Header = styled.header`
  padding: 1rem;
  background: ${({ theme }) => theme.main};
  & > a { color: ${({ theme }) => theme.white}; }
`

const Board = ({
  G, ctx, isMyTurn,
  modal,
  handleSpaceClick,
  deselectDevelopment,
  buySelectedDevelopment,
  reserveSelectedDevelopment,
  handleTokenClick,
  confirmSelectedToken,
  cancelSelectedToken,
  deselectToken,
  returnToken,
  handleNobleClick
}) => {
  const { currentPlayer } = ctx
  const {
    board,
    tokenStore,
    selectedTokens,
    fields,
    nobleTiles,
    developOneDeck,
    developTwoDeck,
    developThreeDeck,
    tokenOverloaded,
    targetDevelopment = {}
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
        Footer={<div className="hand">
          {hand.gettableNobles && hand.gettableNobles.length
            ? <NobleController
              message="가져올 귀족 타일을 선택하세요"
              nobles={hand.gettableNobles}
              onNobleClick={handleNobleClick}
            />
            : null}
        </div>} />
      {isMyTurn && hand.development
        ? <DevelopmentController
          message="What would you like to do with this development card?"
          deselectDevelopment={deselectDevelopment}
          buySelectedDevelopment={buySelectedDevelopment}
          reserveSelectedDevelopment={reserveSelectedDevelopment}
          focusedDevelopment={DEVELOPMENT_CARDS[hand.development]}
          blind={targetDevelopment.index === -1} />
        : null}
      {isMyTurn && hand.gettableNobles && hand.gettableNobles.length
        ? <NobleController
          message="Select Noble tile to import"
          nobles={hand.gettableNobles}
          onNobleClick={handleNobleClick}
        />
        : null}
      {isMyTurn && hand.tokens.length
        ? <TokenController
          message="Select tokens to import"
          tokens={hand.tokens}
          onTokenClick={deselectToken}
          confirmSelectedToken={confirmSelectedToken}
          onClose={cancelSelectedToken} />
        : null}
      {isMyTurn && tokenOverloaded
        ? <TokenController
          message={`Return the exceeded tokens: ${tokenOverloaded}`}
          tokens={tokenAssets}
          deselectToken={deselectToken}
          onTokenClick={returnToken}
          confirmSelectedToken={confirmSelectedToken}
          onClose={cancelSelectedToken} />
        : null}
    </>
  )
}

export default Board
