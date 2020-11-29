import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { DEFAULT_SETTING } from 'config'
import { Flex, Blank } from 'components'
import Space from './Space'
import { DEVELOPMENT_CARDS } from 'assets'

const StyledFieldSummary = styled.div`
  padding: 0.5rem 0;
  opacity: 0.7;
  & .developments {
    display: flex;
    & > * {
      margin-right: -20px;
    }
  }
  & .tokens {
    display: flex;
  }
  ${({ active }) => active && activeCSs};

  @media screen and (max-device-width: 980px) {
  }
`

const activeCSs = css`
  opacity: 1;
  @media screen and (max-device-width: 980px) {
    transform: none;
  }
`

const Development = styled.div`
  height: 36px;
  width: 30px;
  line-height: 40px;
  font-size: 1.8em;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.grayscale[5]};
  color: ${({ theme }) => theme.white};
  text-align: center;
  font-size: 1.8em;
  line-height: 40px;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  ${({ theme, value }) => theme.colorSet[value]};
  ${({ blank }) => blank && `
    border: 0;
  `}
  @media screen and (max-device-width: 980px) {
    height: 32px; width: 24px;
    border-radius: 3px;
    font-size: 1.5em;
    line-height: 32px;
  }
`

const Token = styled.div`
  border-radius: 100%;
  color: ${({ theme }) => theme.white};
  text-align: center;
  margin-right: -10px;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  height: 24px;
  width: 24px;
  line-height: 24px;
  border: 1px solid ${({ theme }) => theme.grayscale[5]};
  ${({ theme, value }) => theme.colorSet[value]};
`

const TokenCount = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 1.8em;
`

const FieldSummary = ({ active, field }) => {
  const { developments, tokenAssets, reservedDevs } = field
  const totalTokenCount = Object.values(tokenAssets).reduce((total, count) => total + count, 0)

  return (
    <StyledFieldSummary active={active}>
      <div className="developments">
        {developments.map(dev => {
          const { grade } = DEVELOPMENT_CARDS[dev]

          return (
            <Space key={dev} blind grade={grade} thumbnail />
          )
        })}
      </div>
      <div className="tokens">
        {Object.keys(tokenAssets).reduce((tokens, value) =>
          tokenAssets[value]
            ? [...tokens, ...Array(tokenAssets[value])
              .fill(value)]
            : tokens, []).map((value, index) => (
              <Token
                key={index}
                value={value} />
            ))}
      </div>
      <Blank height={15} />
      <Flex justifyContent="space-around">
        {reservedDevs.map(dev => {
          const { grade } = DEVELOPMENT_CARDS[dev]

          return (
            <Space key={dev} blind grade={grade} thumbnail />
          )
        })}
      </Flex>
    </StyledFieldSummary >
  )
}

FieldSummary.propTypes = {
  field: PropTypes.object,
  active: PropTypes.bool
}

export default FieldSummary
