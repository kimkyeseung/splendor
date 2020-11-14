import styled from 'styled-components'
import PropTypes from 'prop-types'

export const Flex = styled.div`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  flex-direction: ${({ flexDirection }) => flexDirection};
  flex-wrap: ${({ flexWrap }) => flexWrap};
  margin: ${({ margin }) => typeof margin === 'string' ? margin : `${margin}px`};
  padding: ${({ padding }) => typeof padding === 'string' ? padding : `${padding}px`};
`

Flex.propTypes = {
  justifyContent: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-around', 'space-between']),
  flexDirection: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
  alignItems: PropTypes.oneOf(['stretch', 'flex-start', 'flex-end', 'center', 'baseline']),
  flexWrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
  margin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

Flex.defaultProps = {
  justifyContent: 'space-between',
  flexDirection: 'row',
  alignItems: 'center',
  flexWrap: 'nowrap',
  margin: 0,
  padding: 0
}
