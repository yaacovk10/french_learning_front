import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { menuAsync, menuState } from './MenuSlice';
import { AppDispatch, RootState } from '../../app/store';
import LessonContent from '../lessons/LessonContent';
import Nav from 'react-bootstrap/Nav';
import ExerciseComponent from '../exercise/Exercise';

// Component for rendering the navigation menu and dynamic content based on selection
export function Menu() {
  // Hook to dispatch actions to the Redux store
  const dispatch = useDispatch<AppDispatch>();
  // Access menu state from Redux store
  const { status, items, error } = useSelector((state: { menu: menuState }) => state.menu)
  // State to track the selected lesson ID
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  // Hook to access the current location (URL path)
  const location = useLocation();
  
  // Fetch menu items when the component mounts or updates
  useEffect(() => {
    dispatch(menuAsync());
  }, [dispatch]);

    // Handler for when a menu item is clicked, setting the selected lesson ID
  const handleMenuItemClick = (lessonId: number) => {
    setSelectedLessonId(lessonId);
  };

  // Render the componen
  return(
    <div style={{ display: 'flex', height: '100vh', width: '100%' }}> {/* Ensure full width */}
       {/* Sidebar navigation menu */}
      <nav style={{ minWidth: '280px', backgroundColor: '#ffcccc', padding: '20px' }}>
        <Nav className="flex-column">
          {items.map(item => (
            <Nav.Link
              key={item.id}
              eventKey={item.id.toString()}
              onClick={() => handleMenuItemClick(item.id)}
            >
              {item.name_hebrew}{/* Display menu items */}
            </Nav.Link>
          ))}
        </Nav>
      </nav>

      {/* Main content area displaying content based on the selected menu item */}
      <div style={{ flexGrow: 1, padding: '20px'}}>
        {/* Dynamically render LessonContent or ExerciseComponent based on the current path */}
        {location.pathname.startsWith('/lesson') && selectedLessonId && <LessonContent lessonId={selectedLessonId}/>}
        {location.pathname.startsWith('/exercise') && selectedLessonId && <ExerciseComponent lessonId={selectedLessonId}/>}
      </div>
    </div>

  );
}
