const city = document.getElementById('city');
const country = document.getElementById('country');
const displayLocation = document.getElementById('displayLocation');
const displayDate = document.getElementById('displayDate');
const searchBtn = document.getElementById('searchBtn');

dateArray = [];
dateArray = new Date().toString().split(' ');

displayDate.textContent = `${dateArray[2]} ${dateArray[1]} ${dateArray[3]}`;
displayLocation.textContent = `Surrey, British Columbia`;

window.onload = () => {
  searchBtn.addEventListener('click', (evt) => {
    evt.preventDefault();    
    displayLocation.textContent = `${city.value}, ${country.value}`;
    displayDate.textContent = `${dateArray[2]} ${dateArray[1]} ${dateArray[3]}`;

    fetch(`/weather?city=${city.value}&country=${country.value}`).then(response => {
      if(response.error) {
        return console.log(response.error);
      }
      response.json().then(data => {
        if(data.error) {
          console.log(data.error);
        } else {
          console.log(data);
        }
      })
    });
  })
}