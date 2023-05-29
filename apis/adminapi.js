const exp = require("express");
const adminApiObj = exp.Router();
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");
adminApiObj.use(exp.json());
const errorHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const bcryptjs = require("bcryptjs");
const User = require("../models/User");
var nodemailer = require("nodemailer");
// const authSchema=require('../helpers/validation')

adminApiObj.post(
  "/createadmin",
  errorHandler(async (req, res) => {
    let adminObj = req.body;
    let admin = await Admin.findOne({ email: adminObj.email });
    if (admin == null) {
      let hashedPassword = await bcryptjs.hash(req.body.password, 7);
      let random = Math.floor(100000 + Math.random() * 900000);
      //create admin obj for Admin model
      let newAdminObj = new Admin({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        regcode: random,
        verified: false,
      });
 
      //save
      await newAdminObj.save();
      //  console.log(user)
      res.send({ message: "Admin created" });
    } else {
      res.send({ message: "Admin already existed" });
    }
  })
);

// get admin sales

adminApiObj.post(
  "/getSales",
  errorHandler(async (req, res) => {
    adminObj = req.body;
    let admin = await Admin.findOne({ username: adminObj.username });
    res.send({ message: admin.sales });
  })
);

/* adminApiObj.get(
  "/getCarousel/:username",
  errorHandler(async (req, res) => {
    let admin = await Admin.findOne({ username: username });
    res.send({ message: admin.c_items });
  })
);*/

adminApiObj.post(
  "/login",
  errorHandler(async (req, res) => {
    let adminObj = req.body;
    // console.log(adminObj);
    let admin = await Admin.findOne({ username: adminObj.username });
    if (admin == null) {
      res.send({ message: "Invalid username" });
    } else {
      let status = await bcryptjs.compare(adminObj.password, admin.password);
      if (status) {
        let token = await jwt.sign({ username: admin.username }, "abcd", {
          expiresIn: 100,
        });

        res.send({
          message: "success",
          verifiedStatus:admin.verified,
          token: token,
          adminObj: admin.username,
          email: admin.email,
        });
      } else {
        res.send({ message: "Invalid Password" });
      }
    }
  })
);

adminApiObj.post(
  "/getVerificationStatus",
  errorHandler(async (req, res) => {
    let verifyObj = req.body.email;
    console.log(req.body);
    let verifyAdmin = await Admin.findOne({ email: verifyObj });
    if (verifyAdmin) {
      if (verifyAdmin.verified) {
        res.send({
          message: "successfully verified",
          verificationStatus: verifyAdmin.verified,
          status: 200,
        });
      } else {
        res.send({
          message: "Not verified",
          verificationStatus: verifyAdmin.verified,
          status: 200,
        });
      }
    } else {
      res.send({ message: "Account Not Found", status: 401 });
    }
  })
);

adminApiObj.post(
  "/verifyAdmin",
  errorHandler(async (req, res) => {
    let verifyObj = req.body;
    console.log(req.body);
    let Adminbjs = await Admin.findOne({ email: req.body.email });
    console.log("admin found= ",Adminbjs.code)
    if (Adminbjs != null) {
      console.log("found true")
      if (Adminbjs.regcode == req.body.code) {
        let verifyAdmin = await Admin.updateOne(
          {
            email: verifyObj.email,
          },
          {
            $set: {
              verified: true,
            },
          }
        );
        res.send({ message: "verified", status: 200 });
      } else {
        res.send({
          message: "wrong verification code. Contact Application developer",
          status: 200,
        });
      }
    } else {
      res.send({ message: "email not found", status: 200 });
    }
  })
);

adminApiObj.post(
  "/sendemail",
  errorHandler(async (req, res) => {
    let verifyObj = req.body;
    console.log(req.body);
    let AdminObj = Admin.findOne({ email: request.body.email });
    if (AdminObj != null) {
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "harshajavalkar@gmail.com",
          pass: "123",
        },
      });
      var mailOptions = {
        from: "harshajavalkar@gmail.com",
        to: "harshajavalkar28@gmail.com.com",
        subject: `${request.body.email} Admin Request`,
        html: "<h1>First Email</h1>",
        text: `The verification code is ${AdminObj.regcode}`,
      };
      let emailResp;
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          emailResp = info.response;
          console.log("Email sent: " + info.response);
        }
      });
      res.send({ message: "Email sent" + emailResp, status: 200 });
    } else {
      res.send({ message: "Admin Email not found", status: 200 });
    }
  })
);

module.exports = adminApiObj;
