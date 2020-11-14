import React from 'react'
import styled from 'styled-components'
import Card from './Card'
import { Flex, Blank } from '../atoms'
import { Button, Modal } from '../molecules'
import Tilt from 'react-tilt'

const Message = styled.div`
  font-size: 1.2em;
  color: ${({ theme }) => theme.grayscale[8]};
`

const DevelopmentController = ({
  message,
  focusedDevelopment,
  deselectDevelopment,
  buySelectedDevelopment,
  reserveSelectedDevelopment,
  blind
}) => {
  const { grade } = focusedDevelopment

  return (
    <Modal isOpen={true} dimmed={false} onClose={deselectDevelopment}>
      <Message>{message}</Message>
      <Blank height={20} />
      <Flex justifyContent="center">
        <Tilt style={{ transformStyle: 'preserve-3d' }}>
          <Card
            dev={focusedDevelopment.id}
            grade={grade}
            blind={blind}
            large
          />
        </Tilt>
      </Flex>
      <Blank height={20} />
      <Flex>
        {!blind && <Button primary onClick={ev => {
          ev.preventDefault()
          buySelectedDevelopment()
        }}>Purchase</Button>}
        <Button secondary onClick={ev => {
          ev.preventDefault()
          reserveSelectedDevelopment()
        }}>Reserve</Button>
        <Button onClick={() => {
          deselectDevelopment()
        }}>Cancel</Button>
      </Flex>
    </Modal>
  )
}

export default DevelopmentController
