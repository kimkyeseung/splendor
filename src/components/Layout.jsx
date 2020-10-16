import React from 'react'
import { Block, Flex } from './units'

const Layout = ({ Header, LeftPanel, RightPanel, Main, Footer, ...props }) => {
  return (
    <Block>
      <Block>{Header}</Block>
      <Flex>
        <Block width="20%">
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
    </Block>
  )
}

export default Layout
