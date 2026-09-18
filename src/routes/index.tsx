import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight, Bell, Bot, Building2, ChevronDown, Crosshair, Expand,
  FileText, Grid2X2, Heat, Home, Info, Layers3, Leaf, Map, Menu,
  Moon, Search, Settings, Sparkles, Thermometer, TrendingUp, X,
  ZoomIn, ZoomOut,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import skyline from "@/assets/bengaluru-skyline.jpg";
import park from "@/assets/bengaluru-park.jpg";
import mapImage from "@/assets/bengaluru-map.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HeatLens — Bengaluru Urban Heat Intelligence" },
      { name: "description", content: "Explore Bengaluru's urban heat risk, microclimates, and greener futures." },
      { property: "og:title", content: "HeatLens — Bengaluru Urban Heat Intelligence" },
      { property: "og:description", content: "Explore Bengaluru's urban heat risk, microclimates, and greener futures." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const nav = [
  ["Overview", Home], ["Explore", Search], ["Ward Intelligence", Map],
  ["HeatLens AI", Bot], ["Reports", FileText],
] as const;

const stats = [
  { value: "23.4%", label: "High Heat Risk Wards", note: "↑ 4.2% from last year", icon: Heat, tone: "hot" },
  { value: "42.1°C", label: "Highest Observed LST", note: "Central Zone", icon: Thermometer, tone: "cool" },
  { value: "369", label: "Total Wards", note: "Greater Bengaluru Area", icon: Grid2X2, tone: "green" },
  { value: "17", label: "Persistent Heat Pockets", note: "> 3 consecutive observations", icon: TrendingUp, tone: "violet" },
] as const;

const insights = [
  { title: "Central & East Bengaluru show highest heat risk", text: "Consistently high LST and low vegetation.", icon: Heat, tone: "hot" },
  { title: "Wards with higher green cover are up to 4.2°C cooler", text: "NDVI shows strong negative correlation with LST.", icon: Leaf, tone: "green" },
  { title: "17 ward clusters show persistent heat pockets", text: "High risk across 3+ observations.", icon: TrendingUp, tone: "violet" },
  { title: "Future model indicates rising risk in southern wards", text: "Action needed for vulnerable zones.", icon: Info, tone: "blue" },
] as const;

function ActionButton({ children, className = "", onClick, label }: { children: ReactNode; className?: string; onClick?: () => void; label?: string }) {
  return <button type="button" aria-label={label} onClick={onClick} className={`action-button ${className}`}>{children}</button>;
}

function HeatMap() {
  const cells = Array.from({ length: 14 * 12 });
  return (
    <div className="map-stage">
      <img src={mapImage} alt="Satellite map of Bengaluru" width={1536} height={1024} loading="lazy" />
      <div className="heat-grid" aria-label="Heat risk overlay">
        {cells.map((_, index) => {
          const x = index % 14;
          const y = Math.floor(index / 14);
          const d = Math.sqrt((x - 6.5) ** 2 + (y - 5.5) ** 2);
          const level = d < 2.4 ? "risk-5" : d < 3.6 ? "risk-4" : d < 4.8 ? "risk-3" : d < 5.8 ? "risk-2" : "risk-1";
          return <span key={index} className={level} />;
        })}
      </div>
      <div className="map-label label-north">Yelahanka</div>
      <div className="map-label label-west">Yeshwanthpur</div>
      <div className="map-label label-east">K R Puram</div>
      <div className="map-label label-south">Electronic City</div>
      <div className="map-tooltip">
        <strong>Ward: Central_57</strong><span>Area: Cottonpete</span><span>Risk Level: <b>● High</b></span>
        <span>LST: 41.3°C</span><span>Future Risk: 68.2%</span><a href="#details">View Ward Details →</a>
      </div>
      <div className="map-tools">
        <ActionButton label="Zoom in"><ZoomIn /></ActionButton><ActionButton label="Zoom out"><ZoomOut /></ActionButton>
        <ActionButton label="Center map"><Crosshair /></ActionButton><ActionButton label="Map layers"><Layers3 /></ActionButton>
      </div>
      <div className="legend"><span>Lower Risk</span><i /><span>Higher Risk</span></div>
    </div>
  );
}

function Dashboard() {
  const [active, setActive] = useState("Overview");
  const [mode, setMode] = useState("Risk");
  const [sidebar, setSidebar] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <main className="app-shell">
      <aside className={sidebar ? "sidebar sidebar-open" : "sidebar"}>
        <div className="brand"><div className="brand-mark"><span /><i /></div><div><b>HEATLENS</b><small>COOLER CITIES. BRIGHTER FUTURES.</small></div></div>
        <nav>{nav.map(([name, Icon]) => <ActionButton key={name} onClick={() => setActive(name)} className={active === name ? "nav-item active" : "nav-item"}><Icon /><span>{name}</span></ActionButton>)}</nav>
        <div className="sidebar-photo"><img src={park} alt="Tree-lined park in Bengaluru" width={1024} height={768} loading="lazy" /></div>
        <div className="location"><div><Leaf /> Bengaluru, India <ArrowRight /></div><strong><Moon /> 31°C</strong><span>Mostly Clear</span></div>
        <div className="sidebar-links"><span><Settings /> Settings</span><span><Info /> About</span></div>
        <blockquote>“Data for a cooler,<br /> healthier tomorrow.”</blockquote>
      </aside>

      <section className="workspace">
        <header className="hero">
          <img src={skyline} alt="Bengaluru skyline at dusk" width={1920} height={1024} />
          <div className="topbar">
            <ActionButton className="mobile-menu" onClick={() => setSidebar(!sidebar)} label="Toggle navigation"><Menu /></ActionButton>
            <label className="search"><Search /><input placeholder="Search wards, areas or insights..." /><span>⌘ K</span></label>
            <ActionButton className="icon-button" label="Notifications"><Bell /><i /></ActionButton><div className="avatar">K</div>
          </div>
          <div className="hero-copy"><h1>Read the city<br />through its <em>heat signal.</em></h1><p>Bengaluru’s microclimates tell a story. Explore, understand, and build a cooler tomorrow.</p></div>
          <div className="hero-script">Bengaluru<br />Breathes<br />Brighter</div>
          <div className="clock"><small>FRI, 18 SEP 2026</small><strong>7:24 PM</strong><i>“Cooler cities.<br />Healthier lives.”</i></div>
        </header>

        <div className="dashboard-body">
          <div className="stats-row">{stats.map(({ value, label, note, icon: Icon, tone }) => <article className={`stat ${tone}`} key={label}><div className="stat-icon"><Icon /></div><div><strong>{value}</strong><span>{label}</span><small>{note}</small></div></article>)}</div>
          <div className="content-grid">
            <section className={expanded ? "map-card expanded" : "map-card"}>
              <div className="panel-heading"><div><h2>Bengaluru Heat Risk Landscape</h2><p>Explore ward-level heat risk, persistence, and future vulnerability.</p></div><div className="segments">{["Risk", "Persistence", "Future Risk"].map(item => <ActionButton key={item} onClick={() => setMode(item)} className={mode === item ? "selected" : ""}>{item}</ActionButton>)}</div></div>
              <HeatMap />
              <ActionButton className="fullscreen" onClick={() => setExpanded(!expanded)}><Expand /> {expanded ? "Exit Fullscreen" : "View Fullscreen"}</ActionButton>
            </section>
            <aside className="right-column">
              <section className="insights"><div className="panel-heading"><h2><Sparkles /> Key Insights</h2><a href="#insights">View All <ArrowRight /></a></div>{insights.map(({ title, text, icon: Icon, tone }) => <article key={title}><div className={`insight-icon ${tone}`}><Icon /></div><div><strong>{title}</strong><p>{text}</p></div></article>)}</section>
              <section className="trend"><div className="panel-heading"><div><h2>Land Surface Temperature Trend</h2><p>Bengaluru (Average LST)</p></div><ActionButton>Past 12 Months <ChevronDown /></ActionButton></div><svg viewBox="0 0 420 120" role="img" aria-label="Temperature trend line"><defs><linearGradient id="line" x1="0" x2="1"><stop stopColor="var(--chart-warm)"/><stop offset="1" stopColor="var(--chart-hot)"/></linearGradient></defs><path className="gridline" d="M0 25H420M0 58H420M0 91H420"/><path className="trend-fill" d="M0 86 C45 78 74 48 118 45 S190 76 235 84 S303 56 340 63 S390 72 420 79 L420 105 L0 105Z"/><path className="trend-line" d="M0 86 C45 78 74 48 118 45 S190 76 235 84 S303 56 340 63 S390 72 420 79"/></svg><div className="months">Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec</div></section>
            </aside>
          </div>
          <div className="bottom-row"><blockquote>“A cooler Bengaluru is a healthier, more equitable Bengaluru.”</blockquote><article><img src={park} alt="Green Bengaluru park" width={1024} height={768} loading="lazy"/><span><b>More Green</b>Healthier Lives</span></article><article><img src={skyline} alt="Bengaluru skyline" width={1920} height={1024} loading="lazy"/><span><b>Data Today</b>A Cooler Tomorrow</span></article><article><img src={skyline} alt="Bengaluru city at dusk" width={1920} height={1024} loading="lazy"/><span><b>People. Places.</b>A Resilient Tomorrow.</span></article></div>
        </div>
      </section>
      {sidebar && <ActionButton className="scrim" onClick={() => setSidebar(false)} label="Close navigation"><X /></ActionButton>}
    </main>
  );
}