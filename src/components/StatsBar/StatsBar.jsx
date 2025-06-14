import { useContext, useEffect, useState } from 'react'
import './StatsBar.css'
import SolveContext from '../SolveContext/SolveContext';

function StatsBar() {

    ////////////////////////////////////////////////////// CONTEXT //////////////////////
    const [solveArray, setSolveArray] = useContext(SolveContext);
    const [averageOf3, setAverageOf3] = useState('-');
    const [averageOf5, setAverageOf5] = useState('-');
    const [averageOf12, setAverageOf12] = useState('-');

    ////////////////////////////////////////////////////// STATES ///////////////////////
    const [isExtended, setIsExtended] = useState(false);

    ////////////////////////////////////////////////////// VARIABLES ////////////////////
    const min = (solveArray.length < 1 ? 0.0 : Math.min(...solveArray));
    const formatMin = min.toFixed(2).padStart(5,'0');

    ////////////////////////////////////////////////////// FUNCTIONS ////////////////////

    const calculateAvg3 = (solves) => {
        if (solves.length < 3) return '-';
        const avgArr = solves.slice(-3);
        const total = avgArr.reduce((sum, currEl) => sum + currEl, 0);
        const avg = total / 3;
        return avg.toFixed(2);
    }

    const calculateAvg5 = (solves) => {
        if (solves.length < 5) return '-';
        const avgArr = solves.slice(-5);
        const fast = Math.min(...avgArr);
        const slow = Math.max(...avgArr);
        const total = avgArr.reduce((sum, currEl) => sum + currEl, 0);
        const avg = (total - fast - slow) / 3;
        return avg.toFixed(2);
    }

    const calculateAvg12 = (solves) => {
        if (solves.length < 12) return '-';
        const avgArr = solves.slice(-12);
        const fast = Math.min(...avgArr);
        const slow = Math.max(...avgArr);
        const total = avgArr.reduce((sum, currEl) => sum + currEl, 0);
        const avg = (total - fast - slow) / 10;
        return avg.toFixed(2);
    }

    useEffect(() => {
        setAverageOf3(calculateAvg3(solveArray));
        setAverageOf5(calculateAvg5(solveArray));
        setAverageOf12(calculateAvg12(solveArray));
    }, [solveArray]);

    ////////////////////////////////////////////////////// HTML /////////////////////////

    return (
    <>
    <div className="stats-bar-container"
        style={{
            transition: "height 0.2s ease-in",
            height: isExtended ? "500px" : "200px",}}>
        <div className="main-stats">
            <p className="ao3">ao3: {averageOf3}</p>
            <p className="ao5">ao5: {averageOf5}</p>
            <p className="ao12">ao12: {averageOf12}</p>
            <p className="pb">best: {formatMin}</p>
        </div>
        <button 
            className='extend-button' 
            onClick={() => setIsExtended((prev) => !prev)}
        >☰</button>
    </div>
    </>)
}

export default StatsBar;
