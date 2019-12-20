import { ACTION_TYPES } from './types';

export const getTokenAction = () => ({
  type: ACTION_TYPES.GET_TOKEN
})
      

  
export const setTokenAction = (token: string) => ({
    type: ACTION_TYPES.SET_TOKEN,
    payload: token
})