export enum ACTION_TYPES {
  GET_CARDS = '@@CARDS/GET_CARDS',
  SET_CARDS = '@@CARDS/SET_CARDS'
}

interface CardsState {
  cards: Array<any>
}

const cardsState = {
  cards: []
}

export const cardsReducer = (state: CardsState = cardsState, action: any) => {
  switch(action.type){
    case ACTION_TYPES.SET_CARDS:
      return { 
        ...state, 
        cards: action.payload
      }
    default: 
      return state
  }
}

const setCards = (cards: any) => ({
  type: ACTION_TYPES.SET_CARDS,
  payload: cards
})

export const getCardsThunk = (borders: any) => (dispatch: any, getState: any)  =>{
  let cards:any = [];
  const { auth } = getState();
  borders.map(async (board: any) => {
    const response = await fetch(`https://trello.com/1/boards/${board.id}/cards?key=${process.env.REACT_APP_API_KEY}&token=${auth.token}`);
    const data = await response.json();
    cards.push(data)
  })
  dispatch(setCards(cards)); 
}

export const getCardByIdSelector = (state: any, id: any) => {
  let card = state.cardsReducer.cards.find((card: any) => card.boardId === id);
  return card
} 