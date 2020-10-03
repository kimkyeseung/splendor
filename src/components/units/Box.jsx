import styled from 'styled-components'
import PropTypes from 'prop-types'

export const Box = styled.div`
  box-sizing: border-box;
  border: 1px solid;
  margin: ${({ margin }) => typeof margin === 'string' ? margin : `${margin}px`};
  padding: ${({ padding }) => typeof padding === 'string' ? padding : `${padding}px`};
  display: ${({ display }) => display};
  width: ${({ width }) => typeof width === 'string' ? width : `${width}px`};
  height: ${({ height }) => typeof height === 'string' ? height : `${height}px`};
`

Box.propTypes = {
  margin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

Box.defaultProps = {
  display: 'block',
  width: '100%'
}