import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Flex } from 'components'

const solidShape = css`
  border-radius: 4px;
  padding: 0.1rem;
  padding-bottom: 0;
  margin: 0.1rem auto;
  @media screen and (max-device-width: 980px) {
    padding: 0;
    font-size: 1em;
  }
`

const roundShape = css`
  width: 24px; height: 24px;
  border-radius: 100%;
`

const StyledCost = styled(Flex)`
  color: white;
  border: 1px solid;
  font-size: 1.2em;
  font-family: ${({ theme }) => theme.font.cost};
  margin: 0.2rem;
  -webkit-text-stroke-width: .6px;
  -webkit-text-stroke-color: black;
  ${({ solid }) => solid ? solidShape : roundShape};
  ${({ theme, value }) => value && theme.colorSet[value]};
`

const Cost = ({ amount, ...props }) => <StyledCost justifyContent="center" {...props}>{amount}</StyledCost>

Cost.propTypes = {
  value: PropTypes.string,
  amount: PropTypes.number,
  solid: PropTypes.bool
}

Cost.defaultProps = {
  amount: 0,
  solid: false
}

export default Cost
