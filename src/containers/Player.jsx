import React, { Component } from 'react'
import styled from 'styled-components'
import FieldSummary from '../components/FieldSummary'
import VictoryPoints from '../components/VictoryPoints'
import { DEFAULT_SETTING } from '../lib/config'

const Name = styled.div`

`

class Player extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { ctx, player, G, selectedTokens, field } = this.props
    const { currentPlayer } = ctx
    
    return (
      <div>
        <Name>{field.name}</Name>
        <VictoryPoints vp={G.fields[player].victoryPoints} total={DEFAULT_SETTING.victoryPointGoal}/>
        <FieldSummary
          active={`${player}` === `${currentPlayer}`}
          field={G.fields[player]} />
      </div>
    )
  }
}

export default Player
