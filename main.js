function getWeather() {
  var city_input = document.querySelector(".inputText").value;
  fetch("https://meta-weather.vercel.app/api/location/search/?query="+ city_input)
    .then(function weather(data) {
      return data.json();
    })
    .then(function weather(data) {
      var Woeid = data[0].woeid;


      fetch("https://meta-weather.vercel.app/api/location/"+ Woeid+"/")
      .then(function weather(data){
        return data.json();
      })
      .then(function weather(data){

        /*city*/
        var city_name= data.title;
        var city_ele = document.querySelector(".city-name");
        city_ele.textContent = city_name;

        /*country*/
        var country = data.parent.title;
        var country_ele = document.querySelector(".country");
        country_ele.textContent = country;

        /*extracting day , month , year from date*/
        var date = document.querySelector("#date").value;
        var year = date.slice(0,4);
        var month = parseInt(date.slice(5,7), 10);
        var day = parseInt(date.slice(8,10), 10);

        fetch("https://meta-weather.vercel.app/api/location/"+ Woeid+"/"+year+"/"+month+"/"+day+"/")
          .then(function weather(data) {
            return data.json();
          })
          .then(function weather(data) {
          data= data[0];
          console.log(data);

          /*temperature*/
          var temp = data.the_temp;
          var tempElement = document.querySelector(".temperature");
          tempElement.textContent = parseFloat(temp).toFixed(2) + "° C";

          /*humidity*/
          var humidity  = data.humidity;
          var hum_ele = document.querySelector(".humidity");
          hum_ele.textContent = "Humidity :"+ parseFloat(humidity).toFixed(2) +" %";

          /*wind speed*/
          var wind = data.wind_speed;
          var wind_ele = document.querySelector(".wind");
          wind_ele.textContent = "Wind speed :"+ parseFloat(wind).toFixed(2) +"km/hr";

          /*date and weather state*/
          var state = data.weather_state_name;
          var subtitleTextElement = document.querySelector(".subtitle");
          subtitleTextElement.textContent = date +", " + state;
          })
      })

    })
}
