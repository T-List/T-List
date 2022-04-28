/* eslint-disable no-undef */

const express = require("express");
const app = express();
const path = require("path");
const { DatabaseError } = require("pg");
const PORT = 3000;
const apiRouter = require("./apiRouter");
const databaseController = require("./databaseController")

// HANDLE PARSING REQUEST BODY

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES

app.use("/api", apiRouter);

if (process.env.NODE_ENV === "production") {
  app.use("/build", express.static(path.join(__dirname, "../build")));
  app.get("/", (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, "../index.html"));
  });
}

app.post("/api/login", (req, res) => {
  console.log("login attempt");
  res.status(200).json("Login Success");
  // console.log('login success!');
  // res.redirect('/userlanding');
});
//admin login confirmation
app.get("/admin_login", databaseController.getAdminLogin, (req, res) => {
  console.log('this is res.body in server.js ', res.body.auth);
  res.status(200).json('congrats on solving this')
})

//deleting review
app.use('/admin/deleteReview/:id', databaseController.deleteReview, databaseController.getReviews, (req, res) => {
  res.status(200).json(res.locals)
})
/* Invalid End Point Error Handler */
app.use((req, res) => res.status(404).send("This page does not exist!"));

// global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
