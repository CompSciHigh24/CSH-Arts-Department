const mongoose = require("mongoose");
const ejs = require("ejs");
const express = require("express");
const app = express();

// Code found at https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/

const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

// End of GeeksForGeeks code

app.set("view engine", "ejs");

// Code found at https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/

require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

// End of GeeksForGeeks code

app.use(express.static(__dirname + "/public"));

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.path}`);
  next();
});

const mongoDBConnectionString =
  "mongodb+srv://SE12:CSH2024@cluster0.8iqucnb.mongodb.net/ArtShowcase?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoDBConnectionString)
  .then(() => {
    console.log("MongoDB connection successful.");
  })
  .catch((err) => console.log("MongoDB connection error:", err));

// Schema and model for Teacher
const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  img: {type: String, required: true}
});

const teachers = mongoose.model("teachers", teacherSchema);

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  theMonth: { type: Boolean, required: true },
  description: {type: String, required: true},
  img: {type: String, required: true}
  // img: {
  //   data: Buffer,
  //   contentType: String,
  // },
});

const students = mongoose.model("students", studentSchema);

// Find all teachers
// app.get("/teachers", (req, res) => {
//   Teacher.find().then((data) => {
//     res.json(data);
//   });
// });

app.get("/teachers", (req, res) => {
  teachers.find().then((teacher) => {
    res.status(200).render("teacher.ejs", { teachers: teacher });
  });
});

// Create a Teacher
app.post("/teachers", (req, res) => {
  const newTeachers = new teachers({
    name: req.body.name,
    subject: req.body.subject,
    email: req.body.email,
    description: req.body.description,
    img: req.body.img
  });
  newTeachers.save().then((teachers) => res.json(teachers));
});

//app.delete

app.get("/teachers/:name", (req, res) => {
  teachers.findOne({ subject: req.params.name }).then((subject) => {
    res.status(200).render("class.ejs", { teachers: subject });
  });
});

app.patch("/teachers/:name", (req, res) => {
  const filter = {name: req.params.name}
  const update = {$set:{name:req.body.name}}
  teachers.findOneAndUpdate(filter, update, {new: true})
    .then((updatedTeacher) => {
        console.log(updatedTeacher)
        res.json(updatedTeacher)
    })
});

app.patch("/students/:name", (req, res) => {
  const filter = {name: req.params.name}
  const update = {$set:{name:req.body.name}}
  teachers.findOneAndUpdate(filter, update, {new: true})
    .then((updatedStudent) => {
        console.log(updatedStudent)
        res.json(updatedStudent)
    })
});

app.delete("/students/:name", (req, res) => {
  const filter = {name:req.params.name};
  students.then((deletedStudent) => {
    res.json(deletedStudent)
  });
});

app.delete("/teachers/:name", (req, res) => {
  const filter = {name:req.params.name};
  teachers.then((deletedTeacher) => {
    res.json(deletedTeacher)
  });
});

// Find all students
app.get("/students", (req, res) => {
  students.find({}).then((subject) => {
    res.status(200).render("sotm.ejs", { students: subject });
  });
});

// // Create a students
app.post("/students", upload.single('image'),  (req, res) => {
  new students({
    name: req.body.name,
    subject: req.body.subject,
    email: req.body.email,
    theMonth: req.body.theMonth,
    description: req.body.description,
    img: req.body.img
    // img: {
    //     data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
    //     contentType: 'image/png'
    // }
  })
    .save()
    .then((students) => {
      res.json(students);
    });
});

app.get("/", (res, req) => {
  res.status(200).sendFile(__dirname + "/public/index.html");
});

app.use((res, req, next) => {
  res.status(404).sendFile(__dirname + "/public/404.html");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
