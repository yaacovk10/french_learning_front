// src/features/exercise/ExerciseComponent.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { LessonContentItem, fetchContent } from './LessonContentSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { useSpeechRecognition } from '../counter/useSpeechRecognition';
import { useFetchPhotos } from './useFetchPhotos';

const ExerciseComponent = ({ lessonId }: { lessonId: number }) => {
  // Use the same selector as in LessonContent to get the content
  const dispach = useDispatch<AppDispatch>();
  const { content } = useSelector((state: RootState) => state.lessonContent);
  const photos = useFetchPhotos(content)
  
  console.log("lessonId: " + lessonId)


  useEffect(() => {
    dispach(fetchContent(lessonId));
}, [dispach, lessonId])

  const { startListening, isListening } = useSpeechRecognition(
    (text) => console.log("Recognized text:", text),
    (error) => console.error("Recognition error:", error),
    'fr-FR' // Set the recognition language to French
  );

  return (
    <div className="container">
      {content.map((item:LessonContentItem) => (
        <div key={item.id} className="d-flex justify-content-start align-items-center mb-3" style={{direction:'rtl'}}>
        {/* Hebrew word (right) */}
        <div className="ms-3" style={{ minWidth: "100px" }}>{item.word_hebrew}</div>

        {/* Image (center) */}
        {photos[item.id] && (
                        <img 
                            src={photos[item.id]} 
                            alt={item.word_english} 
                            className="img-fluid" 
                            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                        />
                    )}

          
          <button onClick={startListening} disabled={isListening}>
            <FontAwesomeIcon icon={faMicrophone} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ExerciseComponent;
