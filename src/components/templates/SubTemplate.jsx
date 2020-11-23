import React from 'react'
import styled from 'styled-components'
import { Blank, Title, Footer, Box, Gc } from 'components'

const footerHeight = 100

const Template = styled.div`
  position: relative;
  min-height: 100%;
  padding-bottom: ${footerHeight}px;
  & .footer {
    width: 100%;
    height: ${footerHeight}px;
    position: absolute;
    bottom: 0;
    text-align: center;
  }
  @media screen and (max-device-width: 980px) {
    & .box {
      padding-bottom: 0;
    }
    & .footer {
      display: none;
    }
  }
`

export const SubTemplate = ({ content }) => (
  <Template>
    <Blank height={160} mHeight={10}/>
    <Title className="title" />
    <Blank height={100} mHeight={5}/>
    <Box className="box">
      {content}
    </Box>
    <Footer className="footer" />
    <Gc />
  </Template>
)
