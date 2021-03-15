import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Profile.module.css' 

export function Profile(){
  const {level} = useContext(ChallengeContext)
  return(
    <div className={styles.profileContainer}>
      <img src="https://github.com/Soares-Thiago.png" alt="thiago soares" />
      <div>
        <strong>Thiago Pontes</strong>
        <p> <img src="icons/level.svg" alt="moovit level up"/> Level {level}</p>
      </div>
    </div> 
  );
}