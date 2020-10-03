import React from 'react'
import { Box, Flex } from './units'

const Layout = ({ Developments, Nobles, Tokens, ...props }) => (
  <Flex>
    <Box>
      {Developments}
    </Box>
    <Box>
      {Tokens}
    </Box>
    <Box>
      {Nobles}
    </Box>
  </Flex>
)

export default Layout
