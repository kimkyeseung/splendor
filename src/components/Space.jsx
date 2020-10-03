import styled, { css } from 'styled-components'

const normalStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-image: url(${({ backgroundUrl }) => backgroundUrl || ''});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  & > header {
    height: 50px;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: space-between;
    padding: 0.2rem;
    & > .vp {
      color: white;
      font-size: 2.6em;
      margin: 0;
      -webkit-text-stroke-width: 1px;
      -webkit-text-stroke-color: black;
    }
  }
`

const emptyStyle = css`
  border: 2px dotted gray; 
`

const Space = styled.div`
  height: 180px;
  width: 150px;
  border-radius: 12px;
  margin: 0.4rem;
  padding: 0;
  overflow: hidden;
  box-sizing: border-box;
  -webkit-box-shadow: 2px 2px 4px 0px rgba(0,0,0,0.25);
  -moz-box-shadow: 2px 2px 4px 0px rgba(0,0,0,0.25);
  box-shadow: 2px 2px 4px 0px rgba(0,0,0,0.25);
  ${({ empty }) => empty ? emptyStyle : normalStyle};
`

export default Space
