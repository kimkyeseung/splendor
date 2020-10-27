import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Flex, Blank } from './units'
import { Button, Modal } from './ui'

const Message = styled.div`
  font-size: 5em;
  color: ${({ theme }) => theme.grayscale[8]};
`

const Result = ({ G, ctx, playerID, winner }) => {
  const isWin = winner === playerID
  const { fields } = G

  return (
    <Modal isOpen={true}>
      <Message>{isWin ? 'You Win' : 'You Lose'}</Message>
      <Blank height={20} />
      <div>
        {Object.keys(fields).map(player => (
          <Flex key={player}>
            <div className="player">{player}</div>
            <div className="score">{fields[player].victoryPoints}</div>
          </Flex>
        ))}
      </div>
      <Blank height={20} />
      <Flex>
        <Link to={'/'}>
          <Button onClick={ev => {
            ev.preventDefault()
          }}>Go to Main</Button>
        </Link>
      </Flex>
    </Modal>
  )
}

export default Result
