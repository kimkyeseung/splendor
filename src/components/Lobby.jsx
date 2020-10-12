import React from 'react'
import styled from 'styled-components'
import { Flex } from './units'

const Empty = styled.div`
  border: 1px solid green;
  margin: 0.2rem; padding: 0.2rem;
`

const Player = styled.div``

Player.Name = styled.div``

const Wrapper = styled.div`
  width: 800px;
  padding: 1rem;
`

const Lobby = ({ gameId, players = [], startGame }) => {
  return (
    <Flex justifyContent="center">
      <Wrapper>
        <div>game ID: {gameId}</div>
        <div>
          <input value={`http://localhost:3000/lobby/${gameId}`} />
        </div>
        <div>
          {players.reduce((list, player, index) => {

            if (player) {
              list[index] = <Player key={player.id}>
                name: <Player.Name>{player.name}</Player.Name>
              </Player>
            }
            return list
          }, [
            <Empty key={0} />,
            <Empty key={1} />,
            <Empty key={2} />,
            <Empty key={3} />
          ])}
        </div>
        <div>
          <button onClick={ev => {
            ev.preventDefault()
            startGame()
          }}>시작하기</button>
        </div>
      </Wrapper>
    </Flex>
  )
}

export default Lobby
