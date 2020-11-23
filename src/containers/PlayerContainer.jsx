import React, { Component } from 'react'
import styled from 'styled-components'
import FieldSummary from 'components/organisms/FieldSummary'
import VictoryPointsMarker from 'components/organisms/VictoryPointsMarker'
import { Flex } from 'components'
import { DEFAULT_SETTING } from 'config'

const Name = styled.div`
  background-color: ${({ theme }) => theme.white};
  padding: 0.5rem;
  margin-left: -1rem;
  border-radius: 0 50px 50px 0;
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

class PlayerContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { ctx, player, G } = this.props
    const { currentPlayer } = ctx
    const score = G.fields[player.id].victoryPoints

    return (
      <StyledPlayer>
        <Flex alginItems="center">
          <Name>{player.name || player.id}</Name>
          {score
            ? <VictoryPointsMarker
              score={score}
              total={DEFAULT_SETTING.victoryPointGoal} />
            : null}
        </Flex>
        <FieldSummary
          active={`${player.id}` === `${currentPlayer}`}
          field={G.fields[player.id]} />
      </StyledPlayer>
    )
  }
}

export default PlayerContainer
