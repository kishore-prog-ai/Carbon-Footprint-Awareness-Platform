import { useState } from "react";
import { Trophy, Globe, Users, TreePine } from "lucide-react";
import { GLOBAL_LEADERS, GUILD_MEMBERS } from "../data/mockData.js";

export default function EcoGuilds({ rank, totalOffset }) {
  const [activeTab, setActiveTab] = useState("global");

  return (
    <div>
      <h2 className="font-display text-sm font-semibold text-stone-200 mb-3 flex items-center gap-2">
        <Trophy className="w-4 h-4 text-clay-400" />
        Eco-Guilds
      </h2>
      <div className="bg-earth-900/60 border border-earth-700 rounded-2xl p-4">
        <div className="flex bg-earth-950/60 border border-earth-700 rounded-xl p-1 mb-4">
          <button
            onClick={() => setActiveTab("global")}
            className={`flex-1 flex items-center justify-center gap-1.5 text-xs rounded-lg py-2 transition-colors ${
              activeTab === "global"
                ? "bg-clay-600/15 text-clay-300"
                : "text-stone-500 hover:text-stone-300"
            }`}
          >
            <Globe className="w-3.5 h-3.5" /> Global Rank
          </button>
          <button
            onClick={() => setActiveTab("guild")}
            className={`flex-1 flex items-center justify-center gap-1.5 text-xs rounded-lg py-2 transition-colors ${
              activeTab === "guild"
                ? "bg-clay-600/15 text-clay-300"
                : "text-stone-500 hover:text-stone-300"
            }`}
          >
            <Users className="w-3.5 h-3.5" /> My Guild
          </button>
        </div>

        {activeTab === "global" ? (
          <div className="space-y-2">
            {GLOBAL_LEADERS.map((l) => (
              <div key={l.rank} className="flex items-center gap-3 text-sm">
                <span className="w-5 text-stone-500 text-xs">#{l.rank}</span>
                <div className="w-7 h-7 rounded-full bg-earth-800 flex items-center justify-center text-[11px] text-stone-300 flex-shrink-0">
                  {l.name.charAt(0)}
                </div>
                <span className="flex-1 text-stone-300 truncate">{l.name}</span>
                <span className="text-clay-400 text-xs">{l.offset}kg</span>
              </div>
            ))}
            <div className="flex items-center gap-3 text-sm bg-clay-600/10 border border-clay-600/30 rounded-lg px-2 py-1.5 mt-1">
              <span className="w-5 text-clay-300 text-xs">#{rank}</span>
              <div className="w-7 h-7 rounded-full bg-clay-700/40 flex items-center justify-center text-[11px] text-clay-200 flex-shrink-0">
                A
              </div>
              <span className="flex-1 text-clay-200 truncate">You</span>
              <span className="text-clay-300 text-xs">{totalOffset.toFixed(1)}kg</span>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-xs text-stone-400 mb-2">
              <span className="text-stone-200 font-medium">Tech Pioneers</span> · Guild goal
            </p>
            <div className="flex items-center gap-2 mb-1.5">
              <TreePine className="w-3.5 h-3.5 text-clay-400" />
              <p className="text-xs text-stone-300">Plant 500 trees this month</p>
            </div>
            <div className="w-full h-2 bg-earth-800 rounded-full overflow-hidden mb-1">
              <div
                className="h-full bg-gradient-to-r from-clay-700 to-clay-400 transition-all duration-700"
                style={{ width: "74%" }}
              />
            </div>
            <p className="text-[11px] text-stone-500 mb-4">370 / 500 trees · 74%</p>

            <div className="space-y-2">
              {GUILD_MEMBERS.map((m) => (
                <div key={m.name} className="flex items-center gap-3 text-sm">
                  <div className="w-7 h-7 rounded-full bg-earth-800 text-stone-300 flex items-center justify-center text-[11px] flex-shrink-0">
                    {m.name.charAt(0)}
                  </div>
                  <span className="flex-1 text-stone-300 truncate">{m.name}</span>
                  <span className="text-xs text-stone-500">{m.offset}kg</span>
                </div>
              ))}
              <div className="flex items-center gap-3 text-sm">
                <div className="w-7 h-7 rounded-full bg-clay-700/40 text-clay-200 flex items-center justify-center text-[11px] flex-shrink-0">
                  A
                </div>
                <span className="flex-1 text-clay-200 truncate">You</span>
                <span className="text-xs text-clay-300">{totalOffset.toFixed(1)}kg</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
