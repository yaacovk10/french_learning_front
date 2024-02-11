// ExerciseItem.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone , faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useSpeechRecognition } from '../../shared/hooks/useSpeechRecognition';



// Define the structure for the lesson content item
interface LessonContentItem {
  id: number;
  word_hebrew: string;
  word_english: string;
  word_french: string; 
}

// Props definition for ExerciseItem component
  interface ExerciseItemProps {
    item: LessonContentItem; // The individual lesson item
    photoSrc: string; // Source URL for the item's photo
  }
  
  // Functional component for rendering a single exercise item
  const ExerciseItem: React.FC<ExerciseItemProps> = ({ item, photoSrc }) => {
    // State for storing the user's speech recognition result
    const [recognizedText, setRecognizedText] = useState('');
  
    // Custom hook for handling speech recognition
    const { startListening, isListening } = useSpeechRecognition(
      (text) => {
        console.log("Recognized text:", text);
        setRecognizedText(text.trim().toLowerCase());// Store the recognized text
      },
      (error) => console.error("Recognition error:", error), // Handle errors
      'fr-FR' // Set the language for speech recognition to French
    );
  
    // Determine if the recognized text matches the item's French word
    const isCorrect = recognizedText === item.word_french.trim().toLowerCase();
  
    // Render the exercise item
    return (
      <div className="d-flex justify-content-start align-items-center mb-3" style={{direction:'rtl'}}>
         {/* Display the Hebrew word */}
        <div className="ms-3" style={{ minWidth: "100px" }}>{item.word_hebrew}</div>
         {/* Display the item's photo if available */}
        {photoSrc && (
          <img src={photoSrc} alt={item.word_english} className="img-fluid" style={{ width: '200px', height: '200px', objectFit: 'cover' }}/>
        )}
        {/* Button to start speech recognition */}
        <button onClick={startListening} disabled={isListening}>
          <FontAwesomeIcon icon={faMicrophone} />
        </button>
         {/* Display feedback based on speech recognition result */}
        <div style={{marginLeft: '10px'}}>
          {isListening ? (
            <em>Listening...</em>
          ) : recognizedText ? (
            // Show feedback icon and recognized text
            <>
              <FontAwesomeIcon icon={isCorrect ? faCheck : faTimes} />
              <span> {recognizedText}</span>
            </>
          ) : null}
        </div>
      </div>
    );
  };

  export default ExerciseItem

