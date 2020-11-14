import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

const backColors = [
  '#27ae60',
  '#f39c12',
  '#2980b9'
]

const basicWidth = 150
const basicHeight = 180

const getBackgroundStyle = (ratio = 1) => css`
  background-repeat: no-repeat;
  background-image: url('/image/developments_img_sprite.jpg');
  background-size: 1000%;
  background-position-y: 0;
  &.DEV101B, &.DEV103B, &.DEV105B, &.DEV107B {
    background-position-x: -${basicWidth * ratio * 6}px;
    background-position-y: -${basicHeight * ratio * 2}px;
  }
  &.DEV102B, &.DEV104B, &.DEV106B, &.DEV108B {
    background-position-x: -${basicWidth * ratio * 7}px;
    background-position-y: -${basicHeight * ratio * 2}px;
  }
  &.DEV109G, &.DEV111G, &.DEV113G, &.DEV115G {
    background-position-x: -${basicWidth * ratio * 4}px;
    background-position-y: -${basicHeight * ratio * 2}px;
  }
  &.DEV110G, &.DEV112G, &.DEV114G, &.DEV116G {
    background-position-x: -${basicWidth * ratio * 5}px;
    background-position-y: -${basicHeight * ratio * 2}px;
  }
  &.DEV117K, &.DEV119K, &.DEV121K, &.DEV123K {
    background-position-x: -${basicWidth * ratio * 8}px;
    background-position-y: -${basicHeight * ratio * 2}px;
  }
  &.DEV118K, &.DEV120K, &.DEV122K, &.DEV124K {
    background-position-x: -${basicWidth * ratio * 9}px;
    background-position-y: -${basicHeight * ratio * 2}px;
  }
  &.DEV125R, &.DEV127R, &.DEV129R, &.DEV131R {
    background-position-x: -${basicWidth * ratio * 2}px;
    background-position-y: -${basicHeight * ratio * 2}px;
  }
  &.DEV126R, &.DEV128R, &.DEV130R, &.DEV132R {
    background-position-x: -${basicWidth * ratio * 3}px;
    background-position-y: -${basicHeight * ratio * 2}px;
  }
  &.DEV133W, &.DEV135W, &.DEV137W, &.DEV139W {
    background-position-x: 0;
    background-position-y: -${basicHeight * ratio * 2}px;
  }
  &.DEV134W, &.DEV136W, &.DEV138W, &.DEV140W {
    background-position-x: -${basicWidth * ratio * 1}px;
    background-position-y: -${basicHeight * ratio * 2}px;
  }
  &.DEV201B, &.DEV203B, &.DEV205B {
    background-position-x: -${basicWidth * ratio * 6}px;
    background-position-y: -${basicHeight * ratio}px;
  }
  &.DEV202B, &.DEV204B, &.DEV206B {
    background-position-x: -${basicWidth * ratio * 7}px;
    background-position-y: -${basicHeight * ratio}px;
  }
  &.DEV207G, &.DEV209G, &.DEV211G {
    background-position-x: -${basicWidth * ratio * 4}px;
    background-position-y: -${basicHeight * ratio}px;
  }
  &.DEV208G, &.DEV210G, &.DEV212G {
    background-position-x: -${basicWidth * ratio * 5}px;
    background-position-y: -${basicHeight * ratio}px;
  }
  &.DEV213K, &.DEV215K, &.DEV217K {
    background-position-x: -${basicWidth * ratio * 8}px;
    background-position-y: -${basicHeight * ratio}px;
  }
  &.DEV214K, &.DEV216K, &.DEV218K {
    background-position-x: -${basicWidth * ratio * 9}px;
    background-position-y: -${basicHeight * ratio}px;
  }
  &.DEV219R, &.DEV221R, &.DEV223R {
    background-position-x: -${basicWidth * ratio * 2}px;
    background-position-y: -${basicHeight * ratio}px;
  }
  &.DEV220R, &.DEV222R, &.DEV224R {
    background-position-x: -${basicWidth * ratio * 3}px;
    background-position-y: -${basicHeight * ratio}px;
  }
  &.DEV225W, &.DEV227W, &.DEV229W {
    background-position-x: 0;
    background-position-y: -${basicHeight * ratio}px;
  }
  &.DEV226W, &.DEV228W, &.DEV230W {
    background-position-x: -${basicWidth * ratio}px;
    background-position-y: -${basicHeight * ratio}px;
  }
  &.DEV301B, &.DEV303B {
    background-position-x: -${basicWidth * ratio * 6}px;
  }
  &.DEV302B, &.DEV304B {
    background-position-x: -${basicWidth * ratio * 7}px;
  }
  &.DEV305G, &.DEV307G {
    background-position-x: -${basicWidth * ratio * 4}px;
  }
  &.DEV306G, &.DEV308G {
    background-position-x: -${basicWidth * ratio * 5}px;
  }
  &.DEV309K, &.DEV311K {
    background-position-x: -${basicWidth * ratio * 8}px;
  }
  &.DEV310K, &.DEV312K {
    background-position-x: -${basicWidth * ratio * 9}px;
  }
  &.DEV313R, &.DEV315R {
    background-position-x: -${basicWidth * ratio * 2}px;
  }
  &.DEV314R, &.DEV316R {
    background-position-x: -${basicWidth * ratio * 3}px;
  }
  &.DEV317W, &.DEV319W {
    background-position-x: 0;
  }
  &.DEV318W, &.DEV320W {
    background-position-x: -${basicWidth * ratio}px;
  }
`

const normalStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${getBackgroundStyle()}
  & > .header {
    min-height: ${basicHeight / 18 * 5}px;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: space-between;
    padding: 0 0.5rem;
    border-radius: 12px 12px 0 0;
    & > .vp {
      font-size: 2.6em;
    }
    & > .value {
      width: ${basicWidth / 15 * 4}px;
      height: ${basicHeight / 18 * 4}px;
    }
  }
  & > .costs {
    padding: 0.2rem;
    & > .cost {
      width: ${basicWidth / 15 * 2.6}px;
      height: ${basicHeight / 18 * 2.6}px;
      font-size: 1.5em;
    }
  }
`

const emptyStyle = css`
  background-image: none;
  border: 2px dotted gray;
  box-shadow: none;
`

const backStyle = css`
  background-image: none;
  border: 8px solid white;
  background: ${({ grade }) => backColors[grade - 1]};
`

const largeSize = css`
  height: ${basicHeight * 1.5}px;
  width: ${basicWidth * 1.5}px;
  border-radius: 18px;
  ${getBackgroundStyle(1.5)}
  & > .header {
    min-height: ${basicHeight / 18 * 5 * 1.5}px;
    border-radius: 18px 18px 0 0;
    padding: 0 0.75rem;
    & > .vp {
      font-size: ${2.6 * 1.5}em;
      transform: translate3d(0px, 0px, 30px);
    }
    & > .value {
      height: ${basicHeight / 18 * 4 * 1.5}px;
      width: ${basicWidth / 15 * 4 * 1.5}px;
      transform: translate3d(0px, 0px, 25px);
    }
  }
  & > .costs {
    padding: 0.3rem;
    & > .cost {
      width: ${basicWidth / 15 * 2.6 * 1.5}px;
      height: ${basicHeight / 18 * 2.6 * 1.5}px;
      font-size: 2.5em;
      margin: 0.3rem;
      transform: translate3d(0px, 0px, 20px);
    }
  }
  .title {
    font-size: 32px;
    transform: translate3d(0px, 0px, 40px);
  }
`

const thumbnailSize = css`
  height: ${basicHeight * 0.2}px;
  width: ${basicWidth * 0.2}px;
  border-width: 3px;
  border-radius: 3px;
  box-shadow: 1px 1px 2px 0px rgba(0,0,0,0.25);
  margin: 0;
  &:not(:last-child) {
    margin-right: 0.2rem;
  }
`

const Space = styled.div`
  height: ${basicHeight}px;
  width: ${basicWidth}px;
  border-radius: 12px;
  margin: 0.4rem;
  padding: 0;
  box-shadow: 2px 2px 4px 0px rgba(0,0,0,0.25);
  ${({ empty }) => empty ? emptyStyle : normalStyle};
  ${({ large }) => large && largeSize};
  ${({ blind }) => blind && backStyle};
  ${({ thumbnail }) => thumbnail && thumbnailSize};
`

Space.propTypes = {
  onClick: PropTypes.func,
  blind: PropTypes.bool,
  thumbnail: PropTypes.bool
}

export default Space
