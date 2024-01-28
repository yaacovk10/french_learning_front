import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { log } from 'console';

interface Lesson {
  id: number;
  name_english: string;
  name_hebrew: string;
  name_french: string;
}

function Menu() {
  const MY_SERVER = "http://127.0.0.1:8000/lessons/"
  const [lessons, setlessons] = useState<Lesson[]>([]);
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/lessons/`).then(res => setlessons(res.data))
  }, [])

  
  console.log(lessons[0])
  
  return (
    <div className="App">
        <h1>Menu</h1>
        {lessons.map((lesson, index) => (
      <p key={index}> {lesson.name_hebrew}</p>
    ))}
        
    </div>
  );
}

export default Menu;
