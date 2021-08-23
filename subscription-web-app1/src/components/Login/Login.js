
import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {InputAdornment ,Input}from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { isEmail, isEmpty } from "validator";
import { Link,useHistory} from "react-router-dom";
import { useDispatch } from 'react-redux'
import { loginUser } from "./../../store/actions/authActions";

const useStyles = makeStyles((theme) => ({
  
  paper: {
    width: '35%',
    margin:theme.spacing(2),
     padding: theme.spacing(8),
    [theme.breakpoints.down('md')]: {
      width: '70%',
      padding:theme.spacing(2)
    },
  },
  btn1: {
    width: '100%',
    padding: '4px',
    height: '40px',
    marginBottom: '7px',
    backgroundColor: 'blue',
    borderRadius: '5px',
    border: 'none',
    color: 'white',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.4rem'
    },
  },
  btn2: {
    width: '100%',
    padding: '4px',
    height: '40px',
    marginBottom: '7px',
    backgroundColor: 'black',
    borderRadius: '5px',
    border: 'none',
    color: 'white',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.4rem'
    },
  },
  formcontrol: {
    width: '100%',
  },
  field: {
    backgroundColor: '#F5F5F5',
    height: '35px',
    marginBottom: '10px',
    border: 'none !important',
    borderRadius: '5px'
  },
  forgotcolor:{
    color:'#0A46BF'
  },errors:{
    color: 'red' 
  }
}));

function Login() {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch()
 
 const [state,setState] =useState({
    email:'',
    password:'',
  })
  const [errors,setErrors] =useState({
    email:'',
    password:'',
    })
  const [validateOnChange,setvalidateOnChange]=useState(false)
 

const handleChange = (e) => {
   const {name , value} = e.target   
    setState(prevState => ({
        ...prevState,
        [name] : value
    }))

    if (validateOnChange) {
      validateForm();
    }
}


const validateForm = () => {
  let { email,password } = state;
  let  errors = {email:"",password:""}  ;
  let valid = true;

  if (isEmpty(email) || !isEmail(email)) {
    
    errors.email = "Please provide a valid email address";
    valid = false;
  }

  if (isEmpty(password) || password.length < 8) {
    errors.password = "Passowrd should be at least 8 characters long";
    valid = false;
  }
 setErrors(errors);
  
  return valid;
};




  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      let user={
        email:state.email,
        password:state.password,
        }
       dispatch(loginUser(user))
      
    } 
    else {
      setvalidateOnChange(true);
     }
  };


 const handlePage = ()=>{
   history.push("/signup")
 }
  
  return (
    <div className="container d-flex justify-content-center"  >
     <div className={classes.paper} style={{ backgroundColor:'#FFFFFF' ,border: '1px solid white', borderRadius: '10px' }}>
        <form >

          <div className="form-group">
            <label className="form-label">Email</label>
            <input name="email" type="email" onChange={handleChange} value={state.email} className="form-control border-none" style={{ borderStyle: 'none' ,backgroundColor:'#F5F5F5'}} />
            <span className={classes.errors} >{errors.email?errors.email:null}</span>
          </div>

        
          <div className="form-group">
            <div>
              <label  >Password</label>
            </div>
            <Input
              
              type='password'
              name="password"
              autoComplete="on"
              fullWidth={true}
              value={state.password}
              onChange={handleChange}
              className={classes.field}
              disableUnderline={true}
              size="medium"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility" >
                    <VisibilityOffIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
            <span className={classes.errors}>{errors.password ? errors.password : null}</span>
          </div>
            

            <div className="d-flex justify-content-between flex-wrap">
            <div className="form-group">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" ></input>
                <label className="form-check-label" >Remember me</label>
              </div>
              </div>

              <div className={classes.forgotcolor}>
              <Link to="/reset">Forgot password</Link>
              </div>

            </div>
        

          <div className= "d-grid gap-2">
            <button type="submit" className="btn btn-block" style={{backgroundColor:'#535ADF', color:'white'}}  onClick={handleSubmit}>Log In</button>
            <button className="btn btn-block" style={{backgroundColor:'#444444', color:'white'}} onClick={handlePage} >Create an account</button>
           
          </div>
        </form>

      </div>

    </div>
  );
}

export default Login;
