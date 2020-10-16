import React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

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
  display: block;
  margin: 1rem auto;
  padding: 0;
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
  & span {
    display: block;
    padding: 0.75rem 1.25rem;
  }
`

const StyledLink = styled(Link)`
  ${buttonStyle}
`

const StyledButton = styled.button`
  ${buttonStyle}
`

export const Button = ({ isActive, children, to, ...props }) => (
  to
    ? <StyledLink to={to} isActive={isActive} {...props}>
      <span>{children}</span>
    </StyledLink>
    : <StyledButton isActive={isActive} {...props}>
      <span>{children}</span>
    </StyledButton>
)
