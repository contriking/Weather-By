const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const timeoutput=document.querySelector('.time');
const dateoutput=document.querySelector('.date');
const conditionoutput=document.querySelector('.condition');
const nameoutput=document.querySelector('.name');
const icon=document.querySelector('.icon');
const cloudoutput=document.querySelector('.cloud');
const windoutput=document.querySelector('.wind');
const humidityoutput=document.querySelector('.humidity');
const form=document.getElementById('locationInput');
const search=document.querySelector('.search');
const btn=document.querySelector('.submit');
const cities=document.querySelectorAll('.city');

let cityinput="Siliguri";

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        
        cityinput=e.target.innerHTML;
        fetchWeatherData();
        app.style.opacity="0";
    });
})

form.addEventListener('submit', (e) => {
    
    if(search.value.length== 0){
        alert("Please type in the city name"); 
    }else {
        cityinput=search.value;
        fetchWeatherData();
        search.value="";
        app.style.opacity="0";
    }
    
    e.preventDefault();
});

// function dayoftheweek(day,month,year){
//     const weekday=[
//         "Sunday",
//         "Monday",
//         "Tuesday",
//         "Wednesday",
//         "Thursday",
//         "Friday",
//         "Saturday"
//     ];
//     return weekday[new Date(`${day}/${month}/${year}`).getDay()];
// };
//https://api.openweathermap.org/data/2.5/weather?q=siliguri&appid=1b8506141e894f86f859b0c82407bf6d&units=metric
function fetchWeatherData(){
    //fetch(`http://api.weatherapi.com/v1/current.json?key=8c6cafdded6f41078ec212737230909&q=${cityinput}`)
    fetch(`https://api.weatherapi.com/v1/current.json?key=8c6cafdded6f41078ec212737230909&q=${cityinput}`)
    .then(response => response.json())
    .then( data => {
        console.log(data);
        temp.innerHTML=data.current.temp_c + "&#176;";
        conditionoutput.innerHTML=data.current.condition.text;

        const date=data.location.localtime;
        const y=parseInt(date.substr(0,4));
        const m=parseInt(date.substr(5,2));
        const d=parseInt(date.substr(8,2));
        const time=date.substr(11);

        // dateoutput.innerHTML= `${dayoftheweek(d,m,y)} ${d} ,${m} ${y}`;
        dateoutput.innerHTML=data.location.localtime;
        timeoutput.innerHTML= null;

        nameoutput.innerHTML=data.location.name;
    
        const iconId=data.current.condition.icon.substr( "//cdn.weatherapi.com/weather/64x64/".length);

        icon.src="./icons/" + iconId;

        cloudoutput.innerHTML=data.current.cloud +"%";
        humidityoutput.innerHTML=data.current.humidity + "%";
        windoutput.innerHTML=data.current.wind_kph +"km/h";

        let timeofday= "day";

        const code=data.current.condition.code;

        if(!data.current.is_day) {
            timeofday="night";
        }
        // url(./photos/day/rainy.jpg);
        if (code==1000) {
            app.style.backgroundImage=`url(./photos/${timeofday}/clear.jpg)`;
            btn.style.background="#e5ba92";

            if(timeofday =="night"){
                btn.style.background="#181e27";
            }
        }
        else if( code==1003|| code==1006|| code==1009|| code==1030|| code==1069|| code==1087|| code==1135|| code==1273|| code==1276|| code==1279|| code==1282){
            app.style.backgroundImage=`url(./photos/${timeofday}/cloudy.jpg)`;
            btn.style.background="#fa6d1b";
            if(timeofday=="night"){
                btn.style.background="#181e27";
            }
        }
        else if( code==1063|| code==1069|| code==1072|| code==1150|| code==1153|| code==1180||code==1183||code==1186||code==1189||code==1204||code==1207||code==1240||code==1243||code==1246||code==1249||code==1252){
            app.style.backgroundImage=`url(./photos/${timeofday}/rainy.jpg)`;
            btn.style.background="#647d75";
            if(timeofday=="night"){
                btn.style.background="#325c80";
            }
        }
        else{
            app.style.backgroundImage=`url(./photos/${timeofday}/snowy.jpg)`;
            btn.style.background="#4d72aa";
            if(timeofday=="night"){
                btn.style.background="#1b1b1b";
            }
        }
        // url(./photos/day/cloudy.jpg);
        app.style.opacity="1";
    })

    .catch(() => {
        //alert('city not found ,please try again');
        app.style.opacity="1";
    });
}

fetchWeatherData();

app.style.opacity="1";
