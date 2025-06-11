import { useEffect, useRef, useState } from 'react'
import './Timer.css'

function Timer() {

    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalRef = useRef(null);
    const [timerState, setTimerState] = useState('idle');

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (timerState =='stop' && e.code === 'Space') {
                setTimerState('idle');
            }
        }

        const handleKeyUp = (e) => {
            if (e.code ==='Space' && timerState === 'idle') {
                setIsRunning(prev => !prev);
                setTimerState('active');
            }

            if (e.code === 'Space' && timerState === 'active') {
                setIsRunning(false);
                setTimerState('stop');
            }
        };


        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp);
        return () => {window.removeEventListener('keyup', handleKeyUp);
                      window.removeEventListener('keydown', handleKeyDown);
        }

    },[])

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
    if (timerState === 'idle') color = 'red';
    if (timerState === 'active') color = 'green';
    if (timerState === 'stop') color = 'white';

    return (
        <div className="timer-container">
            <div className="timer-display" style={{color}}>
                <span>{minutes}</span>
                <span>:</span>
                <span>{seconds}</span>
                <span>:</span>
                <span>{centiseconds}</span>
            </div>
        </div>
    )
}

export default Timer