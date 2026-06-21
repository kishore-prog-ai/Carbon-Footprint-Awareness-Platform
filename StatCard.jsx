export default function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-earth-900/70 border border-earth-700 rounded-2xl p-4 flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl border border-clay-600/40 bg-clay-600/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-clay-400" />
      </div>
      <div>
        <p className="text-[11px] text-stone-500">{label}</p>
        <p className="font-display text-base font-semibold text-stone-50">{value}</p>
      </div>
    </div>
  );
}
