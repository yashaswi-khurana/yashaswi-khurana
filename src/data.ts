export type Tone =
  | "dim"
  | "amber"
  | "hot"
  | "hp"
  | "mp"
  | "rare"
  | "cyan"
  | "banner"
  | "cmd"
  | "ok";

export type Line = { text: string; tone?: Tone };

export const BANNER = [
  "█   █  ███  ████  █   █  ███  ████  █   █ ███",
  "█   █ █   █ █     █   █ █   █ █     █   █  █ ",
  " █ █  █████ ████  █████ █████ ████  █ █ █  █ ",
  "  █   █   █     █ █   █ █   █     █ █ █ █  █ ",
  "  █   █   █ ████  █   █ █   █ ████   █ █  ███",
];

export const PROFILE = {
  handle: "yashaswi-khurana",
  bio: "Yaaay...........",
  created: "2023-05-28",
  days: "1,266",
  repos: 12,
  gists: 0,
  followers: 6,
  following: 2,
  starsEarned: 5,
  scrolls: 46,
  languages: 5,
  level: 13,
  xp: 6820,
  xpNext: 7000,
  xpPct: 64,
  hp: 88,
  mp: 72,
  lastPush: "2026-11-12",
  avatar: "https://avatars.githubusercontent.com/u/134860276?v=4",
  url: "https://github.com/yashaswi-khurana",
};

export const ATTRS: { key: string; val: number; note: string }[] = [
  { key: "INT", val: 92, note: "python · ml · dsa" },
  { key: "DEX", val: 78, note: "typescript · react" },
  { key: "CON", val: 85, note: "12 repos since 2023" },
  { key: "WIS", val: 70, note: "46 scrolls studied" },
  { key: "CHA", val: 66, note: "6 followers · 2 co-op" },
  { key: "LUCK", val: 48, note: "0 public gists" },
];

export const LANGS: { name: string; count: number; pct: number }[] = [
  { name: "Python", count: 5, pct: 42 },
  { name: "TypeScript", count: 3, pct: 25 },
  { name: "JavaScript", count: 2, pct: 17 },
  { name: "C++", count: 1, pct: 8 },
  { name: "C#", count: 1, pct: 8 },
];

export type Rarity = "LEGENDARY" | "RARE" | "COMMON" | "FORKED";

export const QUESTS: {
  id: string;
  name: string;
  rarity: Rarity;
  lang: string;
  stars: number;
  status: string;
  desc: string;
}[] = [
  {
    id: "01",
    name: "SyncAlly",
    rarity: "LEGENDARY",
    lang: "PYTHON",
    stars: 3,
    status: "ACTIVE · MIT",
    desc: "B2B trade platform: negotiation → AI term extraction → SHA-256 bilateral consensus → atomic commitment → PayPal Sandbox invoicing. FastAPI + React 19 + PostgreSQL + Temporal.",
  },
  {
    id: "02",
    name: "Game-Subwaysurfer",
    rarity: "RARE",
    lang: "TYPESCRIPT",
    stars: 0,
    status: "SHIPPED",
    desc: "Endless runner rebuilt in TypeScript. Shipped in a single day.",
  },
  {
    id: "03",
    name: "Skills",
    rarity: "RARE",
    lang: "PYTHON",
    stars: 1,
    status: "ACTIVE",
    desc: "Python toolkit, ★1 and still growing.",
  },
  {
    id: "04",
    name: "BackTesting",
    rarity: "RARE",
    lang: "PYTHON",
    stars: 1,
    status: "SHIPPED",
    desc: "Strategy backtester — lose money on paper before losing it for real.",
  },
  {
    id: "05",
    name: "OmniRoute-ChatInterface",
    rarity: "RARE",
    lang: "TYPESCRIPT",
    stars: 0,
    status: "SHIPPED",
    desc: "Chat interface shell, 219 KB of TypeScript.",
  },
  {
    id: "06",
    name: "Brainly",
    rarity: "FORKED",
    lang: "TYPESCRIPT",
    stars: 0,
    status: "MIRROR",
    desc: "Fork of the open source coding agent. Kept close, read often.",
  },
  {
    id: "07",
    name: "Pathlock",
    rarity: "COMMON",
    lang: "C#",
    stars: 0,
    status: "CLEARED",
    desc: "Assessment cleared — 44 KB of C#.",
  },
  {
    id: "08",
    name: "Job-Reccomendor-System",
    rarity: "COMMON",
    lang: "PYTHON",
    stars: 0,
    status: "CLEARED",
    desc: "College project. Submitted, graded, done.",
  },
  {
    id: "09",
    name: "SignTalk",
    rarity: "COMMON",
    lang: "PYTHON",
    stars: 0,
    status: "CLEARED",
    desc: "Sign language recognition — the first real build, 2024.",
  },
  {
    id: "10",
    name: "DSA",
    rarity: "COMMON",
    lang: "C++",
    stars: 0,
    status: "GRINDING",
    desc: "228 KB of C++ since July 2023. The grind that never ends.",
  },
  {
    id: "11",
    name: "Self-Driving-Car",
    rarity: "COMMON",
    lang: "JAVASCRIPT",
    stars: 0,
    status: "ARCHIVED",
    desc: "First repo ever pushed — 2023-07-27.",
  },
  {
    id: "12",
    name: "DPBH",
    rarity: "COMMON",
    lang: "JAVASCRIPT",
    stars: 0,
    status: "ARCHIVED",
    desc: "Early JavaScript build, 2024.",
  },
];

