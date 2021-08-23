
const Offer = require('./../../models/offer')

const cloudinary = require("cloudinary")

exports.registerOffer= async (req,res)=>{
   

const result = await cloudinary.v2.uploader.upload(req.file.path);

if(result){
  const newOffer = new Offer({
      offername: req.body.offername,
      category: req.body.category,
      subcategory: req.body.subcategory,
      //thumbnail: req.file.path.replace(/\\/g, '/'),
      thumbnail:result.secure_url,
      description: req.body.description,
      LinktoOffer: req.body.LinktoOffer,
      price:req.body.price,
      uploader:req.body.uploader,
      companyid:req.body.companyid,
      
    });

   
    newOffer
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
        }
        else{
            console.log(error)
        }
}

exports.handlealloffer =(req,res)=>{
    console.log("handlealloffer")
     
      Offer.find({})
      .then(alloffers=>{
          res.send(alloffers)
          console.log(alloffers)
      })
      .catch(err=>{
          console.log(err)
      })
  }


exports.getOffer=(req,res)=>{

   
    Offer.find({})
    .then(offeralldata=>{
          console.log("offeralldata",offeralldata)
          res.send(offeralldata)
    }).catch(err=>{
        console.log(err)
    })
}