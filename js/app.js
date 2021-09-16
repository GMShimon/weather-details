//API key
const APIkey = '4505adf24099746b640663d26b01a045';

/* getting today's date */
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]


const d = new Date();
const month = d.getMonth() + 1;
const day = dayNames[d.getDay()];
const year = d.getFullYear();

const second = d.getSeconds(); // => 51
let hour // => 9
let minute;

let Typography;
if (d.getHours() < 12) {
    Typography = 'AM';
}
else {
    Typography = 'PM'
}
//minute check
if (d.getMinutes() < 10) {
    minute = '0' + d.getMinutes();
}
else {
    minute = d.getMinutes();
}
//hour check
if (d.getHours() > 12) {
    hour = d.getHours() - 12;
}
else {
    hour = d.getHours();
}
const timeP = document.getElementById('time');
timeP.innerText = `${hour}:${minute}${Typography}`
/* End */

document.getElementById('input-field').addEventListener('keypress', function (e) {
    if (e.key == 'Enter') {
        loadData();
    }
})

//toggle spinners
const toggleSpinner = isBlock => {
    document.getElementById('spinner').style.visibility = isBlock;
}

const loadData = () => {
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;
    inputField.value = '';
    toggleSpinner('visible');
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputText}&appid=${APIkey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayData(data))
}
const seText = (id, text) => {
    document.getElementById(id).innerText = text;
}
const displayData = (data) => {
    //getting the url of weather icon
    const imageUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    document.getElementById('image').setAttribute('src', imageUrl);
    //setting the text 
    seText('city', data.name);
    seText('description', data.weather[0].description);
    document.getElementById('temperature').innerText = `
        ${data.main.temp} °C
    `;
    toggleSpinner('hidden');
    //fetching the time of the current city
    const timeUrl = `https://timezone.abstractapi.com/v1/current_time/?api_key=4c85885a368445cbbff2408cd480de7a&location=${data.name},${data.sys.country}`
    fetch(timeUrl)
        .then(response => response.json())
        .then(time => setTime(time))
}
const setTime = (time) => {
    console.log(time)
    const x = time.datetime.split(' ');
    console.log(x);
    document.getElementById('time-city').innerText = `
    time:${x[1]} // ${day}
    `;
}

