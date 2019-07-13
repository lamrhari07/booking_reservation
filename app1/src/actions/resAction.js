import { ReservationTypes } from './actionTypes';
import axios from 'axios';
import history from '../utils/history';


export const ReserLoad = () => {
    return {
        type: ReservationTypes.RESERVE_LOAD,
    };
}

export const ReserSuccess = (data) => {
    return {
        type: ReservationTypes.RESERVE_SUCCESS,
        payload: data
    };
}

export const ReserFailure = (error) => {
    return {
        type: ReservationTypes.RESERVE_FAILED,
        payload: error
    };
}

export const FetchReservation = () => {

    const URL_ROOT = 'http://127.0.0.1:8000/reservation/';
    const token = localStorage.getItem('id_token')

    return async (dispatch) => {
        try {
            dispatch(ReserLoad())
            const result = await axios.get(URL_ROOT, { headers: { "Authorization": `JWT ${token}` } })
            const data = result.data
            dispatch(ReserSuccess(data));
        } catch (error) {
            // If request is bad...
            // Show an error to the user   
            dispatch(ReserFailure(error))
            if (error.response.status === 401) {
                localStorage.removeItem('id_token')
                history.push('/login')
            }
        }
    }
}

export const MakeReservation = (inputs) => {

    const URL_ROOT = 'http://127.0.0.1:8000/reservation/create/';

    return async (dispatch) => {
        try {
            dispatch(ReserLoad())
            await axios.post(URL_ROOT, inputs)
            alert('Your reservation will be expired after 30 days');
            history.push('/')
        } catch (error) {
            // If request is bad...
            // Show an error to the user   
            dispatch(ReserFailure(error))
        }
    }
}
