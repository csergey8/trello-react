

export enum ACTION_TYPES {
    GET_USER_PROFILE='@@USER_PROFILE/GET_USER_PROFILE'
}

export interface UserProfileState {
    profile?: any
}

const initialState: UserProfileState = {
    profile: null
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

export const getUserProfileAction = (profile: any) => ({
    type: ACTION_TYPES.GET_USER_PROFILE,
    payload: profile
})

export const getUserProfileThunk = () => async(dispatch: any, getState: any) => {
    const { auth } = await getState();
    const response = await fetch(`https://api.trello.com/1/members/me/?token=${auth.token}&key=${process.env.REACT_APP_API_KEY}`);
    const data = await response.json();
    dispatch(getUserProfileAction(data));
}