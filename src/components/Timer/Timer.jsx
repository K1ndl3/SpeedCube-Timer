import { useEffect, useRef, useState } from 'react'
import './Timer.css'

function Timer() {

    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalRef = useRef(null);
    const [timerState, setTimerState] = useState('idle');


    useEffect(() => {
        
        const handleKeyDown = (e) => {
            if (e.code === 'Space' && isRunning == false && timerState === 'idle') {
                setTimerState('ready');
            }

            if (e.code === 'Space' && isRunning == true && timerState === 'running') {
                setIsRunning(false);
                setTimerState('stopped');
            }

            if (e.code === 'Space' && isRunning == false && timerState === 'stopped') {
                setElapsedTime(0);
                setTimerState('ready');
            }
        }

        const handleKeyUp = (e) => {
            if (e.code === 'Space' && isRunning == false && timerState === 'ready') {
                setIsRunning(true);
                setTimerState("running");
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

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
    

    const minutes = String(Math.floor(elapsedTime / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((elapsedTime % 60000) / 1000)).padStart(2, '0');
    const centiseconds = String(Math.floor((elapsedTime % 1000) / 10)).padStart(2, '0');

    let color = 'white';
    if (timerState === 'idle') color = 'white';
    if (timerState === 'ready') color = 'red';
    if (timerState === 'running') color = 'green';
    if (timerState === 'stopped') color = 'white'; 

    return (
        <div className="timer-container">
            <div className="timer-display" style={{color}}>
                <span>{seconds}</span>
                <span>.</span>
                <span>{centiseconds}</span>
            </div>
        </div>
    )
}

export default Timer