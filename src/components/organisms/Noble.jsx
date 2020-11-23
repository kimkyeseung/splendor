import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Cost from './Cost'
import { NOBLES } from 'assets'
import { VictoryPoints } from 'components'

const basicSize = 150

const background = css`
  background-repeat: no-repeat;
  background-image: url('/image/noble_img_sprite.jpg');
  background-size: cover;
  background-position-y: 0;
  &.NB01 { background-position-x: 0; }
  &.NB02 { background-position-x: -${basicSize}px; }
  &.NB03 { background-position-x: -${basicSize * 2}px; }
  &.NB04 { background-position-x: -${basicSize * 3}px; }
  &.NB05 { background-position-x: -${basicSize * 4}px; }
  &.NB06 { background-position-x: -${basicSize * 5}px; }
  &.NB07 { background-position-x: -${basicSize * 6}px; }
  &.NB08 { background-position-x: -${basicSize * 7}px; }
  &.NB09 { background-position-x: -${basicSize * 8}px; }
  &.NB10 { background-position-x: -${basicSize * 9}px; }
`

const normalStyle = css`
  ${background}
  & > header {
    width: 40px;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    padding: 0.2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    & > .vp {
      color: white;
      font-size: 2.6em;
      margin: 0;
      text-align: center;
      -webkit-text-stroke-width: 1px;
      -webkit-text-stroke-color: black;
    }
    & > .condition {
      padding: 0 0.4rem;
    }
  }
`

const Tile = styled.div`
  height: ${basicSize}px;
  width: ${basicSize}px;
  border-radius: 8px;
  margin: 0.4rem;
  padding: 0;
  overflow: hidden;
  ${normalStyle}
  @media screen and (max-device-width: 980px) {
    height: ${basicSize / 2}px;
    width: ${basicSize / 2}px;
    & > header {
      width: 20px;
      & > .vp {
        font-size: 1.5em;
      }
    }
  }
`

const Noble = ({ noble, handler }) => {
  const { condition, id, victoryPoint } = NOBLES[noble]

  return (
    <Tile className={id} onClick={ev => {
      handler(noble)
    }}>
      <header>
        <VictoryPoints className="vp">{victoryPoint}</VictoryPoints>
        <div className="condition">
          {Object.keys(condition).map((color, i) => (
            <Cost key={i} value={color} amount={condition[color]} solid />
          ))}
        </div>
      </header>
    </Tile>
  )
}

Noble.propTypes = {
  noble: PropTypes.oneOf(Object.keys(NOBLES)).isRequired
}

Noble.defaultProps = {
  handler: () => { }
}

export default Noble
