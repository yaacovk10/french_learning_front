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

    // Render content based on status
    if (status === 'loading') return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    console.log("no status or error")
    return (
        // Use 'justify-content-end' to align items to the right
        <div className="container d-flex flex-column align-items-end">
            {content.map((item: LessonContentItem) => (
                <div key={item.id} className="d-flex justify-content-end align-items-center mb-3">
                    {/* French word (left) */}
                    <div className="text-end" style={{ minWidth: "100px" }}>{item.word_french}</div>

                    {/* Image (center) */}
                    {photos[item.id] && (
                        <img 
                            src={photos[item.id]} 
                            alt={item.word_english} 
                            className="img-fluid ms-3 me-3" 
                            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                        />
                    )}

                    {/* Hebrew word (right) */}
                    <div style={{ minWidth: "100px" }}>{item.word_hebrew}</div>
                </div>
            ))}
        </div>
    );
}
export default LessonContent