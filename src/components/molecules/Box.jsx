import React from 'react'
import styled from 'styled-components'
import { Block, Flex } from 'components'

const StyledBlock = styled(Block)`
  padding: 3rem;
  width: fit-content;
  background: ${({ theme }) => theme.white};
  border-radius: 0.5rem;
  box-shadow: 3px 3px 5px 6px rgba(0, 0, 0, 0.4);
  & > .header {
    font-size: 1.2rem;
  }
  @media screen and (max-device-width: 980px) {
    padding: 1rem;
    width: 90vw;
  }
`

export const Box = ({ children }) => (
  <Flex justifyContent="center">
    <StyledBlock>{children}</StyledBlock>
  </Flex>
)
