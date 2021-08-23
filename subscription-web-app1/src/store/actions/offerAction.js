import * as types from './types';
import axios from 'axios'
import history from './../../history'
import toastr from 'toastr';

export const regOffer = (offerdetails) => async (dispatch) => {
 try {
     const { data } = await axios.post("http://localhost:4000/admin/registerOffer", offerdetails );
     
    toastr.success("Successfully Registered Offer")
    dispatch({ type: types.REGISTER_OFFER, payload: data });
    history.push('/offerlist')
     
    }
   catch (error) {
    toastr.error(error.message);
  }
  };


  export const getOffer = () => async (dispatch) => {
    try {
       const { data } = await axios.get("http://localhost:4000/admin/getoffer" );
      dispatch({ type: types.GET_OFFER, payload: data });
     }
     catch (error) {
      toastr.error(error.message);
    }
    };
  

    export const handlePurchaseOffer = () => async (dispatch) => {
      
      try {
         const { data } = await axios.get("http://localhost:4000/admin/handlealloffer" );
        dispatch({ type: types.ALL_OFFER, payload: data });
       }
       catch (error) {
        toastr.error(error.message);
      }
      };
    