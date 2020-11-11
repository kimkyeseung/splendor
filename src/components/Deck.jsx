import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Space from './Space'
import Card from './Card'

const Back = styled.div`
  position: absolute;
  top: ${({ index }) => `${index / 2.5}px`};
  left: ${({ index }) => `${index / 2.5}px`};
`

const Dummmy = styled(Space)`
  position: relative;
  overflow: visible;
  background: none;
`

const Effect = styled.div`
  transition: all 0.2s;
  &:hover {
    transform: translate(2px, -6px);
  }
`

const Deck = ({ cards = [], onClick }) => cards.length
  ? <Dummmy>
    {cards.map((id, index) => (
      index === cards.length - 1
        ? <Effect key={id}>
          <Back index={index}>
            <Card dev={id} blind onClick={onClick} />
          </Back>
        </Effect>
        : <Back key={id} index={index}>
          <Card dev={id} blind onClick={onClick} />
        </Back>
    ))}
  </Dummmy>
  : <Space empty />

Deck.propTypes = {
  onClick: PropTypes.func
}

export default Deck