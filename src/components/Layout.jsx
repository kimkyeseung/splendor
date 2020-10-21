import React from 'react'
import { Block, Flex } from './units'

const Layout = ({ Header, LeftPanel, RightPanel, Main, Footer, ...props }) => {
  return (
    <Block style={{ border: '10px solid purple'}}>
      <Block>{Header}</Block>
      <Flex style={{ border: '10px solid red'}}>
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
    </Block>
  )
}

export default Layout
