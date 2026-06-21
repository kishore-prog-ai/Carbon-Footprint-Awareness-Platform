import { useState } from "react";
import { Fingerprint, ArrowRight, Mail, Infinity as InfinityIcon } from "lucide-react";

/**
 * AuthGate
 * -------------------------------------------------------------------------
 * The entry screen. A gateway window centered over a kinetic gradient mesh
 * blending deep carbon and terracotta clays, with a glowing biometric
 * verification module and an email registration input wrapped in a raw
 * copper focus border.
 */
export default function AuthGate({ onAuthenticated }) {
  const [email, setEmail] = useState("");
  const [scanning, setScanning] = useState(false);

  function handleBiometricScan() {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      onAuthenticated();
    }, 1400);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    onAuthenticated();
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* kinetic gradient mesh */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(227,133,98,0.18), transparent 45%), radial-gradient(circle at 80% 30%, rgba(189,91,56,0.16), transparent 40%), radial-gradient(circle at 50% 90%, rgba(166,75,42,0.14), transparent 45%), #0A0807",
        }}
      />
      <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{
        background: "repeating-linear-gradient(45deg, rgba(227,133,98,0.04) 0px, rgba(227,133,98,0.04) 2px, transparent 2px, transparent 12px)"
      }} />

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-earth-900/80 backdrop-blur-xl border border-clay-600/30 rounded-3xl p-8 shadow-2xl shadow-black/60">
          <div className="flex items-center gap-2 mb-8 justify-center">
            <div className="w-9 h-9 rounded-xl bg-clay-600/15 border border-clay-600/40 flex items-center justify-center">
              <InfinityIcon className="w-5 h-5 text-clay-400" strokeWidth={2.2} />
            </div>
            <h1 className="font-display text-xl font-semibold text-stone-50">
              EcoLoop <span className="text-clay-400">AI</span>
            </h1>
          </div>

          {/* biometric module */}
          <div className="flex flex-col items-center mb-8">
            <button
              onClick={handleBiometricScan}
              className="relative w-28 h-28 rounded-full flex items-center justify-center group"
              aria-label="Verify with biometric scan"
            >
              <span className="absolute inset-0 rounded-full border border-clay-500/40" />
              {scanning && (
                <>
                  <span className="radar-ring absolute inset-0 rounded-full border border-clay-400" />
                  <span
                    className="radar-ring absolute inset-0 rounded-full border border-clay-400"
                    style={{ animationDelay: "0.4s" }}
                  />
                </>
              )}
              <span className="absolute inset-0 rounded-full border border-transparent group-hover:border-clay-400/70 group-hover:shadow-copper transition-all duration-300" />
              <div className="w-16 h-16 rounded-full bg-clay-600/10 border border-clay-600/40 flex items-center justify-center group-hover:bg-clay-600/20 transition-colors">
                <Fingerprint
                  className={`w-7 h-7 ${scanning ? "text-clay-400" : "text-clay-500"} transition-colors`}
                />
              </div>
            </button>
            <p className="text-[11px] text-stone-500 mt-3 tracking-wide uppercase">
              {scanning ? "Verifying identity…" : "Tap to verify · passkey ready"}
            </p>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-earth-700" />
            <span className="text-[11px] text-stone-600 uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-earth-700" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Register with email"
                className="w-full bg-earth-950/70 border border-earth-700 focus:border-clay-500 focus:ring-2 focus:ring-clay-600/30 rounded-xl pl-10 pr-4 py-3 text-sm text-stone-100 placeholder-stone-500 outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-clay-600 hover:bg-clay-500 text-earth-950 font-medium rounded-xl px-4 py-3 text-sm transition-colors flex items-center justify-center gap-2"
            >
              Enter EcoLoop
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
