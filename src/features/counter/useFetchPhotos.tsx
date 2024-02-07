// useFetchPhotos.ts
import { useEffect, useState } from 'react';
import { LessonContentItem } from './LessonContentSlice';

interface Photos {
  [key: string]: string;
}

const apiKey = 'o5Ck3cUb2KGWhBS6JGemEySVYjdWsquLK0NtrFvGD1YdyxagNM1bBD1G';

export const useFetchPhotos = (content: LessonContentItem[]) => {
  const [photos, setPhotos] = useState<Photos>({});

  useEffect(() => {
    content.forEach((word: LessonContentItem) => {
      fetch(`https://api.pexels.com/v1/search?query=${word.word_key}&per_page=1`, {
        headers: {
          'Authorization': apiKey,
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.photos.length > 0) {
          setPhotos(prev => ({ ...prev, [word.id]: data.photos[0].src.large }));
        }
      })
      .catch(console.error);
    });
  }, [content]);

  return photos;
};
