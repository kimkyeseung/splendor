import React from 'react'
import styled from 'styled-components'
import { Blank, Flex, Box, Button, Modal, Title } from 'components'

const Select = styled.div`
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
`

const Label = styled.div`
  color: ${({ theme }) => theme.black};
`

const Input = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px;
  & > label {
    width: 120px;
  }
`

const Player = styled.div`
  flex: 2;
  margin-right: 0.5rem;
  color: ${({ theme }) => theme.black};
  border: 2px solid;
  border-color: ${({ theme }) => theme.primary[0]};
  border-radius: 10px;
  padding: 0.75rem 1.25rem;
`

const GameRoom = styled.div`
  border: 2px solid;
  color: ${({ theme }) => theme.black};
  padding: 0.75rem 1.25rem;
  border-color: ${({ theme }) => theme.grayscale[0]};
  border-radius: 10px;
  &:not(:first-child):not(:last-child) {
    padding: 0 1.25rem;
    margin-bottom: 0.2rem;
  }
  & .gameId {
    
  }
  & .playerCount {

  }
  & .createdAt {

  }
`

Input.Wrapper = styled.div`
`

const Item = styled.div`
  &:not(:first-child):not(:last-child) {
    padding: 0 1.25rem;
  }
`

const Terminal = ({
  playerName, changePlayerName, rooms
}) => {
  return (
    <>
      <Blank height={160} />
      <Title />
      <Blank height={100} />
      <Box>
        <Label>My Name</Label>
        <Flex>
          <Player>{playerName}</Player>
          <Button onClick={() => {
            const newName = prompt('Enter Your Name', playerName)
            newName && changePlayerName(newName)
          }}>Edit</Button>
        </Flex>
        <Blank height={20} />
        <Label>Room List</Label>
        {rooms.map(({ matchID, players, createdAt }, index) => {
          const playerCount = players.filter(({ id, name }) => id && name).length
          const number = index + 1

          return (
            <GameRoom key={matchID}>
              <Flex>
                <div className="number">{number}</div>
                <div className="gameId">{matchID}</div>
                <div className="playerCount">{playerCount} / 4</div>
                <div className="createdAt">{createdAt}</div>
              </Flex>
            </GameRoom>
          )
        })}
        <Blank height={20} />
        <Flex>
          <Button to="/">Back</Button>
        </Flex>
      </Box>
    </>
  )
}

export default Terminal
