// import React, { useState, useRef } from 'react';
// import MinimalDrawingCanvas from './components/MinimalDrawingCanvas';
// import ControlPanel from './components/ControlPanel';
//
// const App = () => {
//     const [lines, setLines] = useState([]);
//     const [color, setColor] = useState('red');
//     const [isErasing, setIsErasing] = useState(false); // Zustand für Erase-Modus
//     const canvasRef = useRef(null);
//
//     const toggleEraseMode = () => {
//         setIsErasing(!isErasing);
//     };
//
//     return (
//         <div>
//             <ControlPanel setColor={setColor} toggleEraseMode={toggleEraseMode} isErasing={isErasing} />
//             <MinimalDrawingCanvas canvasRef={canvasRef} lines={lines} setLines={setLines} color={color} isErasing={isErasing} />
//         </div>
//     );
// };
//
// export default App;



import React, { useState, useRef } from 'react';
import MinimalDrawingCanvas from './components/MinimalDrawingCanvas';
import ControlPanel from './components/ControlPanel';

const App = () => {
    const [lines, setLines] = useState({ red: [], yellow: [], green: [] });
    const [color, setColor] = useState('red');
    const [isErasing, setIsErasing] = useState(false);
    const canvasRef = useRef(null);

    const toggleEraseMode = () => {
        setIsErasing(!isErasing);
    };

    const handleSave = () => {
        const name = prompt('Enter a name for the drawing:');
        if (name) {
            const drawing = { name, lines };
            console.log('Saving drawing:', drawing);
            localStorage.setItem(name, JSON.stringify(drawing));
            alert('Drawing saved!');
        }
    };

    const handleLoad = () => {
        const name = prompt('Enter the name of the drawing to load:');
        if (name) {
            const drawing = JSON.parse(localStorage.getItem(name));
            if (drawing) {
                setLines(drawing.lines);
            } else {
                alert('Drawing not found!');
            }
        }
    };

    const clearDrawing = () => {
        setLines({ red: [], yellow: [], green: [] });
    };

    return (
        <div>
            <ControlPanel setColor={setColor} toggleEraseMode={toggleEraseMode} isErasing={isErasing} />
            <MinimalDrawingCanvas canvasRef={canvasRef} lines={lines} setLines={setLines} color={color} isErasing={isErasing} />
            <div>
                <button onClick={handleSave}>Save Drawing</button>
                <button onClick={handleLoad}>Load Drawing</button>
                <button onClick={clearDrawing}>Clear Drawing</button>
            </div>
        </div>
    );
};

export default App;
