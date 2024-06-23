import React, { useState, useRef } from 'react';
import MinimalDrawingCanvas from './components/MinimalDrawingCanvas';
import ControlPanel from './components/ControlPanel';

const App = () => {
    const [lines, setLines] = useState([]);
    const [color, setColor] = useState('red');
    const [isErasing, setIsErasing] = useState(false); // Zustand für Erase-Modus
    const canvasRef = useRef(null);

    const toggleEraseMode = () => {
        setIsErasing(!isErasing);
    };

    return (
        <div>
            <ControlPanel setColor={setColor} toggleEraseMode={toggleEraseMode} isErasing={isErasing} />
            <MinimalDrawingCanvas canvasRef={canvasRef} lines={lines} setLines={setLines} color={color} isErasing={isErasing} />
        </div>
    );
};

export default App;
