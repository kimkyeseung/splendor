import React from 'react'
import styled from 'styled-components'
import { Blank, Block, Flex, Title } from 'components'

const Template = styled.div`
  width: 1200px;
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  & .container {
    max-height: 80vh;
    width: '100%';
    flex-grow: 1;
    & .opponents {
      align-self: stretch;
      height: auto;
    }
    & .board {
      flex-grow: 6;
      display: flex;
      flex-direction: column;
      & > .noble-section {
        flex-grow: 0;
      }
      & > .developments {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
    }
  }
  & .player {
    max-height: 20vh;
  }
  @media screen and (max-device-width: 980px) {
    width: 100vw;
    & .title {
      display: none;
    }
    & .container {
      flex-direction: column;
      & .opponents {
        width: 100%;
        order: 0;
      }
      & .board {
        width: 100%;
        & .developments {
        }
      }
    }
  }
`

const Section = styled.section`
  background: linear-gradient(to bottom, #202732, #181b20);
  padding: 5px;
  flex-grow: 1;
  @media screen and (max-device-width: 980px) {
    padding: 0;
    box-shadow: none;
    background: inherit;
  }
`

const OpponentsWrapper = styled.div`
  padding: 0.5rem;

  @media screen and (max-device-width: 980px) {
    display: flex;
    padding: 0.2rem;
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
  width: 100%;
  display: flex;
  justify-content: center;
  @media screen and (max-device-width: 980px) {
    width: 100%;
    flex-direction: row;
    order: 1;
  }
`

const Board = styled.div`
  display: block;

  @media screen and (max-device-width: 980px) {
    order: 2;
    display: flex;
    flex-direction: column-reverse;
  }
`

export const BoardTemplate = ({ opponents, developments, nobles, tokens, player }) => (
  <Template>
    <Blank height={20} />
    <Flex className="container" alignItems="stretch">
      <Section>
        <OpponentsWrapper className="opponents">
          {opponents}
        </OpponentsWrapper>
      </Section>
      <Blank width={20} />
      <Board className="board">
        <Section className="noble-section">
          <NobleWrapper className="nobles">
            {nobles}
          </NobleWrapper>
        </Section>
        <Blank height={20} />
        <Section className="developments">
          {developments}
        </Section>
      </Board>
      <Blank width={20} />
      <Section>
        <TokenWrapper className="tokens">
          {tokens}
        </TokenWrapper>
      </Section>
    </Flex>
    <Blank height={20} />
    <Section className="player">
      {player}
    </Section>
  </Template>
)
