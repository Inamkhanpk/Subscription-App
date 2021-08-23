const User = require("./../../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registration = async (req, res) => {
    console.log(req.body)
   User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user)
      return res.status(400).json({
        message: "Admin already registered",
      });

    User.estimatedDocumentCount(async (err, count) => {
      if (err) return res.status(400).json({ error });
      let role = "admin";
      if (count === 0) {
        role = "admin";
      }

   
      const hash_password = await bcrypt.hash(req.body.password, 10);
      const hash_confirmpassword = await bcrypt.hash(req.body.confirmpassword, 10);
      const _user = new User({

        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        password: hash_password ,
        confirmpassword: hash_confirmpassword,
        role:role
      });

      _user.save((error, data) => {
        if (error) {
          return res.status(400).json({
            message: "Something went wrong",
          });
        }

        if (data) {
          return res.status(201).json({
            message: "Admin created Successfully..!",
          });
        }
      });
    });
  });
}
 
 exports.signin =  (req, res) => {
   console.log(req.body)
    User.findOne({ email: req.body.email }).exec(async (error, user) => {
        if (error) return res.status(400).json({ error });
        if (user) {
          const isPassword = await bcrypt.compare(req.body.password, user.password);
          if (
            isPassword &&
            (user.role === "admin" || user.role === "super-admin")
          ) {
            const token = jwt.sign(
              { _id: user._id, role: user.role },
              process.env.SECRET_JWT,
              { expiresIn: process.env.JWT_EXPIRES_TIME}
            );
           
            //res.cookie("token", token, { httpOnly: true }).send(token,user);
            res.status(200).cookie('token', token, { httpOnly: true,secure: process.env.NODE_ENV === "production", }).json({
              success: true,
              token:token,
              user:user
          })
      
            // res.json({
             
            //  token:token,
            //  user:user
            // });


          } else {
            return res.status(400).json({
              message: "Invalid Password",
            });
          }
        } else {
          return res.status(400).json({ message: "Something went wrong" });
        }
      });
 
 
 };
 


 exports.signout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
      message: "Signout successfully...!",
    });
  };