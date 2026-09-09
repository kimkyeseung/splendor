import React from 'react'
import PropTypes from 'prop-types'
import Value from './Value'
import Cost from './Cost'
import Space from './Space'
import { VictoryPoints, Flex, Title } from 'components'

import { DEVELOPMENT_CARDS, HIDDEN_DEVELOPMENT_CARD } from 'assets'

const Card = ({ dev, blind, grade: gradeProp, ...props }) => {
  if (!dev) {
    return <Space empty />
  }

  // 뒷면(blind) 카드는 실제 카드 정체를 숨기기 위해 서버에서 placeholder id로
  // 치환되어 내려올 수 있으므로, DEVELOPMENT_CARDS 조회 없이 명시적으로
  // 전달받은 grade만으로 등급별 색상을 표시한다.
  if (blind) {
    return (
      <Space grade={gradeProp || DEVELOPMENT_CARDS[dev]?.grade} blind {...props}>
        <Flex style={{ height: '100%' }} justifyContent="center">
          <Title className="title" size="card" />
        </Flex>
      </Space>
    )
  }

  const { cost, value, victoryPoint, id } = DEVELOPMENT_CARDS[dev]

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
  dev: PropTypes.oneOf([...Object.keys(DEVELOPMENT_CARDS), HIDDEN_DEVELOPMENT_CARD]),
  blind: PropTypes.bool,
  small: PropTypes.bool,
  onClick: PropTypes.func
}

export default Card
