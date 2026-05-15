import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Folder, FolderOpen, X, ChevronRight, ScanLine, Heart, Power, ArrowLeft
} from "lucide-react";
import p1 from "@/assets/heizel/p1.jpg";
import p2 from "@/assets/heizel/p2.jpg";
import p3 from "@/assets/heizel/p3.jpg";
import p4 from "@/assets/heizel/p4.jpg";
import p5 from "@/assets/heizel/p5.jpg";
import p6 from "@/assets/heizel/p6.jpg";
import p7 from "@/assets/heizel/p7.jpg";
import p8 from "@/assets/heizel/p8.jpg";

export const Route = createFileRoute("/")({
  component: HackerBirthday,
});

type Stage = "intro" | "loading" | "explorer" | "memories" | "final";

const PHOTOS = [
  { src: p1, caption: "EVIDENCE_001 :: subject caught being soft. puppy accomplice present." },
  { src: p2, caption: "EVIDENCE_002 :: archival footage. pre-chaos era. cake = motive." },
  { src: p3, caption: "EVIDENCE_003 :: mirror selfie protocol activated. iconic posture confirmed." },
  { src: p4, caption: "EVIDENCE_004 :: bathroom summit. duck-face diplomacy in session." },
  { src: p5, caption: "EVIDENCE_005 :: classified. too iconic to describe." },
  { src: p6, caption: "EVIDENCE_006 :: redacted. main character energy off the charts." },
  { src: p7, caption: "EVIDENCE_007 :: subject located. vibes immaculate." },
  { src: p8, caption: "EVIDENCE_008 :: caught laughing at her own joke. again." },
];

const FOLDERS = [
  { name: "CLASSIFIED_MEMORIES", count: "23 files", id: "memories", clickable: true },
  { name: "EMBARRASSING_PHOTOS", count: "67 files", id: "embarrassing" },
  { name: "CRINGE_ARCHIVE", count: "99+ files", id: "cringe" },
  { name: "VOICE_NOTES", count: "12 files", id: "voice" },
  { name: "TOP_SECRET_DOCUMENTS", count: "5 files", id: "topsecret" },
  { name: "BIRTHDAY_MESSAGE", count: "1 file", id: "bday" },
];

function HackerBirthday() {
  const [stage, setStage] = useState<Stage>("intro");
  const [openPhoto, setOpenPhoto] = useState<number | null>(null);

  return (
    <div className="scanlines crt-vignette grain min-h-screen text-terminal font-mono selection:bg-terminal selection:text-background">
      <TopBar />

      {stage === "intro" && <IntroPopup onContinue={() => setStage("loading")} />}
      {stage === "loading" && <LoadingScreen onDone={() => setStage("explorer")} />}
      {stage === "explorer" && <ExplorerView onOpenMemories={() => setStage("memories")} />}
      {stage === "memories" && (
        <MemoriesView
          onBack={() => setStage("explorer")}
          onViewAll={() => setStage("final")}
          onOpenPhoto={setOpenPhoto}
        />
      )}
      {stage === "final" && <FinalMessage onBack={() => setStage("memories")} />}

      {openPhoto !== null && (
        <PhotoModal photo={PHOTOS[openPhoto]} index={openPhoto} onClose={() => setOpenPhoto(null)} />
      )}
    </div>
  );
}

/* ---------- TOP BAR ---------- */
function TopBar() {
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    const fmt = () => setTime(new Date().toISOString().replace("T", " ").slice(0, 19));
    fmt();
    const i = setInterval(fmt, 1000);
    return () => clearInterval(i);
  }, []);
  return (
    <div className="border-b border-terminal/30 px-4 md:px-6 py-2 flex justify-between text-xs md:text-sm flicker">
      <div className="space-y-0.5">
        <div>&gt; <span className="text-terminal-bright">root@heizel-db</span>:~$ access --grant</div>
        <div className="opacity-70">&gt; status: <span className="text-danger">COMPROMISED</span></div>
      </div>
      <div className="text-right space-y-0.5">
        <div>SYSTEM: <span className="text-terminal-bright">[FRIEND_DATABASE]</span></div>
        <div className="opacity-70 min-h-[1em]" suppressHydrationWarning>{time} {time && "UTC"}</div>
      </div>
    </div>
  );
}

