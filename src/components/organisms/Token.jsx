import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const tokenSize = 90
const StyledToken = styled.div`
  display: flex;
  justify-content: space-between;
  & > .tokenBundle {
    position: relative;
    width: 105px; height: 105px;
  } 
  & > .count {

  }

  @media screen and (max-device-width: 980px) {
    & > .tokenBundle {
      width: 50px;
      height: 50px;
    }
  }
`

const Effect = styled.div`
  transition: all 0.2s;
  &:hover {
    transform: translateY(-4px);
  }
`

const One = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: ${tokenSize}px;
  height: ${tokenSize}px;
  border-radius: 100%;
  -webkit-box-shadow: 2px 2px 4px 0px rgba(0,0,0,0.25);
  -moz-box-shadow: 2px 2px 4px 0px rgba(0,0,0,0.25);
  box-shadow: 2px 2px 4px 0px rgba(0,0,0,0.25);
  top: ${({ index }) => `${index * 3}px`};
  left: ${({ index }) => `${index * 3}px`};
  border: 1px solid;
  padding: 0.7rem;
  ${({ theme, value }) => value && theme.colorSet[value]};
  &::after {
    content: '';
    display: block;
    border-radius: 100%;
    width: 100%;
    opacity: 0.75;
    background: lightgray;
  }

  @media screen and (max-device-width: 980px) {
    width: ${tokenSize / 2}px;
    height: ${tokenSize / 2}px;
    padding: 0.35rem;
  }
`

const Token = ({ color, count, ...props }) => (
  <StyledToken {...props}>
    <div className="tokenBundle">
      {Array(count).fill().map(
        (num, index, array) => index !== array.length - 1
          ? <One key={index} index={index} value={color} />
          : <Effect key={index}><One index={index} value={color} /></Effect>
      )}
    </div>
    <div className="count">{count}</div>
  </StyledToken>
)

Token.propTypes = {
  color: PropTypes.oneOf(['red', 'green', 'blue', 'yellow', 'black', 'white']).isRequired,
  count: PropTypes.number
}

export default Token
