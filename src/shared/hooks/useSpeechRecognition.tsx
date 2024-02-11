import { useEffect, useState } from "react";

interface CustomSpeechRecognition {
  start: () => void;
  stop: () => void;
  continuous: boolean;
  lang: string;
  interimResults: boolean;
  onresult: (event: any) => void;
  onerror: (event: any) => void;
}

export const useSpeechRecognition = (
  onResult: (text: string) => void,
  onError?: (error: string) => void,
  lang: string = 'fr-FR'
) => {
  const [isListening, setIsListening] = useState(false);

  let recognition: CustomSpeechRecognition | null = null;

  if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
  }

  let silenceTimer: ReturnType<typeof setTimeout> | null = null;

  const stopListening = () => {
    if (recognition) {
      setIsListening(false);
      recognition.stop();
      if (silenceTimer) clearTimeout(silenceTimer); // Clear the silence timer when recognition stops
    }
  };

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();

      if (silenceTimer) clearTimeout(silenceTimer);
      silenceTimer = setTimeout(() => {
        console.log("Silence detected, stopping recognition.");
        stopListening();
      }, 500); // Set the silence timeout to 1 second
    }
  };

  useEffect(() => {
    if (!recognition) {
      console.error("Speech recognition not supported in this browser.");
      return;
    }

    recognition.continuous = true;
    recognition.lang = lang;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      onResult(transcript);

      if (silenceTimer) clearTimeout(silenceTimer);
      silenceTimer = setTimeout(() => {
        console.log("Silence detected, stopping recognition.");
        stopListening();
      }, 1000);
    };

    recognition.onerror = (event: any) => {
      setIsListening(false); // Ensure isListening is reset on error
      if (silenceTimer) clearTimeout(silenceTimer); // Clear the silence timer on error
      if (onError) onError(event.error);
    };

    return () => {
      if (recognition) recognition.stop();
      if (silenceTimer) clearTimeout(silenceTimer);
    };
  }, [onResult, onError, lang, recognition]);

  return { isListening, startListening, stopListening };
};