/* ---------- 1. INTRO POPUP ---------- */
function IntroPopup({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="fade-rise min-h-[calc(100vh-60px)] flex items-center justify-center px-4 py-12">
      <div className="panel max-w-3xl w-full p-6 md:p-10 text-center relative">
        <div className="absolute top-3 right-3 flex gap-1">
          <span className="size-3 border border-terminal/60" />
          <span className="size-3 border border-terminal/60" />
          <span className="size-3 border border-danger/80 bg-danger/30" />
        </div>
        <div className="text-xs uppercase tracking-[0.4em] opacity-70 mb-6">// unauthorized access detected</div>
        <h1
          data-text="HEIZEL HAS BEEN HACKED"
          className="glitch text-glow-strong text-terminal-bright font-display leading-[0.95] text-4xl sm:text-5xl md:text-7xl tracking-tight"
        >
          HEIZEL HAS BEEN HACKED
        </h1>
        <p className="mt-6 text-sm md:text-base opacity-80">
          &gt; unauthorized access to <span className="text-terminal-bright text-glow">classified memories</span> detected_
          <span className="cursor-blink" />
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={onContinue}
            className="px-5 py-3 border border-terminal text-glow uppercase tracking-widest text-xs hover:bg-terminal hover:text-background transition box-glow animate-pulse"
          >
            &gt; initiate_hack
          </button>
        </div>
        <div className="mt-6 text-[10px] opacity-50">[ press button to continue ]</div>
      </div>
    </div>
  );
}

