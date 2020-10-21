import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledAside = styled.aside`
  /* background-color: ${({ theme }) => theme.white}; */
  background: green;
  height: 100%;
`

const Aside = ({ props, children }) => {
  return (
    <StyledAside>{children}</StyledAside>
  )
}

export default Aside