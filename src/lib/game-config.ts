export type ItemCategory = "crop" | "animal" | "fish" | "mineral" | "processed" | "supply";

export type ItemDefinition = {
  key: string;
  name: string;
  shortName?: string;
  category: ItemCategory;
  icon?: string;
  basePrice: number;
  description: string;
};

export const ITEMS: Record<string, ItemDefinition> = {
  carrot: { key: "carrot", name: "Морковь", category: "crop", basePrice: 7, description: "Хрустящий урожай с грядки" },
  wheat: { key: "wheat", name: "Пшеница", category: "crop", basePrice: 6, description: "Основа корма и городских заказов" },
  tomato: { key: "tomato", name: "Помидор", category: "crop", basePrice: 16, description: "Сочный овощ для сока" },
  cabbage: { key: "cabbage", name: "Капуста", category: "crop", basePrice: 22, description: "Подходит для квашения" },
  strawberry: { key: "strawberry", name: "Клубника", category: "crop", basePrice: 21, description: "Ягода для ароматного варенья" },
  egg: { key: "egg", name: "Яйца", category: "animal", basePrice: 15, description: "Свежие яйца из курятника" },
  milk: { key: "milk", name: "Молоко", category: "animal", basePrice: 24, description: "Используется для сыра" },
  wool: { key: "wool", name: "Шерсть", category: "animal", basePrice: 36, description: "Мягкая овечья шерсть" },
  truffle: { key: "truffle", name: "Трюфель", category: "animal", basePrice: 85, description: "Раритет, найденный пиг" },
  carp: { key: "carp", name: "Карп", category: "fish", basePrice: 18, description: "Рыба из пруда или удочки" },
  trout: { key: "trout", name: "Форель", category: "fish", basePrice: 32, description: "Ценная речная рыба" },
  catfish: { key: "catfish", name: "Сом", category: "fish", basePrice: 44, description: "Крупная рыба из садка" },
  sturgeon: { key: "sturgeon", name: "Осётр", category: "fish", basePrice: 70, description: "Редкая порода для садка" },
  pike: { key: "pike", name: "Щука", category: "fish", basePrice: 48, description: "Хищный трофей рыбака" },
  golden_fish: { key: "golden_fish", name: "Золотая рыбка", category: "fish", basePrice: 160, description: "Очень редкий улов" },
  stone: { key: "stone", name: "Камень", category: "mineral", basePrice: 5, description: "Строительный материал" },
  coal: { key: "coal", name: "Уголь", category: "mineral", basePrice: 12, description: "Топливо из глубоких шахт" },
  copper: { key: "copper", name: "Медь", category: "mineral", basePrice: 25, description: "Руда тёплого оттенка" },
  iron: { key: "iron", name: "Железо", category: "mineral", basePrice: 42, description: "Прочная руда" },
  gold: { key: "gold", name: "Золото", category: "mineral", basePrice: 90, description: "Редкий самородок" },
  pickles: { key: "pickles", name: "Квашеная капуста", shortName: "Капуста в кадке", category: "processed", basePrice: 62, description: "Заготовка из погреба" },
  cheese: { key: "cheese", name: "Сыр", category: "processed", basePrice: 78, description: "Выдержанный фермерский сыр" },
  jam: { key: "jam", name: "Варенье", category: "processed", basePrice: 76, description: "Клубничное варенье" },
  juice: { key: "juice", name: "Томатный сок", shortName: "Сок", category: "processed", basePrice: 70, description: "Густой домашний сок" },
  carrot_seed: { key: "carrot_seed", name: "Семена моркови", shortName: "Семена: морковь", category: "supply", basePrice: 8, description: "Для посадки на грядке" },
  wheat_seed: { key: "wheat_seed", name: "Семена пшеницы", shortName: "Семена: пшеница", category: "supply", basePrice: 12, description: "Для посадки на грядке" },
  tomato_seed: { key: "tomato_seed", name: "Семена томатов", shortName: "Семена: томат", category: "supply", basePrice: 18, description: "Для посадки на грядке" },
  cabbage_seed: { key: "cabbage_seed", name: "Семена капусты", shortName: "Семена: капуста", category: "supply", basePrice: 25, description: "Для посадки на грядке" },
  strawberry_seed: { key: "strawberry_seed", name: "Семена клубники", shortName: "Семена: клубника", category: "supply", basePrice: 40, description: "Для посадки на грядке" },
  feed: { key: "feed", name: "Комбикорм", category: "supply", basePrice: 10, description: "Корм для загонов и прудов" },
  compound_feed: { key: "compound_feed", name: "Рыбный корм", category: "supply", basePrice: 18, description: "Питательный корм для садков" },
  carp_fry: { key: "carp_fry", name: "Малёк карпа", category: "supply", basePrice: 20, description: "Запускается в пруд" },
  trout_fry: { key: "trout_fry", name: "Малёк форели", category: "supply", basePrice: 32, description: "Запускается в пруд" },
  catfish_fry: { key: "catfish_fry", name: "Малёк сома", category: "supply", basePrice: 45, description: "Запускается в садок" },
  sturgeon_fry: { key: "sturgeon_fry", name: "Малёк осетра", category: "supply", basePrice: 70, description: "Запускается в садок" },
  pickaxe: { key: "pickaxe", name: "Алмазная кирка", shortName: "Кирка", category: "supply", basePrice: 35, description: "Один заряд для Алмазной шахты" },
  honey_cake: { key: "honey_cake", name: "Медовик", category: "supply", basePrice: 45, description: "Восстанавливает 12 энергии" },
  potato: { key: "potato", name: "Картофель", category: "crop", basePrice: 12, description: "Второй хлеб на ферме" },
  cucumber: { key: "cucumber", name: "Огурец", category: "crop", basePrice: 18, description: "Хрустящий и свежий" },
  corn: { key: "corn", name: "Кукуруза", category: "crop", basePrice: 26, description: "Золотые початки" },
  pumpkin: { key: "pumpkin", name: "Тыква", category: "crop", basePrice: 40, description: "Символ осеннего урожая" },
  onion: { key: "onion", name: "Лук", category: "crop", basePrice: 14, description: "Острый и полезный" },
  pepper: { key: "pepper", name: "Перец", category: "crop", basePrice: 30, description: "Яркий сладкий перец" },
  potato_seed: { key: "potato_seed", name: "Клубни картофеля", shortName: "Семена: картофель", category: "supply", basePrice: 14, description: "Для посадки на грядке" },
  cucumber_seed: { key: "cucumber_seed", name: "Семена огурцов", shortName: "Семена: огурец", category: "supply", basePrice: 20, description: "Для посадки на грядке" },
  corn_seed: { key: "corn_seed", name: "Семена кукурузы", shortName: "Семена: кукуруза", category: "supply", basePrice: 30, description: "Для посадки на грядке" },
  pumpkin_seed: { key: "pumpkin_seed", name: "Семена тыквы", shortName: "Семена: тыква", category: "supply", basePrice: 46, description: "Для посадки на грядке" },
  onion_seed: { key: "onion_seed", name: "Семена лука", shortName: "Семена: лук", category: "supply", basePrice: 16, description: "Для посадки на грядке" },
  pepper_seed: { key: "pepper_seed", name: "Семена перца", shortName: "Семена: перец", category: "supply", basePrice: 34, description: "Для посадки на грядке" },
  crucian: { key: "crucian", name: "Карась", category: "fish", basePrice: 22, description: "Золотистая рыбка пруда" },
  perch: { key: "perch", name: "Окунь", category: "fish", basePrice: 26, description: "Полосатый обитатель пруда" },
  eel: { key: "eel", name: "Угорь", category: "fish", basePrice: 60, description: "Скользкий деликатес" },
  salmon: { key: "salmon", name: "Лосось", category: "fish", basePrice: 78, description: "Розовое сокровище садка" },
  crucian_fry: { key: "crucian_fry", name: "Малёк карася", category: "supply", basePrice: 22, description: "Запускается в пруд" },
  perch_fry: { key: "perch_fry", name: "Малёк окуня", category: "supply", basePrice: 26, description: "Запускается в пруд" },
  eel_fry: { key: "eel_fry", name: "Малёк угря", category: "supply", basePrice: 60, description: "Запускается в садок" },
  salmon_fry: { key: "salmon_fry", name: "Малёк лосося", category: "supply", basePrice: 75, description: "Запускается в садок" },
  duck_egg: { key: "duck_egg", name: "Утиное яйцо", category: "animal", basePrice: 22, description: "Крупное и питательное" },
  feather: { key: "feather", name: "Пух и перо", category: "animal", basePrice: 28, description: "Для подушек и нарядов" },
  fur: { key: "fur", name: "Мех", category: "animal", basePrice: 40, description: "Мягкий кроличий мех" },
  goat_milk: { key: "goat_milk", name: "Козье молоко", category: "animal", basePrice: 30, description: "Основа для сыров" },
  honey: { key: "honey", name: "Мёд", category: "animal", basePrice: 55, description: "С пасеки долины" },
  meat: { key: "meat", name: "Мясо птицы", category: "animal", basePrice: 48, description: "Фермерская птица" },
  bread: { key: "bread", name: "Хлеб", category: "processed", basePrice: 70, description: "Свежая буханка из печи" },
  butter: { key: "butter", name: "Масло", category: "processed", basePrice: 64, description: "Сбитое из сливок" },
  soup: { key: "soup", name: "Уха", category: "processed", basePrice: 96, description: "Наваристая рыбацкая похлёбка" },
  pie: { key: "pie", name: "Тыквенный пирог", category: "processed", basePrice: 120, description: "Гордость осенней ярмарки" },
};

