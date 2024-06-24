export const LOGIN = 'LOGIN';
export const SIGNIN_BY_TOKEN_ADMIN = 'SIGNIN_BY_TOKEN_ADMIN';
export const ADD_TO_CART = 'ADD_TO_CART';
export const MODIFY_CART = 'MODIFY_CART';
export const SIGNIN_BY_TOKEN = 'SIGNIN_BY_TOKEN';
export const SET_NAME = 'SET_NAME';
export const SET_ADMIN = 'SET_ADMIN';
export const REGISTER = 'REGISTER';
export const SET_USER_INFOS = 'SET_USER_INFOS';
export const ADD_ALL_TO_CART = 'ADD_ALL_TO_CART';
// export const LOGIN = 'MODIFY_CART';

export const addAllToCart = (payload) => ({
  type: ADD_ALL_TO_CART,
  payload
});
export const setUserInfos = (payload) => ({
  type: SET_USER_INFOS,
  payload
});
export const register = (payload) => ({
  type: REGISTER,
  payload
});
export const setAdmin = (payload) => ({
  type: SET_ADMIN,
  payload
});
export const setName = (payload) => ({
  type: SET_NAME,
  payload
});
export const signinByToken = (payload) => ({
  type: SIGNIN_BY_TOKEN,
  payload
});
export const signinByTokenAdmin = (payload) => ({
  type: SIGNIN_BY_TOKEN_ADMIN,
  payload
});

export const login = (payload) => ({
  type: LOGIN,
  payload
})

export const addToCart = (payload) => ({
  type: ADD_TO_CART,
  payload
})
export const modifyCart = (payload) => ({
  type: MODIFY_CART,
  payload
})