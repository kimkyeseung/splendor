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
  gameId, players = [], totalSeats, isHost, startGame, myId, serverURL, updatePlayerName
}) => {
  // 방 생성 시 정한 자리 수를 아직 모르면(최초 로딩 등) 4로만 표시해두고,
  // 실제 게임 시작 가능 여부는 seats를 알기 전까지 비활성 상태로 둔다.
  const seats = totalSeats ?? 4
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
        {Array(seats).fill(1).map((n, index) => {
          // 서버가 자동 배정한 playerID는 문자열이지만 players[].id는
          // 항상 숫자라서, 타입을 맞춰서 비교해야 한다.
          const isMe = Boolean(players[index]) && String(myId) === String(players[index].id)

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
        {/* 정해진 자리가 다 차기 전에 시작하면, 아무도 없는 자리까지 턴
            순서에 섞여 들어가 그 자리에서 게임이 멈춰버리기 때문에
            자리가 모두 찼을 때만 시작할 수 있게 한다. */}
        {isHost && <Button primary disabled={players.length < seats} onClick={ev => {
          ev.preventDefault()
          startGame()
        }}>Start Game</Button>}
        <Button to="/">Back</Button>
      </Flex>
    </Wrapper>
  )
}

export default Lobby
