import actionTypes from './actionTypes'
import { apiGetLienHe ,apiGetPostsLimit } from '../../services/lienhe'

export const getLienHe = () => async (dispatch) => {
    try {
        const response = await apiGetLienHe()
        // console.log(response)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_LIENHE,
                posts: response.data.response
            })
            // console.log(dispatch)
        } else {
            dispatch({
                type: actionTypes.GET_LIENHE,
                msg: response.data.msg
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_LIENHE,
            post: null
        })
    }
}