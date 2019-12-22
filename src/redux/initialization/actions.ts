import { ACTION_TYPES } from './types';
import { tokenInitThunk } from '../auth';

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
    dispatch(tokenInitThunk());
    dispatch(initEnd());
}