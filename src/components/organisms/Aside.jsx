import React from 'react'
import styled from 'styled-components'

const StyledAside = styled.aside`
  background-color: ${({ theme }) => theme.primary[1]};
  color: ${({ theme }) => theme.grayscale[8]};
  height: 100%;
  padding: 1rem;

  @media screen and (max-device-width: 980px) {
    display: flex;
    padding: 0.2rem;
  }
`

const Aside = ({ children, ...props }) => {
  return (
    <StyledAside {...props}>{children}</StyledAside>
  )
}

export default Aside