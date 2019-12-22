import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import { connectRouter } from 'connected-react-router'
import auth, { AuthState, authMiddlewares } from './auth';
import http, { httpMiddlewares, HTTPState } from './http';
import { initMiddleware } from './initialization';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router'
export interface AppState {
  router: any;
  auth: AuthState;
  http: HTTPState;
}

// const t = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

// const composeEnhancers =
//   process.env.NODE_ENV !== 'production' && t ? t : compose;

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createBrowserHistory()

export default function configureStore() {
  const rootReducer = (history: any) => combineReducers<AppState>({
    router: connectRouter(history),
    auth,
    http
  });

  return createStore(
    rootReducer(history),
    undefined,
    composeEnhancers(
      applyMiddleware(routerMiddleware(history), ...authMiddlewares, ...httpMiddlewares, ...initMiddleware)
    )
  );
}


export * from './auth';
