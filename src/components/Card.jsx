import React from 'react'
import PropTypes from 'prop-types'
import Value from './Value'
import Cost from './Cost'
import Space from './Space'
import { Flex } from './units'

import DEVELOPMENT_CARDS from '../assets/developmentCards.json'

const Card = ({ dev, blind, ...props }) => {
  if (!dev) {
    return <Space empty />
  }
  const { grade, cost, value, victoryPoint } = DEVELOPMENT_CARDS[dev]

  if (blind) {
    return <Space grade={grade} blind {...props} />
  }

  return (
    <Space backgroundUrl={`/image/${value + grade}.jpg`} {...props}>
      <Flex className="header">
        <p className="vp">{victoryPoint ? victoryPoint : ''}</p>
        <Value className="value" value={value} />
      </Flex>
      <div className="costs">
        {Object.keys(cost)
          .map((token, i) => <Cost className="cost" key={i} value={token} amount={cost[token]} />)}
      </div>
    </Space>
  )
}

Card.propTypes = {
  dev: PropTypes.oneOf(Object.keys(DEVELOPMENT_CARDS)),
  onClick: PropTypes.func
}

export default Card
