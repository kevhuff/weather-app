async function getWeatherForecast() {
    const apiKey = '67c8f48a183925a6431322edd206da16';
    const city = document.getElementById('city').value;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error(error);
    }
}

function displayForecast(data) {
    const forecastElement = document.getElementById('forecast');
    forecastElement.innerHTML = '';

    if (data.cod === '200') {
        const list = data.list;
        const forecastByDay = {};

        // Group the forecasts by day
        for (let i = 0; i < list.length; i++) {
            const forecast = list[i];
            const date = new Date(forecast.dt * 1000).toLocaleDateString();

            if (!forecastByDay[date]) {
                forecastByDay[date] = [];
            }

            forecastByDay[date].push(forecast);
        }

        // Display the forecasts for each day in a card
        for (const date in forecastByDay) {
            const forecasts = forecastByDay[date];
            const temperature = Math.round((forecasts[0].main.temp - 273.15) * 9/5 + 32); // Convert temperature from Celsius to Fahrenheit
            const description = forecasts[0].weather[0].description;

            const element = document.createElement('div');
            element.classList.add('card', 'text-center', 'my-3');
            element.innerHTML = `
                <div class="card-header">
                    ${date}
                </div>
                <div class="card-body">
                    <h5 class="card-title">${temperature}&deg;F</h5>
                    <p class="card-text">${description}</p>
                </div>
            `;
            forecastElement.appendChild(element);
        }
    } else {
        const element = document.createElement('div');
        element.innerHTML = `Error: ${data.message}`;
        forecastElement.appendChild(element);
    }
}
      