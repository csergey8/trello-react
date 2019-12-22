import uuid from 'uuid/v4';
import { push } from 'connected-react-router'

import { ACTION_TYPES } from './types';
import { Worker, subscribe } from '../../utils';

const requestWorker: Worker<any> = async ({ action, dispatch, next }) => {
  const requestId = uuid();
  const { path, onSuccess, method = 'GET' } = action;

  const options: any = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
      // ...(authRequired && token ? { Authorization: `Bearer ${token}` } : {}),
    }
  };

  const response = await fetch(path, options);

  if (response.status >= 400) {
    console.log('ERROR');
    dispatch(push('/login'))
  }

  const data = await response.json();
  onSuccess(data);
};

const requestMiddleware = ({ dispatch, getState }: any) => (next: any) =>
  subscribe(ACTION_TYPES.REQUEST, requestWorker)(next, dispatch, getState);

export const httpMiddlewares = [requestMiddleware];
