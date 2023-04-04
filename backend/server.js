const express = require("express");
const mysql = require("mysql");
const bodyparser = require("body-parser");
const cors = require("cors");  
var un;

const db = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "users",
});

const app = express();
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  console.log("server started...");
  db.query(
    "SELECT * FROM userdetails;",
    (err, result) => {
      if (err) console.log(err);
      else {
        {
          res.send(result);
        }
      }
    }
  );
});

app.get("/userdata", (req, res) => {
  console.log("Giving  started...");
  db.query(
    "SELECT * FROM userdetails;",
    (err, result) => {
      if (err) console.log(err);
      else {
        {
          let a=[result[2].sno,result[2].sname];
          res.send(a);
        }
      }
    }
  );
});

app.post("/SignUp", (req, res) => {
  const name = req.body.name;
  const uname = req.body.username;
  un=uname;
  console.log("Inserting...");
  var sql = "insert into userdetails(name,email,username,gender,pwd,profession,skills) values(?,?,?,?,?,?,?)";
  db.query(sql, [name,req.body.email,uname,req.body.gender,req.body.pwd,req.body.profession,req.body.skills], function (err, result, fields) {
    if (err) throw err;
    else {console.log("sucessfully Inserted");
       res.send(true);}
  });
});

app.post("/Login", (req, res) => {
    un=req.body.email;
    const email = req.body.email;
    const pwd = req.body.pwd;
    var sql = "select * from userdetails where username=? and pwd=?";
    db.query(sql, [email,pwd], function (err, result, fields) {
      if (err) throw err;
      if(result.length >0)
        {res.send(true);console.log("Login success");}
      else
        {res.send(false);console.log("Login failed");}  
    });
  });

app.post("/Posts", (req, res) => {
    console.log("Inserting...");
    var sql = "insert into projects(username,description,skills,title) values(?,?,?,?)";
    db.query(sql, [un,req.body.desc,req.body.skills,req.body.title], function (err, result, fields) {
      if (err) throw err;
      else {console.log("sucessfully Inserted");
        res.send(true)}
    });
  });

app.listen(8080, () => {
  console.log("listening.........");
});
