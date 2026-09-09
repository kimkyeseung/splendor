import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Card from './Card'
import Deck from './Deck'
import Tilt from 'react-tilt'

const Effect = styled.div`
  transition: all 0.2s;
  height: 100%;
  &:hover {
    transform: translateY(-4px);
  }
`

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  position: relative;
  @media screen and (max-device-width: 980px) {
    & > * { margin: 0.2rem; }
  }
`

const DevelopmentRow = ({ deck, list, handler, grade }) => (
  <Row>
    {deck && <Deck
      className="deck"
      onClick={() => {
        // 덱의 실제 카드 정체는 클라이언트에 공개되지 않으므로(playerView),
        // 어떤 카드를 뽑을지는 서버가 직접 결정한다.
        handler('deck', null, { grade })
      }}
      cards={deck}
      grade={grade} />}
    {list.map((dev, index) => (
      <Tilt key={dev} options={{ scale: 1, max: 20 }}>
        <Effect>
          <Card onClick={() => {
            handler('board', dev, { index, grade })
          }} grade={grade} dev={dev} />
        </Effect>
      </Tilt>
    ))}
  </Row>
)

DevelopmentRow.propTypes = {
  deck: PropTypes.arrayOf(PropTypes.string),
  list: PropTypes.arrayOf(PropTypes.string),
  grade: PropTypes.oneOf([1, 2, 3])
}

export default DevelopmentRow
