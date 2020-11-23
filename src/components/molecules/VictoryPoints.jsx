import styled from 'styled-components'

export const VictoryPoints = styled.div`
  color: white;
  font-size: 2em;
  margin: 0;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  font-family: ${({ theme }) => theme.font.vp};
  @media screen and (max-device-width: 980px) {
    font-size: 1em;
  }
`