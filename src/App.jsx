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
import { saveDrawing, loadDrawing } from './backendApi/api';

const App = () => {
    const [lines, setLines] = useState({ red: [], yellow: [], green: [] });
    const [color, setColor] = useState('red');
    const [isErasing, setIsErasing] = useState(false);
    const canvasRef = useRef(null);

    const toggleEraseMode = () => {
        setIsErasing(!isErasing);
    };

    const handleSave = async () => {
        const name = prompt('Enter a name for the drawing:');
        if (name) {
            try {
                await saveDrawing(name, lines);
                alert('Drawing saved!');
            } catch (error) {
                alert('Error saving drawing.');
            }
        }
    };

    const handleLoad = async () => {
        const name = prompt('Enter the name of the drawing to load:');
        if (name) {
            try {
                const drawing = await loadDrawing(name);
                if (drawing) {
                    setLines(drawing.lines);
                } else {
                    alert('Drawing not found!');
                }
            } catch (error) {
                alert('Error loading drawing.');
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
