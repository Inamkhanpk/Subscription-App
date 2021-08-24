const User = require("./../models/users");
const Speakeasy = require('speakeasy');
const validateRegisterInput = require("./../validation/register");
const validateLoginInput = require("./../validation/login");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registration = async (req, res) => {

 const { errors, isValid } = validateRegisterInput(req.body);
   
  if (!isValid) {
       return res.send(errors);
     }

    
     const hash_password = await bcrypt.hash(req.body.password, 10);
     const hash_confirmpassword = await bcrypt.hash(req.body.confirmpassword, 10);

   User.findOne({ email: req.body.email }).then(user => {
     if (user) {
       return res.send("Email already exists");
     } 
     else {
       const user = new User({
         fullname: req.body.fullname,
         username: req.body.username,
         email: req.body.email,
         password: hash_password ,
         confirmpassword: hash_confirmpassword,
         phoneno: req.body.phoneno,
       });
 
       
        let secret = Speakeasy.generateSecret({ length: 20 });
               secret = secret.base32;
           const token = Speakeasy.totp({
             secret: secret,
             encoding: "base32"
           });
        res.send({ token, secret, user });
                      console.log(token, secret, user )
           var nodemailer = require('nodemailer');
 
           var transporter = nodemailer.createTransport({
             service: 'gmail',
             auth: {
               user: process.env.EMAIL,
               pass: process.env.PASS
             }
           });
 
           var mailOptions = {
             from: process.env.EMAIL,
             to: user.email,
             subject: 'verification code',
             html: `<h1> Verification code</h1>
             <p>Hello ${user.username}! Thanks for signup but you need to required verification code of 6 digit after
             that you can enjoy our website</p>
             <p>${token}</p>`
           };
 
           transporter.sendMail(mailOptions, function (error, info) {
             if (error) {
               console.log(error);
             } else {
               //res.send('Email sent: ' + info.response)
               console.log('Email sent: ' + info.response)
             }
           });
          }
   });
}
 
 exports.signin =  (req, res) => {
 
  
      const { errors, isValid } = validateLoginInput(req.body);
    
      
      if (!isValid) {
        return res.send(errors);
      }
    
      const email = req.body.email;
      const password = req.body.password;
    
  
      User.findOne({ email }).then( async user => {
     
        if (!user) {
         
          return res.json({ emailnotfound: "Email not found" });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        
          if (validPassword) {
            
            const payload = {
              id: user.id,
              username: user.username,
              role:user.role
            };
    
           
            jwt.sign(
              payload,
              process.env.SECRET_JWT,
              {
                expiresIn: process.env.JWT_EXPIRES_TIME 
              },
              (err, token) => {
  
                if(token){
                  //res.cookie("token", token, { expiresIn: "1d" });
                res.json({
                  success: true,
                  token:token
                });
              }
              else{
                res.send("Error while user logging")
              }
              }
            );
           } 
          
          else {
            return res.json({ passwordincorrect: "Password incorrect" });
        }
  
        
      });
    }


exports.verificationcode = async (req, res) => {
    
    const verify = {
         "valid": Speakeasy.totp.verify({
          secret: req.body.user.secret,
          encoding: "base32",
          token: req.body.token,
          window: 1
       })
    };
 
   
    if (verify.valid) {
      let user = await new User(req.body.user.user);
       user.save()
       .then((user) => {
         res.send({ message: 'token is valid', user:user});
       })
    }
    else {
       res.json({ message: 'token is not valid please try again' });
       
    }
 
 
 };



 exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully...!",
  });
};
 