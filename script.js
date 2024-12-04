const apiKey = "YOUR_API_KEY"; // Reemplaza con tu API key de OpenWeatherMap
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherResult = document.getElementById("weather-result");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value;
  if (city) {
    fetchWeather(city);
  } else {
    alert("Please enter a city name!");
  }
});

async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    if (response.ok) {
      const data = await response.json();
      displayWeather(data);
    } else {
      alert("City not found!");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Unable to retrieve weather information at the moment.");
  }
}

function displayWeather(data) {
  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const weatherDescription = document.getElementById("weather-description");
  const weatherIcon = document.getElementById("weather-icon");

  cityName.textContent = data.name;
  temperature.textContent = `Temperature: ${data.main.temp}°C`;
  weatherDescription.textContent = `Description: ${data.weather[0].description}`;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

  weatherResult.classList.remove("hidden");
}
