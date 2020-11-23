import axios from 'axios'
import { GAME_NAME, WEB_SERVER_URL, ON_DEVELOPMENT } from 'config'

const server = ON_DEVELOPMENT
  ? WEB_SERVER_URL
  : `https://${window.location.hostname}`

export class LobbyApi {
  constructor() {
    const config = {
      baseURL: `${server}/games/${GAME_NAME}`,
      timeout: 5000,
      headers: {
        'Cache-Control': ['no-cache', 'no-store'],
        'Content-Type': 'application/json'
      },
    }

    this.api = axios.create(config)
  }
  async getRooms() {
    try {
      const { data } = await this.api.get()

      return data.matches
    } catch (err) {
      console.log('error in leaveRoom: ', err)
    }
  }

  async createRoom(setupData) {
    const { data } = await this.api
      .post('/create', { numPlayers: 4, setupData })

    return data.matchID
  }

  async joinRoom(roomID, username, userid) {
    const payload = { playerID: userid, playerName: username };
    const { data } = await this.api
      .post(`/${roomID}/join`, payload)

    const { playerCredentials } = data

    return playerCredentials
  }

  async leaveRoom(roomId, userid, playerCredentials) {
    const payload = { playerID: userid, credentials: playerCredentials }
    try {
      await this.api.post(`/${roomId}/leave`, payload)
    } catch (err) {
      console.log("error in leaveRoom: ", err)
    }
  }

  async whosInRoom(roomID) {
    const { data } = await this.api.get(roomID)

    return data.players
  }

  async updatePlayerMeta(roomId, userId, credentials, newName) {
    const payload = {
      playerID: userId,
      credentials,
      newName
    }
    try {
      await this.api.post(`${roomId}/update`, payload)
    } catch (err) {
      console.log('error in updatePlayerMeta: ', err)
    }
  }

  async startGame(roomId, userId, credentials) {
    const payload = {
      playerID: userId,
      credentials,
      data: { started: true }
    }
    try {
      await this.api.post(`${roomId}/update`, payload)

      return roomId
    } catch (err) {
      console.log('error in startRoom: ', err)
    }
  }
}
