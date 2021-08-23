const express = require('express');
const router = express.Router();
// const Company = require('./../models/company')
// const Offer = require('./../models/offer')
//const multer = require('multer');
// const Speakeasy = require('speakeasy')
// let path = require('path');
// const cloudinary = require("cloudinary")
const {getOfferbyCategory,getOfferbycompanyid,getofferbyid,setpurchaseoffer,displaymypurchaseoffer,getOffer,getspeccat} = require('./../controller/offer')
const {auth,userMiddleware} = require('./../middleware/auth')



router.get('/displaymypurchaseoffer/:id',auth,userMiddleware,displaymypurchaseoffer)

router.get('/getsubspeccatallcomp/:sub',auth,userMiddleware,getspeccat)

 router.get('/getoffer',auth,userMiddleware,getOffer)


router.get('/getoffer/:companyId',auth,userMiddleware,getOfferbycompanyid)

router.get('/getOfferbycategory/:companyId/:category',auth,userMiddleware,getOfferbyCategory)

router.get('/getofferbyId/:offerId',auth,userMiddleware,getofferbyid)

router.put('/setpurchaseoffer/:companyid/:offerid/:userid',auth,userMiddleware,setpurchaseoffer)

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'uploads');
//     },
//     filename: function(req, file, cb) {   
//         cb(null,  Date.now() + path.extname(file.originalname));
//     }
// });

// const fileFilter = (req, file, cb) => {
//     const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
//     if(allowedFileTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// }

// let upload = multer({ storage, fileFilter });


// router.post('/registerCompany',upload.single('thumbnail'),async (req,res)=>{
//     console.log(req.body)
//     console.log(req.file)
//     const result = await cloudinary.v2.uploader.upload(req.file.path);
//     const newCompany = new Company({
//         uploader:req.body.uploader,
//         compnayname: req.body.companyname,
//         category: req.body.category,
//         //thumbnail: req.file.path.replace(/\\/g, '/'),
//         thumbnail:result.secure_url,
//         description: req.body.description,
//         address1: req.body.address1,
//         address2: req.body.address2,
//         email:req.body.email,
//         designation:req.body.designation,
//         phoneno:req.body.phoneno,
//         contactperson:req.body.contactperson
//       });
//       newCompany
//             .save()
//             .then(user => res.json(user))
//             .catch(err => console.log(err));
// });


// router.get('/getcompany',(req,res)=>{
//     Company.find()
//     .then(companydata=>{
//           console.log("companydata",companydata)
//           res.send(companydata)
//     })
// })


// router.post('/registerOffer',upload.single('thumbnail'),(req,res)=>{
//       let secret = Speakeasy.generateSecret({ length: 20 });
//       secret = secret.base32;
//   const token = Speakeasy.totp({
//     secret: secret,
//     encoding: "base32"
// });
//     const newOffer = new Offer({
//         offername: req.body.offername,
//         category: req.body.category,
//         subcategory: req.body.subcategory,
//         thumbnail: req.file.path.replace(/\\/g, '/'),
//         description: req.body.description,
//         LinktoOffer: req.body.LinktoOffer,
//         price:req.body.price,
//         uploader:req.body.uploader,
//         companyid:req.body.companyid,
//         token:token
//       });

     
//       newOffer
//             .save()
//             .then(user => res.json(user))
//             .catch(err => console.log(err));
// });






// router.get('/getsubspeccatallcomp/:sub',(req,res)=>{
  
    
//     const subcat = req.params.sub
//     Offer.find({subcategory:subcat})
//     .then(speccat=>{
//         console.log("speccat",speccat)
//         res.send(speccat)
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// })


//router.get('/getsubspeccatallcomp/:sub',auth,userMiddleware,getspeccat)


// router.get('/getoffer',(req,res)=>{

   
//        Offer.find({})
//        .then(offeralldata=>{
//              console.log("offeralldata",offeralldata)
//              res.send(offeralldata)
//        }).catch(err=>{
//            console.log(err)
//        })
//    })

//router.get('/getoffer',auth,userMiddleware,getOffer)






// router.get('/getoffer/:companyId',(req,res)=>{

//  // console.log(req.params.companyId)
//     Offer.find({companyid:req.params.companyId})
//     .then(offerdata=>{
//           console.log("offerdata",offerdata)
//           res.send(offerdata)
//     })
// })

//router.get('/getoffer/:companyId',auth,userMiddleware,getOfferbycompanyid)



// 







 

//router.get('/getOfferbycategory/:companyId/:category',auth,userMiddleware,getOfferbyCategory)

// router.get('/getofferbyId/:offerId',(req,res)=>{
  
   
//     Offer.findById({_id:req.params.offerId})
//     .then(offerbyid=>{
//         console.log("offerbyid",offerbyid)
//         res.send(offerbyid)
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// })



//router.get('/getofferbyId/:offerId',auth,userMiddleware,getofferbyid)


// router.get('/handlealloffer',(req,res)=>{
//   console.log("handlealloffer")
   
//     Offer.find({})
//     .then(alloffers=>{
//         res.send(alloffers)
//         console.log(alloffers)
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// })


//router.get('/handlealloffer',auth,userMiddleware,handlealloffer)
  

// router.put('/setpurchaseoffer/:companyid/:offerid/:userid',(req,res)=>{
  
  
//     Offer.findOneAndUpdate({_id:req.params.offerid,companyid:req.params.companyid},{events:req.body.events,buyer:req.body.buyer})
//     .then(updatepurchase=>{
//         console.log(updatepurchase)
//         res.send(updatepurchase)
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// })


// router.put('/setpurchaseoffer/:companyid/:offerid/:userid',setpurchaseoffer)





// router.get('/displaymypurchaseoffer/:id',(req,res)=>{
  
//    console.log(req.params.id)
//     Offer.find({uploader:req.params.id,events:"Purchase"})
//     .then(mypurchasedoffer=>{
//         console.log(mypurchasedoffer)
//         res.send(mypurchasedoffer)
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// })


//router.get('/displaymypurchaseoffer/:id',auth,userMiddleware,displaymypurchaseoffer)



module.exports = router;