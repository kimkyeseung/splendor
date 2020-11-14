import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { Icon } from 'components'

const primaryCss = css`
  background-color: ${({ theme }) => theme.primary[0]};
  color: ${({ theme }) => theme.white};
  &:hover, &:focus {
    background-color: ${({ theme }) => theme.primary[1]};
  }
`

const secondaryCss = css`
  background-color: ${({ theme }) => theme.secondary[0]};
  color: ${({ theme }) => theme.white};
  &:hover, &:focus {
    background-color: ${({ theme }) => theme.secondary[1]};
  }
`

const buttonStyle = css`
  position: relative;
  display: flex;
  margin: 0 auto;
  padding: 0.75rem 1.25rem;
  justify-content: space-around;
  overflow: hidden;
  border-width: 0;
  outline: none;
  border-radius: 10px;
  font-size: 1.25em;
  transition: background-color .2s;
  background-color: ${({ theme }) => theme.grayscale[2]};
  color: ${({ theme }) => theme.grayscale[8]};
  text-decoration: none;
  font-family: ${({ theme }) => theme.font.context};
  cursor: ${({ cursor }) => cursor || 'pointer'};
  &:hover, &:focus {
    background-color: ${({ theme }) => theme.grayscale[3]};
  }
  ${({ secondary }) => secondary && primaryCss};
  ${({ primary }) => primary && secondaryCss};
  & > .icon {
    margin-right: 0.5rem;
  }
  & span {
    display: block;
  }
  &:disabled {
    cursor: default;
    background-color: ${({ theme }) => theme.grayscale[1]};
    &:hover {
      background-color: ${({ theme }) => theme.grayscale[1]};
    }
  }
`

const StyledLink = styled(Link)`
  ${buttonStyle}
`

const StyledButton = styled.button`
  ${buttonStyle}
`

export const Button = ({ active, icon, children, to, ...props }) => (
  to
    ? <StyledLink to={to} active={active} {...props}>
      {icon ? <Icon name={icon} /> : null}
      <span>{children}</span>
    </StyledLink>
    : <StyledButton active={active} {...props}>
      {icon ? <Icon name={icon} /> : null}
      <span>{children}</span>
    </StyledButton>
)

Button.propTypes = {
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  icon: PropTypes.string,
  to: PropTypes.string
}