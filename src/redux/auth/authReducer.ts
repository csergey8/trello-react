
interface AuthState {
  token: string;
  isAuthenticated: boolean;
}


const initialAuthState: AuthState = {
  token: "",
  isAuthenticated: false
}

export const authReducer = (state = initialAuthState, action: any ) => {
  switch(action.type) {
    case 'GET_TOKEN': 
      return state
    case 'GET_AUTH':
      return {
        ...state,
        isAuthenticated: true
      }
    default: 
      return state
  }
}