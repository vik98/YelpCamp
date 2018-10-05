// Mongo Demon is stored at
// C:\Program Files\MongoDB\Server\3.6\bin
//and execute mongod.exe
//Mongo Shell is at same location with mongo.exe
//To set the environment variable use $env:DBURL= "mongodb://localhost/YelpCamp"

var express = require("express");
var campground = require("./models/campground");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var seedDB = require("./seeds");
var user = require("./models/user");
var comment = require("./models/comment");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var flash = require("connect-flash");

var commentRoutes = require("./routes/comment"),
  campgroundRoutes = require("./routes/campground"),
  indexRoutes = require("./routes/index");

var app = express();
//seedDB();
console.log(process.env.DBURL);
var url = process.env.DBURL || "mongodb://localhost/YelpCamp"
mongoose.connect(url);
app.set("view engine", "ejs");

app.use(flash());
app.use(express.static("public"))
app.use(require("express-session")({
  secret: "Random",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.current = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride("_method"));

passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

// campground.create({
//  name: "WestSide",
//  image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg",
//  description: "This is in the Westside"},
//   function(err, campground){
//     if(err){
//       console.log(err);
//     } else{
//       console.log("Newly created ");
//       console.log(campground);
//     }
// });

//
// var arr = [
//   {name: "EastSide", img: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
//   {name: "WestSide", img: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg"},
//   {name: "NorthSide",img: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg"},
//   {name: "EastSide", img: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
//   {name: "WestSide", img: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg"},
//   {name: "EastSide", img: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
//   {name: "WestSide", img: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg"}
// ];

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

var port = process.env.PORT || 3000;
app.listen(port);

//
// app.listen("3000", function(){
//   console.log("Server started at 3000");
// });
