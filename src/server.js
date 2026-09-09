import { Server, Origins } from 'boardgame.io/server'
import game from './lib/game'

// origins를 지정하지 않으면 CORS 허용 origin이 전혀 없어서, 프론트엔드
// (다른 포트에서 서빙되는 CRA 개발 서버)가 보내는 모든 로비 API 요청이
// 브라우저에서 조용히 실패한다(콘솔에만 CORS 에러가 뜨고 화면엔 아무
// 반응이 없음). 개발 환경에서만 localhost:* 오리진을 허용한다.
const server = Server({ games: [game(4)], origins: [Origins.LOCALHOST_IN_DEVELOPMENT] })

server.run(8000)
