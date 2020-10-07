import axios from 'axios'

const isDev = (process.env.NODE_ENV || 'development') !== 'production'

const server = isDev
  ? `https://${window.location.hostname}`
  : `https://${window.location.host}`


export class LobbyApi {
  constructor() {
    const config = {
      baseURL: server,
      timeout: 1000,
    }

    this.api = axios.create(config)
  }

  async createRoom(numPlayers) {
    const data = await this.api
      .post("create", { numPlayers: numPlayers })
      .json()

    return data.gameID
  }

  async joinRoom(roomID, username, userid) {
    const payload = { playerID: userid, playerName: username };
    const data = await this.api
      .post(roomID + "/join", { json: payload })
      .json()
    const { playerCredentials } = data

    return playerCredentials
  }

  async leaveRoom(roomId, userid, playerCredentials) {
    const payload = { playerID: userid, credentials: playerCredentials }
    try {
      await this.api.post(roomId + "/leave", { json: payload }).json()
    } catch (err) {
      console.log("error in leaveRoom: ", err)
    }
  }

  async whosInRoom(roomID) {
    const data = await this.api.get(roomID).json()

    return data.players
  }
}
