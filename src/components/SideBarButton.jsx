/* SIDE BAR BUTTON COMPONENT
*
* This component is a reusable button for the sidebar.
*/

import React from 'react';

const SideBarButton = ({ iconSrc, label, onClick }) => {
    return (
        <div
            className="p-5 bg-stone-50 rounded-[32px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] inline-flex justify-center items-center gap-5 flex-wrap content-center cursor-pointer hover:bg-stone-100"
            onClick={onClick}
        >
            <div className="w-8 h-8 flex justify-center items-center flex-wrap content-center">
                <img className="w-9 h-9 shadow-[1px_1px_2px_0px_rgba(31,22,141,0.50)]" src={iconSrc} alt={`${label} icon`} />
            </div>
            <div className="text-center justify-center text-indigo-900 text-2xl font-bold font-['Typold']">
                {label}
            </div>
        </div>
    );
};

const SideBar = () => {
    const buttons = [
        { iconSrc: '/icons/Dashboard.svg', label: 'Dashboard' },
        { iconSrc: '/icons/quest.svg', label: 'Quest' },
        { iconSrc: '/icons/achievements.svg', label: 'Achievements' },
        { iconSrc: '/icons/progress.svg', label: 'Progress' },
        { iconSrc: '/icons/character.svg', label: 'Character' },
        { iconSrc: '/icons/settings.svg', label: 'Settings' },
    ];

    return (
        <div className="flex flex-col gap-4">
            {buttons.map((button, index) => (
                <SideBarButton
                    key={index}
                    iconSrc={button.iconSrc}
                    label={button.label}
                    onClick={() => console.log(`${button.label} clicked`)}
                />
            ))}
        </div>
    );
};

export default SideBar;