import { useState } from "react";
import { TerminalSquare, ArrowRight } from "lucide-react";

const PHASES = [
  "Deconstructing semantic tokens...",
  "Mapping transport baselines...",
  "Binding weight constants to dailyBudget...",
];

/**
 * Onboarding
 * -------------------------------------------------------------------------
 * The calibration funnel. Collects a natural-language description of the
 * user's routine, then plays a terminal-style data stream through the
 * calibration phases before handing an evaluated dataset vector back to
 * the App lifecycle orchestrator.
 */
export default function Onboarding({ onComplete }) {
  const [routine, setRoutine] = useState("");
  const [calibrating, setCalibrating] = useState(false);
  const [visiblePhases, setVisiblePhases] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!routine.trim() || calibrating) return;
    setCalibrating(true);
    setVisiblePhases([]);

    PHASES.forEach((phase, i) => {
      setTimeout(() => {
        setVisiblePhases((prev) => [...prev, phase]);
      }, (i + 1) * 650);
    });

    setTimeout(() => {
      const lengthFactor = Math.min(1, routine.length / 240);
      const dailyBudget = 18 + Math.round(lengthFactor * 6); // 18-24kg
      const usedToday = +(dailyBudget * 0.62).toFixed(1);
      onComplete({ dailyBudget, usedToday, routineSummary: routine.trim() });
    }, 2200);
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative px-4">
      <div className="relative z-10 w-full max-w-lg">
        <div className="text-center mb-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-clay-500 mb-2">
            Calibration · Phase 1
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-stone-50">
            Establishing Your Structural Baseline
          </h1>
          <p className="text-sm text-stone-500 mt-2">
            Describe a typical day — commute, meals, energy habits — in your own words.
          </p>
        </div>

        <div className="bg-earth-900/70 border border-earth-700 rounded-2xl p-5">
          <form onSubmit={handleSubmit} className="space-y-3">
            <textarea
              value={routine}
              onChange={(e) => setRoutine(e.target.value)}
              disabled={calibrating}
              rows={4}
              placeholder="e.g. I drive about 20 minutes to work, eat meat most nights, and run the AC for several hours..."
              className="w-full bg-earth-950/70 border border-earth-700 focus:border-clay-500 focus:ring-2 focus:ring-clay-600/30 rounded-xl px-4 py-3 text-sm text-stone-100 placeholder-stone-500 outline-none transition-all resize-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={calibrating || !routine.trim()}
              className="w-full bg-clay-600 hover:bg-clay-500 disabled:bg-earth-800 disabled:text-stone-600 text-earth-950 font-medium rounded-xl px-4 py-3 text-sm transition-colors flex items-center justify-center gap-2"
            >
              {calibrating ? "Calibrating…" : "Run Calibration"}
              {!calibrating && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          {calibrating && (
            <div className="mt-4 bg-black/40 border border-earth-700 rounded-xl px-4 py-3 font-mono text-xs text-clay-400 space-y-1.5 min-h-[88px]">
              <div className="flex items-center gap-2 text-stone-500 mb-1">
                <TerminalSquare className="w-3.5 h-3.5" />
                <span>calibration_stream.log</span>
              </div>
              {visiblePhases.map((p, i) => (
                <p key={i} className="fade-up">
                  <span className="text-clay-600">$</span> {p}
                </p>
              ))}
              <span className="terminal-cursor text-clay-400">▍</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
