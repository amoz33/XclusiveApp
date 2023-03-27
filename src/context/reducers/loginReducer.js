import {
  GET_USER_EXPO_TOKEN,
  LOGIN_FAIL,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER
} from '../../constants/actionTypes'

const loginReducer = (prevState, action) => {
  switch (action.type) {
    case LOGIN_FAIL:
      return {
        ...prevState,
        isLoading: false,
      };
    case LOGIN_USER:

      return {
        ...prevState,
        userData: action.data,
        userToken: action.token,
        isLoading: false,
      };

    case LOGOUT_USER:
      return {
        ...prevState,
        userName: null,
        userToken: null,
        isLoading: false,
      };
    case REGISTER_USER:
      return {
        ...prevState,
        userName: action.id,
        userToken: action.token,
        isLoading: false,
      };

    case GET_USER_EXPO_TOKEN:
      return {
        ...prevState,
        isLoading: false,
        expoToken: action.token
      }
    //console.log('loginToken:', userToken);
  }
};
export default loginReducer
