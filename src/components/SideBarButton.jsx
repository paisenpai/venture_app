import React from 'react';

const SideBarButton = ({ iconSrc, label }) => {
    return (
        <div className="p-5 bg-stone-50 rounded-[32px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] inline-flex justify-center items-center gap-5 flex-wrap content-center">
            <div className="w-8 h-8 flex justify-center items-center flex-wrap content-center">
                <img className="w-9 h-9 shadow-[1px_1px_2px_0px_rgba(31,22,141,0.50)]" src={iconSrc} alt="icon" />
            </div>
            <div className="text-center justify-center text-indigo-900 text-2xl font-bold font-['Typold']">
                {label}
            </div>
        </div>
    );
};

export default SideBarButton;