const ProgressUpdate = ({ progress = 0, max = 100 }) => {
  const percent = Math.min(100, Math.max(0, (progress / max) * 100));

  return (
    <div
      data-none="false"
      data-state="Default"
      className="w-full h-full px-[2px] py-[1px] bg-[rgba(144,144,144,0.75)] rounded-[20px] inline-flex flex-wrap items-center justify-center gap-[10px] align-middle"
    >
      <div className="w-[90%] h-3 bg-gray-200 rounded-[10px] overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-[10px] transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div
        className="flex flex-col justify-center"
        style={{
          color: '#909090',
          fontSize: 24,
          fontFamily: 'Typold',
          fontWeight: 700,
          wordWrap: 'break-word',
        }}
      >
        {Math.round(percent)}%
      </div>
    </div>
  );
};

export default ProgressUpdate;