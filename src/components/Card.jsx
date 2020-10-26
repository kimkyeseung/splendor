import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Value from './Value'
import Cost from './Cost'
import Space from './Space'
import { Flex } from './units'

import DEVELOPMENT_CARDS from '../assets/developmentCards.json'

const Card = ({ dev, blind, onClick }) => {
  if (!dev) {
    return <Space empty />
  }
  const { grade, cost, value, victoryPoint } = DEVELOPMENT_CARDS[dev]

  if (blind) {
    return <Space onClick={onClick} grade={grade} blind />
  }

  return (
    <Space onClick={onClick} backgroundUrl={`/image/${value + grade}.jpg`}>
      <Flex className="header">
        <p className="vp">{victoryPoint ? victoryPoint : ''}</p>
        <Value value={value} />
      </Flex>
      <div className="cost">
        {Object.keys(cost)
          .map((token, i) => <Cost key={i} value={token} amount={cost[token]} />)}
      </div>
    </Space>
  )
}

Card.propTypes = {
  dev: PropTypes.oneOf(Object.keys(DEVELOPMENT_CARDS)),
  onClick: PropTypes.func
}

export default Card
