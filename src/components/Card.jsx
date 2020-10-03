import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Value from './Value'
import Cost from './Cost'
import Space from './Space'

import DEVELOPMENT_CARDS from '../assets/developmentCards.json'

const Card = ({ dev, onClick }) => {
  if (!dev) {
    return <Space empty />
  }
  const { grade, cost, value, victoryPoint } = DEVELOPMENT_CARDS[dev]
  return (
    <Space onClick={onClick} backgroundUrl={`image/${value + grade}.jpg`}>
      <header>
        <p className="vp">{victoryPoint ? victoryPoint : ''}</p>
        <Value value={value} />
      </header>
      <div className="cost">
        {Object.keys(cost).map((token, i) => <Cost key={i} value={token} amount={cost[token]} />)}
      </div>
    </Space>
  )
}

Card.propTypes = {
  dev: PropTypes.oneOf(Object.keys(DEVELOPMENT_CARDS)),
  onClick: PropTypes.func
}

Card.Row = styled.section`
  display: flex;
  justify-content: space-between;
  max-width: 900px;
`

export default Card
