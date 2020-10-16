import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

export const Space = styled.div`
  display: block;
  box-sizing: border-box;
  height: ${({ height }) => height ? `${height}px` : '100px'};
  width: ${({ width }) => width ? `${width}px` : '100%'};
`

Space.propTypes = {
  inline: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
