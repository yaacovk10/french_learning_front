import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../app/store';
import { LessonContentItem, fetchContent } from './LessonContentSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';


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

     // Function to speak the text
     const speakText = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'fr-FR'; // Set to French
        speechSynthesis.speak(utterance);
    };


    // Render content based on status
    if (status === 'loading') return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    console.log("no status or error")
    return(
        <div className="container">
            {content.map((item: LessonContentItem) => (
                <div key={item.id} className="d-flex justify-content-start align-items-center mb-3" style={{direction:'rtl'}}>{/*Adjusted for RTL*/}
                    
                    {/* Hebrew word (right) */}
                    <div className="ms-3" style={{ minWidth: "100px" }}>{item.word_hebrew}</div>

                    {/* Image (center) */}
                    {photos[item.id] && (
                        <img 
                            src={photos[item.id]} 
                            alt={item.word_english} 
                            className="img-fluid" 
                            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                        />
                    )}
                    {/* French word (left) with Listen Button */}
                    <div className="me-3" >
                        {item.word_french}
                        <button onClick={() => speakText(item.word_french)} className="ms-2">
                        <FontAwesomeIcon icon={faVolumeUp} />
                        </button>
                    </div>





                   
                </div>
            ))}
        </div>
    );
}
export default LessonContent