import { Player } from '../store/teamSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addPlayer, removePlayer } from '../store/teamSlice';
import { RootState } from '../store/store';
import { cn } from '../lib/utils';

interface PlayerCardProps {
  player: Player;
  mode?: 'select' | 'view';
}

export function PlayerCard({ player, mode = 'view' }: PlayerCardProps) {
  const dispatch = useDispatch();
  const { selectedPlayers, budget } = useSelector(
    (state: RootState) => state.team
  );

  const isSelected = selectedPlayers.some((p) => p.id === player.id);
  const canSelect =
    !isSelected &&
    selectedPlayers.length < 11 &&
    budget >= player.price &&
    mode === 'select';

  const handleTogglePlayer = () => {
    if (isSelected) {
      dispatch(removePlayer(player.id));
    } else if (canSelect) {
      dispatch(addPlayer(player));
    }
  };

  return (
    <div
      className={cn(
        'relative bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]',
        isSelected && 'ring-2 ring-blue-500'
      )}
    >
      <div className="aspect-[3/4] relative">
        <img
          src={player.image}
          alt={player.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-white font-semibold text-lg">{player.name}</h3>
          <p className="text-white/90 text-sm">{player.team}</p>
        </div>
      </div>
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">{player.role}</span>
          <span className="font-semibold text-blue-600">{player.points} pts</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Price</span>
          <span className="font-semibold">{player.price} cr</span>
        </div>
        {mode === 'select' && (
          <button
            onClick={handleTogglePlayer}
            disabled={!canSelect && !isSelected}
            className={cn(
              'w-full py-2 px-4 rounded-md font-medium transition-colors',
              isSelected
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : canSelect
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            )}
          >
            {isSelected ? 'Remove' : 'Select'}
          </button>
        )}
      </div>
    </div>
  );
}