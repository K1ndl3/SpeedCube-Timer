import './Timer.css'

function Timer() {

    const timeParts = "00:00:00".split(":");

    return(<>
    <div className="timer-container">
        <div className="timer-display">
            {timeParts.map((val, index)  => (
                <span className='timer-display-digits' key={index}>
                    {val}
                    {index < timeParts.length - 1 && <span>:</span>}
                    </span>
           ))}
        </div>
    </div>
    </>)
}

export default Timer