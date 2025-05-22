import React from 'react';
import PropTypes from 'prop-types';
import dashboardIcon from '../../assets/icons/Dashboard.svg';
import questIcon from '../../assets/icons/Quest.svg';
import achievementsIcon from '../../assets/icons/Achievements.svg';
import progressIcon from '../../assets/icons/Progress.svg';
import characterIcon from '../../assets/icons/Character.svg';
import settingsIcon from '../../assets/icons/Settings.svg';

const iconMap = {
  settings: settingsIcon,
  quest: questIcon,
  progress: progressIcon,
  dashboard: dashboardIcon,
  character: characterIcon,
  achievements: achievementsIcon,
};

const SideBarButton = React.memo(function SideBarButton({
  type,
  label,
  selected,
  showText,
  onClick,
  className = '',
}) {
  const iconSrc = iconMap[type];

  return (
    <div className="flex justify-center items-center w-full">
      <button
        onClick={onClick}
        className={`flex justify-center items-center w-full ${className} border-0 bg-transparent p-0 text-left`}
        data-state={selected ? "Selected" : "NotSelected"}
        data-show-icon="true"
        data-show-text={showText ? "true" : "false"}
        type="button"
        style={{
          minWidth: showText ? '15rem' : '5rem',
          minHeight: '5rem',
          maxWidth: '100%',
          maxHeight: '100%',
        }}
        tabIndex={0}
      >
        <div
          className={`p-5 ${showText ? 'pl-10' : 'justify-center'} bg-stone-50 rounded-full shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] inline-flex items-center gap-5 flex-wrap content-center w-full ${selected ? 'shadow-2xl' : ''}`}
          style={{
            background: selected ? '#F9F8F8' : undefined,
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {/* Icon */}
          <div className="w-12 h-12 flex justify-center items-center flex-wrap content-center mx-auto">
            {iconSrc && (
              <img
                src={iconSrc}
                alt={`${label} icon`}
                className="w-12 h-12 shadow-[1px_1px_2px_0px_rgba(31,22,141,0.50)]"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
                loading="lazy"
              />
            )}
          </div>
          {/* Label */}
          {showText && (
            <div className="flex-1 flex items-center min-w-0">
              <span className="text-indigo-900 text-2xl font-bold font-['Typold'] text-left truncate">
                {label}
              </span>
            </div>
          )}
        </div>
      </button>
    </div>
  );
});

SideBarButton.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  showText: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default SideBarButton;
