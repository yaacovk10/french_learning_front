import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../app/store';
import { LessonContentItem, fetchContent } from './LessonContentSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { speakText } from '../../shared/utils/speakText';
import { useFetchPhotos } from '../../shared/hooks/useFetchPhotos';


// Component to display the content of a specific lesson
const LessonContent = ({ lessonId }: { lessonId: number }) => {
    // Hook to dispatch actions to the Redux store
    const dispatch = useDispatch<AppDispatch>();
    // Accessing the lesson content state from the Redux store
    const { content, status, error } = useSelector((state: RootState) => state.lessonContent);
    // Custom hook to fetch photos related to the lesson content
    const photos = useFetchPhotos(content)

    // Fetch lesson content when the component mounts or the lessonId changes
    useEffect(() => {
        dispatch(fetchContent(lessonId));
    }, [dispatch, lessonId])


     // Conditional rendering based on the loading status and presence of errors
    if (status === 'loading') return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // Rendering the lesson content
    return(
        <div className="container">
            {content.map((item: LessonContentItem) => (
                <div key={item.id} className="d-flex justify-content-start align-items-center mb-3" style={{direction:'rtl'}}>{/*Adjusted for RTL*/}
                   {/* Display the Hebrew word */}
                    <div className="ms-3" style={{ minWidth: "100px" }}>{item.word_hebrew}</div>
                    {/* Display the associated image */}
                    {photos[item.id] && (
                        <img 
                            src={photos[item.id]} 
                            alt={item.word_english} 
                            className="img-fluid" 
                            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                        />
                    )}
                    {/* Display the French word with a button to listen to its pronunciation */}
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