import { useEffect, useRef } from 'react';

function CubeViewer({ scramble, className }) {
    const twistyRef = useRef(null);

    useEffect(() => {
        if (twistyRef.current && scramble) {
            twistyRef.current.setAttribute('alg', scramble);
        }
    }, [scramble]);

    return (
        <twisty-player
            class={className}
            ref={twistyRef}
            style={{ width: '300px', height: '300px' }}
            background="none"
            control-panel="none"
        ></twisty-player>
    );
}

export default CubeViewer;
