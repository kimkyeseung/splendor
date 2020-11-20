import React from 'react'
import styled from 'styled-components'
import { Blank, Flex, Button, Modal } from 'components'

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

const Items = styled(Flex)`

  @media screen and (max-device-width: 980px) {
    flex-direction: column;
  }
`

const Item = styled.div`
  &:not(:first-child):not(:last-child) {
    padding: 0 1.25rem;
  }
  @media screen and (max-device-width: 980px) {
    width: 80vw;
    padding: 0;
    & > * {
      width: 100%;
    }
    &:not(:first-child):not(:last-child) {
      padding: 0;
    }
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
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
      <Items>
        <Item>
          <Button to="/join">Join Game</Button>
        </Item>
        <Item>
          <Button onClick={() => createGame()}>New Game</Button>
        </Item>
        <Item>
          <Button onClick={() => toggleModal('playModal')}>Pass & Play</Button>
        </Item>
      </Items>

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
