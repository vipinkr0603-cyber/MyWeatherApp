const weatherApi = {
    key: "7663acaa2bb5548172adc4fa69477c06",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather",
};

const txtInput=document.getElementById("input-box");
const btnWeather=document.getElementById("button");

const hTemp=document.getElementById("temp");
const hCity=document.getElementById("city");

const divWeatherBody=document.getElementById("weather-body");
const divErrorMessage=document.getElementById("error-message");

const pDate = document.getElementById("date");
const pMinMax = document.getElementById("min-max");
const pWeather = document.getElementById("weather");
const pHumidity = document.getElementById("humidity");
const pWind = document.getElementById("wind");
const pPressure = document.getElementById("pressure");

txtInput.addEventListener("keypress",async(event)=>{
    if(event.key === "Enter") {
       await getWeatherReport(event.target.value);
    }
});

btnWeather.addEventListener("click",async()=>{
 
       await getWeatherReport(txtInput.value);
    
});

async function getWeatherReport(city){
    try{
        const response=await fetch(
            `${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&unit=matric`
        );
        if(!response.ok){
            throw new Error("City not found!");

        }
        const data = await response.json();
        showWeatherReport(data);

        divWeatherBody.classList.remove("d-none");
        divErrorMessage.classList.add("d-none");

    }catch(error){
         console.log(`error:${error}`);
         divWeatherBody.classList.add("d-none");
        divErrorMessage.classList.remove("d-none");
        clearWeatherDisplay();
    }
}

function showWeatherReport(weather){
    hCity.innerText=`${weather.name},${weather.sys.country}`;
    pDate.innerText= formatDate(new Date());
    hTemp.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;
    pWeather.innerText = `${weather.weather[0].main}`;

    pMinMax.innerText = `${Math.floor(weather.main.temp_min)}&deg;C(min)/${Math.ceil(weather.main.temp_max)}&deg;C(max)`;

    pHumidity.innerText = `${weather.main.humidity}`;
    pWind.innerText = `${weather.wind.speed} kmph`;
    pPressure.innerText = `${weather.main.pressure} hPa`;

    updateBackground(weather.weather[0].main);
    
}

function formatDate(date){
    const obj = {
        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric"
    };
    return date.toLocaleDateString(undefined,obj);
}

function updateBackground(weatherType){
    const backgrounds = {
        Clear : "weather-images/clear.jpg",
        Clouds : "weather-images/cloudy.jpg",
        Haze : "weather-images/cloudy.jpg",
        Rain : "weather-images/raing.jpg",
        Thunderstrom : "weather-images/thunder.jpg",
        Sunny: "weather-images/sunny.jpg",
        Snow: "weather-images/snowy.jpg",
    };
    document.body.style.backgroundImage=`url(${backgrounds[weatherType]|| "weather-images/clear.jpg"})`;
}

function clearWeatherDisplay (){
    hCity.innerText = "";
    pDate.innerText = "";
    hTemp.innerText = "";
    hTemp.innerText = "";
    pMinMax.innerText = "";
    pWeather.innerText = "";
    pHumidity.innerText = "";
    pPressure.innerText = "";
    pWind.innerText = "";
}





