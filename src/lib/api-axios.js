import axios from 'axios'

const isDev = (process.env.NODE_ENV || 'development') !== 'production'

const server = isDev
  ? `https://${window.location.host}`
  : `https://${window.location.hostname}`

console.log({ isDev, server })
export class LobbyApi {
  constructor() {
    const config = {
      baseURL: 'http://localhost:8000',
      timeout: 1000,
    }

    this.api = axios.create(config)
  }

  async createRoom(numPlayers) {
    const data = await this.api
      .post('/create', { numPlayers: numPlayers })

    return data.gameID
  }

  async joinRoom(roomID, username, userid) {
    const payload = { playerID: userid, playerName: username };
    const data = await this.api
      .post(`/${roomID}/join`, { json: payload })

    const { playerCredentials } = data

    return playerCredentials
  }

  async leaveRoom(roomId, userid, playerCredentials) {
    const payload = { playerID: userid, credentials: playerCredentials }
    try {
      await this.api.post(`/${roomId}/leave`, { json: payload })
    } catch (err) {
      console.log("error in leaveRoom: ", err)
    }
  }

  async whosInRoom(roomID) {
    const data = await this.api.get(roomID)

    return data.players
  }
}
