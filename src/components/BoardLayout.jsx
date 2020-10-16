import React from 'react'
import { Block, Flex } from './units'

const Layout = ({ Developments, Nobles, Tokens, ...props }) => (
  <Flex>
    <Block>
      {Developments}
    </Block>
    <Block width="fit-content">
      {Tokens}
    </Block>
    <Block width="fit-content">
      {Nobles}
    </Block>
  </Flex>
)

export default Layout
