import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Space from './Space'
import Card from './Card'

const Back = styled.div`
  position: absolute;
  top: ${({ index }) => `${index / 3}px`};
  left: ${({ index }) => `${index / 3}px`};
`

const Dummmy = styled(Space)`
  position: relative;
  overflow: visible;
`

const Deck = ({ cards = [], onClick }) => {

  return cards.length
    ? <Dummmy>
      {cards.map((id, index) => <Back key={id} index={index}>
        <Card dev={id} blind onClick={onClick} />
      </Back>)}
    </Dummmy>
    : <Space empty />
}

Deck.propTypes = {
  onClick: PropTypes.func
}

export default Deck