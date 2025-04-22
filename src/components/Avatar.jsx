import React from 'react';
import PropTypes from 'prop-types';
import './Avatar.css'; // Optional: Add styles for the avatar component

const Avatar = ({ imageUrl, altText, size }) => {
    const avatarStyle = {
        width: size,
        height: size,
        borderRadius: '50%',
        objectFit: 'cover',
    };

    return (
        <div className="avatar">
            {imageUrl ? (
                <img src={imageUrl} alt={altText || 'User Avatar'} style={avatarStyle} />
            ) : (
                <div
                    style={{
                        ...avatarStyle,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#ccc',
                        color: '#fff',
                        fontSize: size * 0.4,
                    }}
                >
                    ?
                </div>
            )}
        </div>
    );
};

Avatar.propTypes = {
    imageUrl: PropTypes.string,
    altText: PropTypes.string,
    size: PropTypes.number,
};

Avatar.defaultProps = {
    imageUrl: null,
    altText: 'Avatar',
    size: 50,
};

export default Avatar;