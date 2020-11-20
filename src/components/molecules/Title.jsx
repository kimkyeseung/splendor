import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const sizeCase = {
  large: css`
    font-size: 200px;
    text-shadow: 6px 6px ${({ theme }) => theme.title};
    @media screen and (max-device-width: 980px) {
      font-size: 4.5em;
      text-shadow: 4px 4px ${({ theme }) => theme.title};
    }
  `,
  medium: css`
    font-size: 100px;
    text-shadow: 3px 3px ${({ theme }) => theme.title};
  `,
  card: css`
    font-size: 24px;
    text-shadow: 1px 1px ${({ theme }) => theme.title};
  `
}

const normalStyle = css`
  color: ${({ theme }) => theme.white};
`

const reverseStyle = css`
  color: ${({ theme }) => theme.title};
  text-shadow: none;
`

const StyledTitle = styled.div`
  text-align: center;
  font-family: ${({ theme }) => theme.font.title};
  ${({ reverse }) => reverse ? reverseStyle : normalStyle};
  @media screen and (max-device-width: 980px) {
    font-size: 3em;
    text-shadow: 2px 2px ${({ theme }) => theme.title};
  }
  ${({ size }) => sizeCase[size]};
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