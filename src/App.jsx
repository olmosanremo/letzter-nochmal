import React, { useState, useRef, useEffect } from 'react';
import MinimalDrawingCanvas from './components/MinimalDrawingCanvas';
import ControlPanel from './components/ControlPanel';
import { saveDrawing, loadDrawing, updateDrawing } from './backendApi/api';

const App = () => {
    const [lines, setLines] = useState({ red: [], yellow: [], green: [] });
    const [color, setColor] = useState('red');
    const [isErasing, setIsErasing] = useState(false);
    const [trackName, setTrackName] = useState('');
    const [originalTrackName, setOriginalTrackName] = useState('');
    const canvasRef = useRef(null);

    const toggleEraseMode = () => {
        setIsErasing(!isErasing);
    };

    const handleSave = async () => {
        if (!trackName) {
            alert('Please enter a name for the drawing.');
            return;
        }

        try {
            if (trackName === originalTrackName) {
                await updateDrawing(trackName, lines);
                alert('Drawing updated!');
            } else {
                await saveDrawing(trackName, lines);
                setOriginalTrackName(trackName);
                alert('Drawing saved!');
            }
        } catch (error) {
            alert('Error saving drawing.');
        }
    };

    const handleLoad = async () => {
        const name = prompt('Enter the name of the drawing to load:');
        if (name) {
            try {
                const drawing = await loadDrawing(name);
                if (drawing) {
                    setLines(drawing.lines);
                    setTrackName(drawing.name);
                    setOriginalTrackName(drawing.name);
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
            <input
                type="text"
                value={trackName}
                onChange={(e) => setTrackName(e.target.value)}
                placeholder="Enter track name"
            />
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
