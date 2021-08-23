const express = require("express");
const app = express();
const mongoose = require("mongoose");

const adminuser = require("./routes/admin/user");
const adminoffer = require("./routes/admin/offer");
const admincompany = require("./routes/admin/company");

const users = require("./routes/users");
const company = require("./routes/company");
const offer = require("./routes/offer");
const cookieParser = require("cookie-parser");
var cors = require('cors');

require('dotenv').config();
require("./config/cloudinary.js")

mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true})
  .then(() => console.log('database connected'))
  .catch(err => console.log(err));


app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());
app.use(cookieParser());
app.use('/uploads',express.static('uploads'));



app.use("/admin", adminuser);
app.use("/admin", adminoffer);
app.use("/admin", admincompany);

app.use("/user", users);
app.use("/user", company);
app.use("/user", offer);
 
const port = process.env.PORT || 4000;


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('subscription-web-app1/build'))

  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'subscription-web-app1','build','index.html'))
  })
}
app.listen(port, () => console.log(`Server up and running on port  ${port} !`));