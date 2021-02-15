let api = {
    key: "9060b4e6e96f749f86c9b6e45aaa5978",
    base: "http://api.openweathermap.org/data/2.5/"

}
let search = document.querySelector('.search-box');
search.addEventListener('keypress', setQuery);

function setQuery(evt) { // to check if the user press enter
    if (evt.keyCode == 13) {
        getResults(search.value);

    }
}

function getResults(query) { // pass the result throught a query

    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)

    .then(weather => {
        return weather.json();
    }).then(displatResults);
}

function displatResults(weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name},${weather.sys.country}`;
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
    let temp = document.querySelector('.current .temp')
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year} `;
}
