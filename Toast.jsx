export default function Toast({ toasts }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-72">
      {toasts.map((t) => {
        const Icon = t.Icon;
        return (
          <div
            key={t.id}
            className="toast-enter flex items-center gap-2.5 bg-earth-900 border border-clay-600/40 rounded-xl px-4 py-3 shadow-lg shadow-black/40"
          >
            <Icon className="w-4 h-4 text-clay-400 flex-shrink-0" />
            <p className="text-sm text-stone-200">{t.message}</p>
          </div>
        );
      })}
    </div>
  );
}
