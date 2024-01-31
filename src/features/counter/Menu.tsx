import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { menuAsync, menuState } from './MenuSlice';
import { AppDispatch, RootState } from '../../app/store';
import LessonContent from './LessonContent';
import Nav from 'react-bootstrap/Nav';


export function Menu() {
  const dispatch = useDispatch<AppDispatch>();
  const { status, items, error } = useSelector((state: { menu: menuState }) => state.menu)
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(menuAsync());
  }, [dispatch]);

  const handleMenuItemClick = (lessonId: number) => {
    setSelectedLessonId(lessonId);
  };

  return (
    <div className="d-flex justify-content-end">
      <div className="flex-grow-1 p-3">
        {selectedLessonId && <LessonContent lessonId={selectedLessonId} />}
      </div>
      <div className="flex-shrink-0 p-3 bg-light" style={{width: "280px"}}>
        <ul className="nav nav-pills flex-column mb-auto">
          {items.map(item => (
            <li className="nav-item" key={item.id}>
              <a href="#" className={`nav-link ${selectedLessonId === item.id ? 'active' : ''}`} onClick={() => handleMenuItemClick(item.id)}>
                {item.name_hebrew}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
