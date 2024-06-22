import React, { useEffect, useState } from 'react';
import { getCoordinates, drawSmoothLine } from '../utilities/canvasUtils';

const DrawingCanvas = ({ mode, color, onSave, canvasRef, lines, setLines }) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentLine, setCurrentLine] = useState([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }, [canvasRef]);

    useEffect(() => {
        setCurrentLine((prev) => prev.map(point => ({ ...point, color })));
    }, [color]);

    const startDrawing = (event) => {
        setIsDrawing(true);
        const { x, y } = getCoordinates(event, canvasRef.current);
        setCurrentLine([{ x, y, color }]);
    };

    const endDrawing = () => {
        setIsDrawing(false);
        setLines([...lines, currentLine]);
        setCurrentLine([]);
        canvasRef.current.getContext('2d').beginPath();
    };

    const draw = (event) => {
        if (!isDrawing) return;
        const { x, y } = getCoordinates(event, canvasRef.current);
        const newCurrentLine = [...currentLine, { x, y, color }];
        setCurrentLine(newCurrentLine);
        drawSmoothLine(canvasRef.current, [...lines, newCurrentLine]);
    };

    const handleSave = async () => {
        const drawing = {
            fileName: "example_drawing.json",
            drawingId: new Date().getTime().toString(),
            lines: lines.map(line => ({
                color: line[0].color,
                points: line.map(point => ({ x: point.x, y: point.y }))
            }))
        };

        try {
            const response = await onSave(drawing);
            console.log('Save successful', response.data);
        } catch (error) {
            console.error('Error saving drawing', error);
        }
    };

    return (
        <div>
            <canvas
                ref={canvasRef}
                width={800}
                height={600}
                style={{ border: '1px solid black' }}
                onMouseDown={startDrawing}
                onMouseUp={endDrawing}
                onMouseMove={draw}
                onTouchStart={startDrawing}
                onTouchEnd={endDrawing}
                onTouchMove={draw}
            />
            <button onClick={handleSave}>Save Drawing</button>
        </div>
    );
};

export default DrawingCanvas;
