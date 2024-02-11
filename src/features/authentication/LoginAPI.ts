import axios from "axios";
/**
 * Asynchronously sends login credentials to the server and returns the response.
 * 
 * This function uses axios to make a POST request to the server's login endpoint.
 * It sends the user's username and password as part of the request body.
 * **/
export function login(credentials:{username: string, password:string}) {
  
  const MY_SERVER = "http://127.0.0.1:8000/login/"
  
  // Sending the POST request with axios
  return axios.post(MY_SERVER, credentials)
}
