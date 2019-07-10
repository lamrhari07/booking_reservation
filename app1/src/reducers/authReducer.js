import { AuthTypes } from "../actions/actionTypes"


const initState = {
    isLoading: false,
    isAuthenticated: false,
    data: [],
    error: []
}

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case AuthTypes.LOAD:
            return { ...state, isLoading: true, isAuthenticated: false }

        case AuthTypes.SUCCESS:
            return { ...state, isLoading: false, isAuthenticated: true, data: [action.payload] }

        case AuthTypes.FAILED:
            return { ...state, isLoading: false, isAuthenticated: false, error: action.payload }

        default:
            return state
    }
}

export default authReducer;