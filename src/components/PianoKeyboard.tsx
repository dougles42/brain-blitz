"use client";

import { type Note, type NoteName, NOTE_NAMES, OCTAVES, isBlackKey } from "@/lib/notes";

interface Props {
  onNoteClick: (note: Note) => void;
  disabled?: boolean;
  highlightNote?: Note | null;
}

export function PianoKeyboard({ onNoteClick, disabled = false, highlightNote }: Props) {
  const keys: { note: Note; isBlack: boolean }[] = [];
  for (const octave of OCTAVES) {
    for (const name of NOTE_NAMES) {
      keys.push({ note: { name, octave }, isBlack: isBlackKey(name) });
    }
  }

  const getStyle = (note: Note, isBlack: boolean): string => {
    const base = isBlack
      ? "relative z-10 -mx-2.5 w-8 h-24 rounded-b-md bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 dark:bg-zinc-700 dark:hover:bg-zinc-600"
      : "relative w-11 h-40 rounded-b-md bg-white border border-zinc-300 hover:bg-zinc-100 active:bg-zinc-200 dark:bg-zinc-100 dark:border-zinc-400 dark:hover:bg-zinc-200";

    let hl = "";
    if (highlightNote && note.name === highlightNote.name && note.octave === highlightNote.octave) {
      hl = isBlack ? "!bg-indigo-500 ring-2 ring-indigo-300" : "!bg-indigo-100 ring-2 ring-indigo-400 dark:!bg-indigo-200";
    }
    return `${base} ${hl} ${disabled ? "cursor-default" : "cursor-pointer"} transition-colors`;
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-end select-none">
        {keys.map(({ note, isBlack }) => (
          <button
            key={`${note.name}${note.octave}`}
            className={getStyle(note, isBlack)}
            onClick={() => !disabled && onNoteClick(note)}
            disabled={disabled}
            aria-label={`${note.name}${note.octave}`}
            title={`${note.name}${note.octave}`}
          >
            {!isBlack && (
              <span className="absolute bottom-0 left-0 right-0 pb-1 text-center text-[10px] font-medium text-zinc-500 dark:text-zinc-500">
                {note.name === "C" ? `C${note.octave}` : note.name}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
