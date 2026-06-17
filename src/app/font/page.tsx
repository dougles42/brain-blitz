import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Font or Foe",
  description: "Typography recognition. See a letterform, name the font.",
};

export default function Page() {
  return (
    <main className="flex flex-col flex-1 items-center justify-center px-4 py-24 text-center">
      <span className="text-6xl mb-5 block">🔤</span>
      <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
        Font or Foe
      </h1>
      <p className="text-white/35 max-w-sm leading-relaxed mb-8">
        Typography recognition. See a letterform, name the font.
      </p>
      <span className="px-4 py-2 rounded-full border border-white/10 text-xs font-medium text-white/25 uppercase tracking-wider">
        Coming soon
      </span>
    </main>
  );
}
