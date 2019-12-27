import { ACTION_TYPES } from './types';
import { initTokenThunk } from '../auth';
import { getUserProfileThunk } from '../userProfile';

export const init = () => ({
    type: ACTION_TYPES.INIT
})

export const initStart = () => ({
    type: ACTION_TYPES.START
})

export const initEnd = () => ({
    type: ACTION_TYPES.END
})

export const reset = () => ({
    type: ACTION_TYPES.RESET
})

export const initThunk = () => (dispatch: any) => {
    dispatch(initStart());
    dispatch(initTokenThunk());
    dispatch(initEnd());
}