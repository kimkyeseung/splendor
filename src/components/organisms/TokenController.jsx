import React from 'react'
import styled from 'styled-components'
import Token from './Token'
import { Flex, Blank, Button, Modal } from 'components'

const Message = styled.div`
  font-size: 1.2em;
  color: ${({ theme }) => theme.grayscale[6]};
`

const TokenController = ({
  message,
  onClose,
  tokens = [],
  onTokenClick,
  confirmSelectedToken
}) => {
  return (
    <Modal isOpen={true} dimmed={false} onClose={onClose}>
      <Message>{message}</Message>
      <Blank height={20} />
      <Flex justifyContent="center">
        {Array.isArray(tokens)
          ? tokens.map((token, i) => (
            <Token
              onClick={() => {
                onTokenClick(i)
              }}
              color={token}
              key={token + i} />))
          : Object.keys(tokens).map((token, i) => (
            tokens[token]
              ? <Token key={token} onClick={() => {
                onTokenClick(token)
              }} color={token} count={tokens[token]} />
              : null
          ))}
      </Flex>
      <Blank height={20} />
      <Flex>
        <Button primary onClick={ev => {
          ev.preventDefault()
          confirmSelectedToken()
        }}>Confirm</Button>
      </Flex>
    </Modal>
  )
}

export default TokenController
