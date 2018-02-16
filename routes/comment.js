var express = require("express");
var router = express.Router();
var campground = require("../models/campground");
var comment = require("../models/comment");
var middle = require("../middleware");

//==========================
// Comment Routes
//==========================
router.get("/camp/:id/comments/new", middle.isLoggedIn, function(req, res){
  campground.findById(req.params.id, function(err, camp){
    if(err){
      console.log(err);
    }else{
      res.render("comments/new", {camp: camp});
    }
  });
});

router.post("/camp/:id/comments", middle.isLoggedIn, function(req, res){
  campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    }else{
      //console.log(req.body.comment);
      comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err);
        }
        else{
          // console.log(comment);
          // console.log(campground);
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          campground.comments.push(comment);
          campground.save();
          req.flash("success", "Added Comment");
          res.redirect('/camp/' + campground._id);
        }
      });
    }
  });
});

router.get("/camp/:id/comments/:cid/edit", middle.checkComment, function(req, res){
  comment.findById(req.params.cid, function(err, fcomment){
    if(err){
      console.log(err);
      res.redirect("back");
    }else{
      res.render("comments/edit", {cid: req.params.id, comment: fcomment});
    }
  })
});

router.put("/camp/:id/comments/:cid", middle.checkComment, function(req, res){
  comment.findByIdAndUpdate(req.params.cid, req.body.comment, function(err, ncomment){
    if(err){
      console.log(err);
    }else{
      console.log(ncomment);
      res.redirect("/camp/" + req.params.id);
    }
  });
});

router.delete("/camp/:id/comments/:cid", middle.checkComment, function(req, res){
  comment.findByIdAndRemove(req.params.cid, function(err){
    if(err){
      console.log(err);
    }else{
      req.flash("success", "Comment Deleted");
      res.redirect("/camp/" + req.params.id);
    }
  });
});

module.exports = router;
