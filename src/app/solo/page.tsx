import type { Metadata } from "next";
import Game from "@/components/Game";

export const metadata: Metadata = {
  title: "Solo — Pitch Matching",
  description:
    "Practice pitch recognition at your own pace. Hear a note, then recreate it by ear using the virtual instrument.",
};

export default function SoloPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-8">
      <Game />
    </main>
  );
}
