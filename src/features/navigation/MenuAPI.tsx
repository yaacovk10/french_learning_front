import axios, { AxiosResponse } from "axios";

export async function fetchMenu() {
  const MY_SERVER = "http://127.0.0.1:8000/lessons/";
  try {
    const response: AxiosResponse = await axios.get(MY_SERVER);
    return response.data; // Return the data on successful response
  } catch (error) {
    throw new Error("Failed to fetch menu"); // Throw an error if request fails
  }
}
