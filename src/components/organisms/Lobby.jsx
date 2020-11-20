import React, { useRef } from 'react'
import styled, { css } from 'styled-components'
import { Button, Blank, Flex } from 'components'
import { ON_DEVELOPMENT } from 'config'

const List = styled.div`
  & > * {
    margin: 0.2rem;
  }
`

const Label = styled.div`
  color: ${({ theme }) => theme.black};
`

const EmptyPlayer = styled.div`
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
  & > .name {

  }
  ${({ isMe }) => isMe && myPlayerStyle}
`

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
    <Wrapper>
      <Label>Game Url</Label>
      <Blank height={10} />
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

      <Blank height={20} />
      <Label>Player List</Label>
      <Blank height={10} />
      <List>
        {Array(4).fill(1).map((n, index) => {
          const isMe = myId === (players[index] && players[index].id)

          return players[index] ? (
            <Player key={`${index}-${players[index].id}`} isMe={isMe}>
              <Flex>
                <span>name: </span>
                <Flex>
                  {isMe
                    ? <Button
                      small
                      icon="pencil"
                      onClick={ev => {
                        ev.preventDefault()
                        const newName = prompt('Enter Your Name', players[index].name)
                        newName && updatePlayerName(newName)
                      }}>{players[index].name}</Button>
                    : <div className="name">{players[index].name}</div>}
                </Flex>
              </Flex>
            </Player>
          ) : <EmptyPlayer key={index}>wait for Player</EmptyPlayer>
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
  )
}

export default Lobby
