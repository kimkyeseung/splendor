import PropTypes from 'prop-types'
import styled from 'styled-components'

export const Blank = styled.div`
  display: block;
  height: ${({ height }) => height ? `${height}px` : '100px'};
  width: ${({ width }) => width ? `${width}px` : '100%'};
  @media screen and (max-device-width: 980px) {
    height: ${({ mHeight }) => mHeight ? `${mHeight}vh` : 0};
  }
`

Blank.propTypes = {
  inline: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  mHeight: PropTypes.number
}
