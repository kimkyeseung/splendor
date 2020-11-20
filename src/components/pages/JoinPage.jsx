import React from 'react'
import TerminalContainer from 'containers/TerminalContainer'
import { SubTemplate } from 'components'

export const JoinPage = ({ ...props }) => (
  <SubTemplate content={
    <TerminalContainer {...props} />
  } />
)