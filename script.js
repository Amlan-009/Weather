const apiKey = "b456127e07b9700364ede058124dda06";

const getWeather = async () => {
  const city = document.querySelector(".city-input").value;
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
  const data = await response.json();
  if(city === ""){
    return;
  }
  if(data.cod != 200){
    document.querySelector(".place-time-container").style.display = "none";
    document.querySelector(".weather-data-cotainer").style.display = "none";
    return;
  }
  const today = new Date();
  const day = today.toLocaleDateString("en-US", { weekday: 'short' });
  const date = today.getDate();
  const month = today.toLocaleDateString("en-US", { month: 'short' });
  const temp = Math.round(data.main.temp);
  console.log(data);
  document.querySelector(".container").innerHTML=`
    <div class="search-container">
      <input type="text" class="city-input" placeholder="Search location">
      <button class="search-btn" onclick="getWeather()"><i class='bx  bx-search'  ></i></button>
    </div>
    <div class="place-time-container">
      <p><i class='bx  bx-location'  ></i> <span class="city-name-value">${data.name}</span></p>
      <p class="date-time"><i class='bx  bx-calendar-detail'  ></i> ${day}, ${date} ${month}</p>
    </div>
    <div class="weather-data-cotainer">
      <div class="temperature-desc">
        <div class="img-container">
          <img src="" alt="" class="weather-img">
        </div>
        <div class="temperature-desc-units">
          <p class="temperature"><span class="temp-value">${temp}°C</span></p>
          <p class="desc"><span class="desc-value">${data.weather[0].main}</span></p>
        </div>
      </div>
        <div class="humidity-windspeed">
          <p class="humidity"><i class='bx  bx-water-drop-alt'  ></i> Humidity: <span class="humidity-value">${data.main.humidity}%</span></p>
          <p class="windspeed"><i class='bx  bx-wind'  ></i> Wind Speed: <span class="windspeed-value">${data.wind.speed}M/s</span></p>
        </div>
    </div>`;

    const image = document.querySelector(".weather-img");

    switch(data.weather[0].main){
      case "Clear":
        image.src = "images/clear.png";
        break;
      case "Rain":
        image.src = "images/rain.png";
        break;
      case "Snow":
        image.src = "images/snow.png";
        break;
      case "Haze":
        image.src = "images/mist.png";
        break;
      case "Cloud":
        image.src = "images/cloud.png";
        break;
      default:
        image.src = "images/cloud.png";      
    }
}

document.querySelector(".search-btn").addEventListener("click",getWeather);
document.addEventListener("keydown", (e) => {
  if(e.key === "Enter"){
    getWeather();
  }
})
const height = "600px"
document.querySelector(".search-btn").addEventListener("click",() => {
  document.querySelector(".container").style.height = height;
});
document.addEventListener("keydown", (e) => {
  if(e.key === "Enter"){
    document.querySelector(".container").style.height = height;
  }
})



