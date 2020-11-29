import React from 'react'
import styled from 'styled-components'
import FieldSummary from './FieldSummary'
import { DEFAULT_SETTING } from 'config'
import { Blank } from 'components'
import Card from './Card'
import VictoryPointsMarker from 'components/organisms/VictoryPointsMarker'

const StyledField = styled.section`
  padding: 2rem;
  display: flex;
  justify-content: center;
  position: relative;
  & > .icon {
    position: absolute;
    left: 20px;
    font-size: 10em;
    opacity: 0.1;
  }
`

const ReserveedDevelopments = styled.section`
  display: flex;
  justify-content: space-around;
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

const MyField = ({ field, handler, ...props }) => {
  const { victoryPoints, tokenAssets } = field
  const totalTokenCount = Object.values(tokenAssets).reduce((total, count) => total + count, 0)

  return (
    <StyledField {...props}>
      <FieldSummary field={field} />
      <ReserveedDevelopments>
        {field.reservedDevs.map((dev) => {

          return (
            <Card onClick={() => {
              handler('reserved', dev)
            }} dev={dev} />
          )
        })}
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

export default MyField