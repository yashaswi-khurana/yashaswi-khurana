"""Render a 30-day contribution area chart as assets/activity.svg (amber/black theme).
Uses the GitHub GraphQL API with GITHUB_TOKEN. No third-party deps."""
import json, os, sys, urllib.request
from datetime import datetime, timedelta, timezone

USER = os.environ.get("GH_USER", "yashaswi-khurana")
TOKEN = os.environ.get("GITHUB_TOKEN", "")
OUT = os.environ.get("OUT", "assets/activity.svg")
DAYS = 30

def fetch():
    end = datetime.now(timezone.utc)
    start = end - timedelta(days=DAYS)
    q = """query($u:String!,$f:DateTime!,$t:DateTime!){user(login:$u){contributionsCollection(from:$f,to:$t){
      contributionCalendar{weeks{contributionDays{date contributionCount}}}}}}"""
    body = json.dumps({"query": q, "variables": {"u": USER, "f": start.isoformat(), "t": end.isoformat()}}).encode()
    req = urllib.request.Request("https://api.github.com/graphql", body,
        {"Authorization": f"bearer {TOKEN}", "Content-Type": "application/json", "User-Agent": "activity-graph"})
    data = json.load(urllib.request.urlopen(req, timeout=30))
    weeks = data["data"]["user"]["contributionsCollection"]["contributionCalendar"]["weeks"]
    days = {d["date"]: d["contributionCount"] for w in weeks for d in w["contributionDays"]}
    return days

def render(days):
    today = datetime.now(timezone.utc).date()
    series = []
    for i in range(DAYS - 1, -1, -1):
        d = today - timedelta(days=i)
        series.append((d, days.get(d.isoformat(), 0)))
    W, H, L, R, T, B = 900, 260, 50, 20, 50, 40
    mx = max(max(c for _, c in series), 4)
    pw, ph = W - L - R, H - T - B
    pts = [(L + pw * i / (len(series) - 1), T + ph * (1 - c / mx)) for i, (_, c) in enumerate(series)]
    line = " ".join(f"{x:.1f},{y:.1f}" for x, y in pts)
    area = f"{L},{T+ph} {line} {L+pw},{T+ph}"
    total = sum(c for _, c in series)
    grid = "".join(
        f'<line x1="{L}" x2="{W-R}" y1="{T+ph*k/4:.1f}" y2="{T+ph*k/4:.1f}" stroke="#FFB000" stroke-opacity="0.15"/>'
        f'<text x="{L-8}" y="{T+ph*k/4+4:.1f}" fill="#9A7A3A" font-size="11" text-anchor="end">{round(mx*(1-k/4))}</text>'
        for k in range(5))
    xl = "".join(
        f'<text x="{pts[i][0]:.1f}" y="{H-14}" fill="#9A7A3A" font-size="11" text-anchor="middle">{series[i][0].strftime("%b %d")}</text>'
        for i in range(0, len(series), 5))
    dots = "".join(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="3" fill="#fff"/>' for (x, y), (_, c) in zip(pts, series) if c)
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" font-family="monospace">
<rect width="{W}" height="{H}" rx="8" fill="#0A0705" stroke="#FFB000" stroke-opacity="0.5"/>
<text x="{L}" y="30" fill="#FFB000" font-size="16" font-weight="bold">&gt; XP LOG // LAST {DAYS} DAYS</text>
<text x="{W-R}" y="30" fill="#FFD27A" font-size="13" text-anchor="end">{total} contributions</text>
{grid}<polygon points="{area}" fill="#FFB000" fill-opacity="0.2"/>
<polyline points="{line}" fill="none" stroke="#FFB000" stroke-width="2.5" stroke-linejoin="round"/>
{dots}{xl}</svg>'''

if __name__ == "__main__":
    days = json.load(open(sys.argv[1])) if len(sys.argv) > 1 else fetch()
    os.makedirs(os.path.dirname(OUT) or ".", exist_ok=True)
    open(OUT, "w").write(render(days))
    print("wrote", OUT)