import React from 'react'
import styled from 'styled-components'
import { Blank, Flex } from '../components/units'
import { Box, Button, Modal } from './ui'

const Title = styled.div`
  text-align: center;
  font-size: 200px;
  color: ${({ theme }) => theme.white};
  text-shadow: 6px 6px ${({ theme }) => theme.title};
  font-family: ${({ theme }) => theme.font.title};
`

const Select = styled.div`
  text-align: center;
  max-width: 240px;
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
      <Title>Splendor</Title>
      <Blank height={100} />
      <Box>
        <Flex>
          <Item>
            <Button to="/play">join game</Button>
          </Item>
          <Item>
            <Button onClick={() => createGame()}>new game</Button>
          </Item>
          <Item>
            <Button onClick={() => toggleModal('playModal')}>pass & play</Button>
          </Item>
        </Flex>
      </Box>

      <Modal isOpen={playModal} onClose={() => {
        toggleModal('playModal')
      }}>
        <Select>
          <Message>게임에 참여할 인원을 선택해주세요</Message>
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
          <Message>플레이어의 이름을 입력해주세요</Message>
          <Blank height={20} />
          <Input.Wrapper>
            {Array(playerNum).fill().map((num, i) => (
              <Input key={i}>
                <label>
                  플레이어 <span>{i + 1}</span>
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
            시작하기
          </Button>
        </Select>
      </Modal>
    </>
  )
}

export default Main
