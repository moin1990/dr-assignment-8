import tilesData from "@/data/tiles.json";
import { Tile } from "@/types";

export const getAllTiles = (): Tile[] => {
  return tilesData as Tile[];
};

export const getFeaturedTiles = (): Tile[] => {
  return (tilesData as Tile[]).slice(0, 4);
};

export const getTileById = (id: string): Tile | undefined => {
  return (tilesData as Tile[]).find((tile) => tile.id === id);
};

export const searchTiles = (query: string): Tile[] => {
  const lower = query.toLowerCase();
  return (tilesData as Tile[]).filter(
    (tile) =>
      tile.title.toLowerCase().includes(lower) ||
      tile.category.toLowerCase().includes(lower) ||
      tile.material.toLowerCase().includes(lower)
  );
};
