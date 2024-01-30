import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { menuAsync, menuState } from './MenuSlice';
import { ThunkAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../app/store';
import LessonContent from './LessonContent';


export function Menu() {
  const dispatch = useDispatch<AppDispatch>();
  const { status, items, error } = useSelector((state: { menu: menuState }) => state.menu)

  useEffect(() => {
    dispatch(menuAsync());
  }, [dispatch]);
  
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);

  const handleMenuItemClick = (lessonId: number) => {
    setSelectedLessonId(lessonId);
    console.log(selectedLessonId)}

  return (
    
     <div>
     <div className="menu">
       
       <ul>
         {items.map((item, idx) => (
           <li key={item.id} onClick={() => handleMenuItemClick(item.id)}>
             {item.name_hebrew}
           </li>
         ))}
       </ul>
     </div>
     <div className="lesson-content">
       {selectedLessonId && <LessonContent lessonId={selectedLessonId} />}
     </div>
   </div>
  );

 }

