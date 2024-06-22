import React, { useState, useRef } from 'react';
import './App.css';
import DrawingCanvas from './components/DrawingCanvas';
import ModeDropdown from './components/ModeDropdown';
import ToggleButton from './components/ToggleButton';
import ControlPanel from './components/ControlPanel';
import axios from 'axios';
import * as Tone from 'tone';

function App() {
    const [mode, setMode] = useState('write');
    const [color, setColor] = useState('red'); // Defaultfarbe auf 'red' gesetzt
    const [selectedMode, setSelectedMode] = useState('Ionisch'); // Default-Auswahl für das Dropdown-Menü
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [tracks, setTracks] = useState([{ id: 1, ref: useRef(null), lines: [], color: 'red' }]);

    const handleColorSelect = (selectedColor) => {
        setColor(selectedColor);
    };

    const handleModeSelect = (mode) => {
        setSelectedMode(mode);
    };

    const saveDrawing = async (points, trackId) => {
        const data = {
            name: `My Drawing ${trackId}`,
            points: points
        };

        try {
            const response = await axios.post('http://your-backend-url/synthdata', data);
            console.log('Save successful', response.data);
        } catch (error) {
            console.error('Error saving data', error);
        }
    };

    const playPauseSound = async () => {
        await Tone.start();

        if (isPlaying) {
            if (isPaused) {
                Tone.Transport.start();
                setIsPaused(false);
            } else {
                Tone.Transport.pause();
                setIsPaused(true);
            }
            return;
        }

        tracks.forEach(track => {
            const { lines, ref } = track;
            const synths = {
                default: new Tone.Synth({
                    oscillator: { type: 'sine' },
                    envelope: {
                        attack: 0.1,
                        decay: 0.1,
                        sustain: 0.8,
                        release: 0.5
                    }
                }).toDestination(),
                green: new Tone.PolySynth(Tone.Synth, {
                    oscillator: { type: 'fatsawtooth' },
                    envelope: {
                        attack: 0.1,
                        decay: 0.1,
                        sustain: 0.8,
                        release: 0.5
                    }
                }).toDestination()
            };

            Tone.Transport.cancel();

            const canvas = ref.current;
            const height = canvas.height;
            const width = canvas.width;
            const totalTime = 30;
            const minDuration = 0.05;

            lines.flat().forEach((point, index, arr) => {
                const time = (point.x / width) * totalTime;
                const freq = 100 + (height - point.y);
                const nextTime = (index < arr.length - 1) ? (arr[index + 1].x / width) * totalTime : time + 0.5;
                const duration = Math.max(nextTime - time, minDuration);

                const synth = point.color === 'green' ? synths.green : synths.default;

                Tone.Transport.schedule((time) => {
                    synth.triggerAttackRelease(freq, duration, time);
                }, time);
            });
        });

        Tone.Transport.start();
        Tone.Transport.stop(`+${30}`);
        setIsPlaying(true);
        setIsPaused(false);
    };

    const stopSound = () => {
        Tone.Transport.stop();
        setIsPlaying(false);
        setIsPaused(false);
    };

    const addTrack = () => {
        const newTrack = { id: tracks.length + 1, ref: useRef(null), lines: [], color: color };
        setTracks([...tracks, newTrack]);
    };

    const updateLines = (newLines, trackId) => {
        setTracks(tracks.map(track =>
            track.id === trackId ? { ...track, lines: newLines } : track
        ));
    };

    return (
        <div className="App">
            <ControlPanel
                colors={['red', 'green', 'blue', 'orange', 'purple', 'yellow']}
                selectedColor={color}
                onSelectColor={handleColorSelect}
                isPlaying={isPlaying}
                isPaused={isPaused}
                playPauseSound={playPauseSound}
                stopSound={stopSound}
                addTrack={addTrack}
            />
            <ModeDropdown selectedMode={selectedMode} onSelectMode={handleModeSelect} />
            <ToggleButton onToggle={(isPlaying) => console.log(isPlaying ? 'Playing' : 'Paused')} />
            {tracks.map(track => (
                <DrawingCanvas
                    key={track.id}
                    mode={mode}
                    color={track.color}
                    onSave={(points) => saveDrawing(points, track.id)}
                    canvasRef={track.ref}
                    lines={track.lines}
                    setLines={(newLines) => updateLines(newLines, track.id)}
                />
            ))}
        </div>
    );
}

export default App;
