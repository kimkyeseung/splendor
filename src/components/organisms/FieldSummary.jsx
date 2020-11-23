import React from 'react'
import styled, { css } from 'styled-components'
import { DEFAULT_SETTING } from 'config'
import { Flex, Blank } from 'components'
import Space from './Space'
import { DEVELOPMENT_CARDS } from 'assets'

const StyledFieldSummary = styled.div`
  position: relative;
  padding: 0.5rem 0;
  opacity: 0.8;
  & .assets {
    display: flex;
    max-width: 160px;
    min-width: 140px;
    padding: 0.2rem 0;
    flex-wrap: wrap;
    & .asset {
      position: relative;
      margin-right: 12px;
      margin-bottom: 6px;
    }
  }
  ${({ active }) => active && activeCSs};
  @media screen and (max-device-width: 980px) {
    & .assets {
      max-width: 120px;
      & .asset {
        margin-right: 6px;
        margin-bottom: 3px;
      }
    }
  }
`

const activeCSs = css`
  opacity: 1;
  transform: scale(1.1);
  @media screen and (max-device-width: 980px) {
    transform: none;
  }
`

const Development = styled.div`
  border: 1px solid ${({ theme }) => theme.grayscale[5]};;
  height: 40px; width: 30px;
  border-radius: 4px;
  margin: 0 0.2rem;
  color: ${({ theme }) => theme.white};
  font-size: 1.8em;
  text-align: center;
  line-height: 40px;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  ${({ theme, value }) => theme.colorSet[value]};
  ${({ blank }) => blank && `
    border: 0;
  `}
`

const Token = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 5;
  transform: translate(12px, 12px);
  border: 1px solid gray;
  height: 24px; width: 24px;
  border-radius: 100%;
  color: ${({ theme }) => theme.white};
  text-align: center;
  line-height: 24px;
  margin: 0 0.26rem;
  font-size: 1.4em;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  ${({ theme, value }) => theme.colorSet[value]};
`

Token.Wrapper = styled.div`
  display: flex;
`

const VictoryPoint = styled.div`
  height: 40px; width: 40px;
  border-radius: 100%;
  text-align: center;
  line-height: 40px;
  color: ${({ theme }) => theme.white};
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  background-color: darkorange;
  border: 4px solid green;
  font-size: 2em;
  position: absolute;
  right: 5px;
  top: 5px;
`

const TokenCount = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 1.8em;
`

const FieldSummary = ({ active, field }) => {
  const { developments, tokenAssets, victoryPoints, reservedDevs } = field
  const totalTokenCount = Object.values(tokenAssets).reduce((total, count) => total + count, 0)
  const tokenList = ['white', 'blue', 'red', 'green', 'black']

  return (
    <StyledFieldSummary active={active}>
      <div className="assets">
        {tokenList.map(value => (
          <div className="asset" key={value}>
            <Development value={value}>{developments[value]}</Development>
            {tokenAssets[value] ?
              <Token value={value}>{tokenAssets[value]}</Token> : null}
          </div>
        ))}
        <div className="asset">
          <Development blank />
          {tokenAssets.yellow ? <Token value="yellow">{tokenAssets.yellow}</Token> : null}
        </div>
      </div>
      {victoryPoints ? <VictoryPoint>{victoryPoints}</VictoryPoint> : null}
      <Blank height={15} />
      {<Flex>
        {totalTokenCount ? <TokenCount>{totalTokenCount}/{DEFAULT_SETTING.playerTokenLimit}</TokenCount> : null}
        <Flex justifyContent="space-around">
          {reservedDevs.map(dev => {
            const { grade } = DEVELOPMENT_CARDS[dev]

            return (
              <Space key={dev} blind grade={grade} thumbnail />
            )
          })}
        </Flex>
      </Flex>}
    </StyledFieldSummary>
  )
}

export default FieldSummary
