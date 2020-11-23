import React from 'react'
import styled from 'styled-components'
import { Blank, Block, Flex, Title } from 'components'

const Template = styled.div`
  position: relative;
  min-height: 100%;
  & .container {
    width: '100%';
    flex-grow: 1;
  }
  @media screen and (max-device-width: 980px) {
    .title {
      display: none;
    }
  }
`

export const BoardTemplate = ({ opponents, developments, nobles, tokens, player }) => (
  <Template>
    <Blank height={30} />
    <Title className="title" />
    <Blank height={20} mHeight={5} />
    <Flex className="container">
      <Block width="20%" style={{ alignSelf: 'stretch' }}>
        {opponents}
      </Block>
      <Block flex='1 1 auto'>
        <Flex>
          <Block>
            {developments}
          </Block>
          <Block width="fit-content">
            {tokens}
          </Block>
        </Flex>
      </Block>
      <Block width="fit-content">
        {nobles}
      </Block>
    </Flex>
    {player}
  </Template>
)
