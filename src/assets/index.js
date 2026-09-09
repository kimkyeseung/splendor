import DEVELOPMENT_CARDS from './developmentCards.json'
import NOBLES from './nobles.json'

// 서버가 playerView에서 덱의 실제 카드를 가리기 위해 사용하는 placeholder id.
// 실제 DEVELOPMENT_CARDS에는 존재하지 않는 값이어야 한다.
export const HIDDEN_DEVELOPMENT_CARD = 'HIDDEN'

export { DEVELOPMENT_CARDS, NOBLES }
