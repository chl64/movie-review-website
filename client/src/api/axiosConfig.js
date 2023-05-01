import axios from 'axios';

/**
 * Configure and export the Axios object, where is to be used to make HTTP requests,
 * to the relevant remote API.
 */

export default axios.create({
    // baseURL provides the base address of the API endpoints that the client React application calls.
    // baseURL: 'https://9c96-103-106-239-104.ap.ngrok.io',
    baseURL: 'http://127.0.0.1:8080',

    
    // During development phase, the tech which the remote machine uses to expose the relevent API endpoints 
    // is called ngrok. 

    // The following setting ensures that the client HTTP requests is not blocked by CORS.
    // CROS = Cross-origin resource sharing
    // The fact that a web API is running in a different domain (origin) may block our access to the endpoint.
    headers: {"ngrok-skip-browser-warning": "true", "Access-Control-Allow-Origin": "*"}


});