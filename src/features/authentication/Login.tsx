import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectlogged, loginAsync , logout} from './loginSlice';
import styles from './Login.module.css';

export function Login() {
  const logged = useAppSelector(selectlogged);
  console.log("Logged state:", logged); // Debugging log
  
  const dispatch = useAppDispatch();
  const [username, setuserName] = useState("")
  const [password, setpassword] = useState("")
  
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
            UserName: <input onChange={(e) => setuserName(e.target.value)} />
            Password: <input type='password' onChange={(e) => setpassword(e.target.value)} />
            <button
              className={styles.button}
              onClick={() => dispatch(loginAsync({ username, password }))}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
