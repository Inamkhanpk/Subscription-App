const Company = require('./../../models/company')

const cloudinary = require("cloudinary")


exports.registerCompany = async (req,res)=>{
   try{
    const result = await cloudinary.v2.uploader.upload(req.file.path);
   console.log(result)
   
    const newCompany = new Company({
        uploader:req.body.uploader,
        companyname: req.body.companyname,
        category: req.body.category,
        //thumbnail: req.file.path.replace(/\\/g, '/'),
        thumbnail:result.secure_url,
        description: req.body.description,
        address1: req.body.address1,
        address2: req.body.address2,
        email:req.body.email,
        designation:req.body.designation,
        phoneno:req.body.phoneno,
        contactperson:req.body.contactperson
      });
      newCompany
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
    
}

catch (err) {
    
        console.log(err)
    
}
}



exports.getCompany = (req,res)=>{
    Company.find()
    .then(companydata=>{
          console.log("companydata",companydata)
          res.send(companydata)
    })
}

