import NameCard from './components/NameCard/NameCard'
import Timer from './components/Timer/Timer'
import SolveContext from './components/SolveContext/SolveContext'
import { useContext, useState } from 'react'
import './App.css'


function App() {
  
  const [solveArray, setSolveArray] = useState([9.1, 10.53, 11.03, 9.62, 13.96]);

  return (
    <SolveContext.Provider value={[solveArray, setSolveArray]}>
      <>
        <NameCard></NameCard>
        <Timer></Timer>
      </>
    </SolveContext.Provider>
  )
}

export default App
