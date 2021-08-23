import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import { getCompany } from "./../../store/actions/companyAction";
import { getOffer } from "./../../store/actions/offerAction";
import { handlePurchaseOffer } from "./../../store/actions/offerAction";
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import './OfferList.css'

const useStyles = makeStyles((theme) => ({
  media: {
    height: 140,
    width: '100%'
  },
  btncenter: {
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'

    },
  }
}));

const OfferList = () => {

  const classes = useStyles();
  const dispatch = useDispatch()
  const [offbtn, setOffbtn] = useState(false)
  const [compbtn, setcompbtn] = useState(false)
  const [actbtn, setActbtn] = useState(false)
  const offer = useSelector((state) => state.offer);
  const company = useSelector((state) => state.company);

  const offerlist = offer.getoffer
  const offeravailuser = offer.getalloffer
  const companieslist = company.getcompanies




  const handleCompanies = () => {

    dispatch(getCompany())
    setcompbtn(true)
    setOffbtn(false)
    setActbtn(false)
  }

  const handleOffers = () => {

    dispatch(getOffer())
    setOffbtn(true)
    setcompbtn(false)
    setActbtn(false)

  }

  const handleActivity = () => {

    dispatch(handlePurchaseOffer())
    setActbtn(true)
    setOffbtn(false)
    setcompbtn(false)

  }



  return (
    <div className="container bg-light  " >

      <div className="row">
        <div className="col-md-3 col-sm-12">
          <Paper className="mt-3" >
            <div className=" d-flex flex-column">
              <button onClick={handleCompanies} className="btn  mt-2">Companies</button>
              <button onClick={handleOffers} className="btn  mt-2">Offers</button>
              <button onClick={handleActivity} className="btn  mt-2">Activity</button>
            </div>
          </Paper>
        </div>

        <div className="mt-3 col-md-9 col-sm-12 ">

          <Paper className="p-4 ">

            <div className={classes.btncenter}>
              <Link to='/offer' >
                <button className="btn btn-primary">
                  Create a Offer
                </button>
              </Link>


              <Link to='/company' >
                <button className="btn btn-primary">
                  Create a Company
                </button>
              </Link>

            </div>



            {!actbtn && !compbtn && offbtn && offerlist ?
              <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-12 m-2 d-flex justify-content-center flex-wrap">
                  {offerlist.map((offer, index) => {
                    return (


                      <div key={index} className="card m-1 w-50">
                        <img className="card-img-top" 
                        src={offer.thumbnail} 
                        style={{ width: "100%", height: "auto" }} alt="Card cap" />
                        <div className="card-body">
                          <h5 className="card-title">{offer.offername}</h5>

                        </div>

                      </div>
                    )
                  })}</div></div> : null}



            {!offbtn && !actbtn && compbtn && companieslist ?
              <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-12 m-2 d-flex justify-content-center flex-wrap">
                  {companieslist.map((company, index) => {
                    return (

                      <div key={index} className="card m-1 w-25">
                        <img className="card-img-top img-fluid"  
                        src={company.thumbnail} 
                        style={{ width: "100%", height: "auto" }} alt="Card cap" />
                        <div className="card-body">
                          <h5 className="card-title"> {company.companyname}</h5>

                        </div>


                      </div>
                    )
                  })}</div></div> : null}



            {!offbtn && !compbtn && actbtn ?
              <div className="table-responsive-sm table-responsive-md m-2">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Offers</th>
                      <th scope="col">Customer</th>
                      <th scope="col">Events</th>
                      <th scope="col">Amount</th>

                    </tr>
                  </thead>
                  <tbody>
                    {offeravailuser.map((offerinfo, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{offerinfo.date}</th>
                          <td>{offerinfo.offername}</td>
                          <td>{offerinfo._id}</td>
                          <td>{offerinfo.events}</td>
                          <td>${offerinfo.price}</td>

                        </tr>
                      )
                    })}

                  </tbody>
                </table>
              </div> : null}
          </Paper>
        </div>



      </div>

    </div>

  )
}

export default OfferList;