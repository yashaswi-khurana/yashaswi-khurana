import { useEffect, useState } from "react";
import { ACHIEVEMENTS, ATTRS, PROFILE } from "../data";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useBoot() {
  const [filled, setFilled] = useState(false);
  const [counts, setCounts] = useState<number[]>(() => ATTRS.map(() => 0));

  useEffect(() => {
    if (prefersReduced()) {
      setCounts(ATTRS.map((a) => a.val));
      setFilled(true);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 950);
      const eased = 1 - Math.pow(1 - t, 3);
      setCounts(ATTRS.map((a) => Math.round(a.val * eased)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const timer = window.setTimeout(() => setFilled(true), 320);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, []);

  return { filled, counts };
}

function Meter({
  label,
  pct,
  color,
  filled,
  delay,
}: {
  label: string;
  pct: number;
  color: string;
  filled: boolean;
  delay: number;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between text-[9.5px] tracking-[0.24em] uppercase">
        <span className="text-phos-dim">{label}</span>
        <span className="text-phos tabular-nums">{pct}%</span>
      </div>
      <div className="h-2 w-full border border-phos-dim/60 bg-glass-2 p-[1px]">
        <div
          className="h-full transition-[width] duration-[1100ms] ease-out"
          style={{
            width: filled ? `${pct}%` : "0%",
            transitionDelay: `${delay}ms`,
            background: color,
            boxShadow: `0 0 8px ${color}`,
          }}
        />
      </div>
    </div>
  );
}

export default function StatusRail() {
  const { filled, counts } = useBoot();
  const [avatarOk, setAvatarOk] = useState(true);
  const unlocked = ACHIEVEMENTS.filter((a) => a.done).length;

  const avatarImg = (
    <img
      src={PROFILE.avatar}
      alt="yashaswi-khurana avatar"
      onError={() => setAvatarOk(false)}
      className="h-full w-full object-cover"
      style={{
        filter: "grayscale(1) sepia(1) saturate(3.4) hue-rotate(-14deg) contrast(1.12) brightness(0.86)",
      }}
    />
  );

  return (
    <aside className="relative min-h-0 border-b border-phos-dim/35 bg-glass/72 lg:overflow-hidden lg:border-r lg:border-b-0">
      {/* ── mobile strip ───────────────────────────── */}
      <div className="flex items-center gap-3 px-4 py-3 lg:hidden">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden border border-phos-dim/70">
          {avatarOk ? avatarImg : <div className="grid h-full w-full place-items-center bg-phos font-display text-xl font-black text-glass">
              Y
            </div>}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate font-display text-[15px] leading-none font-black tracking-tight text-bloom uppercase glow-hot">
            {PROFILE.handle}
          </div>
          <div className="mt-1.5 flex items-center gap-2">
            <span className="font-display text-[11px] font-black tracking-[0.18em] text-phos">LVL {PROFILE.level}</span>
            <div className="h-1.5 flex-1 border border-phos-dim/60 p-[1px]">
              <div
                className="h-full bg-phos transition-[width] duration-[1100ms] ease-out"
                style={{ width: filled ? `${PROFILE.xpPct}%` : "0%", boxShadow: "0 0 8px #FFB000" }}
              />
            </div>
            <span className="text-[9.5px] text-phos-dim tabular-nums">{PROFILE.xpPct}%</span>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end text-[9px] tracking-[0.18em] text-phos-dim uppercase">
          <span className="text-phos">{PROFILE.repos} repos</span>
          <span>{unlocked}/12 ach</span>
        </div>
      </div>

      {/* ── desktop character sheet ────────────────── */}
      <div className="hidden h-full flex-col overflow-y-auto px-5 py-5 lg:flex term-scroll">
        <div className="flex items-start gap-3">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden border border-phos/70 shadow-[0_0_18px_rgba(255,176,0,0.28)]">
            {avatarOk ? (
              avatarImg
            ) : (
              <div className="grid h-full w-full place-items-center bg-phos font-display text-3xl font-black text-glass">
                Y
              </div>
            )}
            <div className="crt-scanlines pointer-events-none absolute inset-0 opacity-45" />
          </div>
          <div className="min-w-0 pt-0.5">
            <div className="font-display text-[17px] leading-[1.05] font-black tracking-tight text-bloom uppercase glow-hot">
              Yashaswi
              <br />
              Khurana
            </div>
            <div className="mt-1.5 text-[9px] tracking-[0.24em] text-phos-dim uppercase">
              player profile
            </div>
          </div>
        </div>

        <div className="mt-4 border-y border-dashed border-phos-dim/45 py-2 text-[9.5px] tracking-[0.2em] text-phos-dim uppercase">
          since {PROFILE.created} · {PROFILE.days} days
        </div>

        {/* level */}
        <div className="mt-4 flex items-end gap-3">
          <div>
            <div className="text-[9.5px] tracking-[0.26em] text-phos-dim uppercase">level</div>
            <div className="font-display text-[62px] leading-[0.82] font-black tracking-[-0.04em] text-phos tabular-nums glow-hot">
              {PROFILE.level}
            </div>
          </div>
          <div className="flex-1 pb-1.5">
            <div className="text-right font-display text-[10px] font-black tracking-[0.2em] text-bloom uppercase">
              class: python
            </div>
            <div className="mt-1 text-right text-[9.5px] text-phos-dim tabular-nums">
              {PROFILE.xp.toLocaleString()} / {PROFILE.xpNext.toLocaleString()} xp
            </div>
          </div>
        </div>

        <div className="mt-3 space-y-2.5">
          <Meter
            label="xp → lvl 14"
            pct={PROFILE.xpPct}
            color="#FFB000"
            filled={filled}
            delay={180}
          />
          <Meter label="hp · shipping" pct={PROFILE.hp} color="#FF4D4D" filled={filled} delay={360} />
          <Meter label="mp · focus" pct={PROFILE.mp} color="#4DD8FF" filled={filled} delay={540} />
        </div>

        {/* attributes */}
        <div className="mt-5">
          <div className="text-[9.5px] tracking-[0.26em] text-phos-dim uppercase">attributes</div>
          <ul className="mt-2 space-y-1.5">
            {ATTRS.map((a, i) => (
              <li key={a.key} className="flex items-center gap-2 text-[11px]">
                <span className="w-9 shrink-0 tracking-[0.12em] text-phos">{a.key}</span>
                <span className="w-7 shrink-0 text-right text-bloom tabular-nums">
                  {counts[i]}
                </span>
                <span className="h-1.5 flex-1 border border-phos-dim/50 p-[1px]">
                  <span
                    className="block h-full bg-phos/85 transition-none"
                    style={{ width: `${(counts[i] / 100) * 100}%`, boxShadow: "0 0 6px rgba(255,176,0,.5)" }}
                  />
                </span>
                <span className="w-[92px] shrink-0 truncate text-right text-[9.5px] text-phos-dim">
                  {a.note}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* achievements */}
        <div className="mt-5">
          <div className="flex items-baseline justify-between">
            <span className="text-[9.5px] tracking-[0.26em] text-phos-dim uppercase">
              achievements
            </span>
            <span className="text-[9.5px] text-phos tabular-nums">{unlocked}/12</span>
          </div>
          <ul className="mt-2 space-y-1">
            {ACHIEVEMENTS.slice(0, 8).map((a, i) => (
              <li
                key={a.code}
                className="stamp flex items-center gap-2 text-[10.5px]"
                style={{ animationDelay: `${700 + i * 90}ms` }}
              >
                <span className={a.done ? "text-phos" : "text-phos-dim"}>
                  {a.done ? "[✓]" : "[ ]"}
                </span>
                <span
                  className={`truncate tracking-[0.06em] ${
                    a.done ? "text-bloom" : "text-phos-dim"
                  }`}
                >
                  {a.code}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-2 text-[9.5px] text-phos-dim">+ 4 more — run `achievements`</div>
        </div>

        {/* stat chips */}
        <div className="mt-5 grid grid-cols-3 gap-1.5 border-t border-phos-dim/45 pt-4">
          {[
            ["repos", PROFILE.repos],
            ["stars", PROFILE.starsEarned],
            ["followers", PROFILE.followers],
          ].map(([k, v]) => (
            <div key={String(k)} className="border border-phos-dim/50 bg-glass-2/70 px-1.5 py-2 text-center">
              <div className="font-display text-[17px] leading-none font-black text-phos tabular-nums glow">
                {v}
              </div>
              <div className="mt-1 text-[8.5px] tracking-[0.16em] text-phos-dim uppercase">{k}</div>
            </div>
          ))}
        </div>

        <a
          href={PROFILE.url}
          target="_blank"
          rel="noreferrer"
          className="mt-4 border border-phos/70 bg-phos px-3 py-2.5 text-center font-display text-[11px] font-black tracking-[0.2em] text-glass uppercase transition-colors duration-150 hover:bg-bloom focus-visible:ring-2 focus-visible:ring-bloom focus-visible:outline-none"
        >
          open github ↗
        </a>
        <div className="mt-3 text-center text-[9px] tracking-[0.2em] text-phos-dim uppercase">
          {unlocked}/12 unlocked · co-op open
        </div>
      </div>
    </aside>
  );
}
