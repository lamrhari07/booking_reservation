import { AuthTypes } from "./actionTypes";
import axios from "axios";
import history from "../utils/history";


export const UserLoad = () => {
    return {
        type: AuthTypes.LOAD,
    };
}

export const UserSuccess = (data) => {
    return {
        type: AuthTypes.SUCCESS,
        payload: data
    };
}

export const UserFailure = (error) => {
    return {
        type: AuthTypes.FAILED,
        payload: error
    };
}


export const loginUser = (inputs) => {

    const URL_ROOT = "http://127.0.0.1:8000/login/";

    return async (dispatch) => {
        try {
            dispatch(UserLoad())
            const result = await axios.post(URL_ROOT, inputs)
            const data = result.data
            dispatch(UserSuccess());
            localStorage.setItem("id_token", data.token);
            history.push('/app')
        } catch (error) {
            // If request is bad...
            // Show an error to the user   
            dispatch(UserFailure(error))
        }
    }
}

export const UserRegistration = (inputs) => {

    const URL_ROOT = "http://127.0.0.1:8000/registration/";

    return async (dispatch) => {
        try {
            dispatch(UserLoad())
            const result = await axios.post(URL_ROOT, inputs)
            const data = result.data
            dispatch(UserSuccess(data))
            localStorage.setItem("token", data.token);
        } catch (error) {
            // If request is bad...
            // Show an error to the user   
            dispatch(UserFailure(error))
        }
    }
}
export const UserProfile = () => {
    const URL_ROOT = "http://127.0.0.1:8000/profile/";
    const token = localStorage.getItem('id_token')
    return async (dispatch) => {
        dispatch(UserLoad())
        try {
            const result = await axios.get(URL_ROOT, { headers: { "Authorization": `JWT ${token}` } })
            const data = result.data
            dispatch(UserSuccess(data))
        } catch (error) {
            // If request is bad...
            // Show an error to the user 
            dispatch(UserFailure(error))
            //localStorage.clear()
        }
    }

}

export const EditUserProfile = (user, address, inputs) => {
    const URL_ROOT = "http://127.0.0.1:8000/profile/";
    const token = localStorage.getItem('id_token')
    return async (dispatch) => {
        try {
            dispatch(UserLoad())
            const result = await axios.put(URL_ROOT,
                {
                    user: user,
                    address: address,
                    ...inputs
                }
                , { headers: { "Authorization": `JWT ${token}` } })
            const data = result.data
            dispatch(UserSuccess(data))
            alert('Your information has been updated');
        } catch (error) {
            // If request is bad...
            // Show an error to the user_data
            UserFailure(error);
        }
    }
}