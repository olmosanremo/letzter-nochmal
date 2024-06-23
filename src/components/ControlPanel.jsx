// import React from 'react';
//
// const ControlPanel = ({ setColor, toggleEraseMode, isErasing }) => {
//     const colors = ['red', 'yellow', 'green']; // Farben hier definieren
//
//     return (
//         <div>
//             {colors.map((color) => (
//                 <button
//                     key={color}
//                     style={{ backgroundColor: color, margin: '0 5px' }}
//                     onClick={() => setColor(color)}
//                 >
//                     {color.charAt(0).toUpperCase() + color.slice(1)}
//                 </button>
//             ))}
//             <button onClick={toggleEraseMode} style={{ marginLeft: '10px' }}>
//                 {isErasing ? "Switch to Draw" : "Switch to Erase"}
//             </button>
//         </div>
//     );
// };
//
// export default ControlPanel;



import React from 'react';

const ControlPanel = ({ setColor, toggleEraseMode, isErasing }) => {
    return (
        <div>
            <button onClick={() => setColor('red')} style={{ backgroundColor: 'red' }}>Red</button>
            <button onClick={() => setColor('yellow')} style={{ backgroundColor: 'yellow' }}>Yellow</button>
            <button onClick={() => setColor('green')} style={{ backgroundColor: 'green' }}>Green</button>
            <button onClick={toggleEraseMode}>{isErasing ? "Switch to Draw" : "Switch to Erase"}</button>
        </div>
    );
};

export default ControlPanel;
