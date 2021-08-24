import * as types from './types';
import axios from 'axios'
import history from './../../history'
import toastr from 'toastr';

export const regCompany = (companydetails) => async (dispatch) => {
 try {
     const { data } = await axios.post("/admin/registerCompany", companydetails );
     toastr.success("Successfully Registered Company")
      dispatch({ type: types.REGISTER_COMPANY, payload: data });
      history.push('/offerlist')
    }
   catch (error) {
    toastr.error(error.message);
  }
  };


  export const getCompany = () => async (dispatch) => {
   try {
       const { data } = await axios.get("/admin/getcompany");
      dispatch({ type: types.GET_COMPANIES, payload: data });
      }
     catch (error) {
      toastr.error(error.message);
    }
    };


 




    


    