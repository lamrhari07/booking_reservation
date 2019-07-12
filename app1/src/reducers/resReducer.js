import { ReservationTypes } from "../actions/actionTypes"


const initState = {
    isLoading: false,
    data: [],
    error: []
}

export const resReducer = (state = initState, action) => {
    switch (action.type) {
        case ReservationTypes.RESERVE_LOAD:
            return { ...state, isLoading: true }

        case ReservationTypes.RESERVE_SUCCESS:
            return { ...state, isLoading: false, data: [action.payload] }

        case ReservationTypes.RESERVE_FAILED:
            return { ...state, isLoading: false, error: action.payload }

        default:
            return state
    }
}

export default resReducer;