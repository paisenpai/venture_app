import { useStreakChart } from "../../hooks/useStreakChart"

const StreakChart = () => {
  const { chartPath, chartPoints, loading } = useStreakChart()

  if (loading) {
    return (
      <div className="h-60 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  return (
    <div className="h-60 relative mb-2">
      <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
        {/* Grid lines */}
        <line x1="0" y1="40" x2="400" y2="40" stroke="#f0f0f0" strokeWidth="1" />
        <line x1="0" y1="80" x2="400" y2="80" stroke="#f0f0f0" strokeWidth="1" />
        <line x1="0" y1="120" x2="400" y2="120" stroke="#f0f0f0" strokeWidth="1" />
        <line x1="0" y1="160" x2="400" y2="160" stroke="#f0f0f0" strokeWidth="1" />

        {/* Chart line */}
        <path
          d={chartPath}
          fill="none"
          stroke="#4338ca"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* Data points */}
        {chartPoints.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#4338ca"
            className="hover:r-6 transition-all duration-200"
          />
        ))}
      </svg>

      {/* Tooltip for points would go here */}
    </div>
  )
}

export default StreakChart
