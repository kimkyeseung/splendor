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
`

const StyledPlayer = styled.div`
  &:not(:last-child) {
    margin-bottom: 1rem;
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