export type CropConfig = { name: string; seed: string; duration: number; yield: number; xp: number; level: number; color: string };
export const CROPS: Record<string, CropConfig> = {
  carrot: { name: "Морковь", seed: "carrot_seed", duration: 15_000, yield: 2, xp: 9, level: 1, color: "#f4933c" },
  wheat: { name: "Пшеница", seed: "wheat_seed", duration: 25_000, yield: 3, xp: 11, level: 1, color: "#e0b744" },
  onion: { name: "Лук", seed: "onion_seed", duration: 20_000, yield: 2, xp: 12, level: 1, color: "#c9a4d8" },
  potato: { name: "Картофель", seed: "potato_seed", duration: 35_000, yield: 3, xp: 15, level: 2, color: "#c39158" },
  tomato: { name: "Помидор", seed: "tomato_seed", duration: 40_000, yield: 2, xp: 15, level: 2, color: "#ec6a51" },
  cucumber: { name: "Огурец", seed: "cucumber_seed", duration: 45_000, yield: 2, xp: 18, level: 2, color: "#6aa84f" },
  pepper: { name: "Перец", seed: "pepper_seed", duration: 55_000, yield: 2, xp: 22, level: 3, color: "#e05a45" },
  cabbage: { name: "Капуста", seed: "cabbage_seed", duration: 60_000, yield: 2, xp: 19, level: 3, color: "#8fbe63" },
  corn: { name: "Кукуруза", seed: "corn_seed", duration: 75_000, yield: 2, xp: 26, level: 4, color: "#e8c047" },
  strawberry: { name: "Клубника", seed: "strawberry_seed", duration: 90_000, yield: 3, xp: 26, level: 4, color: "#e05a67" },
  pumpkin: { name: "Тыква", seed: "pumpkin_seed", duration: 120_000, yield: 1, xp: 38, level: 5, color: "#e88c3f" },
};
export type CropKey = keyof typeof CROPS;

