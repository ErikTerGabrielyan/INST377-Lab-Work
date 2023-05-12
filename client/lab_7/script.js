/* eslint-disable max-len */

/*
  Hook this script to index.html
  by adding `<script src="script.js">` just before your closing `</body>` tag
*/

/*
  ## Utility Functions
    Under this comment place any utility functions you need - like an inclusive random number selector
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/
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
    });
}
  
function processRestaurants(list) {
    console.log('fired restaurants list');
    const range = [...Array(15).keys()];
    return newArray = range.map((item) => {
        const index = getRandomIntInclusive(0, list.length - 1);
        return list[index];
    });
}
  
async function mainEvent() {

    const form = document.querySelector('.main_form'); // get your main form so you can do JS with it
    const filterButton = document.querySelector('#filter_button'); // get a reference to your submit button
    const loadDataButton = document.querySelector("#data_load");
    const generateListButton = ducoment.querySelector("#generate")
    const loadAnimation = document.querySelector("#data_load_animation");
    const textField = document.querySelector("#resto");
    loadAnimation.style.display = 'none';
    
    let storedList = [];
    let currentList = [];

    loadDataButton.addEventListener("click", async (submitEvent) => {
        console.log("loading data");
        loadAnimation.style.display = "inline-block";
        const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');

        storedList = await results.json();
        if (storedList.length > 0){
            generateListButton.classList.remove("hidden");
        }

        loadAnimation.style.display = "none";
        console.table(storedList);
    });

    filterButton.addEventListener("click", (event) =>{
        console.log("clicked filterbutton");

        const formData = new FormData(mainForm);
        const formProps = Object.fromEntries(formData);
        console.log(formProps);
        const newList = filterList(storedList, formProps.resto);

        console.log(newList);
        injectHTML(newList);
    });

    generateListButton.addEventListener("click", (event) =>{
        console.log("generate new list");
        currentList = processRestaurants(storedList);
        console.log(currentList);
        injectHTML(currentList);
    });

    textField.addEventListener("input", (event) =>{
        console.log(event.target.value);
        const filteredList = filterList(storedList, event.target.value);
        console.log(filterList);
        injectHTML(filteredlist);
    });
}

document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
  