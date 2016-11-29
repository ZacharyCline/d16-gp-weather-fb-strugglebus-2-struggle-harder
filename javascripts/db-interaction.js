"use strict"; 

let firebase = require("./firebaseConfig");


function getWeather(zip) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&APPID=
`
    }).done(function(weatherData){
      console.log(weatherData);
      resolve(weatherData);
    });
  });
}

function getThreeDayWeather(zipcode){
	return new Promise((resolve, reject) => {
		$.ajax({
			url:`http://api.openweathermap.org/data/2.5/forecast/daily?zip=${zipcode}&cnt=3&APPID=`,
			dataType: "json"
		}).done(function(data) {
			resolve(data);
		}).fail((error) => {
			reject(error);
		});
	});
}

function getSevenDayWeather(zipcode){
	return new Promise((resolve, reject) => {
		$.ajax({
			url:`http://api.openweathermap.org/data/2.5/forecast/daily?zip=${zipcode}&cnt=7&APPID=`,
			dataType: "json"
		}).done(function(data) {
			resolve(data);
		}).fail((error) => {
			reject(error);
		});
	});
}


module.exports = {getWeather, getThreeDayWeather, getSevenDayWeather}; 

