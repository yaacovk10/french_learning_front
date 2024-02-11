// src/features/exercise/ExerciseComponent.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import {  fetchContent } from '../lessons/LessonContentSlice';
import { useSpeechRecognition } from '../../shared/hooks/useSpeechRecognition';
import { useFetchPhotos } from '../../shared/hooks/useFetchPhotos';
import ExerciseItem from './ExerciseItem';

// Component for displaying exercises based on the selected lesson
const ExerciseComponent = ({ lessonId }: { lessonId: number }) => {
  // Hook for dispatching actions to the Redux store
  const dispatch = useDispatch<AppDispatch>();

  // Retrieves lesson content from Redux store using a selector
  const { content } = useSelector((state: RootState) => state.lessonContent);

  // Custom hook to fetch photos based on lesson content
  const photos = useFetchPhotos(content)
  
  // Local state for storing the last recognized speech text
  const [recognizedText, setrecognizedText]= useState('')

 // Fetch lesson content when component mounts or lessonId changes
  useEffect(() => {
    dispatch(fetchContent(lessonId));
}, [dispatch, lessonId])

 // Hook for speech recognition functionality
  const { startListening, isListening } = useSpeechRecognition(
    (text) => {
      console.log("Recognized text:", text);
      setrecognizedText(text);// Update recognized text upon speech recognition
    },
    (error) => console.error("Recognition error:", error), // Handle speech recognition errors
    'fr-FR' // Set the recognition language to French
  );

  // Render the exercise items for the current lesson
  return  (
    <div className="container">
      {content.map((item) => (
        <ExerciseItem key={item.id} item={item} photoSrc={photos[item.id]} />
      ))}
    </div>
  );
};

export default ExerciseComponent;