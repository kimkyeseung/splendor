import React, { useRef } from 'react'
import styled, { css } from 'styled-components'
import { Box, Button, Blank, Flex } from 'components'
import { ON_DEVELOPMENT } from 'config'

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

const myPlayerStyle = css`
  border: 0;
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.primary[0]};
`

const Player = styled.div`
  color: ${({ theme }) => theme.black};
  border: 2px solid;
  border-color: ${({ theme }) => theme.primary[0]};
  border-radius: 10px;
  padding: 0.75rem 1.25rem;
  ${({ isMe }) => isMe && myPlayerStyle}
`

Player.Name = styled.div``

const Wrapper = styled.div`
  width: 640px;
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


const Lobby = ({
  gameId, players = [], isHost, startGame, myId, serverURL, updatePlayerName
}) => {
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
      <Blank height={160} />
      <Title>Splendor</Title>
      <Blank height={100} />
      <Box>
        <Flex justifyContent="center">
          <Wrapper>
            <Flex>
              <GameId
                ref={textAreaRef}
                readOnly
              >{`${serverURL}/lobby/${gameId}`}</GameId>
              <Button onClick={() => {
                copyText()
              }}>Copy</Button>
            </Flex>
            {ON_DEVELOPMENT && <a href={`${serverURL}/lobby/${gameId}`} target="_blank" >go</a>}
            <List>
              {Array(4).fill(1).map((n, index) => {
                const isMe = myId === (players[index] && players[index].id)

                return players[index] ? (
                  <Player key={`${index}-${players[index].id}`} isMe={isMe}>
                    <Flex>
                      <span>name: </span>
                      <Flex>
                        {isMe
                          ? <Button onClick={ev => {
                            ev.preventDefault()
                            const newName = prompt('Enter Your Name', players[index].name)
                            newName && updatePlayerName(newName)
                          }}>{players[index].name}</Button>
                          : <Player.Name>{players[index].name}</Player.Name>}
                      </Flex>
                    </Flex>
                  </Player>
                ) : <Empty key={index}>wait for Player</Empty>
              })}
            </List>
            <Blank height={20} />
            {isHost && <Flex>
              <Button primary disabled={players.length < 2} onClick={ev => {
                ev.preventDefault()
                startGame()
              }}>Start Game</Button>
              <Button to="/">Back</Button>
            </Flex>}
          </Wrapper>
        </Flex>
      </Box>
    </>
  )
}

export default Lobby
