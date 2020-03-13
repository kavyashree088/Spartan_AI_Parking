const express = require("express");
var cor = require("cors");
const app = express();
const mysql = require("mysql");
var bodyparser = require("body-parser");

var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  next();
};
app.use(allowCrossDomain);
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

function getConnection() {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "kavya10ka",
    database: "mydb"
  });
}
app.get("/", (req, res) => {
  //res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  console.log("fetching tasks");
  const connection = getConnection();
  connection.query("SELECT * FROM user", (err, rows, fields) => {
    if (err) throw err;
    console.log("Success");
    res.json(rows);
  });
});

app.get("/user/:LicenseNo", (req, res) => {
  //res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  console.log("fetching tasks");
  const LicenseNo = req.params.LicenseNo;
  const connection = getConnection();
  connection.query(
    "SELECT * FROM user where LicenseNo = ?",
    [LicenseNo],
    (err, rows, fields) => {
      if (err) throw err;
      console.log("Success");
      res.json(rows);
    }
  );
});

app.get("/user/:username/:email/:password", (req, res) => {
  //res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  console.log("fetching tasks");
  const username = req.params.username;
  const email = req.params.email;
  const password = req.params.password;
  const connection = getConnection();
  connection.query(
    "SELECT LicenseNo, FirstName FROM userLogin where username = ? and email = ? and password = ? ",
    [username, email, password],
    (err, rows, fields) => {
      if (err) throw err;
      console.log("Success");
      res.json(rows);
    }
  );
});

app.get("/parkingSpace", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  console.log("fetching tasks");
  const connection = getConnection();
  connection.query(
    "SELECT slotID FROM parkingSlot where isEmpty = 0",
    (err, rows, fields) => {
      if (err) throw err;
      console.log("Success");
      res.json(rows);
    }
  );
});

app.get("/parkingSlots", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  console.log("fetching tasks");
  const connection = getConnection();
  connection.query(
    "SELECT slotID, LicenseNo FROM parkingSlot",
    (err, rows, fields) => {
      if (err) throw err;
      console.log("Success");
      res.json(rows);
    }
  );
});

app.put("/post", (req, res) => {
  console.log("here");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  console.log("in post method");
  console.log(req.body);
  let sId = req.body.slotID;
  let isEmp = req.body.isEmpty;
  const queryToInsert =
    "UPDATE parkingSlot set isEmpty = true, LicenseNo = ? where slotID = ?";
  getConnection().query(
    queryToInsert,
    ["1234RFG", sId],
    (err, results, fields) => {
      if (err) throw err;
      console.log("Success");
    }
  );
});

app.post("/userpost", (req, res) => {
  console.log("here");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  console.log("in post method");
  console.log(req.body);
  let username = req.body.userName;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let password = req.body.password;
  let licenseNo = req.body.licenseNo;
  let email = req.body.email;
  const queryToInsert =
    "INSERT INTO userLogin (username, password, FirstName, LastName, email, LicenseNo) values(?,?,?,?,?,?) ";
  getConnection().query(
    queryToInsert,
    [username, password, firstName, lastName, email, licenseNo],
    (err, results, fields) => {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        return res.json({ errors: ["Cannot insert the user details"] });
      }
      res.statusCode = 200;
      return res.json();
      console.log("Success");
    }
  );
});
app.listen(3303, () => {
  console.log("Server is up and running at 3303");
});
