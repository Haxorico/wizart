const path = require("path");

const express = require("express");
const mongoose = require("mongoose");

const {checkFile106} = require('./util/check-file');
const httpError = require("./model/http-errors");

const complainsRoutes = require('./routes/complains-routes');

const app = express();

const PORT = process.env.PORT || 5000;
//const URL = "mongodb://localhost:27017/";
const URL = "mongodb://localhost/wizart";

checkFile106();
app.use(express.json());
//convert data to json. old body-parser...

//CORS error. Allow connection with these types of headers.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requests-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST,PATCH,DELETE");
  next();
});

//ENTER ROUTES HERE
app.use('/complains', complainsRoutes);
//404 page (route) not found;
app.use((req, res, next) => {
  console.log(req.originalUrl);
  throw new httpError("Route not found.", 404);
});

//error handler
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({
    message: error.message || "An unknown error occured",
  });
});

console.log("attempting mongoose connection");
mongoose
  .connect(URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`SUCCESS: Listening on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`FAILURE: Error =>  ${err}`);
  });
