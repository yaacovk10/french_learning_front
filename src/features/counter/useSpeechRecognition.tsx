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

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      setIsListening(false);
      recognition.stop();
    }
  };

  useEffect(() => {
    if (!recognition) {
      console.error("Speech recognition not supported in this browser.");
      return;
    }

    recognition!.continuous = true;
    recognition!.lang = lang;
    recognition!.interimResults = false;

    recognition!.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      onResult(transcript);
    };

    recognition!.onerror = (event: any) => {
      if (onError) onError(event.error);
    };

    // Cleanup function to stop recognition when the component unmounts or the effect re-runs
    return () => {
      recognition!.stop();
    };
  }, [onResult, onError, lang, recognition]);

  return { isListening, startListening, stopListening };
};
