const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");
const Todo = require("../../models/todo");

router.post("/register", (req, res) => {
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });
  router.post("/facebook", (req, res) => {
    User.findOne({ email: req.body.email}).then(user => {
      if (user) {
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user.id,
              name: user.name,
            };
            jwt.sign(
              payload,
              keys.secretOrKey,
              {
                expiresIn: 31556926
              },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              }
            );
          } else {
            return res.status(400).json({ email: "This email is already registered" });
          }
        });
      } 
      else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                const payload = {
                  id: user.id,
                  name: user.name,
                  email: user.email
                };
                console.log(payload);
                jwt.sign(
                  payload,
                  keys.secretOrKey,
                  {
                    expiresIn: 31556926
                  },
                  (err, token) => {
                    res.json({
                      success: true,
                      token: "Bearer " + token
                    });
                  }
                );
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  });
  router.post("/login", (req, res) => {
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const email = req.body.email;
    const password = req.body.password;
  // Find user by email
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
  // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name
          };
  // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });

  router.post("/todo", (req,res) => {
          
    const newTodo = new Todo({
      todoid: req.body.todoid,
      title: req.body.title,
      done: req.body.done,
      dueDate:req.body.dueDate,
      tododescription:req.body.tododescription,
      label:req.body.label
    });
    newTodo
    .save()
    .then(res.send("done") )
    .catch(err => console.log(err));
       
  });
     
 

 router.get("/todos",function(req,res){
  Todo.find({}).sort({Date: -1}).then(docs => {
    res.send(docs);
  })
 });

 router.get(`/edit/:id`,(req,res)=>{
   const _id = req.params.id;
   Todo.findOne({_id})
   .then(docs=> res.json(docs))
   .catch(err => console.log(err));
 });

 router.put(`/update/:id`, (req,res)=>{
   Todo.findOneAndUpdate({_id:req.params.id},{$set:{title:req.body.title, done:req.body.done , tododescription:req.body.tododescription, dueDate: req.body.dueDate, label:req.body.label}},{new: true ,useFindAndModify: false})
   .then(docs=> res.send(docs))
   .catch(err => console.log("update err"));
 });


router.delete(`/delete/:id`,(req,res)=>{
  Todo.findOneAndDelete({_id:req.params.id})
  .then(docs=> res.json({message:"success"}))
  .catch(err=> console.log(err))
})



  module.exports = router;