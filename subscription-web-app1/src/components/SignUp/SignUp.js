
import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {InputAdornment ,Input}from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { isEmail, isEmpty } from "validator";
import { useDispatch } from 'react-redux'
import { registerUser } from "./../../store/actions/authActions";


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


function SignUp() {
  const classes = useStyles();
 const dispatch = useDispatch()
 const [state,setState] =useState({
    username: '',
    fullname: "",
    email: '',
    password: '',
    confirmpassword: "",
    phoneno: "",
    })

  const [errors,setErrors] =useState({
    username: '',
    fullname: "",
    email: '',
    password: '',
    confirmpassword: "",
    phoneno: "",
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
    let { fullname, username, email, password, confirmpassword, phoneno } = state;
    let errors = { fullname: "", username: "", email: "", password: "", confirmpassword: "", phoneno: "" };
    let valid = true;
  
    if (isEmpty(email) || !isEmail(email)) {
  
      errors.email = "Please provide a valid email address";
      valid = false;
    }
  
    if (isEmpty(password) || password.length < 8) {
      errors.password = "Passowrd should be at least 8 characters long";
      valid = false;
    }
  
    if (password !== confirmpassword) {
      errors.confirmpassword = "Passwords mismatch";
      valid = false;
    }
  
  
    if (isEmpty(phoneno) || phoneno.length < 11) {
      errors.phoneno = "You must enter Phone No";
      valid = false;
    }
  
    if (isEmpty(fullname)) {
      errors.fullname = "Enter your full name";
      valid = false;
    }
  
    if (isEmpty(username)) {
      errors.username = "Username is required";
      valid = false;
    }
  
    setErrors(errors);
  
    return valid;
  };
  


  const handleSubmit = (e) => {
      e.preventDefault()
    if (validateForm) {
        let user = {
          username: state.username,
          fullname: state.fullname,
          email: state.email,
          password: state.password,
          confirmpassword: state.confirmpassword,
          phoneno: state.phoneno,
          }
       dispatch(registerUser(user))
       }
       else {
         setvalidateOnChange(true);
       }
  };


 
  
  return (
    <div className="container d-flex justify-content-center"  >
      <div className={classes.paper} style={{ backgroundColor:'#FFFFFF' ,border: '1px solid white', borderRadius: '10px' }}>
        <form >
          <div className="form-group">
            <label className="form-label">User Name</label>
            <input name="username" type="text" onChange={handleChange} value={state.username} className="form-control border-none" style={{ borderStyle: 'none' ,backgroundColor:'#F5F5F5'}} />
            <span className={classes.errors} >{errors.username?errors.username:null}</span>
          </div>

          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input name="fullname" type="text" onChange={handleChange} value={state.fullname} className="form-control border-none" style={{ borderStyle: 'none' ,backgroundColor:'#F5F5F5'}} />
            <span className={classes.errors} >{errors.fullname?errors.fullname:null}</span>
          </div>

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
              fullWidth={true}
              value={state.password}
              onChange={handleChange}
              className={classes.field}
              disableUnderline={true}
              size="medium"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility">
                    <VisibilityOffIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
            <span className={classes.errors}>{errors.password ? errors.password : null}</span>
          </div>


          <div className="form-group">
            <div>
              <label>Confirm Password</label>
            </div>
            <Input
              type='password'
              name="confirmpassword"
              fullWidth={true}
              value={state.confirmpassword}
              onChange={handleChange}
              className={classes.field}
              disableUnderline={true}
              size="medium"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility">
                    <VisibilityOffIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
            <span className={classes.errors}>{errors.confirmpassword ? errors.confirmpassword : null}</span>
          </div>


          
          <div className="form-group">
            <label className="form-label">Phone No</label>
            <input name="phoneno" type="number" onChange={handleChange} value={state.phoneno} className="form-control border-none" style={{ borderStyle: 'none' ,backgroundColor:'#F5F5F5'}} />
            <span className={classes.errors} >{errors.phoneno?errors.phoneno:null}</span>
          </div>
            
          <div className= "d-grid gap-2">
             <button onClick={handleSubmit}    className="btn btn-block" style={{backgroundColor:'#444444', color:'white'}} >Create an account</button>
         </div>
        </form>

      </div>

    </div>
  );
}

export default SignUp;
