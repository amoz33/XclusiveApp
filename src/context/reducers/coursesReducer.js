
import { GET_COURSES_FAILED, GET_COURSES_LOADING, GET_COURSES_SUCCESSFUL } from "../../constants/actionTypes";

const coursesReducer = (state, { type, payload }) => {
  switch (type) {
    case GET_COURSES_FAILED:
      return {
        ...state,
        error: payload,
        loadiing: false,
      }
    case GET_COURSES_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case GET_COURSES_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        error: null,
        data: payload
      }

    default:
      return state;
  }

}

export default coursesReducer