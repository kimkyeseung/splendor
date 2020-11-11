import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Value from './Value'
import Cost from './Cost'
import Space from './Space'
import { Flex } from './units'
import { VictoryPoints } from './ui'

import DEVELOPMENT_CARDS from '../assets/developmentCards.json'

const Title = styled.div`
  text-align: center;
  font-size: 24px;
  color: ${({ theme }) => theme.white};
  text-shadow: 1px 1px ${({ theme }) => theme.title};
  font-family: ${({ theme }) => theme.font.title};
`

const Card = ({ dev, blind, ...props }) => {
  if (!dev) {
    return <Space empty />
  }
  const { grade, cost, value, victoryPoint, id } = DEVELOPMENT_CARDS[dev]

  if (blind) {
    return (
      <Space grade={grade} blind {...props}>
        <Flex style={{ height: '100%' }} justifyContent="center">
          <Title className="title">Splendor</Title>
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
  onClick: PropTypes.func
}

export default Card
