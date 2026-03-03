export type FloorObject = {
  id: string;
  type: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  rotation: number;
};

export type TemplatePreset = {
  id: "banquet" | "theater" | "cocktail";
  name: string;
  objects: FloorObject[];
};

export type AssetDefinition = {
  type: string;
  label: string;
  w: number;
  h: number;
  rotation: number;
};

export const TEMPLATE_PRESETS: TemplatePreset[] = [
  {
    id: "banquet",
    name: "Banquet",
    objects: [
      { id: "banquet-stage", type: "stage", label: "Stage", x: 340, y: 40, w: 220, h: 60, rotation: 0 },
      { id: "banquet-dance", type: "dance-floor", label: "Dance Floor", x: 300, y: 220, w: 300, h: 180, rotation: 0 },
      { id: "banquet-bar", type: "bar", label: "Bar", x: 660, y: 80, w: 180, h: 60, rotation: 0 },
      { id: "banquet-reg", type: "registration", label: "Registration", x: 60, y: 80, w: 180, h: 60, rotation: 0 },
      { id: "banquet-table-1", type: "round-table", label: "Round Table", x: 80, y: 220, w: 110, h: 110, rotation: 0 },
      { id: "banquet-table-2", type: "round-table", label: "Round Table", x: 700, y: 220, w: 110, h: 110, rotation: 0 },
      { id: "banquet-table-3", type: "round-table", label: "Round Table", x: 80, y: 400, w: 110, h: 110, rotation: 0 },
      { id: "banquet-table-4", type: "round-table", label: "Round Table", x: 700, y: 400, w: 110, h: 110, rotation: 0 }
    ]
  },
  {
    id: "theater",
    name: "Theater",
    objects: [
      { id: "theater-stage", type: "stage", label: "Stage", x: 320, y: 40, w: 260, h: 70, rotation: 0 },
      { id: "theater-av", type: "av-booth", label: "AV Booth", x: 380, y: 500, w: 140, h: 60, rotation: 0 },
      { id: "theater-seating-left", type: "seating-block", label: "Seating Block", x: 80, y: 150, w: 330, h: 330, rotation: 0 },
      { id: "theater-seating-right", type: "seating-block", label: "Seating Block", x: 490, y: 150, w: 330, h: 330, rotation: 0 },
      { id: "theater-aisle", type: "aisle", label: "Center Aisle", x: 420, y: 150, w: 60, h: 330, rotation: 0 }
    ]
  },
  {
    id: "cocktail",
    name: "Cocktail",
    objects: [
      { id: "cocktail-bar", type: "bar", label: "Bar", x: 620, y: 60, w: 220, h: 70, rotation: 0 },
      { id: "cocktail-av", type: "av-booth", label: "AV Booth", x: 620, y: 500, w: 160, h: 60, rotation: 0 },
      { id: "cocktail-reg", type: "registration", label: "Registration", x: 60, y: 60, w: 180, h: 60, rotation: 0 },
      { id: "cocktail-lounge-1", type: "lounge", label: "Lounge", x: 120, y: 220, w: 170, h: 100, rotation: 0 },
      { id: "cocktail-lounge-2", type: "lounge", label: "Lounge", x: 560, y: 250, w: 170, h: 100, rotation: 0 },
      { id: "cocktail-cocktail-1", type: "cocktail-table", label: "Cocktail Table", x: 320, y: 150, w: 80, h: 80, rotation: 0 },
      { id: "cocktail-cocktail-2", type: "cocktail-table", label: "Cocktail Table", x: 460, y: 430, w: 80, h: 80, rotation: 0 },
      { id: "cocktail-cocktail-3", type: "cocktail-table", label: "Cocktail Table", x: 760, y: 260, w: 80, h: 80, rotation: 0 }
    ]
  }
];

export const ASSET_LIBRARY: AssetDefinition[] = [
  { type: "round-table", label: "Round Table", w: 110, h: 110, rotation: 0 },
  { type: "rect-table", label: "Rect Table", w: 150, h: 80, rotation: 0 },
  { type: "chair", label: "Chair", w: 40, h: 40, rotation: 0 },
  { type: "stage", label: "Stage", w: 220, h: 70, rotation: 0 },
  { type: "bar", label: "Bar", w: 180, h: 60, rotation: 0 },
  { type: "av-booth", label: "AV Booth", w: 140, h: 60, rotation: 0 },
  { type: "dance-floor", label: "Dance Floor", w: 260, h: 160, rotation: 0 },
  { type: "registration", label: "Registration", w: 180, h: 60, rotation: 0 }
];
