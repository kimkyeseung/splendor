import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import config from '../../config'

const { theme } = config

const cases = {}

cases.noble = css``

cases.development = css`
  display: block;
  border-radius: 100%;
`

const StyledValue = styled.div`
  border: 1px solid;
  ${({ value }) => value && theme.basic[value]};
  ${({ type }) => type && cases[type]};
`

const Value = props => <StyledValue {...props} />

Value.propTypes = {
  type: PropTypes.oneOf(['development', 'noble']),
  value: PropTypes.oneOf(['red', 'green', 'blue', 'white', 'black']),
}

Value.defaultProps = {
  type: 'development'
}

export default Value
