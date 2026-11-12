import { useEffect, useRef, useState } from "react";
import { BOOT, runCommand, type Line, type Tone } from "../data";

const TONE: Record<Tone, string> = {
  dim: "text-phos-dim glow-dim",
  amber: "text-phos glow",
  hot: "text-bloom glow-hot",
  hp: "text-hp",
  mp: "text-mp",
  rare: "text-rare glow",
  cyan: "text-mp glow",
  banner: "text-phos glow",
  cmd: "text-bloom glow-hot",
  ok: "text-phos glow",
};

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [partial, setPartial] = useState<Line | null>(null);
  const [booting, setBooting] = useState(true);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* boot sequence — types out line by line */
  useEffect(() => {
    setLines([]);
    setPartial(null);
    if (prefersReduced()) {
      setLines(BOOT);
      setBooting(false);
      return;
    }
    let li = 0;
    let ci = 0;
    const id = window.setInterval(() => {
      if (li >= BOOT.length) {
        window.clearInterval(id);
        setPartial(null);
        setBooting(false);
        return;
      }
      const line = BOOT[li];
      ci += 4;
      if (ci >= line.text.length) {
        setLines((p) => [...p, line]);
        setPartial(null);
        li += 1;
        ci = 0;
      } else {
        setPartial({ text: line.text.slice(0, ci), tone: line.tone });
      }
    }, 14);
    return () => window.clearInterval(id);
  }, []);

  /* keep the paper scrolling */
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, partial]);

  /* hand over the prompt when the machine is warm */
  useEffect(() => {
    if (!booting) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 60);
      return () => window.clearTimeout(t);
    }
  }, [booting]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = input.trim();
    setInput("");
    setHistIdx(-1);
    if (!raw) return;
    setHistory((h) => [raw, ...h].slice(0, 40));
    const { lines: out, clear } = runCommand(raw);
    if (clear) {
      setLines([]);
      return;
    }
    setLines((p) => [...p, { text: `> ${raw}`, tone: "cmd" }, ...out]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      if (next >= 0) {
        setHistIdx(next);
        setInput(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = histIdx - 1;
      setHistIdx(next);
      setInput(next >= 0 ? history[next] : "");
    }
  };

  const lineClass = (tone: Tone) =>
    `${TONE[tone]} ${
      tone === "banner"
        ? "text-[10px] sm:text-[12px] md:text-[13.5px] whitespace-pre"
        : "whitespace-pre-wrap"
    }`;

  return (
    <section className="relative flex h-[64vh] min-h-0 flex-col bg-glass/55 lg:h-auto">
      {/* title bar */}
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-phos-dim/35 px-4 py-2 text-[10px] tracking-[0.26em] text-phos-dim uppercase sm:px-6">
        <span className="flex min-w-0 items-center gap-2 truncate">
          <span className="inline-block h-1.5 w-1.5 shrink-0 bg-phos" />
          zsh — ~/yashaswi-khurana
        </span>
        <span className="hidden shrink-0 sm:inline">click anywhere · type to interact</span>
        <span className="shrink-0 text-phos">tty1</span>
      </header>

      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        className="term-scroll min-h-0 flex-1 overflow-y-auto px-4 py-5 text-[12px] leading-[1.62] sm:px-6 sm:text-[13px] md:text-[13.5px]"
        style={{ overflowWrap: "anywhere" }}
      >
        <div className="mx-auto w-full max-w-[74ch]">
          {lines.map((l, i) => (
            <pre key={i} className={`m-0 font-mono ${lineClass(l.tone ?? "amber")}`}>
              {l.text || " "}
            </pre>
          ))}

          {booting && partial && (
            <pre className={`m-0 font-mono ${lineClass(partial.tone ?? "amber")}`}>
              {partial.text}
              <span className="cursor text-bloom">▮</span>
            </pre>
          )}

          {!booting && (
            <form onSubmit={submit} className="mt-1 flex items-start gap-2">
              <span className="shrink-0 text-phos-dim glow-dim select-none">&gt;</span>
              <div className="relative min-h-[1.62em] flex-1">
                <span className="whitespace-pre text-bloom glow-hot">{input}</span>
                <span
                  aria-hidden
                  className="cursor absolute top-0 text-bloom glow-hot select-none"
                  style={{ left: `${input.length}ch` }}
                >
                  ▮
                </span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  maxLength={30}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  aria-label="terminal command input"
                  className="absolute inset-0 h-full w-full bg-transparent text-transparent caret-transparent outline-none"
                />
              </div>
            </form>
          )}
        </div>
      </div>

      {/* bottom status strip */}
      <footer className="flex shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-phos-dim/35 px-4 py-2 text-[9.5px] tracking-[0.22em] text-phos-dim uppercase sm:px-6 sm:text-[10px]">
        <span>9600 baud · phosphor P3 amber</span>
        <span className="text-phos">LVL 13 · XP 6820/7000</span>
        <span className="hidden sm:inline">co-op: open</span>
      </footer>
    </section>
  );
}
