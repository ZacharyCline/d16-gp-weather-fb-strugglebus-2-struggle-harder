"use strict"; 


let db = require("./db-interaction");
let main = require("./main.js");

/* ------ SINGLE DAY VIEW ------ */



function buildWeather(data, zipCode){
	var output = document.getElementById("weather-output");
	var fahrenheit = convertTemp(data.main.temp);

	output.innerHTML += 
	`<br><br><br>
	 Current city: ${data.name}.<br>
	 The temperature is ${fahrenheit}&deg; F. <br>
	 The conditions are ${data.weather[0].main}.<br>
	 The wind speed is ${data.wind.speed} mph. <br>
	 The air pressure is ${data.main.pressure}.<br><br>

	 <a href="#" id="threeDayView">View 3 Day, yo.</a>
	 `;

	 //pass zip code in
	 threeDay(zipCode);
}

function threeDay(zipCode){
  var threeDay = document.getElementById("threeDayView");
  threeDay.addEventListener("click", function(){
    db.getThreeDayWeather(zipCode)
    .then((data) =>{
      prettyWeather(data, zipCode, 3);
      });
  });
}


/* ------ MULTI DAY VIEW ------ */

function prettyWeather(data, zipCode, counter){
  var output = document.getElementById("seven-day-view");
  
  console.log("buildSevenDay data", data);

  for (var i = 0; i < counter; i++){

    let dayTemp = convertTemp(data.list[i].temp.day);
    let nightTemp = convertTemp(data.list[i].temp.night);

    output.innerHTML +=
    `${data.list[i].weather[0].main}<br>
     High of ${dayTemp}&deg; F.<br>
     Low of ${nightTemp}&deg; F.<br>
    --------------------------------<br>`;   
    }

    if(counter ===3){
      output.innerHTML +=
      ` <a href="#" id="sevenDayView">View 7 Days, yo.</a><br><br>`;
      sevenDay(zipCode);
  }
}


function sevenDay(zipCode){
  var sevenDay = document.getElementById("sevenDayView");

  sevenDay.addEventListener("click", function(){
    db.getSevenDayWeather(zipCode)
    .then((data) =>{
      prettyWeather(data, zipCode, 7);
    });
  });
}


/* ------ NERDY MATH STUFF ------ */

function convertTemp(kelvin) {
	return (((kelvin - 273.15) * 9/5) + 32).toFixed(0);
}

// module.exports = isValidZip;
module.exports = {buildWeather, prettyWeather, convertTemp};




