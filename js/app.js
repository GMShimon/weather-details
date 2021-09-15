//API key
const APIkey = 'a28951ae49a74c7cb3411354211509';

/* getting today's date */
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]


const d = new Date();
const month = d.getMonth() + 1;
const day = dayNames[d.getDay()];
const year = d.getFullYear();

const second = d.getSeconds(); // => 51
const hour = d.getHours(); // => 9
let minute;

let Typography;
if (hour < 12) {
    Typography = 'AM';
}
else {
    Typography = 'PM'
}
if (d.getMinutes() < 10) {
    minute = '0' + d.getMinutes();
}
else {
    minute = d.getMinutes();
}
/* End */


const loadData = () => {
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;
    inputField.value = '';

    //making spinner visible

    //making details section clear
    const detailsContainer = document.getElementById('details');
    detailsContainer.textContent = '';

    console.log(inputValue);
    if (inputValue != '') {
        //fetching data
        fetch(`http://api.weatherapi.com/v1/current.json?key=a28951ae49a74c7cb3411354211509&q=${inputValue}&aqi=no`)
            .then(response => response.json())
            .then(data => displayData(data));
        spinnerDisplay('block');
    }
    else {
        alert('Please give city name');
    }
};
// display the details of the city
const displayData = (data) => {
    const detailsContainer = document.getElementById('details');
    detailsContainer.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
        <h2 class="text-center">weather details</h2>
        <h2 class="text-white text-center">${data.location.name}</h2>
        <span class="fs-4 ms-5 fw-normal text-center text-Secondary">(${day}/${month}/${year}) ${hour}:${minute}${Typography}</span>
        <div class="d-flex justify-content-center align-items-center">
            <img src="${data.current.condition.icon}" alt="">
            <h4 class="text-white text-center">${data.current.condition.text}</h4>
        </div>
        <h4 class="text-center text-white">Temperature: ${data.current.feelslike_c} °C</h4>
        <div class="top-corner">
            <p class="fw-bold"></p>
        </div>
    `;
    detailsContainer.appendChild(div);
    spinnerDisplay('none')
};
const spinnerDisplay = (style) => {
    document.getElementById('spinner').style.display = style;
};



