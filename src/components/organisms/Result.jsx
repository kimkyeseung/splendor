import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Flex, Blank } from '../atoms'
import { Button, Modal } from '../molecules'

const Title = styled.div`
  text-align: center;
  font-size: 60px;
  color: ${({ theme }) => theme.title};
  font-family: ${({ theme }) => theme.font.title};
`
const Message = styled.div`
  font-size: 3em;
  color: ${({ theme }) => theme.grayscale[8]};
  text-align: center;
`

const Result = ({ G, ctx, playerID, winner, history }) => {
  const isWin = winner === playerID
  const { fields } = G

  return (
    <Modal isOpen={true} closable={false}>
      <Blank height={20} />
      <Title>Splendor</Title>
      <Blank height={20} />
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
      <Flex justifyContent="center">
        <Button onClick={ev => {
          ev.preventDefault()
          history.push('/')
        }}>Go to Main</Button>
      </Flex>
    </Modal>
  )
}

export default Result
