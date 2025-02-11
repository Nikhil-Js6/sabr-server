import { useRef } from 'react';
import { Fireworks } from '@fireworks-js/react';

export default function FireworksEffect() {
    const ref = useRef(null);

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    gap: '8px',
                    position: 'absolute',
                    zIndex: 10,
                    padding: '10px'
                }}
            >
            </div>
            <Fireworks
                ref={ref}
                options={{ opacity: 0.7 }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'black',
                }}
            />
        </>
    );
}
