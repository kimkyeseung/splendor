import React, { useRef } from 'react'
import styled from 'styled-components'
import { Space, Flex } from './units'
import { Box, Button, Modal } from './ui'

const Title = styled.div`
  text-align: center;
  font-size: 100px;
  color: ${({ theme }) => theme.white};
  text-shadow: 3px 3px ${({ theme }) => theme.title};
  font-family: ${({ theme }) => theme.font.title};
`

const List = styled.div`
  & > * {
    margin: 0.2rem;
  }
`

const Empty = styled.div`
  border: 2px dashed;
  border-color: ${({ theme }) => theme.grayscale[6]};
  border-radius: 10px;
  color: ${({ theme }) => theme.grayscale[4]};
  padding: 0.75rem 1.25rem;
`

const Player = styled.div`
  color: ${({ theme }) => theme.black};
  border: 2px solid;
  border-color: ${({ theme }) => theme.primary[0]};
  border-radius: 10px;
  padding: 0.75rem 1.25rem;
`

Player.Name = styled.div``

const Wrapper = styled.div`
  width: 800px;
  padding: 1rem;
`

const GameId = styled.div`
  border-radius: 10px;
  font-size: 1.25em;
  border: 2px solid black;
  padding: 0.75rem 1.25rem;
  font-family: ${({ theme }) => theme.font.context};
  background-color: ${({ theme }) => theme.grayscale[8]};
  color: ${({ theme }) => theme.grayscale[1]};
`


const Lobby = ({ gameId, players = [], startGame, myId }) => {
  const textAreaRef = useRef(null)

  const copyText = () => {
    const textField = document.createElement('textarea')
    textField.innerText = textAreaRef.current.innerText
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
  }

  return (
    <>
      <Space height={160} />
      <Title>Splendor</Title>
      <Space height={100} />
      <Box>
        <Flex justifyContent="center">
          <Wrapper>
            <Flex>
              <GameId
                ref={textAreaRef}
                readOnly
              >{`http://localhost:3000/lobby/${gameId}`}</GameId>
              <Button onClick={() => {
                copyText()
              }}>Copy</Button>
            </Flex>
            <List>
              {players.reduce((list, player, index) => {
                const isMe = myId === player.id
                if (player) {
                  list[index] = <Player key={player.id}>
                    <Flex>
                      <span>name: </span>
                      <Player.Name>{player.name}</Player.Name>
                    </Flex>
                    {isMe && 'isMe!'}
                  </Player>
                }
                return list
              }, [
                <Empty key={0}>wait for Player</Empty>,
                <Empty key={1}>wait for Player</Empty>,
                <Empty key={2}>wait for Player</Empty>,
                <Empty key={3}>wait for Player</Empty>
              ])}
            </List>
            <div>
              <Button primary onClick={ev => {
                ev.preventDefault()
                startGame()
              }}>시작하기</Button>
            </div>
          </Wrapper>
        </Flex>
      </Box>
    </>
  )
}

export default Lobby