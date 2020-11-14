import React from 'react'
import styled from 'styled-components'
import { Block, Flex } from '../atoms'

const StyledBlock = styled(Block)`
  padding: 3rem;
  width: fit-content;
  background: ${({ theme }) => theme.white};
  border-radius: 0.5rem;
  -webkit-box-shadow: 3px 3px 5px 6px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 3px 3px 5px 6px rgba(0, 0, 0, 0.4);
  box-shadow: 3px 3px 5px 6px rgba(0, 0, 0, 0.4);
  & > .header {
    font-size: 1.2rem;
  }
`

export const Box = ({ children }) => (
  <Flex justifyContent="center">
    <StyledBlock>{children}</StyledBlock>
  </Flex>
)
