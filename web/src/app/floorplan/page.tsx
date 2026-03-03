"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AssetPalette } from "@/src/features/floorplan/components/AssetPalette";
import { TemplatePicker } from "@/src/features/floorplan/components/TemplatePicker";
import {
  ASSET_LIBRARY,
  AssetDefinition,
  FloorObject,
  TEMPLATE_PRESETS,
  TemplatePreset
} from "@/src/features/floorplan/models/presets";

const CANVAS_W = 900;
const CANVAS_H = 600;
const NUDGE_STEP = 10;

const TYPE_STYLES: Record<string, string> = {
  "round-table": "bg-cyan-100 border-cyan-500",
  "rect-table": "bg-cyan-100 border-cyan-500",
  chair: "bg-zinc-100 border-zinc-500",
  stage: "bg-violet-100 border-violet-600",
  bar: "bg-amber-100 border-amber-600",
  "av-booth": "bg-indigo-100 border-indigo-600",
  "dance-floor": "bg-pink-100 border-pink-600",
  registration: "bg-emerald-100 border-emerald-600",
  "seating-block": "bg-slate-100 border-slate-500",
  aisle: "bg-slate-50 border-slate-300",
  lounge: "bg-orange-100 border-orange-500",
  "cocktail-table": "bg-teal-100 border-teal-500"
};

function cloneTemplate(templateId: TemplatePreset["id"]): FloorObject[] {
  const template = TEMPLATE_PRESETS.find((preset) => preset.id === templateId);

  if (!template) {
    return [];
  }

  const suffix = Date.now().toString();
  return template.objects.map((object, index) => ({
    ...object,
    id: `${object.id}-${suffix}-${index}`
  }));
}

