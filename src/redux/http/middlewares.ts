import uuid from 'uuid/v4';

import { ACTION_TYPES } from './types';
import { Worker, subscribe } from '../../utils';

const requestWorker: Worker<any> = async ({ action, next }) => {
    const requestId = uuid();
    const { path, onSuccess, method = 'GET' } = action;

    const options: any = {
        header: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }

    const response = await fetch(path, options);

    if(response.status >= 400) {
        console.log('ERROR RESPONSE')
    }

    const data = await response.json();
    onSuccess(data)
};

const requestMiddleware = ({ dispatch, getState }: any) => (next: any) => subscribe(ACTION_TYPES.REQUEST, requestWorker)(dispatch, getState, next);

export const httpMiddlewares = [requestMiddleware];