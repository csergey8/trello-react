import { ACTION_TYPES } from './types';
import { getFromLocalStorage, deleteFromLocalStorage, setToLocalStorage } from '../../utils';
import { getUserProfileThunk } from '../userProfile';

const APP_TOKEN = 'TREELLO_CUSTOM_APP_TOKEN';

export const getTokenAction = () => ({
  type: ACTION_TYPES.GET_TOKEN
})

export const deleteTokenAction = () => ({
  type: ACTION_TYPES.DELETE_TOKEN
})
  
export const setTokenAction = (token: string) => ({
    type: ACTION_TYPES.SET_TOKEN,
    payload: token
})

export const initTokenThunk = (token?: string) => (dispatch: any) => {
  if(!token){
    const token = getFromLocalStorage(APP_TOKEN);
    const tokenValid = tokenValidation(token);
    debugger;
    if(tokenValid && token) {
      debugger;
      dispatch(setTokenThunk(token))
      dispatch(getUserProfileThunk(token))
    } else {
      dispatch(deleteTokenThunk())
    }
  } else {
    const tokenValid = tokenValidation(token);
    if(tokenValid && token) {
      debugger;
      dispatch(setTokenThunk(token))
      dispatch(getUserProfileThunk(token))
    } else {
      dispatch(deleteTokenThunk())
    }
  }
}

export const deleteTokenThunk = () => (dispatch: any) => {
  console.log(dispatch)
  deleteFromLocalStorage(APP_TOKEN);
  dispatch(deleteTokenAction())
}

const tokenValidation = (token?: any) => {
  const response = fetch(`https://api.trello.com/1/members/me/?token=${token}&key=${process.env.REACT_APP_API_KEY}`);
  const data = response
  console.log(data);
  return true;
}

const setTokenThunk = (token?: any) => (dispatch: any) => {
  setToLocalStorage(APP_TOKEN, token)
  dispatch(setTokenAction(token))
}