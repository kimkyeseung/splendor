import React from 'react'
import styled from 'styled-components'
import Card from './Card'
import Noble from './Noble'
import Token from './Token'
import Layout from './Layout'
import BoardLayout from './BoardLayout'
import TokenController from './TokenController'
import DevelopmentController from './DevelopmentController'
import NobleController from './NobleController'
import Player from '../container/Player'
import Deck from './Deck'
import { Link } from 'react-router-dom'

const Header = styled.header`
  padding: 1rem;
  background: ${({ theme }) => theme.main};
  & > a { color: ${({ theme }) => theme.fontWhite}; }
`

const Board = ({
  G, ctx,
  confirmable,
  focusedDevelopment,
  tokenOverloaded,
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
  } = G

  const {
    dev10, dev11, dev12, dev13,
    dev20, dev21, dev22, dev23,
    dev30, dev31, dev32, dev33
  } = board
  const developmentOne = [dev10, dev11, dev12, dev13]
  const developmentTwo = [dev20, dev21, dev22, dev23]
  const developmentThree = [dev30, dev31, dev32, dev33]

  const { hand, tokenAssets } = fields[`player${currentPlayer}`]
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
          <div>
            {Object.keys(G.fields).map(player => (
              <Player
                key={player}
                field={G.fields[player]}
                G={G}
                selectedTokens={selectedTokens}
                player={player}
                ctx={ctx} />
            ))}
          </div>
        }
        Main={
          <BoardLayout
            Developments={
              <>
                <Card.Row>
                  <Deck cards={developThreeDeck} grade={3} />
                  {developmentThree.map((dev, index) => (
                    <Card key={dev} onClick={ev => {
                      handleSpaceClick(dev, index, 3)
                    }} grade={3} dev={dev} />
                  ))}
                </Card.Row>
                <Card.Row>
                  <Deck cards={developTwoDeck} grade={2} />
                  {developmentTwo.map((dev, index) => (
                    <Card key={dev} onClick={ev => {
                      handleSpaceClick(dev, index, 2)
                    }} grade={2} dev={dev} />
                  ))}
                </Card.Row>
                <Card.Row>
                  <Deck cards={developOneDeck} grade={1} />
                  {developmentOne.map((dev, index) => (
                    <Card key={dev} onClick={ev => {
                      handleSpaceClick(dev, index, 1)
                    }} grade={1} dev={dev} />
                  ))}
                </Card.Row>
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
        RightPanel={<div>Right</div>}
        Footer={<div className="hand">
          {hand.tokens.length
            ? <TokenController
              message="가져올 토큰을 선택하세요"
              tokens={hand.tokens}
              confirmable={confirmable}
              onTokenClick={deselectToken}
              confirmSelectedToken={confirmSelectedToken}
              onClose={cancelSelectedToken} />
            : null}
          {focusedDevelopment && <DevelopmentController
            message="개발카드를 어떻게 하시겠습니까?"
            deselectDevelopment={deselectDevelopment}
            buySelectedDevelopment={buySelectedDevelopment}
            reserveSelectedDevelopment={reserveSelectedDevelopment}
            development={focusedDevelopment.development} />}
          {tokenOverloaded
            ? <TokenController
              message="초과한 토큰을 반납하세요"
              tokens={tokenAssets}
              deselectToken={deselectToken}
              onTokenClick={returnToken}
              confirmSelectedToken={confirmSelectedToken}
              onClose={cancelSelectedToken} />
            : null}
          {hand.gettableNobles && hand.gettableNobles.length
            ? <NobleController
              message="가져올 귀족 타일을 선택하세요"
              nobles={hand.gettableNobles}
              onNobleClick={handleNobleClick}
            />
            : null}
        </div>} />
    </>
  )
}

export default Board