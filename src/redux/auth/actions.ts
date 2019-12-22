import { ACTION_TYPES } from './types';
import { getFromLocalStorage } from '../../utils';

const APP_TOKEN = 'TREELLO_CUSTOM_APP_TOKEN';

export const getTokenAction = () => ({
  type: ACTION_TYPES.GET_TOKEN
})
      

  
export const setTokenAction = (token: string) => ({
    type: ACTION_TYPES.SET_TOKEN,
    payload: token
})

export const tokenInitThunk = () => (dispatch: any) => {
  const token = getFromLocalStorage(APP_TOKEN);
  if(token) {
    dispatch(setTokenAction(token))
  }
}