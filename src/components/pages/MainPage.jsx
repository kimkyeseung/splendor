import React from 'react'
import styled from 'styled-components'
import MainContainer from 'containers/MainContainer'
import { Blank, Title, Footer, Box, Gc } from 'components'

const footerHeight = 100

const Page = styled.div`
  position: relative;
  min-height: 100%;
  padding-bottom: ${footerHeight}px;
  width: 100%;
  & .footer {
    width: 100%;
    height: ${footerHeight}px;
    position: absolute;
    bottom: 0;
    text-align: center;
  }
  @media screen and (max-device-width: 980px) {
    padding-bottom: 10vh;
    & .footer {
      height: 10vh
    }
  }
`

export const MainPage = ({ ...props }) => (
  <Page>
    <Blank height={160} mHeight={20} />
    <Title size="large" />
    <Blank height={100} mHeight={10} />
    <Box className="box">
      <MainContainer {...props} />
    </Box>
    <Footer className="footer" />
    <Gc />
  </Page>
)