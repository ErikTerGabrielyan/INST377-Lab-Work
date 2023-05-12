function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function injectHTML(list) {
  console.log('fired injectHTML');
  const target = document.querySelector('.restaurant_list');
  target.innerHTML = '';
  list.forEach((item) => {
    const str = '<li>${item.name}</li>';
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

async function mainEvent() {
  /*
    ## Main Event
      Separating your main programming from your side functions will help you organize your thoughts
      When you're not working in a heavily-commented "learning" file, this also is more legible
      If you separate your work, when one piece is complete, you can save it and trust it
  */

  // the async keyword means we can make API requests
  const form = document.querySelector('.main_form'); // get your main form so you can do JS with it
  const filterButton = document.querySelector('#filter_button'); // get a reference to your submit button
  const generateButton = document.querySelector('#generate_button');
  const loadAnimation = document.querySelector('.lds-ellipsis');
  filterButton.style.display = 'none'; // let your submit button disappear

  let currentList = [];

  loadDataButton.addEventListener("click", async (submitEvent) => {
    submitEvent.preventDefault();
    console.log("loading data");
    loadAnimation.style.display = "inline-block";
    const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');

    currentList = await results.json()

    loadAnimation.style.display = "none";
    console.table(currentList);
  });

  filterButton.addEventListener("click", (event) =>{
    console.log("clicked filterbutton");

    const formData = new FormData(form);
    const formProps = Object.fromEntries(formData);
    console.log(formProps);
    const newList = filterList(currentList, formProps.resto);

    console.log(newList);
    injectHTML(newList);
  });

  generateListButton.addEventListener("click", (event) =>{
    console.log("generate new list");
    restaurantList = processRestaurants(currentList);
    console.log(restaurantList);
    injectHTML(restaurantList);
  });
}

document.addEventListener('DOMContentLoaded', async () => mainEvent()); 
