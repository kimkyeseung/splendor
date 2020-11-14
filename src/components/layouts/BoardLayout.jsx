import React from 'react'
import { Block, Flex } from 'components'

const Layout = ({ Developments, Nobles, Tokens }) => (
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