export const ACHIEVEMENTS: { code: string; done: boolean; note: string }[] = [
  { code: "FIRST_BLOOD", done: true, note: "2023-07-27 · Self-Driving-Car" },
  { code: "POLYGLOT", done: true, note: "5 languages in the loadout" },
  { code: "EPIC_DROP", done: true, note: "SyncAlly · 3★ · MIT" },
  { code: "FORK_PATH", done: true, note: "Brainly mirror maintained" },
  { code: "ARCADE", done: true, note: "Game-Subwaysurfer shipped" },
  { code: "GRIND", done: true, note: "228 KB of C++" },
  { code: "SCROLLS_46", done: true, note: "46 repos studied" },
  { code: "ASSESSMENT_CLEARED", done: true, note: "Pathlock · C#" },
  { code: "CLEAN_SHEET", done: true, note: "0 public gists" },
  { code: "SPEEDRUN", done: false, note: "ship a repo with 10★" },
  { code: "RAID_BOSS", done: false, note: "100 followers" },
  { code: "NG_PLUS", done: false, note: "contribute a PR upstream" },
];

export const SCROLLS: [string, string][] = [
  ["l0ng-ai/openidea", "the IDE, rebuilt in Rust"],
  ["shiyu-coder/Kronos", "foundation model for financial markets"],
  ["rasbt/LLMs-from-scratch", "build an LLM in PyTorch, from scratch"],
  ["eriklindernoren/ML-From-Scratch", "bare-bones NumPy ML"],
  ["microsoft/ML-For-Beginners", "12 weeks, 26 lessons"],
  ["loveBabbar/CodeHelp-DSA-Busted", "DSA, the college way"],
  ["mattpocock/skills", "skills for real engineers"],
  ["tiagozip/cap", "self-hosted CAPTCHA, bots out"],
  ["pocketbase/pocketbase", "realtime backend in 1 file"],
];

const bar = (pct: number, width: number) =>
  "█".repeat(Math.max(0, Math.round((pct / 100) * width))).padEnd(width, " ");

const pad = (s: string, n: number) =>
  s.length >= n ? s.slice(0, n - 1) + " " : s.padEnd(n, " ");

export const BOOT: Line[] = [
  { text: "AMBER BIOS v3.1 · 9600 baud · tty1", tone: "dim" },
  { text: "POST  keyboard ................. OK", tone: "dim" },
  { text: "POST  phosphor ................. OK", tone: "dim" },
  { text: "mount /dev/profile ............. OK", tone: "dim" },
  { text: "", tone: "dim" },
  { text: "> reveal --as player", tone: "hot" },
  ...BANNER.map((text) => ({ text, tone: "banner" as Tone })),
  { text: "", tone: "dim" },
  { text: "  LVL 13   XP 6,820 / 7,000   CLASS: PYTHON", tone: "hot" },
  { text: "  12 quests · 5★ earned · 6 followers · co-op OPEN", tone: "amber" },
  { text: "", tone: "dim" },
  { text: "loaded README.md — 187 lines. this screen is that file, running.", tone: "dim" },
  { text: "type `help` for commands — or click anywhere to type", tone: "dim" },
];

