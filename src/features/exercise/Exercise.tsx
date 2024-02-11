// src/features/exercise/ExerciseComponent.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { LessonContentItem, fetchContent } from '../lessons/LessonContentSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { useSpeechRecognition } from '../../shared/hooks/useSpeechRecognition';
import { useFetchPhotos } from '../../shared/hooks/useFetchPhotos';
import ExerciseItem from './ExerciseItem';

const ExerciseComponent = ({ lessonId }: { lessonId: number }) => {
  // Use the same selector as in LessonContent to get the content
  const dispatch = useDispatch<AppDispatch>();
  const { content } = useSelector((state: RootState) => state.lessonContent);
  const photos = useFetchPhotos(content)
  
  //State to store the recognized text
  const [recognizedText, setrecognizedText]= useState('')

  console.log("content", content)


  useEffect(() => {
    dispatch(fetchContent(lessonId));
}, [dispatch, lessonId])

  const { startListening, isListening } = useSpeechRecognition(
    (text) => {
      console.log("Recognized text:", text);
      setrecognizedText(text);
    },
    (error) => console.error("Recognition error:", error),
    'fr-FR' // Set the recognition language to French
  );

  return  (
    <div className="container">
      {content.map((item) => (
        <ExerciseItem key={item.id} item={item} photoSrc={photos[item.id]} />
      ))}
    </div>
  );
};

export default ExerciseComponent;
