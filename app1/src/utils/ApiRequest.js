
import { useReducer } from 'react';
import axios from 'axios';
import { UserLoad, UserSuccess, UserFailure } from '../actions';
import authReducer from '../reducers/authReducer';
import { initState } from '../store/Store';

const useApiRequest = (endpoint, { verb = 'get', params = {} } = {}) => {
    const [state, dispatch] = useReducer(authReducer, initState);

    const makeRequest = async () => {
        dispatch(UserLoad());
        try {
            const response = await axios[verb](endpoint, params);
            dispatch(UserSuccess(response));
        } catch (e) {
            dispatch(UserFailure(e));
        }
    };

    return [state, makeRequest];
};

export default useApiRequest;