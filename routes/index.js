var express = require("express");
var router = express.Router();
var user = require("../models/user");
var passport = require("passport");
var middle = require("../middleware");

router.get("/", function(req, res){
  res.render("home");
});

router.get("/register", function(req, res){
  res.render("register");
});

router.post("/register", function(req, res){
  user.register(new user({username: req.body.username}), req.body.password, function(err, user){
    if(err){
      req.flash("error", err.message);
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      req.flash("success", "Welcome to YelpCamp " + req.body.username);
      res.redirect("/camp");
    });
  });
});

//Login Routes
router.get("/login", function(req, res){
  res.render("login");
});

router.post("/login",passport.authenticate("local", {
  successRedirect: "/camp",
  failureRedirect: "/login"
}), function(req, res){
});

router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "Logged you out");
  res.redirect("/camp");
});

module.exports = router;
