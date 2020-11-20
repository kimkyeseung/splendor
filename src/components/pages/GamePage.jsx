import React from 'react'
import styled from 'styled-components'
import GameContainer from 'containers/GameContainer'

const Wrapper = styled.div``

export const GamePage = ({ ...props }) => (
  <Wrapper>
    <GameContainer {...props} />
  </Wrapper>
)
