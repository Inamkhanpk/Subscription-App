const Offer = require('./../models/offer')



exports.displaymypurchaseoffer=(req,res)=>{
  
       console.log(req.params.id)
        Offer.find({uploader:req.params.id,events:"Purchase"})
        .then(mypurchasedoffer=>{
            console.log(mypurchasedoffer)
            res.send(mypurchasedoffer)
        })
        .catch(err=>{
            console.log(err)
        })
    }




    exports.setpurchaseoffer=(req,res)=>{
  
  
        Offer.findOneAndUpdate({_id:req.params.offerid,companyid:req.params.companyid},{events:req.body.events,buyer:req.body.buyer})
        .then(updatepurchase=>{
            console.log(updatepurchase)
            res.send(updatepurchase)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    
exports.getspeccat=(req,res)=>{
  
    
    const subcat = req.params.sub
    Offer.find({subcategory:subcat})
    .then(speccat=>{
        console.log("speccat",speccat)
        res.send(speccat)
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


exports.getOfferbycompanyid= (req,res)=>{

     
        Offer.find({companyid:req.params.companyId})
        .then(offerdata=>{
              console.log("offerdata",offerdata)
              res.send(offerdata)
        })
    }

exports.getOfferbyCategory= (req,res)=>{
    console.log("companyId",req.params.companyId)
     console.log("category: ", req.params.category);
     Offer.find({subcategory:req.params.category,companyid:req.params.companyId})
     .then(offerbycategory=>{
         console.log(offerbycategory)
         res.send(offerbycategory)
     })
     .catch(err=>{
         console.log(err)
     })
 }

 exports.getofferbyid= (req,res)=>{
  
   
    Offer.findById({_id:req.params.offerId})
    .then(offerbyid=>{
        console.log("offerbyid",offerbyid)
        res.send(offerbyid)
    })
    .catch(err=>{
        console.log(err)
    })
}

