// o contexto sao informacoes acessievis a todo a aplicacao
// podem ser funcoes, valores, JSON
// o children e um componente que vem do _app.tsx, o challengeProvider
// fica por fora do app que engloba toda a aplicacao
// ReactNode e o tipo que permite uma propriedade ser outro componente do React

import {createContext, ReactNode, useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import challenges from '../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge{
  type: 'body' | 'eye',
  description: string,
  amount: number
}

interface ChallengeContextData{
  level: number,
  experience: number,
  challengesCompleted: number,
  experienceToNextLevel: number,
  challenge: Challenge,
  levelUp: () => void,
  startNewChallenge: () => void,
  resetChallenge: () => void,
  completeChallenge: () => void,
  closeLevelModal: () =>void
}

export const ChallengeContext = createContext({} as ChallengeContextData)

interface ChallengesProviderProps{
  children: ReactNode,
  level: number, 
  experience: number, 
  challengesCompleted: number
}

export function ChallengeProvider({children, ...rest}: ChallengesProviderProps){
  const [level, setLevel] = useState(rest.level ?? 1);
  const [experience, setExperience] = useState(rest.experience ?? 0 );
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
  const [challenge, setChallenge] = useState(null);
  const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);


  const experienceToNextLevel = Math.pow((level+1)*4, 2)

  useEffect(() => {
    Notification.requestPermission()
  },[])//se o paramento for vazio ele vai executar assim que o componente for exibido

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('experience', String(experience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  },[level, experience, challengesCompleted])
  
  function levelUp(){
    setLevel(level+1)
    setIsLevelModalOpen(true)
  }

  function closeLevelModal(){
    setIsLevelModalOpen(false)
  }


  function startNewChallenge(){
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]

    setChallenge(challenge)
    
    new Audio('/notification.mp3').play()

    if(Notification.permission === 'granted'){
      new Notification('Novo Desafio!',{
        body: `Valendo ${challenge.amount} xp!`
      })
    }

  }

  function resetChallenge(){
    setChallenge(null);
  }
  
  function completeChallenge(){
    if(!challenge) return

    const { amount } = challenge

    let finalExperience = experience + amount

    if(finalExperience >= experienceToNextLevel){
      finalExperience = finalExperience - experienceToNextLevel
      levelUp()
    }

    setExperience(finalExperience)
    setChallenge(null)
    setChallengesCompleted(challengesCompleted+1)
  }

  return(
    <ChallengeContext.Provider value={
      {
        level,
        experience,
        challengesCompleted,
        experienceToNextLevel,
        challenge,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelModal
      }
    }>
      {children}
      {isLevelModalOpen && <LevelUpModal/>}
    </ChallengeContext.Provider>
  );
}