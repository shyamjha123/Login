const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
const cors = require("cors");
require("./config");
const playlists = require("./playlists");
const tblAdmission = require("./schema/admissionSchema");
const tblInstallment = require("./schema/installmentSchema");
app.use(express.json());
app.use(cors());
app.post("/register", async (req, res) => {
  const { user, email, mobile, designation, password, cpassword } = req.body;
  const userNameCheck = await playlists.findOne({ user: user });
  if (userNameCheck) {
    return res.json({ msg: "Username already used", status: false });
  }
  const emailCheck = await playlists.findOne({ email: email });
  if (emailCheck) {
    return res.json({ msg: "Email already used", status: false });
  }
  let data = new playlists({
    user,
    email,
    mobile,
    designation,
    password,
    cpassword,
  });
  await data.save();
  return res.json({
    msg: "Account Successfully Created, Please Login Now",
    status: true,
  });
});
app.post("/login", async (req, res) => {
  const { user, password } = req.body;
  const userCheck = await playlists.findOne({ user: user });
  if (!userCheck) {
    return res.json({ msg: "Incorrect Username", status: false });
  }
  let isMatch = await bcrypt.compare(password, userCheck.password);
  if (!isMatch) {
    return res.json({ msg: "Incorrect Password", status: false });
  }
  return res.json({
    status: true,
  });
});


  await data.save();
  return res.json({
    msg: "Payment Successful",
    status: true,
  });



app.listen(process.env.PORT || 4000);
