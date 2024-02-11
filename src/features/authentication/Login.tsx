import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectlogged, loginAsync , logout, selectstatus} from './loginSlice';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

export function Login() {
  const logged = useAppSelector(selectlogged);  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [username, setuserName] = useState("")
  const [password, setpassword] = useState("")
  const loginStatus = useAppSelector(selectstatus)

  useEffect(()=>{
    if (logged){
      navigate('/lessons'); //Redirect to lessons page after login
    }
  }, [logged, navigate]);
  
  return (
    <div>
      <div className={styles.row}>
        {logged ? (
          <div>
            <span>Logged in</span>
            <button className={styles.button} onClick={() => dispatch(logout())}>
              Logout
            </button>
          </div>
        ) : (
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
