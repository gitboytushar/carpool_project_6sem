import express from 'express';
import path from 'path';
import mongoose from 'mongoose';

//connecting with the driver database 
mongoose
  .connect("mongodb://localhost:27017/", {
    dbName: "carPool",
  }).then(() => console.log("Database Connected.")).catch((e) => console.log(e))

  //defining the driver page schema
  const driverDetail = new mongoose.Schema({
    name: String,
    phone: String,
    carno: String,
    car: String,
    seats: Number,
    iloc: String,
    floc: String,
  });

  //defining the passenger page schema
  const passengerDetail = new mongoose.Schema({
    name: String,
    phone: String,
    iloc: String,
    floc: String,
  });

  // //defining the passenger page schema
  // const contactInfo = new mongoose.Schema({
  //   name: String,
  //   query: String,
  // });

  //object to access the CRUD operations in database
  const requests = mongoose.model("requests", driverDetail);

  //object to access the CRUD operations in database
  const searches = mongoose.model("searches", passengerDetail);

  // //object to access the CRUD operations in database
  // const queries = mongoose.model("queries", passengerDetail);

//creating express server for our application 
const app = express();

//middlewares to specify paths to be used
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({extended: true})); 

//setting up view engine
app.set("view engine", "ejs");

// api for index page
app.get("/", (req, res) => {
  res.render("index");
});

//driver button 
app.post("/dr", (req,res) => {
  res.redirect("/driver");
});

//driver page
app.get("/driver", (req,res) => {
  res.render("driver");
});

//driver inputs 
app.post("/driver", async (req, res) => {
  const {name, phone, carno, car, seats, iloc, floc} = req.body;
  await requests.create({name: name, phone: phone, carno: carno, car: car, seats: seats, iloc: iloc, floc: floc});

  res.redirect("/driverRegister");
});

//driver registration done
app.get("/driverRegister", (req,res) => {
  res.render("driverRegister");
});

//passenger button 
app.post("/pas", (req,res) => {
  res.redirect("/passenger");
});

//passenger page
app.get("/passenger", (req,res) => {
  res.render("passenger");
});

//passenger inputs
app.post("/passenger", async (req, res) => {
  const {name, phone, iloc, floc} = req.body;
  await searches.create({name: name, phone: phone, iloc: iloc, floc: floc});

  res.redirect("/passengerRegister");
});

//passenger registration done 
app.get("/passengerRegister", (req,res) => {
  res.render("passengerRegister");
});

// contact us
app.post("/contact", (req,res) => {
  res.redirect("contactUs");
});

//contact us page
app.get("/contactUs", (req, res) => {
  res.render("contactUs");
});

// //contactUs inputs
// app.post("/contact", async (req, res) => {
//   const {name, query} = req.body;
//   await queries.create({name: name, query: query});

//   res.redirect("/passengerRegister");
// });

//api to fetch data out of the database 
// app.get("/driverRegister", async(req, res) => {
//   try {
//     const allUser = await User.find({});
//     res.send({ status: "ok", data: allUser });
//   } catch (error) {
//     console.log(error);
//   }
// });

//application HOSTED on port number
app.listen(3000, () => {
  console.log("server is running...")
});
