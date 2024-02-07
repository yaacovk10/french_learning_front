// src/features/exercise/ExerciseComponent.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { useSpeechRecognition } from '../counter/useSpeechRecognition';
import { useFetchPhotos } from './useFetchPhotos';

const ExerciseComponent = () => {
  // Use the same selector as in LessonContent to get the content
  
  const { content } = useSelector((state: RootState) => state.lessonContent);
  const photos = useFetchPhotos(content)
  const { startListening, isListening } = useSpeechRecognition(
    (text) => console.log("Recognized text:", text),
    (error) => console.error("Recognition error:", error),
    'fr-FR' // Set the recognition language to French
  );

  return (
    <div className="container">
      {content.map((item) => (
        <div key={item.id} className="exercise-item">
          <div className="exercise-word">{item.word_hebrew}</div>
          <img src={photos[item.id]} alt={item.word_english} className="exercise-photo" />
          <button onClick={startListening} disabled={isListening}>
            <FontAwesomeIcon icon={faMicrophone} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ExerciseComponent;
