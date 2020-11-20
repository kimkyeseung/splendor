import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const mobieDeviceStyle = css`
  display: block;
  height: ${({ mHeight }) => `${mHeight}vh`};
`

export const Blank = styled.div`
  display: block;
  height: ${({ height }) => height ? `${height}px` : '100px'};
  width: ${({ width }) => width ? `${width}px` : '100%'};
  @media screen and (max-device-width: 980px) {
    display: none;
    ${({ mHeight }) => mHeight && mobieDeviceStyle};
  }
`

Blank.propTypes = {
  inline: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  mHeight: PropTypes.number
}
