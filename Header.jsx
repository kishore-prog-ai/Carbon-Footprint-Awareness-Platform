import { Infinity as InfinityIcon, Sparkles } from "lucide-react";

export default function Header({ xp }) {
  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-clay-600/15 border border-clay-600/40 flex items-center justify-center">
          <InfinityIcon className="w-5 h-5 text-clay-400" strokeWidth={2.2} />
        </div>
        <div>
          <h1 className="font-display text-lg sm:text-xl font-semibold tracking-tight text-stone-50">
            EcoLoop <span className="text-clay-400">AI</span>
          </h1>
          <p className="text-[11px] text-stone-500 -mt-0.5 hidden sm:block">
            Your carbon footprint, decoded in real time
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-clay-400 bg-clay-600/10 border border-clay-600/30 rounded-full px-3 py-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{xp} XP</span>
        </div>
        <div className="w-9 h-9 rounded-full bg-clay-700/40 border border-clay-600/40 flex items-center justify-center font-display text-sm text-clay-300">
          A
        </div>
      </div>
    </header>
  );
}
