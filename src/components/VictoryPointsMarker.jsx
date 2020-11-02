import React from 'react'
import styled from 'styled-components'
import { CircleProgress } from './ui'
import { Flex } from './units'
import { VictoryPoints } from './ui'

const StyledVP = styled.div`
  position: relative;
`

const Score = styled(Flex)`
  position: absolute;
  top: 0; left: 0;
  right: 0; bottom: 0;
`

const VictoryPointsMarker = ({ score, total }) => {
  return (
    <StyledVP>
      <CircleProgress max={total} amount={score} size={50} />
      <Score justifyContent="center">
        <VictoryPoints>{score}</VictoryPoints>
      </Score>
    </StyledVP>
  )
}

export default VictoryPointsMarker
