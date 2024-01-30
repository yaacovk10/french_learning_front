import axios from 'axios';

export const fetchLessonContent = async (lessonId: number) => {
  const response = await axios.get(`http://127.0.0.1:8000/words/?lesson_id=${lessonId}`);
  console.log(response.data)
  return response.data; // Adjust based on the response structure
  
};