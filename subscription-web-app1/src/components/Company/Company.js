import React,{useState} from  'react'
import { isEmail, isEmpty } from "validator";
import { makeStyles } from '@material-ui/core/styles';
import { regCompany} from "./../../store/actions/companyAction";
import { useDispatch ,useSelector} from 'react-redux'

const useStyles = makeStyles((theme) => ({
  inputfield: {
    position: 'relative'
  },
  icon: {
    position: 'absolute',
    left: '600px',
    top: '6px'
  },
btn1: {
    width: '100%',
    marginBottom: '3px',
    backgroundColor: 'blue',
    borderRadius: '5px',
    border: 'none',
    color: 'white',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.4rem'
    },
  },
  paper: {
    width: '35%',
    backgroundColor: '#FFFFFF',
    padding: theme.spacing(2),
    border: '1px solid white',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',

    margin: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      width: '80%'
    },
  },

  field: {
    backgroundColor: '#F5F5F5',
    padding: '2px',
    height: '38px',
    borderRadius: '5px'
  },
  btn2: {
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
  errors: {
    color: 'red'
  }
}));
const options = [
  "Select Category","Transport","Food","Digital","Insurance"
 ];

const Company = () =>{

  const classes = useStyles();
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth);
  const company = useSelector((state) => state.company);
  console.log(auth)
 
  const [state, setState] = useState({
    getCompanies:company.getcompanies,
    companyname: '',
    category: "",
    thumbnail: '',
    description : '',
    address1: "",
    address2: "",
    phoneno:"",
    contactperson :"",
    email:'',
    
 })
  
  const [errors, setErrors] = useState({
    companyname: '',
    category: "",
    thumbnail: '',
    description : '',
    address1: "",
    address2: "",
    phoneno:"",
    contactperson :"",
    email:'',
  
  })
  const [validateOnChange, setvalidateOnChange] = useState(false)




  const handleChange = (e) => {
    const { name, value } = e.target
   setState(prevState => ({
      ...prevState,
      [name]: value
    }))
     if (validateOnChange) {
      validateForm();
    }
  }

  const handleImageChange = (e) => {
    console.log(e.target.files[0])
    setState({...state, thumbnail: e.target.files[0]});
}



  const validateForm = () => {
    let { companyname,category,description,address1,address2,phoneno,contactperson,email} = state;
    let errors = { comapanyname: "", category: "",thumbnail: "", description: "",address1 ,address2: "",phoneno:'', contactperson: "", email: "",checkde:"" };
    let valid = true;

 
    if (isEmpty(companyname)) {
      errors.companyname = "Enter your Company name";
      valid = false;
    }

    if (isEmpty(category)) {
      errors.category = "Cateory is required";
      valid = false;
    }

    

    if (isEmpty(description)) {
      errors.description = "Description is necessary";
      valid = false;
    }

    if (isEmpty(address1)) {
      errors.address1 = "Address1 is required";
      valid = false;
    }

    if (isEmpty(address2)) {
      errors.address2 = "Address2 is required";
      valid = false;
    }


    if (isEmpty(email) || !isEmail(email)) {

      errors.email = "Please provide a valid email address";
      valid = false;
    }

    if (isEmpty(phoneno)) {
      errors.phoneno = "Phone Number is required";
      valid = false;
    }
    if (isEmpty(contactperson)) {
      errors.contactperson = "Conact Person is required";
      valid = false;
    }
    
    setErrors(errors);

    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {


      const formData = new FormData();
      
      formData.append('companyname', state.companyname);
      formData.append('category',state.category);
      formData.append('thumbnail',state.thumbnail);
      formData.append('description',state.description );
      formData.append('address1',state.address1);
      formData.append('address2',state.address2);
      formData.append('email',state.email);
      formData.append('designation',state.designation);
      formData.append('phoneno',state.phoneno);
      formData.append('contactperson',state.contactperson);
      formData.append("uploader",auth.loginUser._id)
     dispatch(regCompany(formData))
     } else {
      setvalidateOnChange(true);
        }
  };



  

    return(
        <div className="container">
            <div className="mt-3">
            <div className="bg-light  rounded w-75 m-auto p-5">
          <form>
  <div className="form-group row">
    <label  className="col-sm-4  col-form-label">Company Name</label>
    <div className="col-sm-8">
      <input type="text" name="companyname"  onChange={handleChange} value={state.companyname}
      
      className="form-control border-0"/>
      <span className={classes.errors}>{errors.companyname ? errors.companyname : null}</span>
    </div>
  </div>

  <div className="form-group row">
    <label  className="col-sm-4 col-form-label">Category</label>
    <div className="col-sm-8">
    
      <select className="form-control" name="category" onChange={handleChange}  value={state.category} >
      {options.map((option,index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
        </select>
      <span className={classes.errors}>{errors.category ? errors.category : null}</span>
    </div>
  </div>

  <div className="form-group row">
    <label  className="col-sm-4 col-form-label">Thumbnail</label>
    <div className="col-sm-8">
      <input type="file" name="thumbnail"  onChange={handleImageChange}  className=" form-control-file " />
      <span className={classes.errors}>{errors.thumbnail ? errors.thumbnail : null}</span>
    </div>
  </div>


  <div className="form-group row">
    <label  className="col-sm-4 col-form-label">Description</label>
    <div className="col-sm-8">
      <input type="text" name="description"  onChange={handleChange} value={state.description} className="form-control border-0"/>
      <span className={classes.errors}>{errors.description ? errors.description : null}</span>
    </div>
  </div>

  

  <div className="form-group row">
    <label  className="col-sm-4 col-form-label">Address 1</label>
    <div className="col-sm-8">
      <input type="text" name="address1"  onChange={handleChange} value={state.address1} className="form-control border-0" />
      <span className={classes.errors}>{errors.address1 ? errors.address1 : null}</span>
    </div>
  </div> 


  <div className="form-group row">
    <label className="col-sm-4 col-form-label">Address 2</label>
    <div className="col-sm-8">
      <input type="text" name="address2"  onChange={handleChange} value={state.address2} className="form-control border-0"  />
      <span className={classes.errors}>{errors.address2 ? errors.address2 : null}</span>
    </div>
  </div>

  <div className="form-group row">
    <label  className="col-sm-4 col-form-label">Email</label>
    <div className="col-sm-8">
      <input type="email" name="email"  onChange={handleChange} value={state.email}  className="form-control border-0" />
      <span className={classes.errors}>{errors.email ? errors.email : null}</span>
    </div>
  </div>

  <div className="form-group row">
    <label className="col-sm-4 col-form-label">Designation</label>
    <div className="col-sm-8">
      <input type="text" name="designation"  onChange={handleChange} value={state.designation} className="form-control border-0" />
      <span className={classes.errors}>{errors.designation ? errors.designation : null}</span>
    </div>
  </div>

  <div className="form-group row">
    <label  className="col-sm-4 col-form-label">Phone no</label>
    <div className="col-sm-8">
      <input type="number" name="phoneno"  onChange={handleChange} value={state.phoneno} className="form-control border-0" />
      <span className={classes.errors}>{errors.phoneno ? errors.phoneno : null}</span>
    </div>
  </div>

  <div className="form-group row">
    <label className="col-sm-4 col-form-label">Contact Person</label>
    <div className="col-sm-8">
      <input type="text" name="contactperson"  onChange={handleChange} value={state.contactperson} className="form-control border-0"/>
      <span className={classes.errors}>{errors.contactperson ? errors.contactperson : null}</span>
    </div>
  </div>



   <div className="d-flex justify-content-end">
     <button className="btn btn-primary " onClick={handleSubmit}>
       Submit
     </button>
   </div>
  
</form>
</div>
</div>
        </div>

    )
}

export default Company;