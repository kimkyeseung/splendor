import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledAside = styled.aside`
  background-color: ${({ theme }) => theme.primary[1]};
  color: ${({ theme }) => theme.grayscale[8]};
  height: 100%;
  padding: 1rem;
`

const Aside = ({ props, children }) => {
  return (
    <StyledAside>{children}</StyledAside>
  )
}

export default Aside