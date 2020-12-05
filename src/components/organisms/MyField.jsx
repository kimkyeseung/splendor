import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FieldSummary from './FieldSummary'
import { DEFAULT_SETTING } from 'config'
import { Blank, Flex } from 'components'
import Card from './Card'
import VictoryPointsMarker from 'components/organisms/VictoryPointsMarker'

const StyledField = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ReserveedDevelopments = styled.section`
  display: flex;
  padding: 0 1.5rem;
  & > * {
    margin: 0.2rem;
  }

`

const FieldInfo = styled.section`
  padding: 0 1rem;
  & > .vp {
    
  }
  & > .token-count {

  }
`

const TokenCount = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 1.8em;
  text-align: center;
`

const MyField = ({ field, handler, player, ...props }) => {
  const { victoryPoints, tokenAssets } = field
  const totalTokenCount = Object.values(tokenAssets).reduce((total, count) => total + count, 0)

  return (
    <StyledField {...props}>
      <FieldSummary name={player.name || player.id} field={field} />
      <ReserveedDevelopments>
        {field.reservedDevs.map((dev) => (
          <Card key={dev} small onClick={() => {
            handler('reserved', dev)
          }} dev={dev} />
        ))}
      </ReserveedDevelopments>
      <FieldInfo>
        <VictoryPointsMarker
          size={100}
          className="vp"
          score={victoryPoints}
          total={DEFAULT_SETTING.victoryPointGoal} />
        <Blank height={20} />
        <TokenCount className="token-count">
          {totalTokenCount}/{DEFAULT_SETTING.playerTokenLimit}
        </TokenCount>
      </FieldInfo>
    </StyledField>
  )
}

MyField.propTypes = {
  field: PropTypes.shape({
    victoryPoints: PropTypes.number,
    tokenAssets: PropTypes.objectOf(PropTypes.number)
  })
}

export default MyField