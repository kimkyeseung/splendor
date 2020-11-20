import React from 'react'
import styled from 'styled-components'
import { Blank, Flex, Box, Button, Modal, Title } from 'components'

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

const Main = ({
  playModal,
  toggleModal,
  createGame,
  setPlayerNum,
  playerNum,
  playerNames,
  setPlayerName,
  startGame
}) => {
  return (
    <>
      <Blank height={160} />
      <Title size="large" />
      <Blank height={100} />
      <Box>
        <Flex>
          <Item>
            <Button to="/join">Join Game</Button>
          </Item>
          <Item>
            <Button onClick={() => createGame()}>New Game</Button>
          </Item>
          <Item>
            <Button onClick={() => toggleModal('playModal')}>Pass & Play</Button>
          </Item>
        </Flex>
      </Box>

      <Modal isOpen={playModal} onClose={() => {
        toggleModal('playModal')
      }}>
        <Select>
          <Message>Select the number of people who will participate in the game</Message>
          <Blank height={20} />
          <Flex>
            {[2, 3, 4].map(num => (
              <Button
                key={num}
                primary={playerNum === num}
                onClick={() => {
                  setPlayerNum(num)
                }}>{num}</Button>
            ))}
          </Flex>
        </Select>

        <Blank height={30} />
        <Select>
          <Message>Enter names for the players</Message>
          <Blank height={20} />
          <Input.Wrapper>
            {Array(playerNum).fill().map((num, i) => (
              <Input key={i}>
                <label>
                  Player <span>{i + 1}</span>
                </label>
                <input value={playerNames[i]} onChange={ev => {
                  setPlayerName(ev.target.value, i)
                }} />
              </Input>
            ))}
          </Input.Wrapper>
        </Select>
        <Blank height={30} />
        <Select>
          <Button onClick={ev => {
            ev.preventDefault()
            startGame()
          }}>
            Start Game
          </Button>
        </Select>
      </Modal>
    </>
  )
}

export default Main
