# Splendor
![title](demo/title2.jpg)

보드게임 [스플렌더](https://www.koreaboardgames.com/boardgame/game_view.php?prd_idx=15772)를 [boardgame.io](https://boardgame.io/)과 React를 사용하여 멀티플레이 가능한 웹 애플리케이션으로 구현하였습니다.

## Try out
https://floating-escarpment-19424.herokuapp.com/

클라우드 플랫폼 [heroku](https://www.heroku.com/)를 통해 배포하였습니다. 초기 구동이 다소 느릴 수 있습니다.

## About Splendor
![title](demo/original.jpg)
보석을 모아 개발카드를 구매하여 승점 15점을 먼저 달성하는 사람이 이기는 쉬운 룰의 게임입니다.

쉬운 룰이지만 상대를 이기기 위해서는 펼쳐진 개발카드와 상대의 전략에 따라 적절하고 효율적인 빌드를 구성해야 할 것 입니다.

## Development
```bash
npm install
npm start #클라이언트 화면 구동
npm run serve #게임 서버 구동
```

## Tests
게임 규칙에 따른 특정 함수들의 유닛테스트가 작성되어 있습니다.
```bash
npm run test
```

## feature
현재 2인 온라인 멀티플레이가 가능합니다.
