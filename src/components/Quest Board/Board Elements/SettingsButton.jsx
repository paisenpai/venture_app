import React, { memo } from "react";
import SettingsDots from "../../../assets/icons/SettingsDots.png";

const SettingsButton = memo(({ onClick }) => (
    <button
        className="ml-auto p-2 hover:bg-gray-100 rounded-full"
        onClick={onClick}
        aria-label="Settings"
        type="button"
        style={{ fontFamily: "Typold" }}
    >
        <img src={SettingsDots} alt="Settings" className="w-6 h-6" />
    </button>
));

export default SettingsButton;