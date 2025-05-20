import dashboardIcon from '../assets/icons/Dashboard.svg';
import questIcon from '../assets/icons/Quest.svg';
import achievementsIcon from '../assets/icons/Achievements.svg';
import progressIcon from '../assets/icons/Progress.svg';
import characterIcon from '../assets/icons/Character.svg';
import settingsIcon from '../assets/icons/Settings.svg';

const iconMap = {
  settings: settingsIcon,
  quest: questIcon,
  progress: progressIcon,
  dashboard: dashboardIcon,
  character: characterIcon,
  achievements: achievementsIcon,
};

export default function SideBarButton({ type, label, selected, ...props }) {
  const iconSrc = iconMap[type];
  return (
    <div
      data-show-icon="true"
      data-show-text="true"
      data-state={selected ? "Selected" : "NotSelected"}
      className="p-5 bg-stone-50 rounded-[32px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] inline-flex justify-center items-center gap-5 flex-wrap content-center"
      {...props}
    >
      <div className="w-8 h-8 flex justify-center items-center flex-wrap content-center">
        {iconSrc && (
          <img
            src={iconSrc}
            alt={`${label} icon`}
            className="w-9 h-9 shadow-[1px_1px_2px_0px_rgba(31,22,141,0.50)]"
          />
        )}
      </div>
      <div className="text-center justify-center text-indigo-900 text-2xl font-bold font-['Typold']">
        {label}
      </div>
    </div>
  );
}