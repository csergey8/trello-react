import { AppState } from '../';

export const getToken = (state: AppState): string => state.auth.token;
export const isAuthenticated  = (state: AppState): boolean => !!state.auth.token