import { GAME_NAME, GAME_SERVER_URL, APP_PRODUCTION } from './config'
import ky from 'ky'
const server = APP_PRODUCTION
  ? `https://${window.location.hostname}`
  : GAME_SERVER_URL

export class LobbyApi {
  constructor() {
    this.api = ky.create({
      prefixUrl: `${server}/games/${GAME_NAME}`
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
      .post(roomId + "/join", { json: payload })
      .json()
    const { playerCredentials } = data

    return playerCredentials
  }

  async leaveRoom(roomId, userId, credentials) {
    const payload = { playerID: userId, credentials }
    try {
      await this.api.post(roomId + "/leave", { json: payload }).json()
    } catch (error) {
      console.log('error in leaveRoom: ', error)
    }
  }

  async whosInRoom(roomID) {
    const data = await this.api.get(roomID).json()
    console.log('whosInRoom: ', { data })
    return data.players
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
    } catch (error) {
      console.log('error in startRoom: ', error)
    }
  }
}
