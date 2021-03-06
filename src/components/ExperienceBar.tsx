import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/ExperienceBar.module.css' 

export function ExperienceBar(){
  const {experience, experienceToNextLevel} = useContext(ChallengeContext)

  const percentToNextLevel = Math.round(experience*100) /experienceToNextLevel;

  return(
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{width:`${percentToNextLevel}%`}}>

        <span className={styles.currentExperience} style={{left: `${percentToNextLevel}%` }}>
          {experience} xp
        </span>
        </div>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  );
}