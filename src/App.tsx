import { useEffect, useState } from "react";
import StatusRail from "./components/StatusRail";
import Terminal from "./components/Terminal";
import crtGlass from "./assets/crt-glass.jpg";
import darkRoom from "./assets/dark-room.jpg";

function useClock() {
  const [t, setT] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setT(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return t.toLocaleTimeString("en-GB", { hour12: false });
}

export default function App() {
  const clock = useClock();

  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-hidden bg-glass lg:h-[100dvh] lg:overflow-hidden">
      {/* ── material: dark room ─────────────────────── */}
      <img
        src={darkRoom}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
        style={{ objectPosition: "50% 62%" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, rgba(255,176,0,0.14) 0%, rgba(10,7,5,0.86) 45%, #0A0705 100%)",
        }}
      />

      {/* ── material: phosphor glass ────────────────── */}
      <img
        src={crtGlass}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.22] mix-blend-screen"
      />
      <div aria-hidden className="crt-grille pointer-events-none absolute inset-0 opacity-70" />
      <div aria-hidden className="crt-scanlines pointer-events-none absolute inset-0 opacity-35" />
      <div aria-hidden className="crt-vignette pointer-events-none absolute inset-0" />

      {/* ── the screen ──────────────────────────────── */}
      <div className="power-on relative z-10 flex min-h-[100dvh] flex-col lg:h-[100dvh]">
        <div
          aria-hidden
          className="sweep pointer-events-none absolute inset-x-0 top-0 z-50 h-16"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,243,214,0) 0%, rgba(255,243,214,0.75) 50%, rgba(255,243,214,0) 100%)",
          }}
        />

        <div className="flicker flex min-h-0 flex-1 flex-col">
          {/* top bar */}
          <header className="flex shrink-0 items-center justify-between gap-3 border-b border-phos-dim/40 bg-glass/70 px-4 py-2 text-[9.5px] tracking-[0.26em] text-phos-dim uppercase sm:px-6 sm:text-[10px]">
            <span className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 animate-pulse bg-hp" style={{ boxShadow: "0 0 8px #FF4D4D" }} />
              amber-1 · 9600 baud
            </span>
            <span className="hidden truncate text-phos md:inline">
              github.com/yashaswi-khurana — player profile
            </span>
            <span className="text-phos tabular-nums">{clock}</span>
          </header>

          {/* rail + terminal */}
          <main className="grid min-h-0 flex-1 lg:grid-cols-[320px_minmax(0,1fr)]">
            <StatusRail />
            <Terminal />
          </main>
        </div>
      </div>
    </div>
  );
}