const helpLines = (): Line[] => [
  { text: "COMMANDS", tone: "hot" },
  { text: "  help          list every command", tone: "amber" },
  { text: "  whoami        identity + account stats", tone: "amber" },
  { text: "  stats         character sheet · XP · attributes", tone: "amber" },
  { text: "  quests        quest log — all 12 repos", tone: "amber" },
  { text: "  loadout       language distribution", tone: "amber" },
  { text: "  achievements  unlocked + locked", tone: "amber" },
  { text: "  scrolls       what this player studies", tone: "amber" },
  { text: "  contact       open a channel", tone: "amber" },
  { text: "  banner        re-run the intro", tone: "amber" },
  { text: "  clear         wipe the screen", tone: "amber" },
  { text: "  sudo          do it anyway", tone: "amber" },
];

const whoamiLines = (): Line[] => [
  { text: "yashaswi-khurana", tone: "hot" },
  { text: `  bio        ${PROFILE.bio}`, tone: "amber" },
  { text: `  created    ${PROFILE.created}   (${PROFILE.days} days in the arena)`, tone: "amber" },
  { text: `  repos      ${PROFILE.repos}   gists ${PROFILE.gists}   stars earned ${PROFILE.starsEarned}`, tone: "amber" },
  { text: `  followers  ${PROFILE.followers}   following ${PROFILE.following}   scrolls ${PROFILE.scrolls}`, tone: "amber" },
  { text: `  top lang   Python   last push ${PROFILE.lastPush}`, tone: "amber" },
  { text: "  location   not disclosed — fog of war", tone: "dim" },
  { text: "  status     grinding · co-op OPEN", tone: "hot" },
];

const statsLines = (): Line[] => [
  { text: "ATTR   VAL   BUILD NOTE", tone: "hot" },
  { text: "────   ───   ───────────────────────────", tone: "dim" },
  ...ATTRS.map((a) => ({
    text: `${pad(a.key, 6)}${String(a.val).padEnd(7)}${bar(a.val, 24)}  ${a.note}`,
    tone: "amber" as Tone,
  })),
  { text: "", tone: "dim" },
  { text: `HP  [${bar(PROFILE.hp, 30)}]  ${PROFILE.hp}/100  shipping stamina`, tone: "hp" },
  { text: `MP  [${bar(PROFILE.mp, 30)}]  ${PROFILE.mp}/100  focus pool`, tone: "mp" },
  { text: `XP  [${bar(PROFILE.xpPct, 30)}]  ${PROFILE.xpPct}%     ${PROFILE.xp} / ${PROFILE.xpNext} → LVL 14`, tone: "hot" },
  { text: "", tone: "dim" },
  { text: "XP = repos×250 + stars×100 + followers×150 + langs×300 + scrolls×20", tone: "dim" },
  { text: "    = 3,000 + 500 + 900 + 1,500 + 920 = 6,820   LVL = floor(XP/500) = 13", tone: "dim" },
];

const questLines = (): Line[] => [
  { text: "QUEST LOG — 12 REPOS", tone: "hot" },
  { text: "✦ LEGENDARY   ◆ RARE   · COMMON   ⇋ FORKED", tone: "dim" },
  { text: "", tone: "dim" },
  ...QUESTS.map((q) => {
    const mark = q.rarity === "LEGENDARY" ? "✦" : q.rarity === "RARE" ? "◆" : q.rarity === "FORKED" ? "⇋" : "·";
    const tone: Tone =
      q.rarity === "LEGENDARY" ? "rare" : q.rarity === "RARE" ? "cyan" : q.rarity === "FORKED" ? "hot" : "amber";
    return {
      text: `${q.id}  ${mark} ${pad(q.name, 23)}${pad(q.lang, 11)}${q.stars ? "★" + q.stars : "— "}   ${q.status}`,
      tone,
    };
  }),
  { text: "", tone: "dim" },
  { text: "BOSS FIGHT ▸ SyncAlly", tone: "rare" },
  ...wrap("  " + QUESTS[0].desc, 58).map((t) => ({ text: t, tone: "amber" as Tone })),
  { text: "", tone: "dim" },
  { text: "select a quest:  open github.com/yashaswi-khurana", tone: "dim" },
];

