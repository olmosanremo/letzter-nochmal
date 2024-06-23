import React, { useEffect, useState } from 'react';
import { getTracks } from '../backendApi/api';

const TrackList = ({ onLoadTrack }) => {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const trackList = await getTracks();
                console.log('Fetched tracks:', trackList);  // Debug-Ausgabe
                setTracks(trackList);
            } catch (error) {
                console.error('Error retrieving tracks:', error);
            }
        };
        fetchTracks();
    }, []);

    return (
        <div>
            <h2>Tracks</h2>
            <ul>
                {tracks.map(track => (
                    <li key={track._id}>
                        <button onClick={() => onLoadTrack(track.name)}>{track.name}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrackList;
