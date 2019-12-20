import { ACTION_TYPES } from './types';

export interface AuthState {
    token: string;
}
  
const initialAuthState: AuthState = {
    token: ""
}
  
export default (state: AuthState = initialAuthState, action: any ) => {
    switch(action.type) {
        case ACTION_TYPES.SET_TOKEN:
        return {
            ...state,
            token: action.payload
        }
        default: 
        return state
    }
}
  
  