import React, { useState } from 'react'
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
  const [createModalOpen, setCreateModalOpen] = useState(false)
  // 온라인 방은 실제로 참가할 인원수만큼만 자리를 만들어야 한다. 실제 참가
  // 인원과 무관하게 항상 4인용으로 방을 만들면, 2~3인이 시작해도 턴 순서에
  // 아무도 없는 자리가 섞여 들어가 그 자리에서 게임이 영원히 멈춘다.
  const [onlinePlayerNum, setOnlinePlayerNum] = useState(4)

  return (
    <>
      <Items>
        <Item>
          <Button to="/join">Join Game</Button>
        </Item>
        <Item>
          <Button onClick={() => setCreateModalOpen(true)}>New Game</Button>
        </Item>
        <Item>
          <Button onClick={() => toggleModal('playModal')}>Pass & Play</Button>
        </Item>
      </Items>

      <Modal isOpen={createModalOpen} onClose={() => {
        setCreateModalOpen(false)
      }}>
        <Select>
          <Message>Select the number of people who will participate in the game</Message>
          <Blank height={20} />
          <Flex>
            {[2, 3, 4].map(num => (
              <Button
                key={num}
                primary={onlinePlayerNum === num}
                onClick={() => {
                  setOnlinePlayerNum(num)
                }}>{num}</Button>
            ))}
          </Flex>
        </Select>
        <Blank height={30} />
        <Select>
          <Button onClick={ev => {
            ev.preventDefault()
            createGame(onlinePlayerNum)
          }}>
            Create Room
          </Button>
        </Select>
      </Modal>

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
