import React, { useState } from 'react';
import './AvatarCustomizer.css'; // Optional: Add custom styles here

const avatars = [
    { id: 1, name: 'Warrior', unlocked: true, image: '/images/avatars/warrior.png' },
    { id: 2, name: 'Mage', unlocked: false, image: '/images/avatars/mage.png' },
    { id: 3, name: 'Rogue', unlocked: false, image: '/images/avatars/rogue.png' },
    { id: 4, name: 'Archer', unlocked: true, image: '/images/avatars/archer.png' },
];

const AvatarCustomizer = () => {
    const [selectedAvatar, setSelectedAvatar] = useState(avatars[0].id);

    const handleAvatarClick = (avatar) => {
        if (avatar.unlocked) {
            setSelectedAvatar(avatar.id);
        } else {
            alert('This avatar is locked. Unlock it to use!');
        }
    };

    return (
        <div className="avatar-customizer">
            <h2>Choose Your Avatar</h2>
            <div className="avatar-grid">
                {avatars.map((avatar) => (
                    <div
                        key={avatar.id}
                        className={`avatar-item ${avatar.unlocked ? '' : 'locked'} ${
                            selectedAvatar === avatar.id ? 'selected' : ''
                        }`}
                        onClick={() => handleAvatarClick(avatar)}
                    >
                        <img src={avatar.image} alt={avatar.name} />
                        <p>{avatar.name}</p>
                        {!avatar.unlocked && <span className="lock-icon">🔒</span>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AvatarCustomizer;