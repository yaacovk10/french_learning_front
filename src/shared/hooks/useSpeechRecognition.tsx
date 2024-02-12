import { useEffect, useState } from "react";

// Define the interface for the speech recognition object
interface CustomSpeechRecognition {
  start: () => void;
  stop: () => void;
  continuous: boolean;
  lang: string;
  interimResults: boolean;
  onresult: (event: any) => void;
  onerror: (event: any) => void;
}

// Custom hook for utilizing speech recognition API
export const useSpeechRecognition = (
  onResult: (text: string) => void,
  onError?: (error: string) => void,
  lang: string = 'fr-FR'  // Default language set to French
) => {
  // State to track if the speech recognition is actively listening
  const [isListening, setIsListening] = useState(false);

  // Variable to store the speech recognition instance
  let recognition: CustomSpeechRecognition | null = null;

  // Check and instantiate speech recognition based on browser support
  if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
  }

  // Timer for handling silence detection
  let silenceTimer: ReturnType<typeof setTimeout> | null = null;

  // Function to stop listening
  const stopListening = () => {
    if (recognition) {
      setIsListening(false);// Update listening state
      recognition.stop();// Stop speech recognition
      if (silenceTimer) clearTimeout(silenceTimer); // Clear the silence timer when recognition stops
    }
  };

  // Function to start listening
  const startListening = () => {
    if (recognition) {
      setIsListening(true); // Update listening state
      recognition.start(); // Start speech recognition

      // Reset silence detection timer on start
      if (silenceTimer) clearTimeout(silenceTimer);
      silenceTimer = setTimeout(() => {
        console.log("Silence detected, stopping recognition.");
        stopListening();
      }, 500); // Set the silence timeout to 0.5 second
    }
  };

  // Effect to set up speech recognition
  useEffect(() => {
    if (!recognition) {
      console.error("Speech recognition not supported in this browser.");
      return;
    }

    // Configure speech recognition settings
    recognition.continuous = true; // Keep listening even after recognizing speech
    recognition.lang = lang; // Set the language
    recognition.interimResults = true;// Return interim results

    // Event handler for speech recognition results
    recognition.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      onResult(transcript);// Invoke callback with the recognized text

      // Reset silence detection timer on receiving result
      if (silenceTimer) clearTimeout(silenceTimer);
      silenceTimer = setTimeout(() => {
        console.log("Silence detected, stopping recognition.");
        stopListening();
      }, 1000);
    };

    // Event handler for speech recognition errors
    recognition.onerror = (event: any) => {
      setIsListening(false); // Reset listening state on error
      if (silenceTimer) clearTimeout(silenceTimer); // Clear silence timer on error
      if (onError) onError(event.error); // Invoke error callback
    };

    // Cleanup function to stop recognition and clear timer
    return () => {
      if (recognition) recognition.stop();
      if (silenceTimer) clearTimeout(silenceTimer);
    };
  }, [onResult, onError, lang, recognition]);

  return { isListening, startListening, stopListening };
};
