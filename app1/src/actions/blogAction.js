import { BlogTypes } from "./actionTypes";
import axios from "axios";
import history from "../utils/history";


const BlogLoad = () => {
    return {
        type: BlogTypes.BLOG_LOAD,
    };
}

const BlogSuccess = (data) => {
    return {
        type: BlogTypes.BLOG_SUCCESS,
        payload: data
    };
}

export const BlogFailure = (error) => {
    return {
        type: BlogTypes.BLOG_FAILED,
        payload: error
    };
}

export const FetchBlog = () => {

    const URL_ROOT = "http://127.0.0.1:8000/blog/";

    return async (dispatch) => {
        try {
            dispatch(BlogLoad())
            const result = await axios.get(URL_ROOT)
            const data = result.data
            dispatch(BlogSuccess(data))
        } catch (error) {
            // If request is bad...
            // Show an error to the user   
            dispatch(BlogFailure(error))
        }
    }
}

export const CreatePost = (inputs) => {

    const URL_ROOT = "http://127.0.0.1:8000/blog/create";
    const token = localStorage.getItem('id_token')

    return async (dispatch) => {
        try {
            await axios.post(URL_ROOT, inputs, {
                headers: {
                            "Authorization": `JWT ${token}`,
                            'content-type': 'multipart/form-data'
                        }
                    })
            alert('Post is created')
        } catch (error) {
            // If request is bad...
            // Show an error to the user   
            dispatch(BlogFailure(error))
            if (error.response.status === 401) {
                localStorage.removeItem('id_token')
                history.push('/login')
            }
        }
    }
}

export const FetchSinglePost = (id) => {

    const URL_ROOT = "http://127.0.0.1:8000/blog/";

    return async (dispatch) => {
        try {
            dispatch(BlogLoad())
            const result = await axios.get(`${URL_ROOT}${id}/`)
            const data = result.data
            dispatch(BlogSuccess(data))
        } catch (error) {
            // If request is bad...
            // Show an error to the user   
            dispatch(BlogFailure(error))
        }
    }
}
