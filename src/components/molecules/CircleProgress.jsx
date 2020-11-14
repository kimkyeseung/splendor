import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledCircle = styled.div`
  svg {
    transform: rotate(-90deg);
    width: ${({ size }) => size + 'px'};
    height: ${({ size }) => size + 'px'};
  }
  & circle {
    stroke-dasharray: ${({ circumference }) => circumference};
  }
  & .amount {
    stroke-dashoffset: ${({ amount }) => amount};
  }
`

export const CircleProgress = ({ size, amount, max, color, strokeWidth }) => {
  const circumference = size * Math.PI
  const offset = circumference - (circumference / max * Math.min(max, amount))

  return (
    <StyledCircle size={size} amount={offset} circumference={circumference}>
      <svg viewBox={`0 0 ${size} ${size}`}>
        <circle
          r={(size - strokeWidth) / 2} cy={size / 2} cx={size / 2}
          strokeWidth={strokeWidth}
          stroke="#eeeeee"
          fill="none" />
        <circle
          className="amount"
          r={(size - strokeWidth) / 2} cy={size / 2} cx={size / 2}
          strokeWidth={strokeWidth}
          stroke={color}
          strokeLinecap="round"
          fill="none" />
      </svg>
    </StyledCircle>
  )
}

CircleProgress.defaultProps = {
  strokeWidth: 4,
  size: 200,
  color: '#34495e'
}
