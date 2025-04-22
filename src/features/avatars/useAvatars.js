import { useState } from 'react';

const useAvatars = () => {
    const [avatarPreference, setAvatarPreference] = useState(null);

    const updateAvatarPreference = (newAvatar) => {
        if (!newAvatar) {
            console.error("Invalid avatar provided.");
            return;
        }
        setAvatarPreference(newAvatar);
        console.log(`Avatar preference updated to: ${newAvatar}`);
    };

    return {
        avatarPreference,
        updateAvatarPreference,
    };
};

export default useAvatars;