export default function FloorPlanPage() {
  const [activeTemplateId, setActiveTemplateId] = useState<TemplatePreset["id"]>("banquet");
  const [objects, setObjects] = useState<FloorObject[]>(() => cloneTemplate("banquet"));
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [dockImageError, setDockImageError] = useState(false);

  const selectedObject = useMemo(
    () => objects.find((object) => object.id === selectedObjectId) ?? null,
    [objects, selectedObjectId]
  );

  const applyTemplate = (templateId: TemplatePreset["id"]) => {
    setActiveTemplateId(templateId);
    setObjects(cloneTemplate(templateId));
    setSelectedObjectId(null);
  };

  const addAsset = (asset: AssetDefinition) => {
    const id = `${asset.type}-${Date.now()}`;
    const centeredX = Math.max(0, Math.round((CANVAS_W - asset.w) / 2));
    const centeredY = Math.max(0, Math.round((CANVAS_H - asset.h) / 2));

    const newObject: FloorObject = {
      id,
      type: asset.type,
      label: asset.label,
      w: asset.w,
      h: asset.h,
      rotation: asset.rotation,
      x: centeredX,
      y: centeredY
    };

    setObjects((prev) => [...prev, newObject]);
    setSelectedObjectId(id);
  };

  const nudgeSelected = (dx: number, dy: number) => {
    if (!selectedObjectId) {
      return;
    }

    setObjects((prev) =>
      prev.map((object) => {
        if (object.id !== selectedObjectId) {
          return object;
        }

        const nextX = Math.min(Math.max(0, object.x + dx), CANVAS_W - object.w);
        const nextY = Math.min(Math.max(0, object.y + dy), CANVAS_H - object.h);
        return { ...object, x: nextX, y: nextY };
      })
    );
  };

  const rotateSelected = () => {
    if (!selectedObjectId) {
      return;
    }

    setObjects((prev) =>
      prev.map((object) =>
        object.id === selectedObjectId
          ? { ...object, rotation: (object.rotation + 15) % 360 }
          : object
      )
    );
  };

  const deleteSelected = () => {
    if (!selectedObjectId) {
      return;
    }

    setObjects((prev) => prev.filter((object) => object.id !== selectedObjectId));
    setSelectedObjectId(null);
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <div className="mx-auto max-w-[1400px]">
        <header className="mb-4">
          <Link
            href="/"
            className="mb-2 inline-block text-sm text-slate-600 underline-offset-2 hover:underline"
          >
            ← Back to Home
          </Link>
          <h1 className="text-2xl font-semibold">Floor Plan Tool (MVP)</h1>
          <p className="text-sm text-slate-600">
            Template-based layout + quick add/nudge controls for today&apos;s demo.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[260px_1fr_280px]">
          <aside className="space-y-4">
            <TemplatePicker
              templates={TEMPLATE_PRESETS}
              activeTemplateId={activeTemplateId}
              onSelectTemplate={applyTemplate}
            />
            <AssetPalette assets={ASSET_LIBRARY} onAddAsset={addAsset} />
          </aside>

          <section className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Canvas</h2>
              <span className="text-xs text-slate-500">{CANVAS_W} x {CANVAS_H}</span>
            </div>

            <div className="overflow-auto rounded-md border border-slate-200 bg-slate-100 p-3">
              <div
                className={`relative overflow-hidden rounded border border-slate-300 ${
                  dockImageError
                    ? "bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:20px_20px]"
                    : "bg-slate-100"
                }`}
                style={{ width: CANVAS_W, height: CANVAS_H }}
              >
                {!dockImageError && (
                  <Image
                    src="/venues/dock/dock.png"
                    alt="Dock venue overlay"
                    fill
                    priority
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35"
                    onError={() => setDockImageError(true)}
                  />
                )}

                {objects.map((object) => {
                  const isSelected = object.id === selectedObjectId;
                  const typeStyle = TYPE_STYLES[object.type] ?? "bg-slate-100 border-slate-500";

                  return (
                    <button
                      key={object.id}
                      type="button"
                      onClick={() => setSelectedObjectId(object.id)}
                      className={`absolute overflow-hidden rounded border-2 px-2 py-1 text-left text-[11px] font-medium text-slate-800 shadow-sm ${typeStyle} ${
                        isSelected ? "ring-2 ring-slate-900" : ""
                      }`}
                      style={{
                        left: object.x,
                        top: object.y,
                        width: object.w,
                        height: object.h,
                        transform: `rotate(${object.rotation}deg)`
                      }}
                    >
                      {object.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          <aside className="rounded-lg border border-slate-200 bg-white p-4">
            <h2 className="mb-3 text-sm font-semibold">Selection</h2>

            {!selectedObject ? (
              <p className="text-sm text-slate-500">Select an object in the canvas to edit it.</p>
            ) : (
              <div className="space-y-3">
                <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm">
                  <p className="font-medium">{selectedObject.label}</p>
                  <p className="text-slate-600">Type: {selectedObject.type}</p>
                  <p className="text-slate-600">
                    Position: ({selectedObject.x}, {selectedObject.y})
                  </p>
                  <p className="text-slate-600">
                    Size: {selectedObject.w} x {selectedObject.h}
                  </p>
                  <p className="text-slate-600">Rotation: {selectedObject.rotation}°</p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-sm">
                  <span />
                  <button
                    type="button"
                    onClick={() => nudgeSelected(0, -NUDGE_STEP)}
                    className="rounded border border-slate-300 px-2 py-1 hover:bg-slate-50"
                  >
                    ↑
                  </button>
                  <span />

                  <button
                    type="button"
                    onClick={() => nudgeSelected(-NUDGE_STEP, 0)}
                    className="rounded border border-slate-300 px-2 py-1 hover:bg-slate-50"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => nudgeSelected(0, NUDGE_STEP)}
                    className="rounded border border-slate-300 px-2 py-1 hover:bg-slate-50"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => nudgeSelected(NUDGE_STEP, 0)}
                    className="rounded border border-slate-300 px-2 py-1 hover:bg-slate-50"
                  >
                    →
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={rotateSelected}
                    className="rounded border border-slate-300 px-3 py-1 text-sm hover:bg-slate-50"
                  >
                    Rotate +15°
                  </button>
                  <button
                    type="button"
                    onClick={deleteSelected}
                    className="rounded border border-rose-300 bg-rose-50 px-3 py-1 text-sm text-rose-700 hover:bg-rose-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
