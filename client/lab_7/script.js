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
  
  async function mainEvent() {
  
    const form = document.querySelector('.main_form'); 
    const filterButton = document.querySelector('#filter'); 
    const generateButton = document.querySelector('#generate_button');
    const loadDataButton = document.querySelector('#data_load');
    const textField = document.querySelector('#resto')

    const loadAnimation = document.querySelector('#data_load_animation');
    loadAnimation.style.display = 'none'; // let your submit button disappear
    generateButton.classList.add = "none";
  
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
    });
    
    textField.addEventListener('input', (event) =>{
        console.log(event.target.value);
        const filteredList = filterList(storedList, event.target.value);
        console.log(filteredList);
        injectHTML(filteredList);
    })
  }
  
  document.addEventListener('DOMContentLoaded', async () => mainEvent()); 
  