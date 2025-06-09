import './NameCard.css'

function NameCard() {
    return (
        <>
            <h1>
                {'SpinChrono'.split('').map((char, idx) => (
                    <span key={idx}>{char}</span>
                ))}
            </h1>
        </>
    )
}

export default NameCard