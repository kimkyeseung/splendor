import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

const backColors = [
  '#27ae60',
  '#f39c12',
  '#2980b9'
]

const normalStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-image: url(${({ backgroundUrl }) => backgroundUrl || ''});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  & > .header {
    height: 50px;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: space-between;
    padding: 0.2rem;
    border-radius: 12px 12px 0 0;
  }
`

const emptyStyle = css`
  border: 2px dotted gray;
  box-shadow: none;
`

const backStyle = css`
  border: 8px solid white;
  background: ${({ grade }) => backColors[grade - 1]};
`

const largeSize = css`
  height: 240px;
  width: 200px;
  border-radius: 15px;
  & > .header {
    height: 60px;
    border-radius: 15px 15px 0 0;
    & > .vp, .value {
      transform: translate3d(0px, 0px, 25px);
    }
  }
  & .cost {
    transform: translate3d(0px, 0px, 20px);
    font-size: 1.3em;
    width: 30px; height: 30px;
  }
  .title {
    font-size: 32px;
    transform: translate3d(0px, 0px, 40px);
  }
`

const thumbnailSize = css`
  height: 36px;
  width: 30px;
  border-width: 3px;
  border-radius: 3px;
  box-shadow: 1px 1px 2px 0px rgba(0,0,0,0.25);
  margin: 0;
  &:not(:last-child) {
    margin-right: 0.2rem;
  }
`

const Space = styled.div`
  height: 180px;
  width: 150px;
  border-radius: 12px;
  margin: 0.4rem;
  padding: 0;
  box-shadow: 2px 2px 4px 0px rgba(0,0,0,0.25);
  ${({ empty }) => empty ? emptyStyle : normalStyle};
  ${({ blind }) => blind && backStyle};
  ${({ large }) => large && largeSize};
  ${({ thumbnail }) => thumbnail && thumbnailSize};
`

Space.propTypes = {
  backgroundUrl: PropTypes.string,
  onClick: PropTypes.func,
  blind: PropTypes.bool,
  thumbnail: PropTypes.bool
}

export default Space
