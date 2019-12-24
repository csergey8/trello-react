import { getCardsThunk } from "../cards"

export enum ACTION_TYPES {
  GET_BOARDS = '@@BOARDS/GET_BOARDS'
}

interface BoardsState {
  boards: []
}

const boardsState: BoardsState = {
  boards: []
}

export const boardsReducer = (state: BoardsState = boardsState, action: any) => {
  switch(action.type){
    case ACTION_TYPES.GET_BOARDS:
      return { 
        ...state,
        boards: action.payload
      }
    default: 
      return state
  }
}

export const getBoardsAction = (boards: []) => ({
  type: ACTION_TYPES.GET_BOARDS,
  payload: boards
})

export const getBoardsThunk = () => async (dispatch: any, getState: any) => {
  const { auth } = getState();
  const url = `https://trello.com/1/members/me/boards?token=${auth.token}&key=${process.env.REACT_APP_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  dispatch(getBoardsAction(data));
  dispatch(getCardsThunk(data));
}

