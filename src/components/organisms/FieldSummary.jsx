import React from 'react'
import styled, { css } from 'styled-components'
import config from '../../config'
import { DEFAULT_SETTING } from '../../lib/config'
import { Flex, Blank } from '../atoms'
import Space from './Space'

import DEVELOPMENT_CARDS from '../../assets/developmentCards.json'

const { theme } = config

const StyledFieldSummary = styled.div`
  position: relative;
  padding: 0.5rem 0;
  opacity: 0.8;
  ${({ active }) => active && activeCSs};
`

const activeCSs = css`
  opacity: 1;
  transform: scale(1.1);
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
  ${({ value }) => theme.basic[value]};
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
  ${({ value }) => theme.basic[value]};
`

Development.Wrapper = styled.div`
  display: flex;
  max-width: 160px;
  min-width: 140px;
  padding: 0.2rem 0;
  flex-wrap: wrap;
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

const Dev = styled.div`
  position: relative;
  margin-right: 12px;
  margin-bottom: 6px;
`

const FieldSummary = ({ active, field }) => {
  const { developments, tokenAssets, victoryPoints, reservedDevs } = field
  const totalTokenCount = Object.values(tokenAssets).reduce((total, count) => total + count, 0)
  const tokenList = ['white', 'blue', 'red', 'green', 'black']

  return (
    <StyledFieldSummary active={active}>
      <Development.Wrapper>
        {tokenList.map(value => (
          <Dev key={value}>
            <Development value={value}>{developments[value]}</Development>
            {tokenAssets[value] ?
              <Token value={value}>{tokenAssets[value]}</Token> : null}
          </Dev>
        ))}
        <Dev>
          <Development blank />
          {tokenAssets.yellow ? <Token value="yellow">{tokenAssets.yellow}</Token> : null}
        </Dev>
      </Development.Wrapper>
      {victoryPoints ? <VictoryPoint>{victoryPoints}</VictoryPoint> : null}
      <Blank height={15} />
      {<Flex>
        {totalTokenCount ? <loTokenCount>{totalTokenCount}/{DEFAULT_SETTING.playerTokenLimit}</loTokenCount> : null}
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
