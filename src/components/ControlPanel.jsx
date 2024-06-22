import React from 'react';
import SoundControls from './SoundControls';
import ColorButton from './ColorButton';

const ControlPanel = ({ colors, selectedColor, onSelectColor, isPlaying, isPaused, playPauseSound, stopSound }) => {
    return (
        <div>
            <div className="color-buttons">
                {colors.map(color => (
                    <ColorButton key={color} color={color} onSelectColor={onSelectColor} />
                ))}
            </div>
            <SoundControls
                isPlaying={isPlaying}
                isPaused={isPaused}
                playPauseSound={playPauseSound}
                stopSound={stopSound}
            />
        </div>
    );
};

export default ControlPanel;
