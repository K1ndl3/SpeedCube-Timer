import NameCard from './components/NameCard/NameCard'
import Timer from './components/Timer/Timer'
import StatsBar from './components/StatsBar/StatsBar'
import SolveContext from './components/SolveContext/SolveContext'
import { useContext, useState } from 'react'
import './App.css'


function App() {
  
  const [solveArray, setSolveArray] = useState([10.25, 9.87, 11.12, 8.94, 10.67, 9.45, 11.33, 8.76, 10.89, 11.08,
                                                9.23, 10.56, 8.88, 11.47, 9.90, 10.12, 8.99, 11.76, 10.45, 9.58,
                                                10.34, 11.01, 8.67, 9.73, 10.92, 11.15, 9.05, 10.65, 8.79, 11.31,
                                                10.77, 9.42, 11.23, 8.85, 9.98, 10.41, 11.50, 9.31, 10.93, 8.81,
                                                10.01, 11.37, 9.14, 10.72, 8.91, 11.04, 9.86, 10.17, 8.74, 11.68,
                                                10.59, 9.71, 10.26, 11.19, 8.93, 10.83, 9.12, 11.09, 8.97, 10.74,
                                                9.36, 10.96, 11.21, 8.70, 9.63, 10.84, 11.28, 9.07, 10.49, 8.80,
                                                11.42, 10.11, 9.27, 10.68, 11.03, 8.95, 10.31, 9.52, 11.46, 10.00,
                                                8.92, 11.17, 9.35, 10.55, 11.07, 9.69, 10.46, 8.73, 11.13, 9.78,
                                                10.29, 11.26, 9.20, 10.37, 8.87, 11.39, 9.96, 10.19, 11.00, 8.90]);

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
