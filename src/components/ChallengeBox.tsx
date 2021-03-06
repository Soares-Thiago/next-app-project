import { useContext } from 'react'
import { ChallengeContext } from '../contexts/ChallengeContext'
import { CountDownContext } from '../contexts/CountDownContext'
import styles from '../styles/components/ChallengeBox.module.css' 

export function ChallengeBox(){
  const {challenge, resetChallenge, completeChallenge} = useContext(ChallengeContext)
  const {resetCountDown} = useContext(CountDownContext)

  function handleChallengeSuccess(){
    completeChallenge();
    resetCountDown();
  }

  function handleChallengeFailed(){
    resetChallenge();
    resetCountDown();
  }

  return(
    <div className={styles.challengeBoxContainer}>
      {
        challenge? (
          <div className={styles.challengeBoxActive}>
            <header>
              Ganhe {challenge.amount} xp
            </header>
            <main>
              <img src={`icons/${challenge.type}.svg`} alt="Level Up"/>
              <strong>Novo desafio</strong>
              <p>
                {challenge.description}
              </p>
              <footer>
                <button 
                  className={styles.challengeFailedButton}
                  type="button"
                  onClick={handleChallengeFailed}
                >Falhei</button>
                <button 
                  className={styles.challengeSuccessButton}
                  type="button"
                  onClick={handleChallengeSuccess}
                >Completei</button>
              </footer>
            </main>
          </div>
        ) :(
          <div className={styles.challengeBoxNotActive}>
        <strong>Finalize um ciclo para receber um desafio</strong>
        <p>
          <img src="icons/level-up.svg" alt="Level Up"/>
          Avance de level completando os desafios
        </p>
      </div>
        )
      }
    </div>  
  )
}