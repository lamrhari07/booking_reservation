import { BlogTypes } from "../actions/actionTypes"


const initState = {
    isLoading: false,
    data: []
}

export const blogReducer = (state = initState, action) => {
    switch (action.type) {
        case BlogTypes.BLOG_LOAD:
            return { ...state, isLoading: true }

        case BlogTypes.BLOG_SUCCESS:
            return { ...state, isLoading: false, data: [action.payload] }

        case BlogTypes.BLOG_FAILED:
            return { ...state, isLoading: false, error: action.payload }

        default:
            return state
    }
}

export default blogReducer;