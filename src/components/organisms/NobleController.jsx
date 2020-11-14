import React from 'react'
import styled from 'styled-components'
import Noble from './Noble'
import { Flex, Blank } from '../atoms'
import { Modal } from '../molecules'

const Message = styled.div`
  font-size: 1.2em;
  color: ${({ theme }) => theme.grayscale[8]};
`

const LargeTile = styled.div`
  transform: scale(1.5);
  margin: 3rem 1rem 2rem;
`

const NobleController = ({ message, nobles = [], onNobleClick }) => {
  return (
    <Modal isOpen={true} closable={false}>
      <Message>{message}</Message>
      <Blank height={20} />
      <Flex jutifyContent="center">
        {nobles.map(noble => (
          <LargeTile key={noble}>
            <Noble noble={noble} handler={onNobleClick} />
          </LargeTile>
        ))}
      </Flex>
    </Modal>
  )
}

export default NobleController