const loadoutLines = (): Line[] => [
  { text: "LOADOUT — languages by quest count", tone: "hot" },
  { text: "", tone: "dim" },
  ...LANGS.map((l) => ({
    text: `${pad(l.name, 12)}${bar(l.pct, 34)}  ${String(l.pct).padStart(3)}%  ×${l.count}`,
    tone: "amber" as Tone,
  })),
  { text: "", tone: "dim" },
  { text: "by bytes shipped (owned repos): python 55% · typescript 26% · html 11%", tone: "dim" },
  { text: "c++ 3% · css 3% · javascript 1% · c# 1%", tone: "dim" },
];

const achieveLines = (): Line[] => [
  { text: "ACHIEVEMENTS", tone: "hot" },
  { text: "", tone: "dim" },
  ...ACHIEVEMENTS.map((a) => ({
    text: `${a.done ? "[✓]" : "[ ]"} ${pad(a.code, 20)}${a.note}`,
    tone: (a.done ? "amber" : "dim") as Tone,
  })),
  { text: "", tone: "dim" },
  { text: "9 / 12 unlocked · 3 remaining", tone: "hot" },
];

const scrollLines = (): Line[] => [
  { text: `SCROLLS STUDIED — ${PROFILE.scrolls} starred, highlights:`, tone: "hot" },
  { text: "", tone: "dim" },
  ...SCROLLS.map(([repo, note]) => ({
    text: `${pad(repo, 32)}${note}`,
    tone: "amber" as Tone,
  })),
];

const contactLines = (): Line[] => [
  { text: "CHANNELS", tone: "hot" },
  { text: `  github    ${PROFILE.url}`, tone: "amber" },
  { text: "  repos     github.com/yashaswi-khurana?tab=repositories", tone: "amber" },
  { text: "  co-op     open an issue · pick a quest · let's build", tone: "hot" },
  { text: "  replies   usually within one commit cycle", tone: "dim" },
];

const bannerLines = (): Line[] => [
  ...BANNER.map((text) => ({ text, tone: "banner" as Tone })),
  { text: "  LVL 13   XP 6,820 / 7,000   CLASS: PYTHON", tone: "hot" },
];

function wrap(text: string, width: number): string[] {
  const words = text.split(" ");
  const out: string[] = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > width) {
      out.push(line.trimEnd());
      line = w;
    } else {
      line = (line + " " + w).trimStart();
    }
  }
  if (line) out.push(line);
  return out;
}

export function runCommand(raw: string): { lines: Line[]; clear?: boolean } {
  const cmd = raw.trim().toLowerCase();
  switch (cmd) {
    case "":
      return { lines: [] };
    case "help":
    case "?":
      return { lines: helpLines() };
    case "whoami":
      return { lines: whoamiLines() };
    case "stats":
    case "status":
      return { lines: statsLines() };
    case "quests":
    case "ls":
    case "repos":
      return { lines: questLines() };
    case "loadout":
    case "langs":
    case "languages":
      return { lines: loadoutLines() };
    case "achievements":
    case "ach":
      return { lines: achieveLines() };
    case "scrolls":
    case "stars":
      return { lines: scrollLines() };
    case "contact":
      return { lines: contactLines() };
    case "banner":
      return { lines: bannerLines() };
    case "clear":
    case "cls":
      return { lines: [], clear: true };
    case "sudo":
      return {
        lines: [
          { text: "[sudo] password for yashaswi: ▮▮▮▮▮▮▮▮", tone: "dim" },
          { text: "yashaswi is not in the sudoers file.", tone: "hp" },
          { text: "this incident has been reported to the raid group.", tone: "hp" },
        ],
      };
    case "exit":
    case "quit":
      return { lines: [{ text: "there is no exit from the terminal. only ctrl+c.", tone: "dim" }] };
    default:
      return {
        lines: [
          { text: `command not found: ${raw.trim()}`, tone: "hp" },
          { text: "type `help` to list commands", tone: "dim" },
        ],
      };
  }
}
