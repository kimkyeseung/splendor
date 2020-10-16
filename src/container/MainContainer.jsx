import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { Space, Flex } from '../components/units'
import { LobbyApi } from '../lib/api'
import qs from 'query-string'

const api = new LobbyApi()

const Title = styled.div`
  text-align: center;
  font-size: 200px;
  color: ${({ theme }) => theme.white};
  text-shadow: 6px 6px ${({ theme }) => theme.title};
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

const Button = styled.button`
  border: 1px solid gray;
  border-radius: 4px;
  outline: none;
  ${({ isActive }) => isActive && activeCss}
`

Button.Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 120px;
  margin: 0 auto;
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

class MainContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
    this.createGame = this.createGame.bind(this)
  }

  createGame = () => {
    const { loading } = this.state

    if (loading) {
      return
    }

    this.setState({
      loading: true,
    }, () => {
      api.createRoom()
        .then((roomId) => {
          const { history } = this.props
          console.log("Created room with roomID = ", roomId);
          this.setState({ loading: false }, () => {
            history.push(`/lobby/${roomId}?${qs.stringify({ isHost: true })}`);
          })
        },
          (err) => {
            console.log(err);
            this.setState({ loading: false });
          }
        )
    })
  }

  render() {
    const { playerNum, playerNames, setPlayerName, startGame } = this.props

    return (
      <div>
        <Space height={160} />
        <Title>Splendor</Title>
        <Space height={100} />
        <Select>
          <Message>게임에 참여할 인원을 선택해주세요</Message>
          <Space height={20} />
          <Flex>
            {[2, 3, 4].map(num => (
              <Button
                key={num}
                isActive={playerNum === num}
                onClick={ev => {
                  ev.preventDefault()
                  this.props.setPlayerNum(num)
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
          onClick={() => this.createGame()}
        >
          <div className="card-inside start">
            <h1>new game</h1>
          </div>
        </div>
      </div>
    )
  }
}

MainContainer.propTypes = {
  playerNum: PropTypes.number
}

export default MainContainer
