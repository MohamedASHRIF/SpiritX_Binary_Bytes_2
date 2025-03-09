import { Trophy, TrendingUp, Users } from 'lucide-react';
import { cn } from '../lib/utils';

// Mock leaderboard data - replace with actual API data later
const mockLeaderboard = [
  {
    rank: 1,
    name: 'John Doe',
    points: 2500,
    teamName: 'Thunder Warriors',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop',
  },
  {
    rank: 2,
    name: 'Jane Smith',
    points: 2450,
    teamName: 'Lightning Kings',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop',
  },
  // Add more mock entries...
];

export function Leaderboard() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-24 md:pt-4">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Leaderboard</h1>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex items-center mb-2">
                  <stat.icon className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="font-semibold text-gray-600">{stat.title}</h3>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Player
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Team Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Points
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockLeaderboard.map((entry) => (
                    <tr
                      key={entry.rank}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span
                            className={cn(
                              'flex items-center justify-center w-8 h-8 rounded-full font-semibold',
                              entry.rank === 1
                                ? 'bg-yellow-100 text-yellow-800'
                                : entry.rank === 2
                                ? 'bg-gray-100 text-gray-800'
                                : entry.rank === 3
                                ? 'bg-orange-100 text-orange-800'
                                : 'text-gray-600'
                            )}
                          >
                            {entry.rank}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={entry.avatar}
                            alt=""
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {entry.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {entry.teamName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-blue-600">
                          {entry.points}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const stats = [
  {
    icon: Trophy,
    title: 'Top Score',
    value: '2,500',
  },
  {
    icon: Users,
    title: 'Total Players',
    value: '1,234',
  },
  {
    icon: TrendingUp,
    title: 'Average Score',
    value: '1,850',
  },
];