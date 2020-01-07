import { getFromLocalStorage } from "../../utils"

export enum ACTION_TYPES {
  GET_BOARDS = '@@BOARDS/GET_BOARDS',
  GET_BOARD_LISTS = '@@BOARDS/GET_BOARD_LISTS',
  GET_BOARD_BY_ID = '@@BOARDS/GET_BOARD_BY_ID',
  ADD_CARD = '@@BOARDS/ADD_CARD',
  SET_ADD_CARD_MODE = '@@BOARDS/SET_ADD_CARD_MODE',
  CLEAR_ADD_CARD_MODE = '@@BOARDS/CLEAR_ADD_CARD_MODE',
  SET_ADD_LIST_MODE = '@@BOARDS/SET_ADD_LIST_MODE',
  CLEAR_ADD_LIST_MODE = '@@BOARDS/CLEAR_ADD_LIST_MODE',
  ADD_LIST = '@@BOARDS/ADD_LIST',
  ADD_BOARD = '@@BOARDS/ADD_BOARD'
}

export const APP_TOKEN = 'TREELLO_CUSTOM_APP_TOKEN';

interface BoardsState {
  boards: [],
  boardLists: []
  addListMode: boolean
}

const boardsState: BoardsState = {
  boards: [],
  boardLists: [],
  addListMode: false
}

export const boardsReducer = (state: BoardsState = boardsState, { payload, type }: any) => {
  switch(type){
    case ACTION_TYPES.GET_BOARDS:
      return { 
        ...state,
        boards: payload
      }
    case ACTION_TYPES.GET_BOARD_LISTS:
      return {
        ...state,
        boardLists: payload
      }
    case ACTION_TYPES.GET_BOARD_BY_ID:
      return {
        ...state,
        board: payload
      }
    case ACTION_TYPES.SET_ADD_CARD_MODE:
      return {
        ...state,
        boardLists: payload
      }
    case ACTION_TYPES.CLEAR_ADD_CARD_MODE:
      return {
        ...state,
        boardLists: payload
      }
    case ACTION_TYPES.SET_ADD_LIST_MODE: 
      return {
        ...state,
        addListMode: true
      }
    case ACTION_TYPES.CLEAR_ADD_LIST_MODE: 
      return {
        ...state,
        addListMode: false
      }
    case ACTION_TYPES.ADD_LIST:
      return {
        ...state,
        boardLists: [
          ...state.boardLists,
          payload
        ]
      }
    case ACTION_TYPES.ADD_BOARD:
      console.log(payload)
      return {
        ...state,
        boards: [
          ...payload
        ]
      }
    default: 
      return state
  }
}

export const addBoardAction = (boards: []) => ({
  type: ACTION_TYPES.ADD_BOARD,
  payload: boards
})

export const getBoardsAction = (boards: []) => ({
  type: ACTION_TYPES.GET_BOARDS,
  payload: boards
})

export const getBoardListsAction = (lists: any) => ({
  type: ACTION_TYPES.GET_BOARD_LISTS,
  payload: lists
}) 

export const getBoardByIdAction = (board: any) => ({
  type: ACTION_TYPES.GET_BOARD_BY_ID,
  payload: board
})

export const addCardAction = (card: any) => ({
  type: ACTION_TYPES.ADD_CARD,
  payload: card
})

export const setAddCardModeAction = (boardLists: any) => ({
  type: ACTION_TYPES.SET_ADD_CARD_MODE,
  payload: boardLists
})

export const clearAddCardModeAction = (boardLists: any) => ({
  type: ACTION_TYPES.CLEAR_ADD_CARD_MODE,
  payload: boardLists
})

export const setAddListMode = () => ({
  type: ACTION_TYPES.SET_ADD_LIST_MODE
})

export const clearAddListMode = () => ({
  type: ACTION_TYPES.CLEAR_ADD_LIST_MODE
})

export const addListAction = (list: any) => ({
  type: ACTION_TYPES.ADD_LIST,
  payload: list
})