export const POND_SPECIES = {
  carp: { name: "Карп", fry: "carp_fry", duration: 45_000, yield: 2, xp: 15, level: 1 },
  crucian: { name: "Карась", fry: "crucian_fry", duration: 60_000, yield: 2, xp: 18, level: 2 },
  trout: { name: "Форель", fry: "trout_fry", duration: 70_000, yield: 2, xp: 22, level: 3 },
  perch: { name: "Окунь", fry: "perch_fry", duration: 80_000, yield: 2, xp: 24, level: 4 },
} as const;

export const CAGE_SPECIES = {
  catfish: { name: "Сом", fry: "catfish_fry", duration: 60_000, yield: 2, xp: 22, level: 1 },
  sturgeon: { name: "Осётр", fry: "sturgeon_fry", duration: 95_000, yield: 2, xp: 32, level: 3 },
  eel: { name: "Угорь", fry: "eel_fry", duration: 110_000, yield: 2, xp: 38, level: 4 },
  salmon: { name: "Лосось", fry: "salmon_fry", duration: 140_000, yield: 1, xp: 48, level: 5 },
} as const;

export const ANIMALS = {
  chicken: { name: "Куры", product: "egg", feed: 1, duration: 30_000, yield: 2, xp: 13, level: 1 },
  cow: { name: "Коровы", product: "milk", feed: 2, duration: 60_000, yield: 2, xp: 22, level: 2 },
  duck: { name: "Утки", product: "duck_egg", feed: 1, duration: 40_000, yield: 2, xp: 16, level: 2 },
  rabbit: { name: "Кролики", product: "fur", feed: 2, duration: 55_000, yield: 1, xp: 22, level: 3 },
  goat: { name: "Козы", product: "goat_milk", feed: 2, duration: 65_000, yield: 2, xp: 26, level: 3 },
  sheep: { name: "Овцы", product: "wool", feed: 2, duration: 75_000, yield: 2, xp: 26, level: 4 },
  turkey: { name: "Индюки", product: "meat", feed: 2, duration: 85_000, yield: 1, xp: 30, level: 4 },
  goose: { name: "Гуси", product: "feather", feed: 2, duration: 90_000, yield: 2, xp: 28, level: 5 },
  pig: { name: "Свиньи", product: "truffle", feed: 3, duration: 90_000, yield: 1, xp: 34, level: 5 },
  bee: { name: "Пчёлы", product: "honey", feed: 1, duration: 100_000, yield: 2, xp: 32, level: 6 },
} as const;

