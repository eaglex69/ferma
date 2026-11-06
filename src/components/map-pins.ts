import type { ModuleKey } from "./game-types";

export type Pin = { key: ModuleKey; icon: string; label: string; x: number; y: number };

// Координаты (в %) объектов на картинке карты. Верх занят HUD, поэтому метки расположены ниже.
export const PINS: Pin[] = [
  { key: "cellar", icon: "chef", label: "Погреб", x: 14, y: 35 },
  { key: "barn", icon: "barn", label: "Амбар", x: 46, y: 36 },
  { key: "mines", icon: "pickaxe", label: "Шахты", x: 78, y: 43 },
  { key: "garden", icon: "carrot", label: "Огород", x: 24, y: 47 },
  { key: "jobs", icon: "tractor", label: "Работа", x: 62, y: 51 },
  { key: "diamond", icon: "gem", label: "Алмазная", x: 88, y: 55 },
  { key: "workers", icon: "truck", label: "Работники", x: 44, y: 56 },
  { key: "elysium", icon: "wand", label: "Элизиум", x: 12, y: 60 },
  { key: "pens", icon: "bird", label: "Загоны", x: 80, y: 63 },
  { key: "coop", icon: "paw", label: "Кооператив", x: 30, y: 68 },
  { key: "ponds", icon: "duck", label: "Пруды", x: 62, y: 70 },
  { key: "cages", icon: "fish", label: "Садок", x: 88, y: 72 },
  { key: "city", icon: "trophy", label: "Город", x: 12, y: 77 },
  { key: "shop", icon: "package", label: "Магазин", x: 30, y: 82 },
  { key: "bank", icon: "gold", label: "Банк", x: 48, y: 78 },
  { key: "fishing", icon: "fish", label: "Рыбалка", x: 68, y: 82 },
];
