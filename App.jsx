import { useRef, useState } from "react";
import { Leaf, Flame, Trophy, Check, Zap } from "lucide-react";

import BackgroundPosters from "./components/BackgroundPosters.jsx";
import AuthGate from "./components/AuthGate.jsx";
import Onboarding from "./components/Onboarding.jsx";
import Header from "./components/Header.jsx";
import StatCard from "./components/StatCard.jsx";
import ProgressRing from "./components/ProgressRing.jsx";
import OmniLogger from "./components/OmniLogger.jsx";
import MicroActionFeed from "./components/MicroActionFeed.jsx";
import EcoGuilds from "./components/EcoGuilds.jsx";
import Toast from "./components/Toast.jsx";

import { INITIAL_LEDGER, INITIAL_ACTIONS } from "./data/mockData.js";

/**
 * App — The State Matrix Orchestrator
 * -------------------------------------------------------------------------
 * Owns every cross-cutting piece of state: the view lifecycle
 * (AUTH -> ONBOARDING -> DASHBOARD), the daily carbon threshold, the
 * active ledger history, gamification counters (XP, streak, rank,
 * total offset), and the global toast queue. Child components are pure
 * presentational + local-UI-state only; everything that must persist or
 * cascade is funneled back up through callback props.
 */

const VIEWS = {
  AUTH: "AUTH",
  ONBOARDING: "ONBOARDING",
  DASHBOARD: "DASHBOARD",
};

export default function App() {
  const [view, setView] = useState(VIEWS.AUTH);

  // Core carbon + gamification state
  const [dailyBudget, setDailyBudget] = useState(20);
  const [usedToday, setUsedToday] = useState(12.4);
  const [streak, setStreak] = useState(5);
  const [streakBumped, setStreakBumped] = useState(false);
  const [totalOffset, setTotalOffset] = useState(42);
  const [rank, setRank] = useState(14);
  const [sessionGain, setSessionGain] = useState(0);
  const [xp, setXp] = useState(0);

  const [ledger, setLedger] = useState(INITIAL_LEDGER);
  const [actions, setActions] = useState(INITIAL_ACTIONS);
  const [toasts, setToasts] = useState([]);

  const toastId = useRef(0);

  function pushToast(message, Icon) {
    const id = ++toastId.current;
    setToasts((prev) => [...prev, { id, message, Icon }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }

  function registerGain(amount) {
    setUsedToday((u) => Math.max(0, +(u - amount).toFixed(2)));
    setTotalOffset((t) => +(t + amount).toFixed(1));
    setSessionGain((g) => {
      const next = g + amount;
      if (next >= 6) {
        setRank((r) => Math.max(1, r - 1));
        return next - 6;
      }
      return next;
    });
    if (!streakBumped) {
      setStreak((s) => s + 1);
      setStreakBumped(true);
      setTimeout(() => pushToast("Streak extended — keep it going!", Flame), 450);
    }
  }

  // --- lifecycle transitions -------------------------------------------
  function handleAuthenticated() {
    setView(VIEWS.ONBOARDING);
  }

  function handleCalibrationComplete({ dailyBudget: budget, usedToday: used }) {
    setDailyBudget(budget);
    setUsedToday(used);
    setView(VIEWS.DASHBOARD);
    setTimeout(() => pushToast("Baseline calibrated — welcome to the loop.", Check), 300);
  }

  // --- omni-logger -------------------------------------------------------
  function handleLog(entry) {
    setLedger((prev) => [entry, ...prev]);
    registerGain(entry.impact);
    setXp((x) => x + Math.round(entry.impact * 4));
    pushToast(`Logged: −${entry.impact}kg CO2`, Leaf);
  }

  // --- micro-action feed --------------------------------------------------
  function handleToggleExpand(actionId) {
    setActions((prev) =>
      prev.map((a) => (a.id === actionId ? { ...a, expanded: !a.expanded } : a))
    );
  }

  function handleCommit(actionId) {
    const action = actions.find((a) => a.id === actionId);
    if (!action) return;

    setActions((prev) =>
      prev.map((a) => (a.id === actionId ? { ...a, committed: true } : a))
    );

    registerGain(action.impact);
    setXp((x) => x + action.xp);

    setLedger((prev) => [
      {
        id: `c${Date.now()}`,
        label: action.title,
        impact: action.impact,
        category: action.category,
        methodology: "Manual commitment to a recommended micro-action.",
        pivot: action.why,
        confidence: 100,
        time: "Just now",
      },
      ...prev,
    ]);

    pushToast(`Committed: ${action.title}`, Check);
  }

  const pct = Math.min(100, (usedToday / dailyBudget) * 100);

  return (
    <div className="min-h-screen w-full text-stone-100 relative" style={{ fontFamily: "'Inter', sans-serif" }}>
      <BackgroundPosters />

      {view === VIEWS.AUTH && <AuthGate onAuthenticated={handleAuthenticated} />}
      {view === VIEWS.ONBOARDING && <Onboarding onComplete={handleCalibrationComplete} />}

      {view === VIEWS.DASHBOARD && (
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
          <Header xp={xp} />

          {/* Hero Insights Hub */}
          <section className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-6">
            <div className="lg:col-span-2 bg-earth-900/60 border border-earth-700 rounded-2xl p-6 flex flex-col items-center justify-center">
              <ProgressRing used={usedToday} budget={dailyBudget} size={192} />
              <div className="mt-5 w-full bg-clay-600/10 border border-clay-600/30 rounded-xl px-4 py-2.5 flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-clay-400 flex-shrink-0" />
                <p className="text-xs text-clay-200 leading-snug">
                  ≈ <span className="font-semibold">{(usedToday / 0.85).toFixed(1)} hrs</span> of
                  continuous AC use, or{" "}
                  <span className="font-semibold">{(usedToday / 0.39).toFixed(1)} mi</span> not driven.
                </p>
              </div>
            </div>

            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard icon={Flame} label="Weekly Streak" value={`${streak} days`} />
              <StatCard icon={Leaf} label="Total Offset" value={`${totalOffset.toFixed(1)} kg`} />
              <StatCard icon={Trophy} label="Leaderboard Rank" value={`#${rank}`} />

              <div className="sm:col-span-3 bg-earth-900/60 border border-earth-700 rounded-2xl p-5">
                <p className="text-sm text-stone-400 leading-relaxed">
                  You're{" "}
                  <span className="text-clay-400 font-medium">
                    {pct < 100 ? `${(100 - pct).toFixed(0)}% under` : "at"}
                  </span>{" "}
                  your daily budget. Log an action below or commit to a micro-action to keep
                  today's loop closing.
                </p>
              </div>
            </div>
          </section>

          <OmniLogger ledger={ledger} onLog={handleLog} />

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MicroActionFeed
                actions={actions}
                onToggleExpand={handleToggleExpand}
                onCommit={handleCommit}
              />
            </div>
            <EcoGuilds rank={rank} totalOffset={totalOffset} />
          </section>

          <footer className="text-center text-[11px] text-stone-600 mt-10">
            EcoLoop AI — every action closes the loop.
          </footer>
        </div>
      )}

      <Toast toasts={toasts} />
    </div>
  );
}
