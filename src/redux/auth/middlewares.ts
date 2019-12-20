import { Action } from '../types';
import { ACTION_TYPES } from './types';
import { setToLocalStorage, subscribe, getFromLocalStorage } from '../../utils';
import { setTokenAction } from './actions';

const APP_TOKEN = 'REACT_TRELLO_TOKEN';

const authMiddleware = ({ dispatch }: any) => (next :any) => (action: Action<ACTION_TYPES>) => {
    debugger;
    if(action.type === ACTION_TYPES.SET_TOKEN){
        console.log("SET TOKEN")
        setToLocalStorage(APP_TOKEN, action.payload)
    }
    debugger
    next(action)
}

const readTokenWorker = async ({ action, next, dispatch }: any) => {
    debugger;
    const token = await getFromLocalStorage(APP_TOKEN);
    if(token) {
        dispatch(setTokenAction(token))
    }
    next(action)
}

const readTokenMiddleWare = ({ dispatch }: any) => (next: any) => {
    debugger;
    return subscribe(ACTION_TYPES.GET_TOKEN, readTokenWorker)(next, dispatch)};

export const authMiddlewares = [authMiddleware, readTokenMiddleWare];