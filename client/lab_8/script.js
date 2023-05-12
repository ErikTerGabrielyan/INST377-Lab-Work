function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
  
function injectHTML(list) {
  console.log('fired injectHTML');
  const target = document.querySelector('#restaurant_list');
  target.innerHTML = '';
  list.forEach((item) => {
    const str = `<li>${item.name}</li>`;
    target.innerHTML += str;
  })
}
  
function filterList(list, query) {
  return list.filter((item) => {
    const lowerCaseName = item.name.toLowerCase();
    const lowerCaseQuery = query.toLowerCase();
    return lowerCaseName.includes(lowerCaseQuery)
  })
}
  
function processRestaurants(list) {
  console.log('fired restaurants list');
  const range = [...Array(15).keys()];
  return newArray = range.map((item) => {
    const index = getRandomIntInclusive(0, list.length - 1);
    return list[index];
  })
}

function initMap() {
  const carto = L.map('map').setView([38.98, -76.93], 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(carto);
  return carto;
}

function markerPlace(array, map) {
  console.log('array for markers', array);
  map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        layer.remove();
      }
  });
  array.forEach((item) => {
    console.log('markerPlace', item);
    const {coordinates} = item.geocoded_column_1;

    L.marker([coordinates[1], coordinates[0]]).addTo(map);
})
}
  
async function mainEvent() {
  
  const form = document.querySelector('.main_form'); 
  const filterButton = document.querySelector('#filter'); 
  const generateButton = document.querySelector('#generate_button');
  const loadDataButton = document.querySelector('#data_load');
  const textField = document.querySelector('#resto')

  const loadAnimation = document.querySelector('#data_load_animation');
  loadAnimation.style.display = 'none'; // let your submit button disappear
  generateButton.classList.add = "none";
  
  const carto = initMap();
  let storedList = [];
  let currentList = [];
  
  loadDataButton.addEventListener("click", async (submitEvent) => {
    submitEvent.preventDefault();
    console.log("loading data");
    loadAnimation.style.display = "inline-block";
    const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  
    storedList = await results.json();
    if (storedList.length > 0){
      generateButton.classList.remove("hidden");
    }
    loadAnimation.style.display = "none";
    console.table(storedList);
  });
  
  filterButton.addEventListener("click", (event) =>{
    console.log("clicked filterbutton");
  
    const formData = new FormData(form);
    const formProps = Object.fromEntries(formData);
    console.log(formProps);
    const newList = filterList(storedList, formProps.resto);
  
    console.log(newList);
    injectHTML(newList);
  });
  
  generateButton.addEventListener("click", (event) =>{
    console.log("generate new list");
    currentList = processRestaurants(storedList);
    console.log(currentList);
    injectHTML(currentList);
    markerPlace(currentList, carto);
  });
    
  textField.addEventListener('input', (event) =>{
      console.log(event.target.value);
      const filteredList = filterList(storedList, event.target.value);
      console.log(filteredList);
      injectHTML(filteredList);
      markerPlace(filteredList, carto);
  })
}
  
document.addEventListener('DOMContentLoaded', async () => mainEvent()); 
  