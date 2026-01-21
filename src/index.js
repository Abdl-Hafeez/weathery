import './style.css';

const searchBar = document.querySelector('#search-bar');
const searchBtn = document.querySelector('#search-btn');

const city = document.querySelector('.city');
const reading = document.querySelector('.reading');
const time = document.querySelector('.time');
const date = document.querySelector('.date');
const currentWeatherIcon = document.querySelector('.current-weather-icon');
const currentCondition = document.querySelector('.current-condition');

const feelsLikeIcon = document.querySelector('.current-feels-like-icon');
const currentFeelsLike = document.querySelector('.current-feels-like-reading');
const cloudCover = document.querySelector('.cloud-cover');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');
const precipitation = document.querySelector('.precipitation');
const pressure = document.querySelector('.pressure');
const uvIndex = document.querySelector('.uv-index');
const moonPhase = document.querySelector('.moon-phase');
const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');

const daysReading = document.querySelectorAll('.days-reading');
const weatherLabel = document.querySelectorAll('.weather-label');
const nextDaysWeatherIcon = document.querySelectorAll('.next-days-weather-icon');
const feelslikeReading = document.querySelectorAll('.feelslike-reading');
const weekday = document.querySelectorAll('.weekday');
const weekdayDate = document.querySelectorAll('.date');


function fetchWeatherData(location) {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=us&include=days%2Chours%2Ccurrent&key=8A7C5CWMMWSRZEYZKEVYZGYN7&contentType=json`).then(response => {
    return response.json();
    }).then(data => {
        city.textContent = data.address;
        reading.textContent = `${data.currentConditions.temp}°`;
        time.textContent = data.currentConditions.datetime;
        date.textContent = `${new Date(data.days[0].datetime).toLocaleDateString('en-US', {weekday: 'long', month: 'short', day: 'numeric', year: 'numeric'})}`;
        currentCondition.textContent = data.currentConditions.conditions;

        const currentIconPath = `/icons/2nd-Set-Monochrome/${data.currentConditions.icon}.svg`;
        feelsLikeIcon.innerHTML = `<img src='${currentIconPath}' alt='${data.currentConditions.icon}'>`;
        currentFeelsLike.textContent = data.currentConditions.feelslike + '°';
        cloudCover.textContent = data.currentConditions.cloudcover;
        humidity.textContent = data.currentConditions.humidity;
        windSpeed.textContent = data.currentConditions.windspeed;
        precipitation.textContent = data.currentConditions.precip;
        pressure.textContent = data.currentConditions.pressure;
        uvIndex.textContent = data.currentConditions.uvindex;
        moonPhase.textContent = data.currentConditions.moonphase;
        sunrise.textContent = data.currentConditions.sunrise;
        sunset.textContent = data.currentConditions.sunset;

        currentWeatherIcon.innerHTML = `<img src='${currentIconPath}' alt='${data.currentConditions.icon}'>`;

        daysReading.forEach((day, index) => {
            day.textContent = `${data.days[index + 1].temp}°`;
        });

        weatherLabel.forEach((day, index) => {
            day.textContent = data.days[index + 1].conditions;
        });

        nextDaysWeatherIcon.forEach((day,index) => {
            const nextDaysIconPath = `/icons/2nd-Set-Monochrome/${data.days[index +1 ].icon}.svg`;
            day.innerHTML = `<img src='${nextDaysIconPath}' alt='${data.days[index + 1].icon}'>`;
        });

        feelslikeReading.forEach((day, index) => {
            day.textContent = `${data.days[index + 1].feelslike}°`;
        })

        weekday.forEach((day, index) => {
            day.textContent = new Date(data.days[index + 1].datetime).toLocaleDateString('en-US', {weekday: 'short'});
        });

        weekdayDate.forEach((day, index) => {
            if(index !== 0) {
                day.textContent = data.days[index].datetime;
            }
        })

        console.log(data);
        console.log(data.address);
    }).catch(error => {
    console.log(error);
    })
}

fetchWeatherData("Addis Ababa, Ethiopia");

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    fetchWeatherData(searchBar.value.charAt(0).toUpperCase() + searchBar.value.slice(1));
})