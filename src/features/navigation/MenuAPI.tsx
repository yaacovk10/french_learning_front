import axios, { AxiosResponse } from "axios";

/**
 * Asynchronously fetches the menu data from the server.
 * 
 * This function makes a GET request to a specified endpoint to retrieve
 * the menu data, which typically includes a list of lessons or other
 * navigational elements for the application.
 **/
export async function fetchMenu() {
  // URL of the endpoint from which to fetch the menu data
  const MY_SERVER = "http://127.0.0.1:8000/lessons/";
  try {
    // Attempt to make a GET request to the server
    const response: AxiosResponse = await axios.get(MY_SERVER);
    // On success, return the data part of the response
    return response.data; 
  } catch (error) {
     // If the request fails, throw an error with a custom message
    throw new Error("Failed to fetch menu"); 
  }
}
