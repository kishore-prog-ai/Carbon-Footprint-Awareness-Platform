import { useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { parseInputToPayload } from "../utils/parser.js";
import { QUICK_PILLS } from "../data/mockData.js";
import LedgerCard from "./LedgerCard.jsx";

/**
 * OmniLogger
 * -------------------------------------------------------------------------
 * Frictionless free-text + quick-pill logging surface. Runs input through
 * parseInputToPayload, simulates a brief AI parsing delay, then hands the
 * resulting entry up to the App orchestrator via onLog.
 */
export default function OmniLogger({ ledger, onLog }) {
  const [inputText, setInputText] = useState("");
  const [isParsing, setIsParsing] = useState(false);

  function runParse(text) {
    if (!text.trim() || isParsing) return;
    setIsParsing(true);
    setInputText("");
    setTimeout(() => {
      const payload = parseInputToPayload(text);
      const entry = {
        id: `l${Date.now()}`,
        label: text.trim(),
        impact: payload.impact,
        category: payload.category,
        methodology: payload.methodology,
        pivot: payload.pivot,
        confidence: payload.confidence,
        time: "Just now",
      };
      setIsParsing(false);
      onLog(entry);
    }, 1100);
  }

  return (
    <section className="bg-earth-900/60 border border-earth-700 rounded-2xl p-5 mb-6">
      <h2 className="font-display text-sm font-semibold text-stone-200 mb-3 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-clay-400" />
        Omni-Logger
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          runParse(inputText);
        }}
        className="flex items-center gap-2 mb-3"
      >
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Tell EcoLoop what you did (e.g. 'Biked 5km to work instead of driving' or paste receipt text)..."
          className="flex-1 bg-earth-950/70 border border-earth-700 focus:border-clay-500 focus:ring-2 focus:ring-clay-600/30 rounded-xl px-4 py-3 text-sm text-stone-100 placeholder-stone-500 outline-none transition-all"
        />
        <button
          type="submit"
          disabled={isParsing || !inputText.trim()}
          className="bg-clay-600 hover:bg-clay-500 disabled:bg-earth-800 disabled:text-stone-600 text-earth-950 rounded-xl px-4 py-3 transition-colors flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      <div className="flex flex-wrap gap-2 mb-4">
        {QUICK_PILLS.map((p) => {
          const Icon = p.icon;
          return (
            <button
              key={p.id}
              onClick={() => runParse(p.label)}
              disabled={isParsing}
              className="flex items-center gap-1.5 text-xs bg-earth-950/60 hover:bg-clay-600/10 border border-earth-700 hover:border-clay-500/50 text-stone-300 hover:text-clay-300 rounded-full px-3 py-1.5 transition-colors disabled:opacity-50"
            >
              <Icon className="w-3.5 h-3.5" />
              {p.label}
            </button>
          );
        })}
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
        {isParsing && (
          <div className="flex items-center gap-3 bg-earth-950/50 border border-earth-700 rounded-xl px-4 py-3 animate-pulse">
            <div className="w-7 h-7 rounded-full bg-earth-800 flex-shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-2.5 bg-earth-800 rounded w-2/3" />
              <div className="h-2 bg-earth-800 rounded w-1/3" />
            </div>
            <span className="text-[11px] text-clay-400">AI parsing…</span>
          </div>
        )}
        {ledger.map((entry) => (
          <LedgerCard key={entry.id} entry={entry} />
        ))}
      </div>
    </section>
  );
}
