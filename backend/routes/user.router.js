
const express = require("express")
const jwt = require("jsonwebtoken")
const {authorization} = require("../middlewares/auth")
require("dotenv").config()
const userRouter = express.Router()
const bcrypt = require("bcrypt")
const { usermodel } = require("../models/user.Schema")
userRouter.use(express.json())

userRouter.post("/sign", async (req, res) => {
  const { email, name, password,dob } = req.body
  try {
        let presentUser = await usermodel.findOne({ email })

        if (presentUser) {
          res.send({ "ok":false, "msg": " user already Registration" });
        } else {

            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    res.send({ "ok": false, "err": "Something went wrong while hashing" });
                }

                const user = new usermodel({ name, email, password: hash,dob });
                await user.save();

                res.send({ "ok": true, "msg": "Registration Successfull" });
            });
        }


    } catch (err) {
        res.send({ mes: err.message });
    }
})

userRouter.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await usermodel.findOne({ email });
      console.log(user);
      if (!user) {
        res.send({"ok":false, "msg": "User Not found, Please Register First" });
      } else {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            let token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
              expiresIn: "30m",
            });
  
            res.send({
              "ok":true,
              "mes": "login successfully",
              "name": user.name,
              "token": token
            });
          } else {
            res.send({"ok":false,"msg":"Wrong Credentials"});
          }
        });
      }
    } catch (err) {
      res.send({ "msg": err.message });
    }
  });

  userRouter.get("/alldata",async (req, res) => {
    try {
      
       const result = await usermodel.find({},{password:0})
       res.send({ "ok":true, allData: result});
    } catch (err) {
      res.send({ "msg": err.message });
    }
  });




  module.exports={userRouter}