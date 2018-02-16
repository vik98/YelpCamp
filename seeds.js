var mongoose = require("mongoose");
var campground = require("./models/campground");
var comment = require("./models/comment");

var data = [
  {
    name: "First CampGround",
    image: "https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam varius eleifend purus, vel elementum enim bibendum quis. Aenean fermentum turpis felis, sed consectetur leo molestie sed. Cras convallis enim quis lorem dignissim iaculis. Sed aliquam consectetur porta. Donec sed libero mauris. Proin cursus, urna eget ultricies commodo, nunc tortor tristique leo, ac faucibus eros erat sed quam. Praesent nec orci vitae lorem facilisis elementum ac at magna. Morbi pulvinar dui ante, vitae suscipit tortor elementum tempor. Vivamus porttitor libero tortor, sed viverra nulla scelerisque sed. Vestibulum et ornare libero. Donec scelerisque facilisis bibendum."
  },
  {
    name: "Second CampGround",
    image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg",
    description: "Proin scelerisque massa a ligula ultricies maximus. Pellentesque vulputate, metus ut tempor volutpat, purus erat egestas nisi, a laoreet dui odio sed ex. Ut sed sem vel urna consequat placerat vel vitae sem. Proin vel efficitur dui. Cras congue mi vitae luctus sagittis. Suspendisse posuere cursus dolor in pretium. Morbi semper enim eu sem ultrices finibus. Donec sollicitudin mattis sapien porta eleifend. Sed efficitur blandit arcu eu maximus. Aliquam erat volutpat. Duis gravida felis nec enim mollis, at faucibus justo efficitur. Praesent mattis venenatis augue ut hendrerit. Etiam maximus justo quis semper condimentum. Maecenas id augue sagittis, dapibus nisl id, pellentesque risus. Sed varius interdum commodo. Proin ut malesuada lorem."
  },
  {
    name: "Third CampGround",
    image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg",
    description: "Cras eget rhoncus nisl. Aenean mattis, est et fermentum laoreet, tellus odio tincidunt arcu, elementum mollis enim nibh vel dui. Suspendisse convallis gravida laoreet. Ut ac metus felis. In non ipsum eros. Cras pellentesque neque eu mattis sodales. Donec non nisl mauris. Integer ullamcorper id felis sit amet rhoncus. Aenean accumsan lobortis volutpat. Donec accumsan tellus in leo venenatis fringilla. In hac habitasse platea dictumst. Nam laoreet vel sapien congue gravida. Phasellus ac sem ultrices nulla gravida vehicula."
  }
];

function seedDB(){
//Remove a CampGround
  campground.remove({}, function(err){
    if(err){
      console.log(err);
    }
    console.log("removed the database");
  });

  // Create a CampGround
  // for (var i = 0; i < data.length; i++) {
  //   campground.create(data[i], function(err, camp){
  //     if(err){
  //       console.log(err);
  //     }else {
  //       console.log("data added");
  //       //Add a comment
  //       // comment.create({
  //       //   text: "This is a great place but no internet",
  //       //   author: "UserOne"
  //       // }, function(err, comment){
  //       //     if(err){
  //       //       console.log(err);
  //       //     }else{
  //       //       console.log(camp);
  //       //       camp.comments.push(comment);
  //       //       camp.save();
  //       //       console.log("created a comment");
  //       //     }
  //       // });
  //       // comment.create({
  //       //   text: "This is a great place but no internet",
  //       //   author: "UserTwo"
  //       // }, function(err, comment){
  //       //     if(err){
  //       //       console.log(err);
  //       //     }else{
  //       //       camp.comments.push(comment);
  //       //       camp.save();
  //       //       console.log("created a comment");
  //       //     }
  //       // });
  //     }
  //   });
  //  }
}

module.exports = seedDB;