export const addBoardThunk = (boardParams: any) => async (dispatch: any, getState: any) => {
  const { auth, boardsReducer: { boards } } = await getState();
  let authToken = auth.token || getFromLocalStorage(APP_TOKEN);
  const url = `https://api.trello.com/1/boards/?name=${boardParams.name}&defaultLabels=true&defaultLists=true&keepFromSource=none&prefs_permissionLevel=private&prefs_voting=disabled&prefs_comments=members&prefs_invitations=members&prefs_selfJoin=true&prefs_cardCovers=true&prefs_background=blue&prefs_cardAging=regular&key=${process.env.REACT_APP_API_KEY}&token=${authToken}`;
  const response = await fetch(url, { method: 'POST' });
  const data = await response.json();
  boards.push(data)
  console.log(data);
  console.log(boards)
  dispatch(addBoardAction(boards));
}

export const addListThunk = (name: string) => async (dispatch: any, getState: any) => {
  const { auth, boardsReducer } = await getState();
  let authToken = auth.token || getFromLocalStorage(APP_TOKEN);
  const url = `https://api.trello.com/1/lists?name=${name}&idBoard=${boardsReducer.board.id}&keepFromSource=all&token=${authToken}&key=${process.env.REACT_APP_API_KEY}`;
  const response = await fetch(url, { method: 'POST' });
  const data = await response.json();
  data['cards'] = [];
  dispatch(addListAction(data));
}

export const clearAddCardModeThunk = () => async (dispatch: any, getState: any) => {
  const { boardsReducer } = await getState();
  const boardLists = boardsReducer.boardLists.map((list: any) => {
      list['addMode'] = false;
      return {...list}
    })
  dispatch(clearAddCardModeAction(boardLists))
}

export const setAddCardModeThunk = (idList: string) => async (dispatch: any, getState: any) => {
  const { boardsReducer } = await getState();
  const boardLists = boardsReducer.boardLists.map((list: any) => {
    if(list.id === idList){
      list['addMode'] = true;
      return {...list}
    } else {
      list['addMode'] = false;
      return {...list}
    }
  })
  dispatch(setAddCardModeAction(boardLists));
}

export const addCardThunk = (cardParams: any, idList: string) => async (dispatch: any, getState: any) => {
  const { auth, boardsReducer } = await getState();
  let authToken = auth.token || getFromLocalStorage(APP_TOKEN);
  const url = `https://api.trello.com/1/cards?name=${cardParams.name}&idList=${idList}&keepFromSource=all&token=${authToken}&key=${process.env.REACT_APP_API_KEY}`;
  const response = await fetch(url, { method: 'POST' });
  const data = await response.json();
  const boardLists = boardsReducer.boardLists.map((list: any) => {
    if(list.id === idList){
      list.cards.push(data)
    }
    return {...list}
  })
  dispatch(getBoardListsAction(boardLists));
}

export const getBoardByIdThunk = (id: string) => async (dispatch: any, getState: any) => {
  const { auth } = await getState();
  let authToken = auth.token || getFromLocalStorage(APP_TOKEN);
  const url = `https://trello.com/1/boards/${id}?token=${authToken}&key=${process.env.REACT_APP_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  dispatch(getBoardByIdAction(data));
}

export const getBoardsThunk = () => async (dispatch: any, getState: any) => {
  const { auth } = await getState();
  let authToken = auth.token || getFromLocalStorage(APP_TOKEN);
  const url = `https://trello.com/1/members/me/boards?token=${authToken}&key=${process.env.REACT_APP_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  dispatch(getBoardsAction(data));
}

export const getBoardListWithCardsThunk = (id: string) => async (dispatch: any, getState: any) => {
  const { auth } = await getState();
  let authToken = auth.token || getFromLocalStorage(APP_TOKEN);
  const url = `https://api.trello.com/1/boards/${id}/lists?token=${authToken}&key=${process.env.REACT_APP_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  const listsWithCards: any = []
  await Promise.all(data.map( async (list: any) =>{
    const url = `https://api.trello.com/1/lists/${list.id}/cards?token=${authToken}&key=${process.env.REACT_APP_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    let listWithCard = {
      ...list,
      cards: [...data]
    } 
    listsWithCards.push(listWithCard);
  }))
  dispatch(getBoardListsAction(listsWithCards));
}


export const getBoardSelector = (state: any) => state.boardsReducer.board

export const getListByPositionSelector = (state: any) => {
  return state.boardsReducer.boardLists.sort((a: any, b: any) => (a.pos > b.pos) ? 1 : ((b.pos > a.pos) ? - 1 : 0));
}
