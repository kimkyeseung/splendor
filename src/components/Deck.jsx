import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Space from './Space'

const backColors = [
  '#27ae60',
  '#f39c12',
  '#2980b9'
]

const Back = styled(Space)`
  position: absolute;
  border: 12px solid white;
  top: ${({ index }) => `${index / 3}px`};
  left: ${({ index }) => `${index / 3}px`};
  background: ${({ grade }) => backColors[grade - 1]};
`

const Dummmy = styled(Space)`
  position: relative;
  overflow: visible;
`

const Deck = ({ cards = [], grade }) => {

  return cards.length
    ? <Dummmy>
      {cards.map((id, index) => <Back grade={grade} index={index} key={id} />)}
    </Dummmy>
    : <Space empty />
}

Deck.propTypes = {
  onClick: PropTypes.func
}

export default Deck