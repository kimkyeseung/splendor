import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Flex } from './units'
import Card from './Card'
import Deck from './Deck'
import Tilt from 'react-tilt'

const Effect = styled.div`
  transition: all 0.2s;
  &:hover {
    transform: translateY(-4px);
  }
`

const DevelopmentRow = ({ deck, list, handler, grade }) => (
  <Flex>
    <Deck
      onClick={() => {
        const dev = deck[deck.length - 1]
        handler(dev, -1, grade)
      }}
      cards={deck}
      grade={grade} />
    {list.map((dev, index) => (
      <Tilt key={dev} options={{ scale: 1, max: 20 }}>
        <Effect>
          <Card onClick={() => {
            handler(dev, index, grade)
          }} grade={grade} dev={dev} />
        </Effect>
      </Tilt>
    ))}
  </Flex>
)

DevelopmentRow.propTypes = {
  deck: PropTypes.arrayOf(PropTypes.string),
  list: PropTypes.arrayOf(PropTypes.string),
  grade: PropTypes.oneOf([1, 2, 3])
}

export default DevelopmentRow
