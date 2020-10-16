import styled from 'styled-components'
import PropTypes from 'prop-types'

export const Block = styled.div`
  margin: ${({ margin }) => typeof margin === 'string' ? margin : `${margin}px`};
  padding: ${({ padding }) => typeof padding === 'string' ? padding : `${padding}px`};
  display: ${({ display }) => display};
  width: ${({ width }) => typeof width === 'string' ? width : `${width}px`};
  height: ${({ height }) => typeof height === 'string' ? height : `${height}px`};
`

Block.propTypes = {
  margin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

Block.defaultProps = {
  display: 'block',
  width: '100%',
  height: '100%',
  margin: 0,
  padding: 0
}