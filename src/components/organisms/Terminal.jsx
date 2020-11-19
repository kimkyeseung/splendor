import React from 'react'
import styled from 'styled-components'
import { Blank, Flex, Box, Button, Modal } from 'components'

const Title = styled.div`
  text-align: center;
  font-size: 200px;
  color: ${({ theme }) => theme.white};
  text-shadow: 6px 6px ${({ theme }) => theme.title};
  font-family: ${({ theme }) => theme.font.title};
`

const Select = styled.div`
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
`

const Message = styled.div`

`

const Input = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px;
  & > label {
    width: 120px;
  }
`

Input.Wrapper = styled.div`
`

const Item = styled.div`
  &:not(:first-child):not(:last-child) {
    padding: 0 1.25rem;
  }
`

const Terminal = ({
}) => {
  return (
    <>
      <Blank height={160} />
      <Title>Splendor</Title>
      <Blank height={100} />
      <Box>
        <Flex>
          <Item>
            <Button to="/play">Join game</Button>
          </Item>
          <Item>
            <Button onClick={() => {}}>New game</Button>
          </Item>
          <Item>
            <Button onClick={() => {}}>Pass & Play</Button>
          </Item>
        </Flex>
      </Box>

      <Modal isOpen={false} onClose={() => {
      }}>
        <Select>
          <Message>Select the number of people who will participate in the game</Message>
          <Blank height={20} />
          <Flex>
            {[2, 3, 4].map(num => (
              <Button
                key={num}
                onClick={() => {
                }}>{num}</Button>
            ))}
          </Flex>
        </Select>

        <Blank height={30} />
        <Select>
          <Message>Enter names for the players</Message>
          <Blank height={20} />
          <Input.Wrapper>
          </Input.Wrapper>
        </Select>
        <Blank height={30} />
        <Select>
          <Button onClick={ev => {
            ev.preventDefault()
          }}>
            Start Game
          </Button>
        </Select>
      </Modal>
    </>
  )
}

export default Terminal
