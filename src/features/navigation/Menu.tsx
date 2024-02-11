import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { menuAsync, menuState } from './MenuSlice';
import { AppDispatch, RootState } from '../../app/store';
import LessonContent from '../lessons/LessonContent';
import Nav from 'react-bootstrap/Nav';
import ExerciseComponent from '../exercise/Exercise';


export function Menu() {
  const dispatch = useDispatch<AppDispatch>();
  const { status, items, error } = useSelector((state: { menu: menuState }) => state.menu)
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const location = useLocation();
  console.log("selectedLessonId: " , selectedLessonId )
  
  useEffect(() => {
    dispatch(menuAsync());
  }, [dispatch]);

  const handleMenuItemClick = (lessonId: number) => {
    setSelectedLessonId(lessonId);
  };

  return(
    <div style={{ display: 'flex', height: '100vh', width: '100%' }}> {/* Ensure full width */}
      {/* Sidebar */}
      <nav style={{ minWidth: '280px', backgroundColor: '#ffcccc', padding: '20px' }}>
        <Nav className="flex-column">
          {items.map(item => (
            <Nav.Link
              key={item.id}
              eventKey={item.id.toString()}
              onClick={() => handleMenuItemClick(item.id)}
            >
              {item.name_hebrew}
            </Nav.Link>
          ))}
        </Nav>
      </nav>

      {/* Main content area adjustment for better control */}
      <div style={{ flexGrow: 1, padding: '20px'}}>
        {/* This ensures LessonContent is more centered/aligned as needed */}
        {location.pathname.startsWith('/lesson') && selectedLessonId && <LessonContent lessonId={selectedLessonId}/>}
        {location.pathname.startsWith('/exercise') && selectedLessonId && <ExerciseComponent lessonId={selectedLessonId}/>}
      </div>
    </div>

  );
}
