var campground = require("../models/campground");
var comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error", "You need to be logged in to do that");
  res.redirect("/login");
}

middlewareObj.checkCamp = function(req, res, next){
  if(req.isAuthenticated()){
    campground.findById(req.params.id, function(err, fcamp){
      if(err){
        req.flash("error", "campgroundnot found");
        res.redirect("back");
      }else{
        if(fcamp.author.id.equals(req.user._id)){
          next();
        }else{
          req.flash("error", "You dont have permission to do that");
          res.redirect("back");
        }
      }
    });
  }
  else{
    res.redirect("back");
  }
}

middlewareObj.checkComment = function(req, res, next){
  if(req.isAuthenticated()){
    comment.findById(req.params.cid, function(err, fcomment){
      if(err){
        res.redirect("back");
      }else{
        if(fcomment.author.id.equals(req.user._id)){
          next();
        }else{
          req.flash("error", "You dont have permission to do that");
          res.redirect("back");
        }
      }
    });
  }
  else{
    res.redirect("back");
  }
}

module.exports = middlewareObj
