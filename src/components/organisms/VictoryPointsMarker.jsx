import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Flex, VictoryPoints, CircleProgress } from 'components'

const StyledVP = styled.div`
  position: relative;
  width: ${({ size }) => `${size}px`};
  & .vp {
    font-size: ${({ size }) => `${size / 25}em`};
  }
`

const Score = styled(Flex)`
  position: absolute;
  top: 0; left: 0;
  right: 0; bottom: 0;
`

const VictoryPointsMarker = ({ score, total, size }) => (
  <StyledVP size={size}>
    <CircleProgress max={total} amount={score} size={size} />
    <Score justifyContent="center">
      <VictoryPoints className="vp">{score}</VictoryPoints>
    </Score>
  </StyledVP>
)

VictoryPointsMarker.propTypes = {
  size: PropTypes.number,
  score: PropTypes.number.isRequired,
}

VictoryPointsMarker.defaultProps = {
  size: 50,
  total: 15
}

export default VictoryPointsMarker
