import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Blank } from 'components'
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
    padding: 0;
    padding-top: 0.2rem;
  }
`

const activeCSs = css`
  opacity: 1;
  @media screen and (max-device-width: 980px) {
    transform: none;
  }
`

const Token = styled.div`
  border-radius: 100%;
  margin-right: -12px;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  height: 24px;
  width: 24px;
  line-height: 24px;
  border: 1px solid ${({ theme }) => theme.grayscale[5]};
  ${({ theme, value }) => theme.colorSet[value]};
  @media screen and (max-device-width: 980px) {
    margin-right: -17.5px;
  }
`

const FieldSummary = ({ active, field }) => {
  const { developments, tokenAssets } = field

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
      <Blank height={10} mHeight={0.5} />
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
    </StyledFieldSummary >
  )
}

FieldSummary.propTypes = {
  field: PropTypes.object,
  active: PropTypes.bool
}

export default FieldSummary
