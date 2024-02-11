import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectlogged, loginAsync , logout, selectstatus} from './loginSlice';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

export function Login() {
  // State hooks for managing username and password input
  const [username, setuserName] = useState("")
  const [password, setpassword] = useState("")
  // Custom hooks for Redux state management and navigation
  const logged = useAppSelector(selectlogged);  // Selects the logged-in status from the Redux store
  const loginStatus = useAppSelector(selectstatus) // Selects the login status from the Redux store
  const dispatch = useAppDispatch(); // Allows the dispatch of actions to the Redux store
  const navigate = useNavigate(); // Hook for programmatically navigating

  // Effect hook to redirect the user to the lessons page upon successful login
  useEffect(()=>{
    if (logged){
      navigate('/lessons');
    }
  }, [logged, navigate]);
  
  return (
    <div>
      <div className={styles.row}>
        {logged ? (
          // Display when the user is logged in
          <div>
            <span>Logged in</span>
            <button className={styles.button} onClick={() => dispatch(logout())}>
              Logout
            </button>
          </div>
        ) : (
          // Display login form when the user is not logged in
          <div>
            שם משתמש: <input onChange={(e) => setuserName(e.target.value)} />
            סיסמה: <input type='password' onChange={(e) => setpassword(e.target.value)} />
            <button
              className={styles.button}
              onClick={() => dispatch(loginAsync({ username, password }))}
            >
              התחברות
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
