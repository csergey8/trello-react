import { ACTION_TYPES } from './types';
import { getFromLocalStorage, deleteFromLocalStorage, setToLocalStorage } from '../../utils';
import { getUserProfileThunk } from '../userProfile';

export const APP_TOKEN = 'TREELLO_CUSTOM_APP_TOKEN';

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

export const initTokenThunk = (token?: string) => async (dispatch: any) => {
  if(!token){
    const token = getFromLocalStorage(APP_TOKEN);
    const tokenValid = await tokenValidation(token)
    if(tokenValid && token) {
      dispatch(setTokenThunk(token))
      dispatch(getUserProfileThunk())
    } else {
      dispatch(deleteTokenThunk())
    }
  } else {
    const tokenValid = await tokenValidation(token);
    if(tokenValid && token) {
      dispatch(setTokenThunk(token))
      dispatch(getUserProfileThunk())
    } else {
      dispatch(deleteTokenThunk())
    }
  }
}

export const deleteTokenThunk = () => (dispatch: any) => {
  deleteFromLocalStorage(APP_TOKEN);
  dispatch(deleteTokenAction())
}

const tokenValidation = async (token?: any) => {
  const response = await fetch(`https://api.trello.com/1/members/me/?token=${token}&key=${process.env.REACT_APP_API_KEY}`);
  return response.ok ? true : false
}

const setTokenThunk = (token?: any) => (dispatch: any) => {
  setToLocalStorage(APP_TOKEN, token)
  dispatch(setTokenAction(token))
}