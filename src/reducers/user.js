import { 
    SET_ADMIN,
    SIGNIN_BY_TOKEN,
    SET_NAME,
    SIGNIN_BY_TOKEN_ADMIN,
    REGISTER,
    SET_USER_INFOS,
  } from '../actions';
  
  const initialState = {
    user: '',
    logged: false,
  };
  
  const User = (state = initialState, action = {}) => {
    switch (action.type) {
      case SET_USER_INFOS:
        return {
          ...state,
          // logged: true,
          user: action.payload,
        }
      case SET_NAME:
        return {
          ...state,
          // logged: true,
          user: action.payload,
        }
      case SIGNIN_BY_TOKEN:
        return {
          ...state,
          logged: true,
          // user: action.payload,
        }
      case SIGNIN_BY_TOKEN_ADMIN:
        return {
          ...state,
          logged: true,
          // user: action.payload,
        }
      case SET_ADMIN:
        return {
          ...state,
          logged: true,
          // user: action.payload,
        }
      case REGISTER:
        return {
          ...state,
          // logged: true,
          // admin: action.payload,
          // user: action.payload,
        }
      default:
        return state;
    }
  };
  
  export default User;
  