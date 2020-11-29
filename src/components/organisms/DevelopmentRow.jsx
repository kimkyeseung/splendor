import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Card from './Card'
import Deck from './Deck'
import Tilt from 'react-tilt'

const Effect = styled.div`
  transition: all 0.2s;
  &:hover {
    transform: translateY(-4px);
  }
`

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  position: relative;
  & > .list {
    display: flex;
    justify-content: space-around;
    & > * {
      margin: 0.4rem;
      @media screen and (max-device-width: 980px) {
        margin: 0.2rem;
      }
    }
  }
`

const DevelopmentRow = ({ deck, list, handler, grade }) => (
  <Row>
    {deck && <Deck
      className="deck"
      onClick={() => {
        const dev = deck[deck.length - 1]
        handler('deck', dev, { grade })
      }}
      cards={deck}
      grade={grade} />}
    <div className="list">
      {list.map((dev, index) => (
        <Tilt key={dev} options={{ scale: 1, max: 20 }}>
          <Effect>
            <Card onClick={() => {
              handler('board', dev, { index, grade })
            }} grade={grade} dev={dev} />
          </Effect>
        </Tilt>
      ))}
    </div>
  </Row>
)

DevelopmentRow.propTypes = {
  deck: PropTypes.arrayOf(PropTypes.string),
  list: PropTypes.arrayOf(PropTypes.string),
  grade: PropTypes.oneOf([1, 2, 3])
}

export default DevelopmentRow
