import axios from 'axios'
import { GAME_NAME, WEB_SERVER_URL, ON_DEVELOPMENT, PROD_SERVER_URL } from 'config'

const server = ON_DEVELOPMENT
  ? WEB_SERVER_URL
  : (PROD_SERVER_URL || window.location.origin)

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

  async createRoom(numPlayers = 4, setupData) {
    const { data } = await this.api
      .post('/create', { numPlayers, setupData })

    return data.matchID
  }

  async joinRoom(roomID, username, userid) {
    // userid를 생략(undefined)하면 서버가 getFirstAvailablePlayerID로
    // 빈 자리를 원자적으로 배정해준다. 그래서 실제로 배정된 playerID를
    // 응답에서 그대로 돌려준다(호출부가 미리 추측한 값을 신뢰하면 안 됨).
    const payload = { playerID: userid, playerName: username };
    const { data } = await this.api
      .post(`/${roomID}/join`, payload)

    const { playerID, playerCredentials } = data

    return { playerID, playerCredentials }
  }

  async leaveRoom(roomId, userid, playerCredentials) {
    const payload = { playerID: userid, credentials: playerCredentials }
    try {
      await this.api.post(`/${roomId}/leave`, payload)
    } catch (err) {
      console.log("error in leaveRoom: ", err)
    }
  }

  // beforeunload처럼 페이지가 곧 사라지는 상황에서 쓰는 leave 요청.
  // 일반 axios 요청은 새로고침/탭 종료 시 브라우저가 중간에 끊어버릴 수 있어
  // 서버에 내 자리가 "참가 중"으로 남아있게 될 수 있어서 브라우저가 페이지가
  // 사라진 뒤에도 전송을 보장해주는 방식이 필요하다.
  //
  // sendBeacon은 크로스오리진 요청에도 항상 credentials를 포함해서 보내는데,
  // 이 서버의 CORS 설정은 Access-Control-Allow-Credentials를 내려주지 않아서
  // (로비 API는 쿠키가 아니라 요청 본문의 credentials 값으로 인증하므로 애초에
  // 필요 없음) 프론트/백엔드가 다른 origin인 로컬 개발 환경에서는 매번 CORS
  // 에러로 막혀버린다. fetch의 keepalive는 같은 "페이지가 사라져도 전송 보장"
  // 효과를 내면서 credentials를 명시적으로 뺄 수 있어 이 문제가 없다.
  leaveRoomBeacon(roomId, userid, playerCredentials) {
    const payload = { playerID: userid, credentials: playerCredentials }

    if (typeof fetch !== 'function') {
      return this.leaveRoom(roomId, userid, playerCredentials)
    }

    fetch(`${server}/games/${GAME_NAME}/${roomId}/leave`, {
      method: 'POST',
      keepalive: true,
      credentials: 'omit',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(err => {
      console.log('error in leaveRoomBeacon: ', err)
    })
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
