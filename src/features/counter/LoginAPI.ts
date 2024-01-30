import axios from "axios";
// A mock function to mimic making an async request for data
export function login(credentials:{username: string, password:string}) {
  // console.log(credentials);
  
  const MY_SERVER = "http://127.0.0.1:8000/login/"
  return axios.post(MY_SERVER, credentials)
}
