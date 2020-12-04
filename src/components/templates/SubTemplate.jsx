import React from 'react'
import styled from 'styled-components'
import { Blank, Title, Footer, Box, Gc } from 'components'

const Template = styled.div`
  position: relative;
  min-height: 100%;
  width: 100%;
  & .header {
    height: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & .body {
    height: 60%;
    overflow: hidden;
  }
  & .footer {
    width: 100%;
    height: 10%;
    position: absolute;
    bottom: 0;
    text-align: center;
  }
  @media screen and (max-device-width: 980px) {
    & .header {
      height: 20%;
    }
    & .body {
      height: 70%;
      padding-bottom: 0;
    }
    & .footer {
      height: 10%;
    }
  }
`

export const SubTemplate = ({ content }) => (
  <Template>
    <div className="header">
      <Title className="title" />
    </div>
    <Box className="box" className="body">
      {content}
    </Box>
    <Footer className="footer" />
    <Gc />
  </Template>
)
