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

    function deleteTime(index) {
    const newArr = solveArray.filter((_, i) => i !== index);
    setSolveArray(newArr);
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
            height: isExtended ? "500px" : "200px",
        }}>
        <div className="main-stats">
            <p className="ao3">
                <span>Ao3: </span>
                <span>{averageOf3}</span>
            </p>
            <p className="ao5">
                <span>Ao5: </span>
                <span>{averageOf5}</span>
            </p>
            <p className="ao12">
                <span>Ao12: </span>
                <span>{averageOf12}</span>
            </p>
            <p className="pb">
                <span>Best:  </span>
                <span>{formatMin}</span>
            </p>
        </div>
        {isExtended && (
            <div className="solves-list">
                {solveArray.length === 0 ? (
                    <p className="no-solves">No solves yet.</p>
                ) : (
                    solveArray.map((solve, idx) => (
                        <div className="solve-item" key={idx}>
                            <span>{idx + 1}.</span>
                            <span style={{width: '30px'}}>{solve.toFixed(2)}s</span>
                            <span>
                                <button className="delete-button" onClick={() => deleteTime(idx)}>❌</button>
                            </span>
                        </div>
                    ))
                )}
            </div>
        )}
        <button 
            className='extend-button' 
            onClick={() => setIsExtended((prev) => !prev)}
        >☰</button>
    </div>
    </>)
}

export default StatsBar;
