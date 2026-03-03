import { TemplatePreset } from "@/src/features/floorplan/models/presets";

type TemplatePickerProps = {
  templates: TemplatePreset[];
  activeTemplateId: TemplatePreset["id"];
  onSelectTemplate: (templateId: TemplatePreset["id"]) => void;
};

export function TemplatePicker({
  templates,
  activeTemplateId,
  onSelectTemplate
}: TemplatePickerProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <h2 className="mb-3 text-sm font-semibold text-slate-900">Templates</h2>
      <div className="space-y-2">
        {templates.map((template) => {
          const isActive = template.id === activeTemplateId;

          return (
            <button
              key={template.id}
              type="button"
              onClick={() => onSelectTemplate(template.id)}
              className={`w-full rounded-md border px-3 py-2 text-left text-sm transition ${
                isActive
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {template.name}
            </button>
          );
        })}
      </div>
    </section>
  );
}
