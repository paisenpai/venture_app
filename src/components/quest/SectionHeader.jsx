const SectionHeader = ({ title, count, bgColor, textColor }) => (
    <div className="flex items-center gap-3 mb-6">
        <div
            className={`w-8 h-8 ${bgColor} rounded-full shadow-md flex justify-center items-center`}
            aria-label={`Section count: ${count}`}
        >
            <span className="text-white text-xl font-bold font-['Typold']">
                {count}
            </span>
        </div>
        <h2
            className={`text-3xl font-bold font-['Typold'] ${textColor}`}
            aria-label={`Section title: ${title}`}
        >
            {title}
        </h2>
        <div className="flex-1">
            <hr className="border-t border-gray-300" />
        </div>
    </div>
);

export default SectionHeader;