import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../app/store';
import { LessonContentItem, fetchContent } from './LessonContentSlice';


const apiKey = 'o5Ck3cUb2KGWhBS6JGemEySVYjdWsquLK0NtrFvGD1YdyxagNM1bBD1G';

interface Photos {
    [key: string]: string;
}

const LessonContent = ({ lessonId }: { lessonId: number }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { content, status, error } = useSelector((state: RootState) => state.lessonContent);
    const [photos, setPhotos] = useState<Photos>({});

    console.log("lessonId: " + lessonId)

    useEffect(() => {
        dispatch(fetchContent(lessonId));
    }, [dispatch, lessonId])

    useEffect(() => {
        content.forEach((word: LessonContentItem) => {
            fetch(`https://api.pexels.com/v1/search?query=${word.word_english}&per_page=1`, {
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

    // Render content based on status
    if (status === 'loading') return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    console.log("no status or error")
    return <div>
        {content.map((item: LessonContentItem) => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                {/* Word in French */}
                <p style={{ marginRight: '30px' }}>{item.word_french}</p>

                {/* Image */}
                {photos[item.id] && (
                    <img
                        src={photos[item.id]}
                        alt={item.word_english}
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                )}

                {/* Word in Hebrew */}
                <p style={{ marginLeft: '20px' }}>{item.word_hebrew}</p>
            </div>
        ))}
    </div>;

}

export default LessonContent