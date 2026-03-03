import { AssetDefinition } from "@/src/features/floorplan/models/presets";

type AssetPaletteProps = {
  assets: AssetDefinition[];
  onAddAsset: (asset: AssetDefinition) => void;
};

export function AssetPalette({ assets, onAddAsset }: AssetPaletteProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <h2 className="mb-3 text-sm font-semibold text-slate-900">Asset Palette</h2>
      <div className="grid grid-cols-1 gap-2">
        {assets.map((asset) => (
          <button
            key={asset.type}
            type="button"
            onClick={() => onAddAsset(asset)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-50"
          >
            + {asset.label}
          </button>
        ))}
      </div>
    </section>
  );
}
