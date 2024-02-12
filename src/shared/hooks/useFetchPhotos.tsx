// useFetchPhotos.ts
import { useEffect, useState } from 'react';
import { LessonContentItem } from '../../features/lessons/LessonContentSlice';

// Type definition for the photos object, mapping lesson item IDs to photo URLs
interface Photos {
  [key: string]: string; // The key is the item ID, and the value is the photo URL
}

// Placeholder for an API key (ensure you manage and protect your actual API keys securely)
const apiKey = 'o5Ck3cUb2KGWhBS6JGemEySVYjdWsquLK0NtrFvGD1YdyxagNM1bBD1G';

// Custom hook to fetch photos related to lesson content items
export const useFetchPhotos = (content: LessonContentItem[]) => {
  // State to store the mapping of content items to their corresponding photos
  const [photos, setPhotos] = useState<Photos>({});

  useEffect(() => {
    // Iterate over each content item to fetch a related photo
    content.forEach((word: LessonContentItem) => {
       // Construct the request URL using the word_key to search for related photos
      fetch(`https://api.pexels.com/v1/search?query=${word.word_key}&per_page=1`, {
        headers: {
          'Authorization': apiKey, // Use the API key for authorization
        }
      })
      .then(response => response.json())
      .then(data => {
        // Check if any photos were found
        if (data.photos.length > 0) {
          // Update the photos state with the new photo, preserving existing photos
          setPhotos(prev => ({ ...prev, [word.id]: data.photos[0].src.large }));
        }
      })
      .catch(console.error);
    });
  }, [content]); // Re-run the effect if the content array changes

  return photos; // Return the photos object for use by the consuming component
};
