import { useEffect, useRef, useState, useContext } from 'react'
import './Timer.css'
import Scrambo from 'scrambo';
import SolveContext from '../SolveContext/SolveContext';


function Timer() {

    ////////////////////////////////////////////////////// STATES ///////////////////////
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timerState, setTimerState] = useState('idle');
    const [randScramble, setRandScramble] = useState('');
    const [currentTime, setCurrentTime] = useState(0);
    ////////////////////////////////////////////////////// REFS /////////////////////////
    const intervalRef = useRef(null);
    ////////////////////////////////////////////////////// CONTEXT //////////////////////
    const [solveArray, setSolveArray] = useContext(SolveContext);
    ////////////////////////////////////////////////////// FUNCTIONS ////////////////////
    useEffect(() => {
        const scrambo = new Scrambo();
        setRandScramble(scrambo.type('333').get()[0]);
    }, []);


    useEffect(() => {
        
        const handleKeyDown = (e) => {
            if (e.code === 'Space' && isRunning === false && timerState === 'idle') {
                setTimerState('ready');
            }

            if (e.code === 'Space' && isRunning === true && timerState === 'running') {
                setIsRunning(false);
                setTimerState('stopped');
                
                const scrambo = new Scrambo();
                setRandScramble(scrambo.type('333').get()[0]);
            }
            
            if (e.code === 'Space' && isRunning === false && timerState === 'stopped') {
                setElapsedTime(0);
                setTimerState('ready');
            }
        };
        
        const handleKeyUp = (e) => {

            if (timerState == 'stopped' && e.code === 'Space') {
                setSolveArray((prev) => [...prev, elapsedTime/1000]);

            }
            if (e.code === 'Space' && isRunning == false && timerState === 'ready') {
                setIsRunning(true);
                setTimerState("running");
            }
        }

        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        }

    },[timerState])

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setElapsedTime(prev => prev + 10);       
            },(10));
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    },[isRunning])
    
    const seconds = String(Math.floor((elapsedTime % 60000) / 1000)).padStart(2, '0');
    const centiseconds = String(Math.floor((elapsedTime % 1000) / 10)).padStart(2, '0');

    let color = 'white';
    if (timerState === 'idle') color = 'white';
    if (timerState === 'ready') color = 'red';
    if (timerState === 'running') color = 'green';
    if (timerState === 'stopped') color = 'white'; 

    ////////////////////////////////////////////////////// HTML ////////////////////

    return (
        <div className="timer-container">
            <div className="timer-display" style={{color}}>
                <span>{seconds}</span>
                <span>.</span>
                <span>{centiseconds}</span>
            </div>
            <div className="test-context">
            </div>
            <div className="scramble">{randScramble }</div>
        </div>
    )
}

export default Timer