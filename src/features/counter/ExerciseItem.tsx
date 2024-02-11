import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useSpeechRecognition } from '../counter/useSpeechRecognition';

interface LessonContentItem {
    id: number;
    word_hebrew: string;
    word_english: string;
    word_french: string; // Ensure this property is included
  }
  

interface ExerciseItemProps {
  item: LessonContentItem;
  photoSrc: string;
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({ item, photoSrc }) => {
  const [recognizedText, setRecognizedText] = useState('');

  const { startListening, isListening } = useSpeechRecognition(
    (text) => {
      console.log("Recognized text:", text);
      setRecognizedText(text.trim().toLowerCase());
    },
    (error) => console.error("Recognition error:", error),
    'fr-FR'
  );

  // Determine if the recognized word is correct
  const isCorrect = recognizedText === item.word_french.trim().toLowerCase();

  return (
    <div className="d-flex justify-content-start align-items-center mb-3" style={{direction:'rtl'}}>
      <div className="ms-3" style={{ minWidth: "100px" }}>{item.word_hebrew}</div>
      {photoSrc && (
        <img src={photoSrc} alt={item.word_english} className="img-fluid" style={{ width: '200px', height: '200px', objectFit: 'cover' }}/>
      )}
      <button onClick={startListening} disabled={isListening}>
        <FontAwesomeIcon icon={faMicrophone} />
      </button>
      <div style={{marginLeft: '10px'}}>
        {isListening ? (
          <em>Listening...</em>
        ) : recognizedText ? (
          <>
            <FontAwesomeIcon icon={isCorrect ? faCheck : faTimes} />
            <span> {recognizedText}</span>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ExerciseItem;
