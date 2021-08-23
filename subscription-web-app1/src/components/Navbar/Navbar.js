import React from 'react'
import logo from './../../assets/logo.png'
import history from './../../history'
import { Signout } from "./../../store/actions/authActions";
import { useDispatch } from 'react-redux'

const Navbars = () => {
  const dispatch = useDispatch()
 


  const handleSignOut = () =>{
    localStorage.removeItem("token");
    dispatch(Signout())
    history.push('/')
  }


    return(
        <div >
            <nav className="navbar navbar-light bg-light d-flex justify-content-center">
              <img className="navbar-brand " src= {logo} width="30" height="30" alt="logo"/>
  
            <form className="form-inline ">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            </form>

              <div>
              <i className="fas fa-sign-out-alt "></i>
             <span className="m-0" onClick={handleSignOut}>Sign Out</span>
             </div>

            </nav>
        </div>

    )
}

export default Navbars;