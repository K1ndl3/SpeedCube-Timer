import { useState } from 'react'
import './StatsBar.css'

function StatsBar() {

    const [isExtended, setIsExtended] = useState(false);
    
    return (
    <>
    <div className="stats-bar-container"
        style={{
            height: isExtended ? "500px" : "250px",
        }}
    >
        <button 
            className='extend-button' 
            onClick={() => setIsExtended((prev) => !prev)}
            >☰</button>
    </div>
    </>)
}

export default StatsBar