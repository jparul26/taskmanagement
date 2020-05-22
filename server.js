const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const app = express();
app.set('port', process.env.PORT || 5000);
const Chat = require ("./models/Chat");
const http = require('http');
var server = http.createServer(app);

var io = require('socket.io')(http);


// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);

io.on('connection', function(socket){
  socket.on('disconnect', function(){
});
socket.on('post_chat', function(data){

  const newChat = new Chat({
    author : data.name,
    postText: data.text,
    Date : new Date
   });
   newChat.save();
   io.sockets.emit("change_chat_data");
});
socket.on('initial_chat_data',()=> {
  Chat.find({}).sort({Date: -1}).then(docs => {
    io.sockets.emit("get_chat_data",docs);
  })
});
io.sockets.emit("change_chat_data");
  });

  io.attach(server);
  server.listen(5000);