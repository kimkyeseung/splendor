import React from 'react'
import PropTypes from 'prop-types'
import Value from './Value'
import Cost from './Cost'
import Space from './Space'
import { VictoryPoints, Flex, Title } from 'components'

import { DEVELOPMENT_CARDS } from 'assets'

const Card = ({ dev, blind, ...props }) => {
  if (!dev) {
    return <Space empty />
  }
  const { grade, cost, value, victoryPoint, id } = DEVELOPMENT_CARDS[dev]

  if (blind) {
    return (
      <Space grade={grade} blind {...props}>
        <Flex style={{ height: '100%' }} justifyContent="center">
          <Title className="title" size="card" />
        </Flex>
      </Space>
    )
  }

  return (
    <Space className={`DEV${id}`} {...props}>
      <Flex className="header">
        <VictoryPoints className="vp">{victoryPoint ? victoryPoint : ''}</VictoryPoints>
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
  blind: PropTypes.bool,
  small: PropTypes.bool,
  onClick: PropTypes.func
}

export default Card
