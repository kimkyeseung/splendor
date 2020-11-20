import React from 'react'
import styled from 'styled-components'
import { Blank, Flex, Box, Button, Title } from 'components'
import day from '../../lib/dayjs'

const Wrapper = styled.div`
  width: 600px;
  @media screen and (max-device-width: 980px) {
    width: 100%;
  }
`

const Label = styled.div`
  color: ${({ theme }) => theme.grayscale[8]};
`

const Message = styled.div`
  color: ${({ theme }) => theme.grayscale[8]};
  text-align: center;
`

const Player = styled.div`
  color: ${({ theme }) => theme.black};
  border: 2px solid;
  border-color: ${({ theme }) => theme.primary[0]};
  border-radius: 10px;
  font-size: 1.2em;
  padding: 0.75rem 1.25rem;
  & .name {
    flex: 1;
  }
`

const GameRoomHeader = styled.div`
  color: ${({ theme }) => theme.grayscale[6]};
  padding: 0.25rem 1.25rem;
  &:not(:first-child):not(:last-child) {
    padding: 0 1.25rem;
    margin-bottom: 0.2rem;
  }
  & .number {

  }
  & .gameId {
    min-width: 200px;
  }
  & .playerCount {
    min-width: 120px;
  }
  & .join {
  }
`

const Th = styled.div`
  padding: 0.2rem 0.5rem;
  text-align: center;
  min-width: 40px;
`

const Td = styled.div`
  min-width: 40px;
  &:not(:first-child):not(:last-child) {
    padding: 0.2rem 0.3rem;
  }
`

const GameRoomItems = styled.div`
  border: 2px solid;
  color: ${({ theme }) => theme.black};
  padding: 0.75rem 1.25rem;
  border-color: ${({ theme }) => theme.grayscale[0]};
  border-radius: 10px;
  text-align: center;
  & .number {
    text-align: center;
  }
  & .gameId {
    min-width: 200px;
    & .createdAt {
      font-size: 0.6em;
    }
  }
  & .playerCount {
    min-width: 120px;
  }
  & .join {
  }
`

const Terminal = ({
  playerName, changePlayerName, rooms
}) => {
  return (
    <Wrapper>
      <Label>My Name</Label>
      <Blank height={10} mHeight={1}/>
      <Player>
        <Flex>
          <div className="name">{playerName}</div>
          <Button icon="pencil" small onClick={() => {
            const newName = prompt('Enter Your Name', playerName)
            newName && changePlayerName(newName)
          }}>Edit</Button>
        </Flex>
      </Player>
      <Blank height={20} mHeight={4}/>
      <Label>Room List</Label>
      <Blank height={10} mHeight={1}/>
      {rooms.length
        ? <GameRoomHeader>
          <Flex>
            <Th className="number">No.</Th>
            <Th className="gameId">Room ID</Th>
            <Th className="playerCount">Players</Th>
            <Th className="join">Join</Th>
          </Flex>
        </GameRoomHeader>
        : <Message>No rooms were created.</Message>}
      {rooms.map(({ matchID, players, createdAt }, index) => {
        const playerCount = players.filter(({ name }) => name).length
        const number = index + 1

        return (
          <GameRoomItems key={matchID}>
            <Flex>
              <Td className="number">{number}</Td>
              <Td className="gameId">
                <div>{matchID}</div>
                <Blank height={5} />
                <div className="createdAt">{day(createdAt).fromNow()}</div>
              </Td>
              <Td className="playerCount">{playerCount} / 4</Td>
              <Td className="join">
                <Button small to={`/lobby/${matchID}`}>Join</Button>
              </Td>
            </Flex>
          </GameRoomItems>
        )
      })}
      <Blank height={20} mHeight={5} />
      <Flex>
        <Button to="/">Back</Button>
      </Flex>
    </Wrapper>
  )
}

export default Terminal
