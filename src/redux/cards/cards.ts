import { getFromLocalStorage } from "../../utils"
import { APP_TOKEN } from ".."

export enum ACTION_TYPES {
  GET_CARDS = '@@CARDS/GET_CARDS',
}

interface CardsState {
  cards: Array<any>;
}

const cardsState: CardsState = {
  cards: [],
}

export const cardsReducer = (state: CardsState = cardsState, action: any) => {
  switch(action.type){
    case ACTION_TYPES.GET_CARDS:
      return { 
        ...state, 
        cards: action.payload
      }
    default: 
      return state
  }
}


const getCardsAction = (cards: any) => ({
  type: ACTION_TYPES.GET_CARDS,
  payload: cards
})

export const getCardsByListIdThunk = (id: string) => async (dispatch: any) => {

}