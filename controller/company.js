const Company = require('./../models/company')


exports.getCompany = (req,res)=>{
    Company.find()
    .then(companydata=>{
          console.log("companydata",companydata)
          res.send(companydata)
    })
}