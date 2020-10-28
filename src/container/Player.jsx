import React, { Component } from 'react'
import styled from 'styled-components'
import FieldSummary from '../components/FieldSummary'
import { CircleProgress } from '../components/ui'

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
        <CircleProgress max={15} amount={15} size={50}/>
        <FieldSummary
          active={`${player}` === `${currentPlayer}`}
          field={G.fields[player]} />
      </div>
    )
  }
}

export default Player
