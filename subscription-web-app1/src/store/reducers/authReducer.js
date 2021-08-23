
import * as types from './../actions/types';

const initialState = {

 
  loginUser:{},
  isAuthenticated:false,
  registered:false

};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    
    case types.LOGIN_USER:
      return {
        ...state,
        loginUser:action.payload,isAuthenticated:true
      }

      case types.LOGOUT_USER:
      return {
        ...state,
        loginUser:null
      }
    case types.REGISTER_USER:
        return {
          ...state,
          registered:true
        }
   
    default:
      return state;
  }
}