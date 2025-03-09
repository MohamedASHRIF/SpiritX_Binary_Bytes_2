import { useState } from 'react';
import { PlayerCard } from '../components/PlayerCard';
import { Search, Filter } from 'lucide-react';

// Mock data - replace with actual API data later
const mockPlayers = [
  {
    id: '1',
    name: 'Virat Kohli',
    role: 'Batsman',
    team: 'RCB',
    price: 12,
    points: 150,
    image: 'https://images.unsplash.com/photo-1624526267942-ab0c0e9ab345?w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Rohit Sharma',
    role: 'Batsman',
    team: 'MI',
    price: 11,
    points: 145,
    image: 'https://images.unsplash.com/photo-1624526267942-ab0c0e9ab345?w=800&auto=format&fit=crop',
  },
  // Add more mock players...
] as const;

export function Players() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('');

  const filteredPlayers = mockPlayers.filter(
    (player) =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedRole || player.role === selectedRole)
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-24 md:pt-4">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Players</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="pl-10 pr-8 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option value="">All Roles</option>
                <option value="Batsman">Batsman</option>
                <option value="Bowler">Bowler</option>
                <option value="All-Rounder">All-Rounder</option>
                <option value="Wicket-Keeper">Wicket-Keeper</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} mode="select" />
          ))}
        </div>
      </div>
    </div>
  );
}