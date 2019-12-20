import { createStore, combineReducers, applyMiddleware } from 'redux';
import { AuthState, authMiddlewares } from './auth';
import authReducer from './auth';
import httpReducer, { httpMiddlewares, HTTPState } from './http';
import { initMiddleware } from './initiazilation';

export interface AppState {
  authReducer: AuthState,
  httpReducer: HTTPState
}

declare global {
  interface Window { 
    __REDUX_DEVTOOLS_EXTENSION__: any; 
  }
}

let reducers = combineReducers<AppState>({
  authReducer,
  httpReducer
})

const createStoreWithMiddleware = applyMiddleware(...authMiddlewares, ...httpMiddlewares, ...initMiddleware)(createStore)

export let store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());