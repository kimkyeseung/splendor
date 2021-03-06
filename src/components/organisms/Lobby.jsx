import React, { useRef } from 'react'
import styled, { css } from 'styled-components'
import { Button, Blank, Flex } from 'components'
import { ON_DEVELOPMENT } from 'config'

const Wrapper = styled.div`
  width: 600px;
  @media screen and (max-device-width: 980px) {
    width: 100%;
  }
`

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

const GameId = styled(Flex)`
  flex-direction: column;
  & > .id {
    border-radius: 10px;
    font-size: 1.25em;
    border: 2px solid black;
    padding: 0.75rem 1.25rem;
    font-family: ${({ theme }) => theme.font.context};
    background-color: ${({ theme }) => theme.grayscale[6]};
    color: ${({ theme }) => theme.grayscale[1]};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre;
  }
  @media screen and (max-device-width: 980px) {
    flex-direction: row;
    & > .id {
      margin-right: 0.2rem;
      font-size: 0.7em;
    }
    & button span {
      font-size: 0.7em;
    }
  }
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
      <Blank height={10} mHeight={1} />
      <GameId>
        <div
          ref={textAreaRef}
          readOnly
          className="id"
        >{`${serverURL}/lobby/${gameId}`}</div>
        <Blank height={10} />
        <Button onClick={() => {
          copyText()
        }}>Copy</Button>
      </GameId>
      {/* {ON_DEVELOPMENT && <a href={`${serverURL}/lobby/${gameId}`} target="_blank" >go</a>} */}

      <Blank height={20} mHeight={4} />
      <Label>Player List</Label>
      <Blank height={10} mHeight={1} />
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
      <Blank height={20} mHeight={4} />
      <Flex>
        {isHost && <Button primary disabled={players.length < 2} onClick={ev => {
          ev.preventDefault()
          startGame()
        }}>Start Game</Button>}
        <Button to="/">Back</Button>
      </Flex>
    </Wrapper>
  )
}

export default Lobby