export type Recipe = { name: string; inputs: Record<string, number>; output: string; amount: number; duration: number; xp: number; level: number };
export const RECIPES: Record<string, Recipe> = {
  feed: { name: "Рыбный корм", inputs: { wheat: 3 }, output: "compound_feed", amount: 3, duration: 25_000, xp: 8, level: 1 },
  juice: { name: "Томатный сок", inputs: { tomato: 3 }, output: "juice", amount: 1, duration: 40_000, xp: 20, level: 2 },
  pickles: { name: "Квашеная капуста", inputs: { cabbage: 2 }, output: "pickles", amount: 1, duration: 45_000, xp: 24, level: 3 },
  cheese: { name: "Фермерский сыр", inputs: { milk: 2 }, output: "cheese", amount: 1, duration: 55_000, xp: 28, level: 2 },
  jam: { name: "Клубничное варенье", inputs: { strawberry: 2 }, output: "jam", amount: 1, duration: 60_000, xp: 30, level: 4 },
  bread: { name: "Домашний хлеб", inputs: { wheat: 3 }, output: "bread", amount: 1, duration: 50_000, xp: 22, level: 2 },
  butter: { name: "Сливочное масло", inputs: { milk: 2 }, output: "butter", amount: 1, duration: 45_000, xp: 24, level: 3 },
  soup: { name: "Рыбацкая уха", inputs: { perch: 1, potato: 2 }, output: "soup", amount: 1, duration: 70_000, xp: 34, level: 3 },
  pie: { name: "Тыквенный пирог", inputs: { pumpkin: 1, egg: 2 }, output: "pie", amount: 1, duration: 90_000, xp: 46, level: 5 },
};

export const MINES = {
  copper: { name: "Медная шахта", energy: 4, level: 1, xp: 10, loot: [["stone", 35], ["coal", 30], ["copper", 35]] as const },
  iron: { name: "Железная шахта", energy: 6, level: 2, xp: 16, loot: [["stone", 25], ["coal", 25], ["copper", 20], ["iron", 30]] as const },
  gold: { name: "Золотая шахта", energy: 8, level: 4, xp: 24, loot: [["coal", 25], ["iron", 35], ["gold", 25], ["stone", 15]] as const },
} as const;

export const JOBS = {
  courier: { name: "Курьер рынка", description: "Доставить корзины торговцам", duration: 30_000, energy: 5, coins: 65, xp: 20, level: 1 },
  milkmaid: { name: "Помощник сыроварни", description: "Перебрать молочные бидоны", duration: 45_000, energy: 7, coins: 95, xp: 28, level: 2 },
  geologist: { name: "Горный геолог", description: "Разметить безопасную жилу", duration: 60_000, energy: 9, coins: 135, xp: 38, level: 3 },
  beekeeper: { name: "Помощник пасечника", description: "Проверить ульи на дальней пасеке", duration: 75_000, energy: 8, coins: 160, xp: 42, level: 4 },
  fishmonger: { name: "Продавец рыбы", description: "Разложить улов на утреннем рынке", duration: 55_000, energy: 6, coins: 115, xp: 30, level: 3 },
} as const;

export const SHOP_KEYS = [
  "carrot_seed", "wheat_seed", "onion_seed", "potato_seed", "tomato_seed", "cucumber_seed",
  "pepper_seed", "cabbage_seed", "corn_seed", "strawberry_seed", "pumpkin_seed",
  "feed", "compound_feed", "carp_fry", "crucian_fry", "trout_fry", "perch_fry",
  "catfish_fry", "sturgeon_fry", "eel_fry", "salmon_fry", "pickaxe", "honey_cake",
];

