"use client"
import { useNavigate } from "react-router-dom"
import PageHeader from "../components/ui/PageHeader"
import { useTheme } from "../contexts/ThemeContext"
import { useAuth } from "../contexts/AuthContext"
import { useProfile, useUserStats, useAchievements } from "../hooks/useDatabase"
import AchievementCard from "../components/character/AchievementCard"

// Demo data for demo user
const demoCharacterData = {
  username: "Demo Adventurer",
  totalXP: "1,250",
  level: 8,
  achievements: [
    {
      id: 1,
      name: "First Steps",
      stars: 1,
      unlocked: true,
      icon: "🏃",
    },
    {
      id: 2,
      name: "Rising Star",
      stars: 2,
      unlocked: true,
      icon: "⭐",
    },
    {
      id: 3,
      name: "Skilled Adventurer",
      stars: 3,
      unlocked: false,
      icon: "🗡️",
    },
    {
      id: 4,
      name: "XP Collector",
      stars: 1,
      unlocked: true,
      icon: "💰",
    },
    {
      id: 5,
      name: "Consistent Student",
      stars: 2,
      unlocked: false,
      icon: "📖",
    },
    {
      id: 6,
      name: "Rookie Adventurer",
      stars: 1,
      unlocked: true,
      icon: "🏃",
    },
  ],
}

const Character = () => {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const { user } = useAuth()
  const isDemoUser = user?.id === "demo-user-123"

  const { profile, loading: profileLoading } = useProfile()
  const { stats, loading: statsLoading } = useUserStats()
  const { achievements, userAchievements, loading: achievementsLoading } = useAchievements()

  // Use demo data for demo user
  const characterData = isDemoUser
    ? demoCharacterData
    : {
        username: profile?.username || profile?.full_name || "Adventurer",
        totalXP: stats?.total_xp?.toLocaleString() || "0",
        level: stats?.level || 1,
        achievements:
          achievements.map((achievement) => {
            const userAchievement = userAchievements.find((ua) => ua.achievement_id === achievement.id)
            return {
              id: achievement.id,
              name: achievement.name,
              stars: Math.min(3, Math.max(1, Math.floor(achievement.xp_reward / 100))), // Convert XP to stars
              unlocked: !!userAchievement,
              icon: achievement.icon || "🏆",
            }
          }) || [],
      }

  const loading = !isDemoUser && (profileLoading || statsLoading || achievementsLoading)

  if (loading) {
    return (
      <div className="w-full pl-[5%] pr-0">
        <PageHeader
          title="Character"
          variant="standard"
          size="large"
          className="mb-2 pb-1 border-b border-gray-200 dark:border-gray-700"
        />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full pl-[5%] pr-0">
      <PageHeader
        title="Character"
        variant="standard"
        size="large"
        className="mb-2 pb-1 border-b border-gray-200 dark:border-gray-700"
      />

      {/* Character Profile Section - Much Larger */}
      <div className="mb-10">
        <div className="flex items-center gap-8">
          {/* Much Larger Avatar */}
          <div className="w-36 h-36 rounded-full overflow-hidden border-3 border-pink-300">
            <img
              src={profile?.avatar_url || "https://placehold.co/144x144"}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Much Larger info container */}
          <div className="flex-1 h-36 flex flex-col pl-6">
            {/* Frame that matches larger avatar height */}
            <div className="h-36 w-full flex flex-col justify-between py-4">
              {/* Username */}
              <h2 className="text-2xl font-bold text-indigo-800 dark:text-indigo-300">{characterData.username}</h2>

              {/* Stats - Two-row layout with right padding */}
              <div className="flex flex-col gap-y-2 pr-[8%]">
                <div className="flex items-center">
                  <span className="text-grey-700 dark:text-grey-400 text-lg w-32 pr-4">TOTAL XP</span>
                  <span className="text-indigo-900 dark:text-indigo-300 text-lg font-bold">
                    {characterData.totalXP}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-grey-700 dark:text-grey-400 text-lg w-32 pr-4">Level</span>
                  <span className="text-indigo-900 dark:text-indigo-300 text-lg font-bold">{characterData.level}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-300 mr-4">Achievements</h3>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
        </div>

        {characterData.achievements.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No achievements unlocked yet.</p>
            <p className="text-sm mt-2">Complete quests to earn your first achievements!</p>
          </div>
        ) : (
          <div className="grid grid-rows-2 auto-cols-max gap-3 overflow-x-auto pb-4">
            <div className="flex gap-3">
              {characterData.achievements
                .slice(0, Math.ceil(characterData.achievements.length / 2))
                .map((achievement) => (
                  <AchievementCard key={achievement.id} achievement={achievement} />
                ))}
            </div>
            <div className="flex gap-3">
              {characterData.achievements.slice(Math.ceil(characterData.achievements.length / 2)).map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Character
