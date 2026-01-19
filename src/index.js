import './style.css';

const searchBar = document.querySelector('#search-bar');
const searchBtn = document.querySelector('#search-btn');

const city = document.querySelector('.city');
const reading = document.querySelector('.reading');
const time = document.querySelector('.time');
const date = document.querySelector('.date');
const currentWeatherIcon = document.querySelector('.current-weather-icon');
const currentCondition = document.querySelector('.current-condition');

const daysReading = document.querySelectorAll('.days-reading');
const weatherLabel = document.querySelectorAll('.weather-label');
const weekday = document.querySelectorAll('.weekday');
const weekdayDate = document.querySelectorAll('.date');


function fetchWeatherData(location) {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=us&include=days%2Chours%2Ccurrent&key=8A7C5CWMMWSRZEYZKEVYZGYN7&contentType=json`).then(response => {
    return response.json();
    }).then(data => {
        city.textContent = data.address;
        reading.textContent = `${data.currentConditions.feelslike}°`;
        time.textContent = data.currentConditions.datetime;
        date.textContent = `${new Date(data.days[0].datetime).toLocaleDateString('en-US', {weekday: 'long', month: 'short', day: 'numeric', year: 'numeric'})}`;
        currentCondition.textContent = data.currentConditions.conditions;
        // currentWeatherIcon.innerHTML = `<img class='weather-iconsrc='' alt='weather-icon'>`

        daysReading.forEach((day, index) => {
            day.textContent = `${data.days[index + 1].feelslike}°`;
        });

        weatherLabel.forEach((day, index) => {
            day.textContent = data.days[index + 1].conditions;
        });

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

