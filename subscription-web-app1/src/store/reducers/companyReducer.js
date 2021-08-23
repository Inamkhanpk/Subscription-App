import * as types from './../actions/types';

const initialState = {

  registerCompany: {},
  getcompanies:[],
  
 

};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case types.REGISTER_COMPANY:
      return {
        ...state,
        registerCompany:action.payload
      };
    case types.GET_COMPANIES:
      return {
        ...state,
        getcompanies:action.payload
      }
   default:
      return state;
  }
}