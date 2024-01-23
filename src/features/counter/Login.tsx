import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import styles from './Counter.module.css';
import { selectlogged, loginAsync } from './loginSlice';

export function Login() {
  const logged = useAppSelector(selectlogged);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;
  const [username, setuserName] = useState("")
  const [password, setpassword] = useState("")
  return (
    <div>
      <div className={styles.row}>
        {logged?"logged":"not logged"}
        UserName : <input onChange={(e)=>setuserName(e.target.value)}/>
        Password : <input onChange={(e)=>setpassword(e.target.value)}/>
        <button
          className={styles.button}
          onClick={() => dispatch(loginAsync({username,password}))}
        >
          Login
        </button>
        
      </div>
    </div>
  );
}