/* ---------- 2. LOADING ---------- */
function LoadingScreen({ onDone }: { onDone: () => void }) {
  const lines = [
    "> initiating hack.exe",
    "> bypassing security firewall...",
    "> tracing IP... 192.168.0.HEIZEL",
    "> decrypting friendship.db",
    "> extracting classified memories...",
    "> ACCESS GRANTED.",
  ];
  const [shown, setShown] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (shown < lines.length) {
      const t = setTimeout(() => setShown(shown + 1), 420);
      return () => clearTimeout(t);
    }
    const start = Date.now();
    const iv = setInterval(() => {
      const p = Math.min(100, (Date.now() - start) / 22);
      setProgress(p);
      if (p >= 100) { clearInterval(iv); setTimeout(onDone, 500); }
    }, 30);
    return () => clearInterval(iv);
  }, [shown]);

  return (
    <div className="fade-rise min-h-[calc(100vh-60px)] flex items-center justify-center px-4 py-12">
      <div className="panel max-w-2xl w-full p-6 md:p-8 space-y-6">
        <div className="text-xs uppercase tracking-widest opacity-70">// running hack.exe</div>
        <div className="space-y-1 text-sm md:text-base min-h-[180px]">
          {lines.slice(0, shown).map((l, i) => (
            <div key={i} className={`fade-rise ${l.includes("GRANTED") ? "text-terminal-bright text-glow" : "text-glow"}`}>{l}</div>
          ))}
          {shown < lines.length && <div className="cursor-blink text-terminal-bright">&nbsp;</div>}
        </div>
        {shown >= lines.length && (
          <div className="space-y-2">
            <div className="text-xs uppercase opacity-70 tracking-widest">accessing files...</div>
            <div className="h-4 border border-terminal/60 box-glow relative overflow-hidden">
              <div className="h-full bg-terminal text-glow transition-[width] duration-75" style={{ width: `${progress}%`, boxShadow: "0 0 12px var(--color-terminal)" }} />
            </div>
            <div className="text-right text-xs">{Math.floor(progress)}%</div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- 3. EXPLORER ---------- */
function ExplorerView({ onOpenMemories }: { onOpenMemories: () => void }) {
  return (
    <div className="fade-rise mx-auto max-w-4xl px-4 md:px-6 py-10 space-y-4">
      <div className="text-xs uppercase tracking-widest opacity-70">&gt; access granted. select a folder to continue<span className="cursor-blink" /></div>
      <aside className="panel p-4 md:p-6">
        <Header title="FILE_EXPLORER" right={<span className="text-[10px] opacity-70">{FOLDERS.length} folders</span>} />
        <ul className="mt-4 space-y-2 text-sm">
          {FOLDERS.map((f, i) => {
            const clickable = f.clickable;
            return (
              <li key={f.id} className="fade-rise" style={{ animationDelay: `${i * 80}ms` }}>
                <button
                  onClick={clickable ? onOpenMemories : undefined}
                  disabled={!clickable}
                  className={`w-full text-left px-3 py-3 border flex items-center gap-3 transition-all duration-200
                    ${clickable
                      ? "border-terminal/40 hover:border-terminal hover:text-glow hover:bg-terminal/10 hover:box-glow cursor-pointer"
                      : "border-terminal/20 opacity-50 cursor-not-allowed"}`}
                >
                  <Folder className="size-5 shrink-0" />
                  <span className="flex-1">
                    <span className="block">{f.name}</span>
                    <span className="block text-[11px] opacity-60">{f.count}{!clickable && " — locked"}</span>
                  </span>
                  {clickable
                    ? <ChevronRight className="size-4" />
                    : <span className="text-[10px] uppercase tracking-widest text-danger/80">[locked]</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </aside>
      <div className="text-center text-[10px] opacity-50">// click CLASSIFIED_MEMORIES to extract files</div>
    </div>
  );
}

/* ---------- HEADER ---------- */
function Header({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-terminal/30 pb-2 text-xs uppercase tracking-widest">
      <div className="flex items-center gap-2">
        <span className="text-terminal-bright">▸</span>
        <span className="text-glow">{title}</span>
      </div>
      <div className="flex items-center gap-2 opacity-70">
        {right}
        <X className="size-3 hover:text-danger cursor-pointer" />
      </div>
    </div>
  );
}

/* ---------- 4. MEMORIES ---------- */
function MemoriesView({
  onBack, onViewAll, onOpenPhoto,
}: { onBack: () => void; onViewAll: () => void; onOpenPhoto: (i: number) => void }) {
  return (
    <div className="fade-rise mx-auto max-w-5xl px-4 md:px-6 py-10 space-y-4">
      <button onClick={onBack} className="text-xs uppercase tracking-widest opacity-70 hover:text-glow inline-flex items-center gap-1">
        <ArrowLeft className="size-3" /> back_to_file_explorer
      </button>
      <section className="panel p-4 md:p-6">
        <Header title="CLASSIFIED_MEMORIES" right={<span>{PHOTOS.length} files</span>} />
        <div className="mt-2 text-xs opacity-70">&gt; loading evidence<span className="cursor-blink" /></div>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {PHOTOS.map((p, i) => (
            <button
              key={i}
              onClick={() => onOpenPhoto(i)}
              className="photo-scan group relative aspect-square border border-terminal/40 overflow-hidden hover:border-terminal hover:box-glow transition fade-rise"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <img src={p.src} alt={`Heizel evidence ${i + 1}`} loading="lazy" className="size-full object-cover transition" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
              <div className="absolute top-1 left-1 text-[10px] bg-black/80 px-1 border border-terminal/60 text-glow">
                EVD_{String(i + 1).padStart(3, "0")}
              </div>
              <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition">
                <ScanLine className="size-3 text-terminal-bright" />
              </div>
            </button>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={onViewAll}
            className="px-5 py-3 border border-terminal text-glow uppercase tracking-widest text-xs hover:bg-terminal hover:text-background transition box-glow animate-pulse"
          >
            &gt; view_all_files
          </button>
        </div>
      </section>
    </div>
  );
}

/* ---------- PHOTO MODAL ---------- */
function PhotoModal({ photo, index, onClose }: { photo: typeof PHOTOS[0]; index: number; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[150] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 fade-rise" onClick={onClose}>
      <div className="panel max-w-2xl w-full p-4" onClick={(e) => e.stopPropagation()}>
        <Header title={`EVIDENCE_${String(index + 1).padStart(3, "0")}.jpg`} right={<button onClick={onClose}><X className="size-4 hover:text-danger" /></button>} />
        <div className="mt-3 photo-scan border border-terminal/40">
          <img src={photo.src} alt="" className="w-full max-h-[60vh] object-contain bg-black" />
        </div>
        <div className="mt-3 text-sm">
          <div className="text-xs uppercase tracking-widest opacity-70">&gt; caption.log</div>
          <p className="mt-1 text-glow">{photo.caption}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- 5. FINAL MESSAGE ---------- */
function FinalMessage({ onBack }: { onBack: () => void }) {
  const particles = useMemo(() =>
    Array.from({ length: 60 }).map(() => ({
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 5,
      size: 2 + Math.random() * 4,
      hue: 100 + Math.random() * 60,
    })), []);

  return (
    <div className="fade-rise relative min-h-[calc(100vh-60px)] flex items-center justify-center px-4 py-12 overflow-hidden">
      {particles.map((p, i) => (
        <span
          key={i}
          className="particle absolute rounded-full pointer-events-none"
          style={{
            left: `${p.left}%`, bottom: 0,
            width: p.size, height: p.size,
            background: `hsl(${p.hue} 100% 70%)`,
            boxShadow: `0 0 8px hsl(${p.hue} 100% 60%)`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
      <div className="panel max-w-2xl w-full p-8 md:p-10 text-center relative z-10 space-y-6">
        <div className="text-xs uppercase tracking-[0.4em] opacity-70">&gt; system.calm = true</div>
        <h2 className="font-display text-4xl md:text-6xl text-glow-strong text-terminal-bright leading-tight">
          HAPPY BIRTHDAY,<br />HEIZEL &lt;3
        </h2>
        <p className="text-base md:text-lg opacity-90 leading-relaxed">
          thanks for existing. the system wouldn't be the same without you in it.
        </p>
        <p className="text-sm opacity-80 leading-relaxed">
          here's to every late-night call, every chaotic plan, every laugh we'll never explain to anyone else.
          you're the main character. always.
        </p>
        <div className="flex justify-center"><Heart className="size-6 text-danger animate-pulse" /></div>
        <div className="pt-2 flex flex-wrap gap-3 justify-center">
          <button
            onClick={onBack}
            className="px-4 py-2 border border-terminal/60 text-glow uppercase tracking-widest text-xs hover:bg-terminal hover:text-background transition"
          >
            <ArrowLeft className="inline size-3 mr-1" /> back
          </button>
        </div>
        <div className="text-[10px] opacity-50 pt-2 flex items-center justify-center gap-2">
          <Power className="size-3" /> // transmission ends //
        </div>
      </div>
    </div>
  );
}
