import { useState } from "react";
import { Leaf, ChevronDown, ScanLine } from "lucide-react";

/**
 * LedgerCard
 * -------------------------------------------------------------------------
 * Individual telemetry log block. Collapsed, it reads like a compact data
 * module. Expanded, it reveals an "AI Audit Trail" console drawer with a
 * confidence progress bar, the calculation methodology, and the behavioral
 * micro-pivot inside an italicized copper highlight.
 */
export default function LedgerCard({ entry }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-earth-950/50 border border-earth-700/80 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left"
      >
        <div className="w-7 h-7 rounded-full bg-clay-600/10 border border-clay-600/30 flex items-center justify-center flex-shrink-0">
          <Leaf className="w-3.5 h-3.5 text-clay-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-stone-200 truncate">{entry.label}</p>
          <p className="text-[11px] text-stone-500">
            {entry.time} · {entry.category}
          </p>
        </div>
        <span className="text-sm font-medium text-clay-400 flex-shrink-0">
          −{entry.impact}kg
        </span>
        <ChevronDown
          className={`w-4 h-4 text-stone-500 flex-shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className="audit-drawer overflow-hidden"
        style={{ maxHeight: open ? "220px" : "0px", opacity: open ? 1 : 0 }}
      >
        <div className="bg-black/40 border-t border-earth-700/80 px-4 py-3 space-y-3">
          <div className="flex items-center gap-2 text-[11px] text-stone-500 uppercase tracking-widest">
            <ScanLine className="w-3.5 h-3.5 text-clay-500" />
            AI Audit Trail
          </div>

          <div>
            <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
              <span>Confidence score</span>
              <span className="text-clay-400">{entry.confidence}%</span>
            </div>
            <div className="w-full h-1.5 bg-earth-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-clay-700 to-clay-400 transition-all duration-700"
                style={{ width: `${entry.confidence}%` }}
              />
            </div>
          </div>

          <div>
            <p className="text-[11px] text-stone-500 mb-1">Methodology</p>
            <p className="text-xs text-stone-300 leading-relaxed">{entry.methodology}</p>
          </div>

          <div className="bg-clay-600/10 border border-clay-600/30 rounded-lg px-3 py-2">
            <p className="text-xs text-clay-300 italic leading-relaxed">{entry.pivot}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
