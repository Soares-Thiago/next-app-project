import { useState, useEffect, useContext } from 'react';
import { CountDownContext } from '../contexts/CountDownContext';
import styles from '../styles/components/CountDown.module.css';

export function CountDown(){
  const {minutes, seconds, hasFinish, isActive, StartCountDown, resetCountDown} = useContext(CountDownContext)

  const [minuteL, minuteR] = String(minutes).padStart(2, '0').split('');
  const [secondL, secondR] = String(seconds).padStart(2, '0').split('');

  return(
    <div> 
      <div className={styles.countDownContainer}>
        <div>
          <span>{minuteL}</span>
          <span>{minuteR}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondL}</span>
          <span>{secondR}</span>
        </div>
      </div>
      { hasFinish ? (
        <button 
          className={`${styles.startButton}`}
          disabled
        >
        Ciclo encerrado
        </button>
      ) : (
        <>
        {
        isActive? (
          <button 
            type="button" 
            className={`${styles.startButton} ${styles.startButtonActive}`}
            onClick={resetCountDown}
          >
          Abandonar ciclo
          </button>
        ) : ( 
        <button 
          type="button" 
          className={styles.startButton}
          onClick={StartCountDown}
        >
        Iniciar um ciclo
        </button>)
      }
        </>
      ) }
  </div>
  );
}