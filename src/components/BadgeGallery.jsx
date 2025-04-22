import React from 'react';
import useAchievements from '../features/badges/useAchievements';

const BadgeGallery = () => {
    const achievements = useAchievements();

    return (
        <div className="badge-gallery">
            <h2>Badge Gallery</h2>
            <div className="badges">
                {achievements.map((achievement, index) => (
                    <div key={index} className="badge">
                        <img src={achievement.image} alt={achievement.name} />
                        <p>{achievement.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BadgeGallery;
