async function setupWeather() {

    const weatherForm = document.getElementById("weatherForm");

    weatherForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const cityInput = document.getElementById("city").value;

        const response = await fetch(`/api/weather?city=${encodeURIComponent(cityInput)}`);
        const weatherData = await response.json();

        displayWeather(weatherData);
    });
}

function displayWeather(weatherData) {
    const weatherResult = document.getElementById("weather-div");

    weatherResult.style.display = 'Block';

    if (!weatherData.location) {
        weatherResult.innerHTML = "<p>Could not find weather data for that city.</p>";
        return;
    }

    const city = weatherData.location.name;
    const region = weatherData.location.region;
    const temp = weatherData.current.temp_f;
    const feelsLike = weatherData.current.feelslike_f;
    const condition = weatherData.current.condition.text;
    const icon = weatherData.current.condition.icon;
    const humidity = weatherData.current.humidity;
    const wind = weatherData.current.wind_mph;

    weatherResult.innerHTML = `
        <h2>${city}, ${region}</h2>
        <img src="https:${icon}" alt="${condition} icon">
        <p>Temperature: ${temp}°F</p>
        <p>Feels Like: ${feelsLike}°F</p>
        <p>Condition: ${condition}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind: ${wind} mph</p>
    `;
}

window.onload = setupWeather;