import React from 'react'
import PropTypes from 'prop-types'
import { Flex } from './units'
import Card from './Card'
import Deck from './Deck'

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
      <Card key={dev} onClick={() => {
        handler(dev, index, grade)
      }} grade={grade} dev={dev} />
    ))}
  </Flex>
)

DevelopmentRow.propTypes = {
  deck: PropTypes.arrayOf(PropTypes.string),
  list: PropTypes.arrayOf(PropTypes.string),
  grade: PropTypes.oneOf([1, 2, 3])
}

export default DevelopmentRow
