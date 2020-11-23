import React from 'react'
import styled from 'styled-components'
import { Blank, Block, Flex, Title, Aside } from 'components'

const Template = styled.div`
  position: relative;
  min-height: 100%;
  & .container {
    width: '100%';
    flex-grow: 1;
  }
  .opponents {
    width: 20%;
    align-self: stretch;
  }
  @media screen and (max-device-width: 980px) {
    .title {
      display: none;
    }
    .container {
      flex-direction: column;
      .opponents {
        width: 100%;
        order: 0;
      }
      .board {
      }
    }
  }
`

const TokenWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: fit-content;
  @media screen and (max-device-width: 980px) {
    width: 100%;
    padding: 0.5rem;
    flex-direction: row-reverse;
  }
`

const NobleWrapper = styled.div`
  height: 100%;
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (max-device-width: 980px) {
    width: 100%;
    padding: 0.5rem;
    flex-direction: row;
    order: 1;
  }
`

const Board = styled.div`
  flex: 1 1 auto;

  @media screen and (max-device-width: 980px) {
    order: 2;
    display: flex;
    flex-direction: column-reverse;
  }
`

export const BoardTemplate = ({ opponents, developments, nobles, tokens, player }) => (
  <Template>
    <Blank height={30} />
    <Title className="title" />
    <Blank height={20} />
    <Flex className="container">
      <Aside className="opponents">
        {opponents}
      </Aside>
      <Board className="board">
        <Block className="developments">
          {developments}
        </Block>
        <TokenWrapper className="tokens">
          {tokens}
        </TokenWrapper>
      </Board>
      <NobleWrapper>
        {nobles}
      </NobleWrapper>
    </Flex>
    {player}
  </Template>
)
