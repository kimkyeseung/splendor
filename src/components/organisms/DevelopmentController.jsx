import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Card from './Card'
import { Flex, Blank, Button, Modal } from 'components'
import Tilt from 'react-tilt'

const Message = styled.div`
  font-size: 1.2em;
  color: ${({ theme }) => theme.grayscale[6]};
`

const DevelopmentController = ({
  message,
  focusedDevelopment = {},
  deselectDevelopment,
  buySelectedDevelopment,
  reserveSelectedDevelopment,
  type
}) => {
  const { grade } = focusedDevelopment
  const reserved = type === 'reserved'
  const blind = type === 'deck'

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
        {!blind && <Button icon="money" primary onClick={ev => {
          ev.preventDefault()
          buySelectedDevelopment()
        }}>Purchase</Button>}
        {!reserved && <Button icon="cart" secondary onClick={ev => {
          ev.preventDefault()
          reserveSelectedDevelopment()
        }}>Reserve</Button>}
        <Button onClick={() => {
          deselectDevelopment()
        }}>Cancel</Button>
      </Flex>
    </Modal>
  )
}

DevelopmentController.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['board', 'reserved', 'deck'])
}

export default DevelopmentController
