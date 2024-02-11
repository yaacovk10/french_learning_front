import axios from 'axios';

/**
 * Fetches lesson content from the backend based on the given lessonId.
 * 
 * This function makes an asynchronous GET request to the backend server
 * to retrieve the content of a specific lesson. The lessonId is used to
 * specify which lesson's content to fetch.
 **/
export const fetchLessonContent = async (lessonId: number) => {
  // Construct the URL with the lessonId query parameter
  const url = `http://127.0.0.1:8000/words/?lesson_id=${lessonId}`;

  // Make an asynchronous GET request to the server
  const response = await axios.get(url);

  // Log the response data for debugging purposes
  console.log(response.data);

  // Return the response data, adjust this line as needed based on the actual response structure
  return response.data;
};