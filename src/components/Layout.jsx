import React from 'react'
import { Box, Flex } from './units'

const Layout = ({ Header, LeftPanel, RightPanel, Main, Footer, ...props }) => {
  return (
    <Box>
      <Box>{Header}</Box>
      <Flex>
        <Box width="20%">
          {LeftPanel}
        </Box>
        <Box flex='1 1 auto'>
          {Main}
        </Box>
        <Box width={256}>
          {RightPanel}
        </Box>
      </Flex>
      <Box>{Footer}</Box>
    </Box>
  )
}

export default Layout