export const NEWS = [
  { id: "welcome", tag: "Долина", title: "Новый сезон на Тихой ферме", body: "Грядки, пруды и мастерская снова открыты. Город обновил заказы, а на рынке цены меняются каждый час. Начните с моркови: полив ускоряет созревание на четверть." },
  { id: "fishing", tag: "Гид", title: "Как поймать редкую рыбу", body: "После заброса следите за поплавком. Нажмите «Подсечь», когда бегунок окажется внутри светлой зоны. Чем точнее попадание, тем выше шанс двойного улова." },
  { id: "elysium", tag: "Элизиум", title: "Свет Элизиума для каждого фермера", body: "С третьего уровня доступны ритуалы Элизиума. Выберите благословение урожая, энергии или торговли. Пять частиц эфира можно обменять на постоянное увеличение запаса энергии." },
];

export const PROMOTIONS = [
  { id: "starter", name: "Набор огородника", description: "По 4 семени моркови и пшеницы, 3 корма", gems: 2, items: { carrot_seed: 4, wheat_seed: 4, feed: 3 }, coins: 0 },
  { id: "angler", name: "Набор рыбака", description: "Мальки карпа и сома, 2 кирки", gems: 3, items: { carp_fry: 2, catfish_fry: 2, pickaxe: 2 }, coins: 0 },
  { id: "merchant", name: "Капитал торговца", description: "250 монет и медовик для экспедиции", gems: 4, items: { honey_cake: 1 }, coins: 250 },
];

export const BLESSINGS = {
  harvest: { name: "Щедрая земля", description: "+1 к урожаю каждой грядки на 5 минут" },
  energy: { name: "Лёгкое дыхание", description: "Энергия восстанавливается вдвое быстрее 5 минут" },
  fortune: { name: "Золотой ветер", description: "+15% к цене прямой продажи на 5 минут" },
} as const;

export function xpNeeded(level: number) {
  return 60 + (level - 1) * 45;
}

// Настраиваемые из админки глобальные параметры и лимиты улучшений.
export const GLOBALS: Record<string, number> = { barnBase: 60, barnPerLevel: 40, energyRegenSec: 20, energyUpgradeBonus: 5, maxLevel: 100 };

export type UpgradeMeta = { name: string; description: string; max: number; baseCost: number; mult: number; unit: string };
export const UPGRADES: Record<string, UpgradeMeta> = {
  barn: { name: "Амбар", description: "Больше места для запасов", max: 8, baseCost: 220, mult: 1.55, unit: "ур." },
  garden: { name: "Новая грядка", description: "Ещё одна грядка в огороде", max: 10, baseCost: 180, mult: 1.55, unit: "шт." },
  pond: { name: "Новый пруд", description: "Дополнительный водоём", max: 4, baseCost: 260, mult: 1.55, unit: "шт." },
  pen: { name: "Новый загон", description: "Параллельный цикл животных", max: 4, baseCost: 280, mult: 1.55, unit: "шт." },
  cage: { name: "Новый садок", description: "Для крупных пород рыбы", max: 3, baseCost: 340, mult: 1.55, unit: "шт." },
  cellar: { name: "Полки погреба", description: "+1 одновременный рецепт", max: 4, baseCost: 320, mult: 1.55, unit: "ур." },
  energy: { name: "Дом фермера", description: "Больше максимальной энергии", max: 8, baseCost: 300, mult: 1.55, unit: "ур." },
};

export function barnCapacity(level: number) {
  return GLOBALS.barnBase + level * GLOBALS.barnPerLevel;
}

export function inventoryVolume(inventory: Record<string, number>) {
  return Object.values(inventory).reduce((sum, amount) => sum + Math.max(0, amount), 0);
}

export function marketPrice(itemKey: string, date = new Date()) {
  const base = ITEMS[itemKey]?.basePrice ?? 1;
  const day = Math.floor(date.getTime() / 86_400_000);
  const hour = date.getUTCHours();
  const wave = Math.sin(day * 1.71 + hour * 0.83 + itemKey.length * 1.19);
  const pulse = Math.cos(day * 0.37 + hour * 1.43 + itemKey.charCodeAt(0));
  return Math.max(1, Math.round(base * (0.9 + wave * 0.12 + pulse * 0.06)));
}

export function upgradeCost(kind: string, current: number) {
  const meta = UPGRADES[kind];
  return Math.round((meta?.baseCost ?? 250) * Math.pow(meta?.mult ?? 1.55, Math.max(0, current - 1)));
}

export function dayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function fishingCursor(startedAt: number, period: number, now: number) {
  const phase = (((now - startedAt) / period) % 2 + 2) % 2;
  return phase <= 1 ? phase : 2 - phase;
}
