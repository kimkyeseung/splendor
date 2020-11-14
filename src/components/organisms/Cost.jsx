import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import config from '../../config'
import { Flex } from '../atoms'

const { theme } = config

const solidShape = css`
  border-radius: 4px;
  padding: 0.25rem;
  padding-bottom: 0;
  margin: 0.2rem auto;
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
  ${({ value }) => value && theme.basic[value]};
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
