import { CompletedChallenges } from '../components/CompletedChallenges'
import {GetServerSideProps} from 'next'

import { CountDown } from '../components/CountDown'
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import styles from '../styles/pages/Home.module.css'
import Head from 'next/head'
import { ChallengeBox } from '../components/ChallengeBox'
import { ChallengeProvider } from '../contexts/ChallengeContext'
import { CountDownProvider } from '../contexts/CountDownContext'

interface HomeProps{
  level: number, 
  experience: number, 
  challengesCompleted: number
}

export default function Home(props: HomeProps) { 
  // as props q retorno do getServerSideProps
  return (
    <ChallengeProvider 
      level={props.level} 
      experience={props.experience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
          <Head>
            <title>Moovit</title>
          </Head>
          <ExperienceBar />
          <CountDownProvider>
            <section>
              <div>
                <Profile />
                <CompletedChallenges />
                <CountDown />
              </div> 
              <div>
                <ChallengeBox/>
              </div> 
            </section>
          </CountDownProvider>
      </div>
    </ChallengeProvider>
    
  )
}

export const getServerSideProps: GetServerSideProps = async(ctx) => { 
  //acesso a servico externo, API back por exemplo
  /*const user = {
    level: 1,
    experience: 0,
    challengesCompleted: 0
  }*/

  const {level, experience, challengesCompleted} = ctx.req.cookies

  return{
    props: {
      level: Number(level), 
      experience:  Number(experience), 
      challengesCompleted:  Number(challengesCompleted)
    }
  }
}