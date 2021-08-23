import React, { useState } from 'react'
import { isEmpty } from "validator";
import { makeStyles } from '@material-ui/core/styles';
import { regOffer } from "./../../store/actions/offerAction";
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import QRCode from 'qrcode.react';

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

const options = ["Select Category", "Transport", "Food", "Digital", "Insurance"]

const suboption = ["Select SubCategory", "Ride Hailing",
  "Trucks",
  "Bus Train",
  "Airlines",
  "Fast Food",
  "Chinese",
  "Italian",
  "Bakeries & Bistros",
  "TV",
  "Internet",
  "Mobile Phone",
  "Property",
  "Auto",
  "Health"]

const Offer = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth);
  const company = useSelector((state) => state.company);
  const [qrCodeText, setQRCodeText] = useState('');
  const [inputText, setInputText] = useState('');
  const [state, setState] = useState({
    offername: '',
    category: "",
    subcategory: '',
    thumbnail: '',
    description: "",
    LinktoOffer: "",
    price: "",
    
  })

  const [errors, setErrors] = useState({
    offername: '',
    category: "",
    subcategory: '',
    thumbnail: '',
    description: "",
    LinktoOffer: "",
    price: "",
    
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




  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      const formData = new FormData();
      formData.append('offername', state.offername);
      formData.append('category', state.category);
      formData.append('subcategory', state.subcategory);
      formData.append('thumbnail', state.thumbnail);
      formData.append('description', state.description);
      formData.append('LinktoOffer', state.LinktoOffer);
      formData.append('price', state.price);
      formData.append('designation', state.designation);
      formData.append('checkedB', state.checkedB);
      formData.append('checkedA', state.checkedA);
      formData.append("uploader", auth.loginUser._id)
      formData.append("companyid", company.registerCompany._id)
      dispatch(regOffer(formData))
    } else {
      setvalidateOnChange(true);
    }
  };


  const handleImageChange = (e) => {
    setState({ ...state, thumbnail: e.target.files[0] });
  }

  const validateForm = () => {
    let { offername, category, subcategory,  description, LinktoOffer, price } = state;
    let errors = { offername: "", category: "", subcategory, description: "", LinktoOffer, price: "" };
    let valid = true;


    if (isEmpty(offername)) {
      errors.offername = "Enter your Offer name";
      valid = false;
    }

    if (isEmpty(category)) {
      errors.category = "Cateory is required";
      valid = false;
    }

    if (isEmpty(subcategory)) {
      errors.subcategory = "SubCategory is required";
      valid = false;
    }
    
    if (isEmpty(description)) {
      errors.description = "Description is necessary";
      valid = false;
    }

    if (isEmpty(LinktoOffer)) {
      errors.LinktoOffer = "Link TO Offer is required";
      valid = false;
    }

    if (isEmpty(price)) {
      errors.price = "Price is required";
      valid = false;
    }
    setErrors(errors);
    return valid;
  };


  const generateQRCode = () => {
    setQRCodeText(inputText);
  }


  return (
    <div className="container">
      <div className="mt-3">
        <div className="bg-light  rounded w-75 m-auto p-5">
          <form>
            <div className="form-group row">
              <label className="col-sm-4  col-form-label">Offer Name</label>
              <div className="col-sm-8">
                <input type="text" name="offername" onChange={handleChange} value={state.offername} className="form-control" />
                <span className={classes.errors}>{errors.offername ? errors.offername : null}</span>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-4 col-form-label">Category</label>
              <div className="col-sm-8">

                <select className="form-control" name="category" onChange={handleChange} value={state.category} >
                  {options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <span className={classes.errors}>{errors.category ? errors.category : null}</span>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-4 col-form-label">Sub Category</label>
              <div className="col-sm-8">

                <select className="form-control" name="subcategory" onChange={handleChange} value={state.subcategory} >
                  {suboption.map((sub, index) => (
                    <option key={index} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
                <span className={classes.errors}>{errors.subcategory ? errors.subcategory : null}</span>
              </div>
            </div>


            <div className="form-group row">
              <label className="col-sm-4 col-form-label">Thumbnail</label>
              <div className="col-sm-8">
                <input type="file" name="thumbnail" onChange={handleImageChange} className="form-control" />
                <span className={classes.errors}>{errors.thumbnail ? errors.thumbnail : null}</span>
              </div>
            </div>


            <div className="form-group row">
              <label className="col-sm-4 col-form-label">Description</label>
              <div className="col-sm-8">
                <textarea type="text" name="description" onChange={handleChange} value={state.description} className="form-control" />
                <span className={classes.errors}>{errors.description ? errors.description : null}</span>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-4 col-form-label">Link to Offer</label>
              <div className="col-sm-8">
                <input type="text" name="LinktoOffer" onChange={handleChange} value={state.LinktoOffer} className="form-control" />
                <span className={classes.errors}>{errors.LinktoOffer ? errors.LinktoOffer : null}</span>
              </div>
            </div>

            <div className="form-group row">
              <label for="staticEmail" className="col-sm-4 col-form-label">Price </label>
              <div className="col-sm-8">
                <input type="text" name="price" onChange={handleChange} value={state.price} className="form-control" />
                <span className={classes.errors}>{errors.price ? errors.price : null}</span>
              </div>
            </div>


            <div className="form-group row">
              <label className="col-sm-4 col-form-label"> QR Code Value</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  name="qrcode"
                  className="form-control border-0"
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                />
              </div>
            </div>


            <input type="button" value="Generate" onClick={generateQRCode}/>
            {qrCodeText ?
              <QRCode
                id="qrCodeEl"
                size={150}
                value={qrCodeText}
              /> : null}



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

export default Offer;