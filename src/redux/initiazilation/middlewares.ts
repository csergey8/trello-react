import { ACTION_TYPES } from './types';
import { initEnd, initStart } from './actions';
import { subscribe } from '../../utils/redux';
import { getTokenAction } from '../auth';

const initWorker = ({ action, dispatch, next }: any) => {
  debugger;
  dispatch(initStart());
  dispatch(getTokenAction());
  dispatch(initEnd());
  next(action);
};

const init = ({ dispatch }: any) => (next: any) =>{
  debugger;
  return subscribe(ACTION_TYPES.INIT, initWorker)(next, dispatch);
}
  

  
export const initMiddleware = [init];