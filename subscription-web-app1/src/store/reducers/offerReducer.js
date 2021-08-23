import * as types from './../actions/types';

const initialState = {

  registerOffer: {},
  getoffer:[],
  getalloffer:[]
  
 

};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case types.REGISTER_OFFER:
      return {
        ...state,
        registerOffer:action.payload
      };
    case types.GET_OFFER:
      return {
        ...state,
        getoffer:action.payload
      }

      case types.ALL_OFFER:
      return {
        ...state,
        getalloffer:action.payload
      }

     

      
      
       
   
    default:
      return state;
  }
}