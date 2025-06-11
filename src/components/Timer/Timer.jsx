import { useState } from 'react'
import './Timer.css'

function Timer() {

    const [isRunning, setIsRunning] = useState(false);

    

    return(<>
    <div className="timer-container">
        <div className="timer-display">
            <span>00:00:00</span>
        </div>
    </div>
    </>)
}

export default Timer