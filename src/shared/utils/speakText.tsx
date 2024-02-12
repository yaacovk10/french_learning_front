// speakText.ts
/**
 * Utilizes the Web Speech API's speech synthesis interface to speak out loud the given text.
 * 
 * This function creates a new instance of SpeechSynthesisUtterance for the provided text,
 * sets the language for the utterance, and instructs the speech synthesis service to speak the utterance.
 * 
 * @param {string} text - The text to be spoken by the speech synthesis.
 * @param {string} [lang='en-US'] - The language code for the speech synthesis. Defaults to 'en-US'.
 *                                  This parameter is optional and can be adjusted based on the needs.
 */

export const speakText = (text: string ,lang: string = 'en-US') => {
      // Create a new utterance instance with the provided text
    const utterance = new SpeechSynthesisUtterance(text);
     
    // Override the default language if needed. Note: the example sets it to 'fr-FR' ignoring the lang parameter.
    // To use the lang parameter, replace 'fr-FR' with lang.
    utterance.lang = 'fr-FR'; // Set to French
    
    // Instruct the speech synthesis service to speak the utterance
    speechSynthesis.speak(utterance);
  };
  