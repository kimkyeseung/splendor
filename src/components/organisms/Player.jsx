import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'
import OpponentFieldSummary from 'components/organisms/OpponentFieldSummary'
import Card from './Card'
import { Flex } from 'components'

const Name = styled.p`
  padding: 0.5rem;
  max-width: 150px;
  min-width: 100px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-right: 0.5rem;

  @media screen and (max-device-width: 980px) {
    max-width: 130px;
    min-width: 100px;
    padding: 0;
    background: none;
    position: relative;
    margin: 0;
    padding-bottom: 0.2rem;
    &::after {
      content: '';
      width: 20px;
      height: 2px;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: ${({ theme }) => theme.white};
    }
  }
`

const StyledPlayer = styled.div`
  padding: 0.5rem;
  border-radius: 12px;
  width: 100%;
  cursor: zoom-in;
  background: ${({ theme, active }) => active
    ? theme.primary[0]
    : theme.secondary[0]};
  &:hover {
    background: ${({ theme, active }) => active
    ? theme.primary[1]
    : theme.secondary[1]};
  }
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
  @media screen and (max-device-width: 980px) {
    &:not(:last-child) {
      margin-bottom: 0;
    }
    min-width: 33.3%;
  }
`

const Tokens = styled.div`
  display: flex;
  & > * {
    margin: 0 0.1rem;
  }
`

const Token = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  box-shadow: 1px 1px 2px 0px rgba(0,0,0,0.25);
  border: 1px solid;
  padding: 0.2rem;
  ${({ theme, value }) => value && theme.colorSet[value]};
  &::after {
    content: '';
    display: block;
    border-radius: 100%;
    width: 100%;
    height: 100%;
    opacity: 0.75;
    background: lightgray;
  }

  @media screen and (max-device-width: 980px) {
    width: ${20 / 2}px;
    height: ${20 / 2}px;
    padding: 0.35rem;
  }
`

const Player = ({ ctx, player, watchPlayer, field }) => {
  const { currentPlayer } = ctx
  const isActive = `${player.id}` === `${currentPlayer}`

  const playerRef = useRef()

  useEffect(() => {
    if (playerRef.current) {
      if (field.hand.tokens.length || field.hand.development || field.hand.gettableNobles.length) {
        ReactTooltip.show(playerRef.current)
      } else {
        ReactTooltip.hide(playerRef.current)
      }
    }
  }, [playerRef, field.hand])

  return (
    <StyledPlayer ref={playerRef} data-tip data-for={player.id} active={isActive} onClick={() => {
      watchPlayer(player.id)
    }}>
      <Name>{player.name || player.id}</Name>
      <OpponentFieldSummary
        active={isActive}
        field={field} />
      <ReactTooltip id={player.id} place="right" effect="solid" type="light">
        <Flex>
          {field.hand.tokens.length
            ? <Tokens>{field.hand.tokens.map((token, i) => (
              <Token
                value={token}
                key={token + i} />))}
            </Tokens> : null}
          {field.hand.development
            ? <Card small dev={field.hand.development.name} />
            : null}
        </Flex>
      </ReactTooltip>
    </StyledPlayer>
  )
}

export default Player
