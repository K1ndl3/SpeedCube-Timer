import NameCard from './components/NameCard/NameCard'
import Timer from './components/Timer/Timer'
import StatsBar from './components/StatsBar/StatsBar'
import SolveContext from './components/SolveContext/SolveContext'
import { useContext, useState } from 'react'
import './App.css'


function App() {
  
  const [solveArray, setSolveArray] = useState([]);

  return (
    <SolveContext.Provider value={[solveArray, setSolveArray]}>
      <>
        <StatsBar></StatsBar>
        <NameCard></NameCard>
        <Timer></Timer>
      </>
    </SolveContext.Provider>
  )
}

export default App
