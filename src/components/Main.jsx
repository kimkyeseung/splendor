import React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { Space, Flex } from '../components/units'
import { Box, Button } from './ui'

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

const activeCss = css`
  background: blue;
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

const StartButton = styled.button`

`

const Main = ({ createGame, setPlayerNum, playerNum, playerNames, setPlayerName, startGame }) => {
  return (
    <>
      <Space height={160} />
      <Title>Splendor</Title>
      <Space height={100} />
      <Box>

        <Select>
          <Message>게임에 참여할 인원을 선택해주세요</Message>
          <Space height={20} />
          <Flex>
            {[2, 3, 4].map(num => (
              <Button
                key={num}
                isActive={playerNum === num}
                onClick={ev => {
                  setPlayerNum(num)
                }}>{num}</Button>
            ))}
          </Flex>
        </Select>

        <Space height={30} />
        <Select>
          <Message>플레이어의 이름을 입력해주세요</Message>
          <Space height={20} />
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

        <Space height={30} />
        <Select>
          <StartButton onClick={ev => {
            ev.preventDefault()
            startGame()
          }}>
            시작하기
          </StartButton>
        </Select>
        <Link to="/play">참가</Link>

        <div
          className="card"
          onClick={() => createGame()}
        >
          <div className="card-inside start">
            <h1>new game</h1>
          </div>
        </div>
      </Box>
    </>
  )
}

export default Main
