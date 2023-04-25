/*
  Hook this script to index.html
  by adding `<script src="script.js">` just before your closing `</body>` tag
*/

async function mainEvent() { // the async keyword means we can make API requests
  const form = document.querySelector('.main_form'); // This class name needs to be set on your form before you can listen for an event on it
  form.addEventListener('submit', async (submitEvent) => { // async has to be declared on every function that needs to "await" something
    submitEvent.preventDefault(); // This prevents your page from going to http://localhost:3000/api even if your form still has an action set on it
    console.log('form submission'); // this is substituting for a "breakpoint"

    /*
      ## GET requests and Javascript
        We would like to send our GET request so we can control what we do with the results
        Let's get those form results before sending off our GET request using the Fetch API
    */

    // this is the preferred way to handle form data in JS in 2022
    const formData = new FormData(submitEvent.target); // get the data from the listener target
    const formProps = Object.fromEntries(formData); // Turn it into an object

    // You can also access all forms in a document by using the document.forms collection
    // But this will retrieve ALL forms, not just the one that "heard" a submit event - less good

    /*
      ## Retrieving information from an API
        The Fetch API is relatively new,
        and is much more convenient than previous data handling methods.
        Here we make a basic GET request to the server using the Fetch method to the county
    */

    // Basic GET request - this replaces the form Action
    const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');

    // This changes the response from the GET into data we can use - an "object"
    const arrayFromJson = await results.json();
    console.table(arrayFromJson.data); // this is called "dot notation"
    // arrayFromJson.data - we're accessing a key called 'data' on the returned object
    // it initially contains all 1,000 records from your request
  });
}
/*
  This adds an event listener that fires our main event only once our page elements have loaded
  The use of the async keyword means we can "await" events before continuing in our scripts
  In this case, we load some data when the form has submitted
*/
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
