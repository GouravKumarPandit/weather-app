const apiKey = "e3b9e547b0cc468181dafea85898c64a";

let weatherAsk = document.querySelector('.weatherAsk');
let getDet = document.querySelector('#getDet');
let leftArrow = document.querySelector('.fa-arrow-left');
let inputSearch = document.querySelector('#inputSearch');
let devLoc = document.querySelector("#devLoc");
let search = document.querySelector("#search");
let fetching = document.querySelector(".fetching");
let weatheResult = document.querySelector(".weather-result");

let temp = document.querySelector("#temp");
let typeWeather = document.querySelector("#typeWeather");
let loc = document.querySelector("#location");

let temp2 = document.querySelector("#temp2");
let humid = document.querySelector("#humid");

search.addEventListener('click', (e)=>{
    if(inputSearch.value != ""){
        fetching.classList.add("fetchSucc");
        getDet.textContent = "Getting weather details...";
        respData = fetchWeather(inputSearch.value);
    }
    else{
        fetching.classList.add("fetchFail");
        getDet.textContent = "Please Enter City A Name!!";
        setTimeout(()=>{
            fetching.classList.remove("fetchFail");
            fetching.classList.remove("fetchSucc");
        },2000);
    }
});

devLoc.addEventListener('click',()=>{
    if(navigator.geolocation){ // If browser support geographical location API or not
        navigator.geolocation.getCurrentPosition(onSuccess);
    }
    else{
        alert("Your Browser Doesn't Support Geographical Loaction");
    }
});
function onSuccess(position){
    // console.log(position)
    const {latitude,longitude} = position.coords;
    let timestamp = position.timestamp;
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    fetchApply(api);
}

function fetchWeather(city){
    inputSearch.value = "";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetchApply(url);
}

function fetchApply(val){
    // console.log(val)
    fetch(val)
    .then(response => response.json())
    .then(respData => weatherDetails(respData));
}

function weatherDetails(result){
    if(result.cod == "404"){
        getDet.textContent = result.message + "!"
        fetching.classList.add("fetchFail");
        setTimeout(()=>{
            fetching.classList.remove("fetchFail");
            fetching.classList.remove("fetchSucc");
        },2000);
    }
    else{
        weatheResult.style.display = "block";
        weatherAsk.style.display = "none";
        leftArrow.style.display = "block";
        temp.innerText = result.main.temp;
        loc.innerText = result.name;
        typeWeather.innerText = result.weather[0].description;
        temp2.innerText = result.main.feels_like;
        humid.innerText = result.main.humidity + " %";
    }
}

leftArrow.addEventListener("click",()=>{
    weatheResult.style.display = "none";
    weatherAsk.style.display = "flex";
    fetching.classList.remove("fetchSucc");
    leftArrow.style.display = "none";
});