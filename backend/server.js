// the entry file for the backend application, where i register the express app

require("dotenv").config(); // attaches our environment variables for us

const express = require("express"); //require the express package
const mongoose = require("mongoose"); // require mongoose package, we can use this obj to connect to the db
const ceramicRoutes = require("./routes/ceramics"); // imported the routes
// const cors = require("cors");
const userRoutes = require("./routes/user");
const app = express(); // creates the express app, stores in the app variable

app.use(express.json()); //any req that comes in, looks for some data if theres data, attaches it the req object
// to use in the get methods

// app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
}); // this is a middleware
// next used for it to move on to the next one

// app.get('/', (req,res) => {
//   res.json({mssg: 'Welcome to the app'}) })
//  we also want to react to these requests, we make a route handler
// req obj has info abt the req, res used to send response back to client

// routes
app.use("/api/ceramics", ceramicRoutes); // grabs all the routes we attached to the router, uses it on the app, first arg could specify
//the path such that when we fire a request to this first arg route, then i want u to use this route
app.use("/api/user", userRoutes);
//connect to db
mongoose
  .connect(process.env.MONGO_URI) // its asynchronous , takes time, returns promise,
  .then(() => {
    //we want to listen to a certain port no. for requests
    app.listen(process.env.PORT, () => {
      console.log("working");
    });
  }) // when the promise is complete, then this
  .catch((error) => {
    console.log(error);
  }); // we dont wanna listen to requests UNTIL we connect to the database, so we use the app.listen in the then function
