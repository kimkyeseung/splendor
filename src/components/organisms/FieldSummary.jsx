import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledFieldSummary = styled.div`
  position: relative;
  & .assets {
    display: flex;
    & .asset {
      position: relative;
      &:not(:first-child) {
        margin-left: 0.75rem;
      }
    }
  }
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

const Development = styled.div`
  height: 90px;
  width: 75px;
  line-height: 40px;
  font-size: 2em;
  border-radius: 8px;
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
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 5;
  border-radius: 100%;
  color: ${({ theme }) => theme.white};
  text-align: center;
  margin: 0 0.26rem;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  height: 46px;
  width: 46px;
  line-height: 46px;
  border: 2px solid ${({ theme }) => theme.grayscale[5]};
  font-size: 1.8em;
  transform: translate(23px, 23px);
  ${({ theme, value }) => theme.colorSet[value]};
`

const FieldSummary = ({ active, field, isMyField }) => {
  const { developments, tokenAssets, victoryPoints } = field
  const totalTokenCount = Object.values(tokenAssets).reduce((total, count) => total + count, 0)
  const tokenList = ['white', 'blue', 'red', 'green', 'black']

  return (
    <StyledFieldSummary active={active} isMyField={isMyField}>
      <div className="assets">
        {tokenList.map(value => (
          <div className="asset" key={value}>
            <Development
              isMyField={isMyField}
              value={value}>
              {developments[value]}
            </Development>
            {tokenAssets[value] ?
              <Token
                isMyField={isMyField}
                value={value}>
                {tokenAssets[value]}
              </Token>
              : null}
          </div>
        ))}
        <div className="asset">
          <Development blank isMyField={isMyField} />
          {tokenAssets.yellow
            ? <Token value="yellow" isMyField={isMyField}>
              {tokenAssets.yellow}
            </Token>
            : null}
        </div>
      </div>
    </StyledFieldSummary>
  )
}

FieldSummary.propTypes = {
  isMyField: PropTypes.bool,
  field: PropTypes.object,
  active: PropTypes.bool
}

export default FieldSummary
