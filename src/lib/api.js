import { GAME_NAME, WEB_SERVER_URL, ON_DEVELOPMENT } from 'config'
import ky from 'ky-universal'
const server = ON_DEVELOPMENT
  ? WEB_SERVER_URL
  : `https://${window.location.hostname}`

export class LobbyApi {
  constructor() {
    this.api = ky.create({
      prefixUrl: `${server}/games/${GAME_NAME}`,
      headers: { cache: 'no-cache' }
    })
  }

  async createRoom() {
    const data = await this.api
      .post('create', { numPlayers: 4 })
      .json()

    return data.matchID
  }

  async joinRoom(roomId, username, userid) {
    const payload = { playerID: userid, playerName: username }
    const data = await this.api
      .post(roomId + '/join', { json: payload })
      .json()
    const { playerCredentials } = data

    return playerCredentials
  }

  async leaveRoom(roomId, userId, credentials) {
    const payload = { playerID: userId, credentials }
    try {
      await this.api.post(roomId + '/leave', { json: payload }).json()
    } catch (err) {
      console.log('error in leaveRoom: ', err)
    }
  }

  async whosInRoom(roomID) {
    const data = await this.api.get(roomID).json()
    console.log('whosInRoom: ', { data })
    return data.players
  }

  async updatePlayerMeta(roomId, userId, credentials, newName) {
    const payload = {
      playerID: userId,
      credentials,
      newName
    }
    try {
      await this.api.post(`${roomId}/update`, {
        json: payload
      })
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
      await this.api.post(`${roomId}/update`, { json: payload })
      return roomId
    } catch (err) {
      console.log('error in startRoom: ', err)
    }
  }
}
