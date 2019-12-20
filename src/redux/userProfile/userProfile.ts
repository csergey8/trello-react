

export enum ACTION_TYPES {
    GET_USER_PROFILE='@@USER_PROFILE/GET_USER_PROFILE'
}

export interface UserProfileState {
    profile?: {}
}

const initialState: UserProfileState = {
    profile: {}
}

export const userProfileReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ACTION_TYPES.GET_USER_PROFILE:
            return {
                ...state,
                profile: action.payload
            }
        default:
            return state
    }
}

export const getUserProfile = (token: string) => {
    
}