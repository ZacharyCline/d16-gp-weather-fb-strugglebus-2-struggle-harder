
"use strict";
// This module has no knowledge of the DOM, or where the data goes after it is fetched from Firebase.
// It is only concerned with getting and setting data in the db


let db = require("./db-interaction"),
    templates = require("./dom-builder"),
    user = require("./user");



/* ------ VALIDATE ZIP & BUILD WEATHER  ------ */

function runWeather(){
  var zipCode = document.getElementById("zipCode").value;
  var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode);

  if (isValidZip){
    console.log("Yeah, that's valid. Move along now.");
    db.getWeather(zipCode)
    .then((data) =>{
      templates.buildWeather(data, zipCode);
    });

  } else {
    window.alert("Woah there, we need a valid zip code.");
  }
}





/* ---------------------------- EVENT LISTENERS ---------------------------- */


$('#submitButton').click(function() {
  var zipCode = $('#zipInput').val(); 
  var zipTest = /^\d{5}(-\d{4})?$/.test(zipCode);
    if (zipTest) { 
      console.log("Yeah, that's valid");
     
      db.getWeather(zipCode)
        .then((data) => {
          templates.buildWeather(data, zipCode);
     
        });
    }else {
      window.alert("Please enter a valid zip code."); 
    }
}); 


/*----- LOGIN & LOGOUT -----*/


$("#auth-btn").click(function() {
  //console.log('clicked auth'); 
  user.logInGoogle()
    .then(function(result) {
    let user = result.user;
    //console.log('logged in user', user.uid);
    $("#zipcode-view").removeClass("hidden");
    $("#auth-btn").addClass("hidden"); 
  });
});


$("#logout").click(function() {
  user.logOut()
  .then(function() {
    $("#logout").addClass('is-hidden'); 
    $("#auth-btn").removeClass("is-hidden"); 
  });
});

module.exports = {runWeather};
