import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../app/store';
import { fetchContent } from './LessonContentSlice';

const LessonContent = ({ lessonId }: { lessonId: number }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { content, status, error } = useSelector((state: RootState) => state.lessonContent);
    console.log("lessonId: " + lessonId)
    useEffect(() => {
        dispatch(fetchContent(lessonId));
    }, [dispatch, lessonId])



    // Render content based on status
    if (status === 'loading') return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    console.log("no status or error")
    return <div>{content && content.map((item, index) => (
        <div key={index}>
            <p>English: {item.word_english}</p>
            <p>Hebrew: {item.word_hebrew}</p>
            <p>French: {item.word_french}</p>
        </div>
    ))}
    </div>;

}

export default LessonContent