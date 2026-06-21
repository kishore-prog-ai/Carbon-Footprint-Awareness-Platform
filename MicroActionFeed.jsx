import { Zap, ChevronDown, Check } from "lucide-react";

/**
 * MicroActionFeed
 * -------------------------------------------------------------------------
 * Grid of personalized, expandable micro-action cards. Committing an
 * action bubbles up to the App orchestrator, which updates the daily
 * budget, XP, streak, and ledger.
 */
export default function MicroActionFeed({ actions, onToggleExpand, onCommit }) {
  return (
    <div>
      <h2 className="font-display text-sm font-semibold text-stone-200 mb-3 flex items-center gap-2">
        <Zap className="w-4 h-4 text-clay-400" />
        Personalized for you
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((a) => {
          const Icon = a.icon;
          return (
            <div
              key={a.id}
              className="bg-earth-900/60 border border-earth-700 hover:border-clay-600/50 rounded-2xl p-4 flex flex-col transition-all duration-300 hover:-translate-y-0.5 hover:shadow-copper"
            >
              <div
                className="flex items-start justify-between cursor-pointer"
                onClick={() => onToggleExpand(a.id)}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-clay-600/10 border border-clay-600/30 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-clay-400" />
                  </div>
                  <p className="text-sm font-medium text-stone-100 leading-snug">{a.title}</p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-stone-500 flex-shrink-0 mt-1 transition-transform duration-300 ${
                    a.expanded ? "rotate-180" : ""
                  }`}
                />
              </div>

              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: a.expanded ? "80px" : "0px" }}
              >
                <p className="text-xs text-stone-500 mt-2 leading-relaxed">{a.why}</p>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-earth-700/80">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full border ${
                      a.tier === "Easy"
                        ? "bg-clay-600/10 text-clay-400 border-clay-600/30"
                        : "bg-clay-700/15 text-clay-300 border-clay-700/40"
                    }`}
                  >
                    {a.tier}
                  </span>
                  <span className="text-[11px] text-stone-400">
                    −{a.impact}kg · +{a.xp}XP
                  </span>
                </div>
                <button
                  onClick={() => !a.committed && onCommit(a.id)}
                  disabled={a.committed}
                  className={`text-xs rounded-lg px-3 py-1.5 transition-colors flex items-center gap-1 ${
                    a.committed
                      ? "bg-clay-600/15 text-clay-300 border border-clay-600/30 cursor-default"
                      : "bg-clay-600 hover:bg-clay-500 text-earth-950"
                  }`}
                >
                  {a.committed ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Committed
                    </>
                  ) : (
                    "Commit to Action"
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
