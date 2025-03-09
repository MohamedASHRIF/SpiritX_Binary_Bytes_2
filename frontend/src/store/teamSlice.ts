// src/store/teamSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Player {
  id: string;
  name: string;
  role: 'Batsman' | 'Bowler' | 'All-Rounder' | 'Wicket-Keeper';
  team: string;
  price: number;
  points: number;
  image: string;
}

interface TeamState {
  selectedPlayers: Player[];
  budget: number;
  maxPlayers: number;
}

const initialState: TeamState = {
  selectedPlayers: [],
  budget: 100, // 100 credit points
  maxPlayers: 11,
};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    addPlayer: (state, action: PayloadAction<Player>) => {
      if (
        state.selectedPlayers.length < state.maxPlayers &&
        state.budget >= action.payload.price &&
        !state.selectedPlayers.find((p) => p.id === action.payload.id)
      ) {
        state.selectedPlayers.push(action.payload);
        state.budget -= action.payload.price;
      }
    },
    removePlayer: (state, action: PayloadAction<string>) => {
      const player = state.selectedPlayers.find((p) => p.id === action.payload);
      if (player) {
        state.selectedPlayers = state.selectedPlayers.filter(
          (p) => p.id !== action.payload
        );
        state.budget += player.price;
      }
    },
    resetTeam: (state) => {
      state.selectedPlayers = [];
      state.budget = 100;
    },
  },
});

export const { addPlayer, removePlayer, resetTeam } = teamSlice.actions;
export default teamSlice.reducer;
