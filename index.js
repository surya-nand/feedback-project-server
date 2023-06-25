const express = require("express");
const bodyParser = require("body-parser");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const Product = require("./models/company");
const User = require("./models/User");
const cors = require("cors");

dotEnv.config();
const app = express();

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.json({
    msg: "All good",
  });
});
// To get all details of products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error2) {
    res.json({
      status: "Fail",
      msg: error2,
    });
  }
});
// To post details into products
app.post("/api/products", async (req, res) => {
  try {
    const {
      CompanyName,
      Category,
      logoUrl,
      Link,
      Description,
      Upvotes,
      CommentsCount,
      Comments,
    } = req.body;
    const product = await new Product({
      CompanyName,
      Category,
      logoUrl,
      Link,
      Description,
      Upvotes,
      CommentsCount,
      Comments,
    });
    product
      .save()
      .then((new_product) => {
        res.send({
          msg: "New product details added",
          details: new_product,
        });
      })
      .catch((error3) => {
        res.send({
          msg: "New product details failed to add",
          error: error3,
        });
      });
  } catch (error4) {
    res.json({
      status: fail,
      msg: error4,
    });
  }
});

//To get details of users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error6) {
    res.json({
      status: "Fail",
      msg: error6,
    });
  }
});

//To post new user details
app.post("/api/users", async (req, res) => {
  try {
    const { SignupName, SignupEmail, SignupMobile, SignupPassword } = req.body;
    const user = await new User({
      SignupName: SignupName,
      SignupEmail: SignupEmail,
      SignupMobile: SignupMobile,
      SignupPassword: SignupPassword,
    });
    user
      .save()
      .then((new_user) => {
        res.send({
          msg: "New user details added",
          details: new_user,
        });
      })
      .catch((error7) => {
        res.send({
          msg: "New user details failed to add",
          error: error7,
        });
      });
  } catch (error8) {
    res.json({
      status: 'fail',
      msg: error8,
    });
  }
});

app.put("/api/products/:id", async (req, res) => {
  let{id} = req.params
  const{Upvotes,Comments} = req.body
  Product.findByIdAndUpdate(id,{
      $push: { Comments }, 
      Upvotes: Upvotes,
      $inc: { CommentsCount: 1 }, 

  }).then((product)=>{
    res.json({
      msg:"Product details updated",
      data:product})
  }).catch((error14)=>{
    res.json({
      msg:"Product details update failed",
      err:error14})
  })
})


app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error1) => {
      console.log("DB connection failed", error1);
    });
  console.log(`Server is running on ${process.env.port}`);
});
