import {createContext, ReactNode} from 'react'

interface CountDownContextData{

}

interface ChallengesProviderProps{
  children: ReactNode
}

export const CountDownContext = createContext({} as CountDownContextData)

export function CountDownProvider({children}: ChallengesProviderProps){

  return(
    <CountDownContext.Provider value={null}>
      {children}
    </CountDownContext.Provider>
  );

}