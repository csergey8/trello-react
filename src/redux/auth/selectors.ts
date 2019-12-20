import { AppState } from '../';

export const getToken = (state: AppState): string => state.authReducer.token;
export const isAuthenticated  = (state: AppState): boolean => !!state.authReducer.token