// speakText.ts
export const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR'; // Set to French
    speechSynthesis.speak(utterance);
  };
  