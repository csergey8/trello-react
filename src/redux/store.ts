import { createStore, combineReducers, applyMiddleware } from 'redux';

import { authReducer } from './auth';

declare global {
  interface Window { 
    __REDUX_DEVTOOLS_EXTENSION__: any; 
  }
}



let reducers = combineReducers({
  authReducer
})

const createStoreWithMiddleware = applyMiddleware()(createStore)

export let store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());