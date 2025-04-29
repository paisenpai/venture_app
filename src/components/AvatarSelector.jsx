// Project: Avatar Selector Component
// Description: This component allows users to select an avatar from a list of options.
// The selected avatar will be passed to the parent component via a callback function.
import React from 'react';
import Avatar from './Avatar';

function AvatarSelector({ avatars, onSelect }) {
  return (
    <div className="flex space-x-4">
      {avatars.map((avatar, index) => (
        <div key={index} onClick={() => onSelect(avatar)} className="cursor-pointer">
          <Avatar src={avatar.src} alt={avatar.alt} size="16" />
        </div>
      ))}
    </div>
  );
}

export default AvatarSelector;
