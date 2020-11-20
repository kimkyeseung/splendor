import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.footer`
  color: ${({ theme }) => theme.grayscale[4]};
`

export const Footer = ({ ...props }) => (
  <StyledFooter {...props}>2020</StyledFooter>
)
