import React from 'react'
import { Block, Flex } from './units'

const Layout = ({ Header, LeftPanel, RightPanel, Main, Footer }) => (
  <Flex flexDirection="column" style={{ height: "100vh" }}>
    <Block>{Header}</Block>
    <Flex height="100%" style={{ width: '100%', flexGrow: 1 }} alignItems="flex-start">
      <Block width="20%" style={{ alignSelf: 'stretch' }}>
        {LeftPanel}
      </Block>
      <Block flex='1 1 auto'>
        {Main}
      </Block>
      <Block width="fit-content">
        {RightPanel}
      </Block>
    </Flex>
    <Block>{Footer}</Block>
  </Flex>
)

export default Layout
