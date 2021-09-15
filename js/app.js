//API key
const APIkey = 'a28951ae49a74c7cb3411354211509';


const loadData = () => {
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;
    inputField.value = '';

    //making spinner visible
    spinnerDisplay('block');
    //making details section clear
    const detailsContainer = document.getElementById('details');
    detailsContainer.textContent = '';

    console.log(inputValue);
    //fetching data
    fetch(`http://api.weatherapi.com/v1/current.json?key=a28951ae49a74c7cb3411354211509&q=${inputValue}&aqi=no`)
        .then(response => response.json())
        .then(data => displayData(data));
};
// display the details of the city
const displayData = (data) => {
    const detailsContainer = document.getElementById('details');
    detailsContainer.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
        <h2 class="text-center">weather details</h2>
        <h2 class="text-white text-center">${data.location.name}</h2>
        <div class="d-flex justify-content-center align-items-center">
            <img src="${data.current.condition.icon}" alt="">
            <h4 class="text-white text-center">${data.current.condition.text}</h4>
        </div>
        <h4 class="text-center text-white">Temperature: ${data.current.feelslike_c} °C</h4>
    `;
    detailsContainer.appendChild(div);
    spinnerDisplay('none')
};
const spinnerDisplay = (style) => {
    document.getElementById('spinner').style.display = style;
};
