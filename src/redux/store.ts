import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import { connectRouter } from 'connected-react-router'
import auth, { AuthState } from './auth';
import { boardsReducer } from './boards'
import { createBrowserHistory } from 'history';
import { userProfileReducer } from './userProfile';
import { cardsReducer } from './cards';
import { routerMiddleware } from 'connected-react-router';
import ReduxThunk from 'redux-thunk';

export interface AppState {
  router: any;
  auth: AuthState;
  userProfileReducer: any;
  boardsReducer: any;
  cardsReducer: any;
}

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createBrowserHistory()

export default function configureStore() {
  const rootReducer = (history: any) => combineReducers<AppState>({
    router: connectRouter(history),
    auth,
    userProfileReducer,
    boardsReducer,
    cardsReducer
  });

  return createStore(
    rootReducer(history),
    undefined,
    composeEnhancers(
      applyMiddleware(routerMiddleware(history), ReduxThunk)
    )
  );
}


export * from './auth';
