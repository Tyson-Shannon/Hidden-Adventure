import { create } from "zustand";

export interface Room {
  id: string;
  label: string;
  points: number[];
  visible: boolean;
}

interface MapState {
  mapImage: string | null;

  rooms: Room[];

  setMapImage: (image: string | null) => void;

  addRoom: (room: Room) => void;
}

export const useMapStore = create<MapState>((set) => ({
  mapImage: null,

  rooms: [],

  setMapImage: (image) =>
    set({
      mapImage: image,
    }),

  addRoom: (room) =>
    set((state) => ({
      rooms: [...state.rooms, room],
    })),
}));

