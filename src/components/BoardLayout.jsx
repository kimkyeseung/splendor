import React from 'react'
import { Box, Flex } from './units'

const Layout = ({ Developments, Nobles, Tokens, ...props }) => (
  <Flex>
    <Box>
      {Developments}
    </Box>
    <Box width="fit-content">
      {Tokens}
    </Box>
    <Box width="fit-content">
      {Nobles}
    </Box>
  </Flex>
)

export default Layout
