import type { AppState } from '../store'
import { PlayersProp } from '@/types/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PlayersSlice {
  totalPlayers: PlayersProp[],
  players: PlayersProp[],
  total: number,
  page: number,
  limit: number
}

const initialState: PlayersSlice = {
  totalPlayers: [],
  players: [],
  total: 0,
  page: 0,
  limit: 10,
}

export const appSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setPlayersArray: (state, action: PayloadAction<PlayersProp[]>) => {
      state.totalPlayers = action.payload
      state.total = state.totalPlayers.length
      if(state.total > 0) {
        console.log(state.total)
        if(state.totalPlayers.length > state.limit) {
          console.log(state.total)
          state.players = state.totalPlayers.slice(0, state.limit);
          console.log(state.players)
        } else {
          state.players = state.totalPlayers
        }
      }
    },
    nextPage: () => {
      
    }
  }
})

export const { setPlayersArray } = appSlice.actions

export const getPlayers = (state: AppState) => state.players.players

export default appSlice.reducer