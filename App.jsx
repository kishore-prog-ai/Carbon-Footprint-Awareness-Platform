import { useRef, useState, useEffect } from "react";
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

const VIEWS = {
  AUTH: "AUTH",
  ONBOARDING: "ONBOARDING",
  DASHBOARD: "DASHBOARD",
};

export default function App() {
  // Sync view status cleanly on cold boot setups
  const [view, setView] = useState(() => {
    return localStorage.getItem("ecoloop_view") || VIEWS.AUTH;
  });

  const [dailyBudget, setDailyBudget] = useState(() => {
    return Number(localStorage.getItem("ecoloop_budget")) || 20;
  });

  const [usedToday, setUsedToday] = useState(() => {
    return Number(localStorage.getItem("ecoloop_used")) || 12.4;
  });

  const [streak, setStreak] = useState(() => {
    return Number(localStorage.getItem("ecoloop_streak")) || 5;
  });

  const [totalOffset, setTotalOffset] = useState(() => {
    return Number(localStorage.getItem("ecoloop_offset")) || 42;
  });

  const [xp, setXp] = useState(() => {
    return Number(localStorage.getItem("ecoloop_xp")) || 0;
  });

  const [ledger, setLedger] = useState(() => {
    const activeData = localStorage.getItem("ecoloop_ledger");
    return activeData ? JSON.parse(activeData) : INITIAL_LEDGER;
  });

  const [actions, setActions] = useState(() => {
    const activeActions = localStorage.getItem("ecoloop_actions");
    return activeActions ? JSON.parse(activeActions) : INITIAL_ACTIONS;
  });

  const [streakBumped, setStreakBumped] = useState(false);
  const [rank, setRank] = useState(14);
  const [sessionGain, setSessionGain] = useState(0);
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);

  // Synchronize state layers onto disk arrays dynamically
  useEffect(() => {
    localStorage.setItem("ecoloop_view", view);
    localStorage.setItem("ecoloop_budget", dailyBudget);
    localStorage.setItem("ecoloop_used", usedToday);
    localStorage.setItem("ecoloop_streak", streak);
    localStorage.setItem("ecoloop_offset", totalOffset);
    localStorage.setItem("ecoloop_xp", xp);
    localStorage.setItem("ecoloop_ledger", JSON.stringify(ledger));
    localStorage.setItem("ecoloop_actions", JSON.stringify(actions));
  }, [view, dailyBudget, usedToday, streak, totalOffset, xp, ledger, actions]);

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
      setTimeout(() => pushToast("Streak extended — daily ecosystem loop locked!", Flame), 450);
    }
  }

  function handleAuthenticated() {
    setView(VIEWS.ONBOARDING);
  }

  function handleCalibrationComplete({ dailyBudget: budget, usedToday: used }) {
    setDailyBudget(budget);
    setUsedToday(used);
    setView(VIEWS.DASHBOARD);
    setTimeout(() => pushToast("Baseline calibrated via semantic indexing models.", Check), 300);
  }

  function handleLog(entry) {
    setLedger((prev) => [entry, ...prev]);
    registerGain(entry.impact);
    setXp((x) => x + Math.round(entry.impact * 12));
    pushToast(`Logged: −${entry.impact}kg CO2`, Leaf);
  }

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
        methodology: "Manual commitment to a targeted carbon optimization strategy.",
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
    <div className="min-h-screen w-full text-stone-100 relative bg-[#0A0807] overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <BackgroundPosters />

      {view === VIEWS.AUTH && <AuthGate onAuthenticated={handleAuthenticated} />}
      {view === VIEWS.ONBOARDING && <Onboarding onComplete={handleCalibrationComplete} />}

      {view === VIEWS.DASHBOARD && (
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 animate-fade-in">
          <Header xp={xp} />

          <section className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-6">
            <div className="lg:col-span-2 bg-[#14100E]/80 border border-earth-700 rounded-2xl p-6 flex flex-col items-center justify-center backdrop-blur-md shadow-xl">
              <ProgressRing used={usedToday} budget={dailyBudget} size={192} />
              <div className="mt-5 w-full bg-[#BD5B38]/10 border border-[#BD5B38]/30 rounded-xl px-4 py-2.5 flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-clay-500 flex-shrink-0" />
                <p className="text-xs text-stone-300 leading-snug">
                  ≈ <span className="font-semibold text-clay-400">{(usedToday / 0.85).toFixed(1)} hrs</span> of continuous household thermal load.
                </p>
              </div>
            </div>

            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard icon={Flame} label="Weekly Streak" value={`${streak} days`} />
              <StatCard icon={Leaf} label="Total Offset" value={`${totalOffset.toFixed(1)} kg`} />
              <StatCard icon={Trophy} label="Leaderboard Rank" value={`#${rank}`} />

              <div className="sm:col-span-3 bg-[#14100E]/80 border border-earth-700 rounded-2xl p-5 backdrop-blur-md">
                <p className="text-sm text-stone-400 leading-relaxed">
                  You are running{" "}
                  <span className="text-clay-500 font-bold">
                    {pct < 100 ? `${(100 - pct).toFixed(0)}% under` : "at"}
                  </span>{" "}
                  allocated metrics. Execute context logging tasks below or complete a micro-action profile card.
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

          <footer className="text-center text-[11px] text-stone-600 mt-10 tracking-widest uppercase font-mono">
            EcoLoop AI • Culturally Rooted Infrastructure
          </footer>
        </div>
      )}

      <Toast toasts={toasts} />
    </div>
  );
}
