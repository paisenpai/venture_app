import React, { useContext } from 'react';
import AvatarSelector from '../components/AvatarSelector';
import { UserContext } from '../contexts/UserContext';
import { ThemeContext } from '../contexts/ThemeContext';

const Character = () => {
    const user = useContext(UserContext); // Access user data from UserContext
    const theme = useContext(ThemeContext); // Access theme data from ThemeContext

    return (
        <div style={{ ...styles.container, backgroundColor: theme.background, color: theme.color }}>
            <h1 style={styles.header}>Character Information</h1>
            <AvatarSelector />
            <div style={styles.infoBox}>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Age:</strong> {user.age}</p>
                <p><strong>Occupation:</strong> {user.occupation}</p>
                <p><strong>Bio:</strong> {user.bio}</p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    header: {
        fontSize: '24px',
        marginBottom: '10px',
    },
    infoBox: {
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '15px',
        backgroundColor: '#f9f9f9',
    },
};

export default Character;
