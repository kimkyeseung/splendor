import { Server, Origins } from 'boardgame.io/server'
import path from 'path'
import serve from 'koa-static'
import game from './src/lib/game'

// 프론트(Vercel 등)와 이 서버가 다른 오리진으로 배포되는 경우를 위해
// CORS_ORIGINS 환경변수(콤마 구분)로 허용 오리진을 지정한다.
const extraOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean)

const allowedOrigins = [Origins.LOCALHOST_IN_DEVELOPMENT, ...extraOrigins]

const server = Server({
  games: [game(4)],
  origins: allowedOrigins
})
const PORT = process.env.PORT || 8000

// boardgame.io@0.49 + koa-socket-2가 socket.io(v3+)에 구버전 스타일 cors 옵션
// (`cors.origins`)을 넘겨서, 로비 REST API와 달리 socket.io 연결 자체의 CORS는
// 적용되지 않는 문제가 있다. engine.io의 headers 훅으로 직접 헤더를 붙여준다.
const isOriginAllowed = origin => allowedOrigins.some(allowed =>
  allowed instanceof RegExp ? allowed.test(origin) : allowed === origin
)

server.app._io.engine.on('headers', (headers, req) => {
  const origin = req.headers.origin
  if (origin && isOriginAllowed(origin)) {
    headers['Access-Control-Allow-Origin'] = origin
    headers['Access-Control-Allow-Credentials'] = 'true'
    headers['Vary'] = 'Origin'
  }
})

// Build path relative to the server.js file
const frontEndAppBuildPath = path.resolve(__dirname, './build')
server.app.use(serve(frontEndAppBuildPath))

server.run(PORT, () => {
  server.app.use(
    async (ctx, next) => await serve(frontEndAppBuildPath)(
      Object.assign(ctx, { path: 'index.html' }),
      next
    )
  )
})
