import React from 'react'
import styled from 'styled-components'
import { Blank, Title, Footer, Box } from 'components'

const footerHeight = 100

const Wrapper = styled.div`
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
`

export const SubTemplate = ({ content }) => (
  <Wrapper>
    <Blank height={160} />
    <Title />
    <Blank height={100} />
    <Box>
      {content}
    </Box>
    <Footer className="footer" />
  </Wrapper>
)
