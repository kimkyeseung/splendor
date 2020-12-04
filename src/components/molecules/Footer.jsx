import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.grayscale[4]};
  font-size: 0.75em;
`

export const Footer = ({ ...props }) => (
  <StyledFooter {...props}>2020 Kim Kyseung</StyledFooter>
)
