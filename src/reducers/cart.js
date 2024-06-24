import { 
    ADD_TO_CART,
    ADD_ALL_TO_CART,
    MODIFY_CART,
    SIGNIN_BY_TOKEN,
    SET_NAME,
  } from '../actions';
  
  const initialState = {
    cart: [],
  };
  
  const Cart = (state = initialState, action = {}) => {
    switch (action.type) {
      case ADD_TO_CART:
        return {
          ...state,
          cart: [...state.cart, ...action.payload],
        };
      case ADD_ALL_TO_CART:
        // return {
        //   ...state,
        //   cart: [...state.cart, ...action.payload],
        // };
      case MODIFY_CART: 
      return {
        ...state,
        cart: [...action.payload],
      };
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
      default:
        return state;
    }
  };
  
  export default Cart;
  