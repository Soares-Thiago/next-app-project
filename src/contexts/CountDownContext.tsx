import {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import { ChallengeContext } from './ChallengeContext';
let countDownTimeOut: NodeJS.Timeout

interface CountDownContextData{
  minutes: number,
  seconds: number,
  hasFinish: boolean,
  isActive: boolean,
  StartCountDown: () => void,
  resetCountDown: () => void
}

interface ChallengesProviderProps{
  children: ReactNode
}

export const CountDownContext = createContext({} as CountDownContextData)

export function CountDownProvider({children}: ChallengesProviderProps){
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinish, setHasFinished] = useState(false);
  //pegando o contexto
  const {startNewChallenge} = useContext(ChallengeContext);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function StartCountDown(){
    setIsActive(true);
  }

  function resetCountDown(){
    clearTimeout(countDownTimeOut);
    setIsActive(false);
    setHasFinished(false);
    setTime(25 * 60); //25
  }

  //toda vez q o valor de active mudar ele executa a arrow function
  useEffect(() => {
    if( isActive && time > 0 ){
      countDownTimeOut = setTimeout(() => {
        setTime(time - 1)
      }, 1000) //em um intervalo de 1 seg, faz o time - 1 ai como o time mudou ele executa dnv por conta do useEffect
    } else if(isActive && time == 0){
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]) // toda vez q mudar o active e muda ro time ele executa 
  return(
    <CountDownContext.Provider value={{
      minutes,
      seconds,
      hasFinish,
      isActive,
      StartCountDown,
      resetCountDown
    }}>
      {children}
    </CountDownContext.Provider>
  );

}