import * as types from './types';
import axios from 'axios'
import history from './../../history'
import jwt_decode from 'jwt-decode'
import toastr from 'toastr';
import setAuthToken from "./../../utils/setAuthToken";

export const registerUser = (user) => async (dispatch) => {
 try {
   const { data } = await axios.post("http://localhost:4000/admin/register",user);
  
     history.push('/')
     if(data === "Email already exists")
     {
        toastr.error("Email already exist")
     }
     else{
      history.push('/')
      toastr.success("Registered Successfully")
      dispatch({ type: types.REGISTER_USER, payload: data });
     
  }
  } catch (error) {
    toastr.error(error);
  }
};



export const loginUser = (userLogin) => async (dispatch) => {
  try {
     const { data } = await axios.post("http://localhost:4000/admin/login",  userLogin );
     const { token } = data;
        localStorage.setItem("token", token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
       dispatch({ type: types.LOGIN_USER, payload: decoded});
      history.push('/offerlist')
    }
   catch (error) {
    toastr.error(error.message);
  }
  };


  export const Signout = () => async (dispatch) => {
  
    try {
       const { data } = await axios.get("http://localhost:4000/admin/signout" );
       setAuthToken(false);
      toastr.info(data.message)
    }
     catch (error) {
      toastr.error(error.message);
    }
    };




    


    