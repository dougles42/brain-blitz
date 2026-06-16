'use client';

export function Toast({ message }: { message: string }) {
  return (
    <div className="bg-zinc-800 dark:bg-zinc-800 light:bg-white border border-zinc-700 dark:border-zinc-700 light:border-zinc-200 rounded-xl px-5 py-3 text-sm font-semibold text-zinc-100 dark:text-zinc-100 light:text-zinc-800 shadow-xl animate-toast-in pointer-events-auto whitespace-nowrap">
      {message}
    </div>
  );
}

export function ToastContainer({ toasts }: { toasts: string[] }) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[500] flex flex-col gap-2 pointer-events-none">
      {toasts.map((message, i) => (
        <Toast key={i} message={message} />
      ))}
    </div>
  );
}
