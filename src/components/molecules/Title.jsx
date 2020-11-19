import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const shadowSize = {
  large: css`
    text-shadow: 6px 6px ${({ theme }) => theme.title};
  `,
  medium: css`
    text-shadow: 3px 3px ${({ theme }) => theme.title};
  `,
  card: css`
    text-shadow: 1px 1px ${({ theme }) => theme.title};
  `
}

const normalStyle = css`
  color: ${({ theme }) => theme.white};
  ${({ size }) => shadowSize[size]};
`

const reverseStyle = css`
  color: ${({ theme }) => theme.title};
`

const StyledTitle = styled.div`
  text-align: center;
  font-size: ${({ size }) => {
    switch (size) {
      case 'large':
        return '200px'
      case 'medium':
        return '100px'
      case 'card':
        return '24px'
    }
  }};
  font-family: ${({ theme }) => theme.font.title};
  ${({ reverse }) => reverse ? reverseStyle : normalStyle};
`

export const Title = ({ size, text, ...props }) => (
  <StyledTitle size={size} {...props}>{text}</StyledTitle>
)

Title.propTypes = {
  size: PropTypes.oneOf(['large', 'medium', 'card']),
  text: PropTypes.string,
  reverse: PropTypes.bool
}

Title.defaultProps = {
  size: 'medium',
  text: 'Splendor',
  reverse: false
}