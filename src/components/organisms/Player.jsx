import React from 'react'
import styled from 'styled-components'
import OpponentFieldSummary from 'components/organisms/OpponentFieldSummary'
import { Button } from 'components'

const Name = styled.div`
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
  padding: 0.25rem;
  border-radius: 12px;
  width: 100%;
  background: ${({ theme, active }) => active
    ? theme.primary[0]
    : theme.secondary[0]};
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

const Player = ({ ctx, player, G, watchPlayer }) => {
  const { currentPlayer } = ctx
  const score = G.fields[player.id].victoryPoints
  const isActive = `${player.id}` === `${currentPlayer}`

  return (
    <StyledPlayer active={isActive}>
      <Name>{player.name || player.id}</Name>
      <OpponentFieldSummary
        active={isActive}
        field={G.fields[player.id]} />
        <Button size="small" onClick={() => {
          watchPlayer(player.id)
        }}>Watch</Button>
    </StyledPlayer>
  )
}

export default Player
