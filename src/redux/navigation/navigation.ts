export enum ACTION_TYPES {
    TO_DASHBOARD='@@NAVIGATION/TO_DASHBOARD',
    TO_LOGIN='@@AUTH/TO_LOGIN',
    SET_REDIRECT_URL='@@AUTH/SET_REDIRECT_URL'
}

interface NavigationState {
    redirectUrl?: string
}

const navigationState: NavigationState = {
    redirectUrl: ""
}

export const navigationReducer = (state: NavigationState = navigationState, action: any) => {
    switch (action.type) {
        case ACTION_TYPES.SET_REDIRECT_URL:
            return {
                ...state,
                redirectUrl: action.payload
            }
        default:
            return state
    }
}

export const setRedirectUrl = (url: any) => {
    return {
        type: ACTION_TYPES.SET_REDIRECT_URL,
        payload: url
    }
}

export const navigateToDashboard = () => {
    
}