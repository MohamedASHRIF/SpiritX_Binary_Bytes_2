import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { PlayerCard } from "../components/PlayerCard";
import { Wallet } from "lucide-react";

export function Budget() {
  const { selectedPlayers, budget } = useSelector(
    (state: RootState) => state.team
  );

  const totalSpent = 9000000 - budget;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-24 md:pt-4">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Team Budget</h1>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Wallet className="h-6 w-6 text-blue-600 mr-2" />
                <span className="text-lg font-semibold">Budget Overview</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Budget</span>
                <span className="font-semibold">9000000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Spent</span>
                <span className="font-semibold text-red-600">{totalSpent}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Remaining</span>
                <span className="font-semibold text-green-600">{budget}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${(totalSpent / 100) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Selected Players ({selectedPlayers.length}/11)
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {selectedPlayers.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
