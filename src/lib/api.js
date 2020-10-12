import { GAME_NAME, GAME_SERVER_URL, APP_PRODUCTION } from "./config";
import ky from "ky"
const server = APP_PRODUCTION
  ? `https://${window.location.hostname}`
  : GAME_SERVER_URL;

export class LobbyApi {
  constructor() {
    this.api = ky.create({
      prefixUrl: `${server}/games/${GAME_NAME}`,
    })
  }

  async createRoom(numPlayers) {
    try {
      const data = await this.api
        .post("create", { numPlayers: numPlayers })
        .json()
      return data.matchID
    } catch (error) {
      console.log({ error })
    }
  }

  async joinRoom(roomId, username, userid, isHost) {
    const payload = { playerID: userid, playerName: username }
    if (isHost) {
      payload.data = {
        host: true,
        started: false
      }
    }
    const data = await this.api
      .post(roomId + "/join", { json: payload })
      .json();
    const { playerCredentials } = data

    return playerCredentials
  }

  async leaveRoom(roomID, userid, playerCredentials) {
    const payload = { playerID: userid, credentials: playerCredentials }
    try {
      await this.api.post(roomID + "/leave", { json: payload }).json()
    } catch (error) {
      console.log("error in leaveRoom: ", error)
    }
  }

  async whosInRoom(roomID) {
    const data = await this.api.get(roomID).json();
    console.log({ data })
    return data.players;
  }
}
