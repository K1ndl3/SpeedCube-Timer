import { useEffect, useRef, useState, useContext } from 'react';
import Scrambo from 'scrambo';
import SolveContext from '../SolveContext/SolveContext';
import CubeViewer from '../CubeViewer/CubeViewer';
import './Timer.css';

function Timer() {
  ////////////////////////////////////////////////////// STATES ///////////////////////
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerState, setTimerState] = useState('idle'); // 'idle', 'holding', 'ready', 'running', 'stopped'
  const [randScramble, setRandScramble] = useState('');
  ////////////////////////////////////////////////////// REFS /////////////////////////
  const intervalRef = useRef(null);
  const holdTimeout = useRef(null);
  const isHoldValid = useRef(false);
  const keyPressed = useRef(false); // Track if "A" key is held down
  ////////////////////////////////////////////////////// CONTEXT //////////////////////
  const [solveArray, setSolveArray] = useContext(SolveContext);
  ////////////////////////////////////////////////////// FUNCTIONS ////////////////////

  const deleteLastTime = () => {
    setSolveArray(prev => {
      const newArr = [...prev];
      newArr.pop();
      return newArr;
    });
  };

  ////////////////////////////////////////////////////// EFFECTS //////////////////////

  useEffect(() => {
    const scrambo = new Scrambo();
    setRandScramble(scrambo.type('333').get()[0]);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'KeyA') {
        if (!keyPressed.current) {
          deleteLastTime();
          keyPressed.current = true;
        }
      }

      if (e.code === 'Space' && !isRunning && timerState === 'idle') {
        setTimerState('holding');
        isHoldValid.current = false;
        holdTimeout.current = setTimeout(() => {
          isHoldValid.current = true;
          setTimerState('ready');
        }, 500);
      }

      if (e.code === 'Space' && isRunning && timerState === 'running') {
        setIsRunning(false);
        setTimerState('stopped');

        const scrambo = new Scrambo();
        setRandScramble(scrambo.type('333').get()[0]);
      }

      if (e.code === 'Space' && !isRunning && timerState === 'stopped') {
        setElapsedTime(0);
        setTimerState('holding');
        isHoldValid.current = false;
        holdTimeout.current = setTimeout(() => {
          isHoldValid.current = true;
          setTimerState('ready');
        }, 500);
      }
    };

    const handleKeyUp = (e) => {
      if (holdTimeout.current) {
        clearTimeout(holdTimeout.current);
      }

      if (e.code === 'KeyA') {
        keyPressed.current = false; // Reset keyPressed when "A" is released
      }

      if (timerState === 'stopped' && e.code === 'Space') {
        setSolveArray((prev) => [...prev, elapsedTime / 1000]);
      }

      if (
        e.code === 'Space' &&
        !isRunning &&
        (timerState === 'holding' || timerState === 'ready')
      ) {
        if (isHoldValid.current) {
          setIsRunning(true);
          setTimerState('running');
        } else {
          setTimerState('idle');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [timerState, isRunning, elapsedTime, setSolveArray]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  ////////////////////////////////////////////////////// HTML ////////////////////
  const seconds = String(Math.floor((elapsedTime % 60000) / 1000)).padStart(2, '0');
  const centiseconds = String(Math.floor((elapsedTime % 1000) / 10)).padStart(2, '0');

  let color = 'white';
  if (timerState === 'idle') color = 'white';
  if (timerState === 'holding') color = 'red';
  if (timerState === 'ready') color = 'green';
  if (timerState === 'running') color = 'green';
  if (timerState === 'stopped') color = 'white';

  return (
    <div className="timer-wrapper">
      <div className="timer-container" style={{ color }}>
        <div className="timer-display">
          <span>{seconds}</span>
          <span>.</span>
          <span>{centiseconds}</span>
        </div>
        <div className="scramble">{randScramble}</div>
      </div>
      <CubeViewer scramble={randScramble} className="cube-viewer" />
    </div>
  );
}

export default Timer;
