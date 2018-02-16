var express = require("express");
var router = express.Router();
var campground = require("../models/campground");
var comment = require("../models/comment");
var middle = require("../middleware");

router.get("/camp", function(req, res){
  campground.find({}, function(err, all){
    if(err){
      console.log(err);
    }else{
      res.render("campgrounds/index", {arr: all});
    }
  });
});

router.post("/camp", middle.isLoggedIn, function(req, res){
  var name = req.body.title;
  var price = req.body.price;
  var image = req.body.image;
  var description = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var  newc = {name: name, price: price, image: image, description: description, author: author};
  campground.create(newc, function(err, newCamp){
    if (err){
      console.log(err);
    }else {
      res.redirect("/camp");
    }
  });
});

router.get("/camp/:id", function(req, res){
  //populate is used to define the content
  campground.findById(req.params.id).populate("comments").exec(function(err, fcamp){
    if (err){
      console.log(err);
    }else {
      console.log(fcamp);
      res.render("campgrounds/show", {fcamp: fcamp});
    }
  });
});

router.get("/new", middle.isLoggedIn, function(req, res){
  res.render("campgrounds/new");
});

router.get("/camp/:id/edit", middle.checkCamp, function(req, res){
    campground.findById(req.params.id, function(err, fcamp){
      if(err){
        console.log(err);
      }else{
          res.render("campgrounds/edit", {fcamp: fcamp});
      }
    });
});

router.put("/camp/:id", middle.checkCamp, function(req, res){
  campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, ucamp){
    if(err){
      console.log(err);
    }else{
      res.redirect("/camp/" + req.params.id);
    }
  });
});

router.delete("/camp/:id", middle.checkCamp, function(req, res){
  campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
      console.log(err);
    }else{
      res.redirect("/camp");
    }
  });
});

module.exports = router;
