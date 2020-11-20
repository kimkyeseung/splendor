import React from 'react'
import LobbyContainer from 'containers/LobbyContainer'
import { SubTemplate } from 'components'

export const LobbyPage = ({ ...props }) => (
  <SubTemplate content={
    <LobbyContainer {...props} />
  } />
)