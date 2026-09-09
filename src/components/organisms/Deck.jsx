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
  & > .cards {
    position: relative;
    overflow: visible;
    background: none;
  }
  & > .mobile-deck {
    display: none;
  }

  @media screen and (max-device-width: 980px) {
    position: relative;
    & > .cards {
      display: none;
    }
    & > .mobile-deck {
      @media screen and (max-device-width: 980px) {
        display: block;
      }
    }
  }
`

const Effect = styled.div`
  transition: all 0.2s;
  height: 100%;
  &:hover {
    transform: translate(2px, -6px);
  }
`

const Deck = ({ cards = [], onClick, grade, ...props }) => cards.length
  ? <Dummmy empty {...props}>
    <div className="cards">
      {cards.map((id, index) => (
        index === cards.length - 1
          ? <Effect key={index}>
            <Back index={index}>
              <Card dev={id} grade={grade} blind onClick={onClick} />
            </Back>
          </Effect>
          : <Back key={index} index={index}>
            <Card dev={id} grade={grade} blind onClick={onClick} />
          </Back>
      ))}
    </div>
    <div className="mobile-deck">
      <Card dev={cards[cards.length - 1]} grade={grade} blind onClick={onClick} />
    </div>
  </Dummmy>
  : <Space empty />

Deck.propTypes = {
  onClick: PropTypes.func
}

export default Deck