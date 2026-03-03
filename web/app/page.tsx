import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <main className="w-full max-w-2xl rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Miami Hackathon Floor Plan Tool</h1>
        <p className="mt-3 text-slate-600">
          MVP frontend is ready for demo. Open the floor plan workspace to switch templates and place assets.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/floorplan"
            className="rounded-md bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Open Floor Plan
          </Link>
        </div>
      </main>
    </div>
  );
}
