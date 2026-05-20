import { create } from "zustand";

interface MapState {
  mapImage: string | null;
  setMapImage: (image: string | null) => void;
}

export const useMapStore = create<MapState>((set) => ({
  mapImage: null,

  setMapImage: (image) =>
    set({
      mapImage: image,
    }),
}));