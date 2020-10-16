import React from 'react'
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

const StyledButton = styled.button`
  position: relative;
  display: block;
  margin: 1rem auto;
  padding: 0;
  overflow: hidden;
  border-width: 0;
  outline: none;
  border-radius: 4px;
  transition: background-color .2s;
  background-color: ${({ theme }) => theme.grayscale[2]};
  &:hover, &:focus {
    background-color: ${({ theme }) => theme.grayscale[3]};
  }
  ${({ secondary }) => secondary && primaryCss};
  ${({ primary }) => primary && secondaryCss};
  & span {
    display: block;
    padding: 0.5rem 1rem;
  }
`

export const Button = ({ isActive, children }) => (
  <StyledButton isActive={isActive}>
    <span>{children}</span>
  </StyledButton>
)
