import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Folder, FolderOpen, X, ChevronRight, Lock, FileText,
  Image as ImageIcon, ScanLine, Heart, Power
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
  { name: "CLASSIFIED_MEMORIES", count: "23 files", id: "memories" },
  { name: "EMBARRASSING_PHOTOS", count: "67 files", id: "embarrassing" },
  { name: "CRINGE_ARCHIVE", count: "99+ files", id: "cringe" },
  { name: "VOICE_NOTES", count: "12 files", id: "voice" },
  { name: "TOP_SECRET_DOCUMENTS", count: "5 files", id: "topsecret" },
  { name: "BIRTHDAY_MESSAGE", count: "1 file", id: "bday" },
];

const HACK_LINES = [
  "[SYSTEM] Initializing memory extraction...",
  "[SYSTEM] Bypassing emotional firewall...",
  "[SYSTEM] Recovering embarrassing files... 67 located.",
  "[SYSTEM] Subject detected: HEIZEL",
  "[SYSTEM] Cross-referencing chaotic patterns...",
  "[WARN]   subject too iconic. proceed with caution.",
  "[SYSTEM] Indexing late-night overthinking logs...",
  "[SYSTEM] Decrypting laughter database...",
  "[WARN]   highly contagious giggle detected.",
  "[SYSTEM] Birthday protocol activated.",
  "[SYSTEM] Loading message of the year...",
  "[ OK ]   ready.",
];

function HackerBirthday() {
  const [booted, setBooted] = useState(false);
  const [openPhoto, setOpenPhoto] = useState<number | null>(null);
  const [openFolder, setOpenFolder] = useState<string>("memories");
  const [finalOpen, setFinalOpen] = useState(false);

  return (
    <div className="scanlines crt-vignette grain min-h-screen text-terminal font-mono selection:bg-terminal selection:text-background">
      {!booted && <BootSequence onDone={() => setBooted(true)} />}

      <div className={booted ? "fade-rise" : "opacity-0 pointer-events-none"}>
        <TopBar />
        <Hero />
        <main className="mx-auto max-w-7xl px-4 md:px-6 pb-20 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
            <FileExplorer active={openFolder} onSelect={setOpenFolder} />
            <ClassifiedMemories onOpenPhoto={setOpenPhoto} />
          </div>

          <Dossier />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-6">
            <HackLog />
            <BirthdayMessage onOpen={() => setFinalOpen(true)} />
            <AccessComplete />
          </div>

          <Footer />
        </main>
      </div>

      {openPhoto !== null && (
        <PhotoModal photo={PHOTOS[openPhoto]} index={openPhoto} onClose={() => setOpenPhoto(null)} />
      )}
      {finalOpen && <FinalMessage onClose={() => setFinalOpen(false)} />}
    </div>
  );
}

/* ---------- BOOT ---------- */
function BootSequence({ onDone }: { onDone: () => void }) {
  const lines = [
    "> initiating hack.exe",
    "> bypassing security...",
    "> tracing IP... 192.168.0.HEIZEL",
    "> decrypting friendship.db",
    "> ACCESS GRANTED.",
  ];
  const [shown, setShown] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (shown < lines.length) {
      const t = setTimeout(() => setShown(shown + 1), 380);
      return () => clearTimeout(t);
    }
    const start = Date.now();
    const iv = setInterval(() => {
      const p = Math.min(100, (Date.now() - start) / 18);
      setProgress(p);
      if (p >= 100) { clearInterval(iv); setTimeout(onDone, 350); }
    }, 30);
    return () => clearInterval(iv);
  }, [shown]);

  return (
    <div className="fixed inset-0 z-[200] bg-background flex items-center justify-center scanlines crt-vignette">
      <div className="w-full max-w-2xl px-6 space-y-6">
        <div className="space-y-1 text-sm md:text-base">
          {lines.slice(0, shown).map((l, i) => (
            <div key={i} className="text-terminal text-glow">{l}</div>
          ))}
          {shown < lines.length && <div className="cursor-blink text-terminal-bright">&nbsp;</div>}
        </div>
        {shown >= lines.length && (
          <div className="space-y-2">
            <div className="text-xs uppercase opacity-70 tracking-widest">accessing files...</div>
            <div className="h-4 border border-terminal/60 box-glow relative overflow-hidden">
              <div className="h-full bg-terminal text-glow transition-[width] duration-75" style={{ width: `${progress}%` }} />
            </div>
            <div className="text-right text-xs">{Math.floor(progress)}%</div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- TOP BAR ---------- */
function TopBar() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const i = setInterval(() => setTime(new Date()), 1000);
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
        <div className="opacity-70">{time.toISOString().replace("T", " ").slice(0, 19)} UTC</div>
      </div>
    </div>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section className="px-4 md:px-6 pt-12 pb-10 text-center">
      <div className="text-xs uppercase tracking-[0.4em] opacity-70 mb-4">// unauthorized access detected</div>
      <h1
        data-text="HEIZEL HAS BEEN HACKED"
        className="glitch text-glow-strong text-terminal-bright font-display leading-[0.95] text-5xl sm:text-6xl md:text-8xl tracking-tight"
      >
        HEIZEL HAS BEEN HACKED
      </h1>
      <p className="mt-6 text-sm md:text-base opacity-80">
        &gt; unauthorized access to <span className="text-terminal-bright text-glow">classified memories</span> detected_
        <span className="cursor-blink" />
      </p>
      <div className="mt-8 max-w-xl mx-auto panel p-4 text-left text-xs md:text-sm">
        <div className="flex justify-between mb-2 opacity-80">
          <span>EXTRACTING MEMORY VAULT...</span><span>72%</span>
        </div>
        <div className="h-3 bg-black/60 border border-terminal/40 overflow-hidden">
          <div className="h-full bg-terminal text-glow" style={{ width: "72%", boxShadow: "0 0 12px var(--color-terminal)" }} />
        </div>
        <div className="mt-2 opacity-60">&gt; please wait while we invade the system<span className="cursor-blink" /></div>
      </div>
    </section>
  );
}

/* ---------- FILE EXPLORER ---------- */
function FileExplorer({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  return (
    <aside className="panel p-4">
      <Header title="FILE_EXPLORER" />
      <ul className="mt-3 space-y-1 text-sm">
        {FOLDERS.map((f) => {
          const on = active === f.id;
          return (
            <li key={f.id}>
              <button
                onClick={() => onSelect(f.id)}
                className={`w-full text-left px-2 py-2 border transition-all duration-200 flex items-start gap-2
                  ${on
                    ? "border-terminal text-glow bg-terminal/10 box-glow"
                    : "border-transparent hover:border-terminal/60 hover:bg-terminal/5 hover:text-glow"}`}
              >
                {on ? <FolderOpen className="size-4 mt-0.5 shrink-0" /> : <Folder className="size-4 mt-0.5 shrink-0" />}
                <span className="flex-1">
                  <span className="block">{f.name}</span>
                  <span className="block text-[11px] opacity-60">{f.count}</span>
                </span>
                <ChevronRight className={`size-3 mt-1 transition ${on ? "rotate-90" : ""}`} />
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
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
        <span className="hover:text-danger cursor-pointer"><X className="size-3" /></span>
      </div>
    </div>
  );
}

/* ---------- MEMORIES ---------- */
function ClassifiedMemories({ onOpenPhoto }: { onOpenPhoto: (i: number) => void }) {
  return (
    <section className="panel p-4">
      <Header title="CLASSIFIED_MEMORIES" right={<span>{PHOTOS.length} files</span>} />
      <div className="mt-2 text-xs opacity-70">&gt; loading evidence<span className="cursor-blink" /></div>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {PHOTOS.map((p, i) => (
          <button
            key={i}
            onClick={() => onOpenPhoto(i)}
            className="photo-scan group relative aspect-square border border-terminal/40 overflow-hidden hover:border-terminal hover:box-glow transition"
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
      <button className="mt-4 text-xs px-3 py-2 border border-terminal/60 hover:bg-terminal hover:text-background transition uppercase tracking-widest">
        &gt; view_all_files
      </button>
    </section>
  );
}

/* ---------- DOSSIER ---------- */
function Dossier() {
  return (
    <section className="panel p-6 md:p-8 relative overflow-hidden">
      <div className="absolute -top-2 -left-2 stamp text-danger text-2xl md:text-3xl rotate-[-12deg] z-10">TOP SECRET</div>
      <div className="absolute top-6 right-6 stamp text-danger text-xs hidden md:block">DO NOT DISTRIBUTE</div>

      <div className="text-[10px] tracking-widest opacity-60 mb-6 ml-32 md:ml-48">
        GOVERNMENT_DATABASE :: LEVEL 4 CLEARANCE :: FILE #HZL-2024
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_220px_1fr] gap-6 items-start">
        <div>
          <h3 className="text-2xl md:text-3xl text-glow text-terminal-bright">SUBJECT: <span>[HEIZEL]</span></h3>
          <div className="mt-2 text-sm">CLEARANCE LEVEL: <span className="text-danger text-glow">UNSTABLE</span></div>

          <div className="mt-6 text-xs uppercase tracking-widest opacity-70">KNOWN FOR</div>
          <ul className="mt-2 text-sm space-y-1">
            {[
              "chaotic behavior",
              "late-night overthinking",
              "laughing at literally everything",
              "disappearing then replying instantly",
              "saying 'real' too much",
              "being iconic, accidentally",
              "everyone's unpaid therapist",
            ].map((k) => (
              <li key={k}>&gt; {k}</li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="stamp text-danger text-xs">HIGHLY CHAOTIC</span>
            <span className="stamp text-terminal-bright text-xs rotate-[5deg]">CERTIFIED ICON</span>
          </div>
        </div>

        <div className="mx-auto">
          <div className="relative p-2 bg-amber-100/5 border border-terminal/40 rotate-[-3deg] box-glow">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-4 bg-terminal/30 border border-terminal/50" />
            <img src={PHOTOS[2].src} alt="Subject portrait" className="w-44 h-56 object-cover grayscale contrast-125" />
            <div className="text-center text-[10px] mt-1 opacity-70">CASE PHOTO #1</div>
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest opacity-70">REMARKS</div>
          <p className="mt-2 text-sm">
            Highly dangerous with free time.<br/>
            Not to be trusted in:
          </p>
          <ul className="mt-1 text-sm space-y-0.5">
            <li>&gt; group projects</li>
            <li>&gt; late night calls</li>
            <li>&gt; decision making</li>
            <li>&gt; food choices</li>
            <li>&gt; the aux cord</li>
          </ul>

          <div className="mt-6 text-xs uppercase tracking-widest opacity-70">FINAL NOTE</div>
          <p className="mt-2 text-sm">
            Keep them close.<br/>
            They're rare.
          </p>

          <div className="mt-6 font-display text-lg tracking-[0.5em] opacity-60">|||||||||||||||||||||</div>
        </div>
      </div>
    </section>
  );
}

/* ---------- HACK LOG ---------- */
function HackLog() {
  const [lines, setLines] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let i = 0;
    const tick = () => {
      setLines((prev) => {
        const next = [...prev, HACK_LINES[i % HACK_LINES.length]];
        return next.slice(-14);
      });
      i++;
    };
    tick();
    const iv = setInterval(tick, 1100);
    return () => clearInterval(iv);
  }, []);
  useEffect(() => { ref.current?.scrollTo({ top: ref.current.scrollHeight }); }, [lines]);

  return (
    <section className="panel p-4 h-80">
      <Header title="HACK_LOG" />
      <div ref={ref} className="mt-2 h-[calc(100%-2.5rem)] overflow-y-auto text-xs leading-relaxed space-y-1 pr-1">
        {lines.map((l, i) => {
          const warn = l.includes("[WARN]");
          const ok = l.includes("[ OK ]");
          return (
            <div key={i} className={`fade-rise ${warn ? "text-danger" : ok ? "text-terminal-bright text-glow" : ""}`}>
              {l}
            </div>
          );
        })}
        <div className="cursor-blink">&nbsp;</div>
      </div>
    </section>
  );
}

/* ---------- BIRTHDAY MESSAGE ---------- */
function BirthdayMessage({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="panel p-4 h-80 flex flex-col">
      <Header title="BIRTHDAY_MESSAGE.txt" />
      <div className="mt-3 flex-1 text-sm space-y-2">
        <h3 className="text-2xl text-glow-strong text-terminal-bright">HAPPY BIRTHDAY! &lt;3</h3>
        <p className="opacity-90">
          thanks for existing. can't imagine life without you in it.
        </p>
        <p className="opacity-90">
          here's to more chaos, more 3am calls, more inside jokes only we get.
        </p>
        <p className="opacity-70 text-xs">&gt; awaiting user input<span className="cursor-blink" /></p>
      </div>
      <button
        onClick={onOpen}
        className="mt-3 self-start px-4 py-2 border border-terminal text-glow uppercase tracking-widest text-xs hover:bg-terminal hover:text-background transition box-glow"
      >
        &gt; open_final_message
      </button>
    </section>
  );
}

/* ---------- ACCESS COMPLETE ---------- */
function AccessComplete() {
  return (
    <section className="panel p-4 h-80 flex flex-col items-center justify-center text-center">
      <div className="text-xs uppercase tracking-widest text-glow">ACCESS COMPLETE</div>
      <pre className="ascii-heart text-terminal-bright text-glow text-[10px] md:text-xs my-4 leading-none">
{` ██████   ██████ 
████████ ████████
█████████████████
 ███████████████ 
   ███████████   
     ███████     
       ███       `}
      </pre>
      <div className="text-xs uppercase tracking-widest opacity-70">YOU'RE AWESOME</div>
      <Heart className="mt-3 size-5 text-danger animate-pulse" />
    </section>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer className="border-t border-terminal/30 pt-6 text-center text-xs opacity-70">
      <div>&gt; hack session terminated.</div>
      <div>&gt; system secured. files saved in heart.dat</div>
      <div className="mt-2 flex justify-center items-center gap-2 opacity-50">
        <Power className="size-3" /> shutting down... <span className="cursor-blink">&nbsp;</span>
      </div>
    </footer>
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

/* ---------- FINAL MESSAGE ---------- */
function FinalMessage({ onClose }: { onClose: () => void }) {
  const particles = useMemo(() =>
    Array.from({ length: 60 }).map(() => ({
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 5,
      size: 2 + Math.random() * 4,
      hue: 100 + Math.random() * 60,
    })), []);

  return (
    <div className="fixed inset-0 z-[160] bg-background/95 backdrop-blur-md flex items-center justify-center p-6 fade-rise scanlines crt-vignette">
      {particles.map((p, i) => (
        <span
          key={i}
          className="particle absolute rounded-full pointer-events-none"
          style={{
            left: `${p.left}%`,
            bottom: 0,
            width: p.size, height: p.size,
            background: `hsl(${p.hue} 100% 70%)`,
            boxShadow: `0 0 8px hsl(${p.hue} 100% 60%)`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
      <div className="max-w-xl text-center space-y-6 relative z-10">
        <div className="text-xs uppercase tracking-[0.4em] opacity-70">&gt; system.calm = true</div>
        <h2 className="font-display text-4xl md:text-6xl text-glow-strong text-terminal-bright">
          HAPPY BIRTHDAY,<br />HEIZEL &lt;3
        </h2>
        <p className="text-base md:text-lg opacity-90 leading-relaxed">
          thanks for existing. the system wouldn't be the same without you.
        </p>
        <p className="text-sm opacity-70 leading-relaxed">
          here's to every late-night call, every chaotic plan, every laugh we'll never explain to anyone else.
          you're the main character. always.
        </p>
        <button
          onClick={onClose}
          className="px-5 py-2 border border-terminal text-glow uppercase tracking-widest text-xs hover:bg-terminal hover:text-background transition box-glow"
        >
          &gt; close_session
        </button>
        <div className="text-[10px] opacity-50 pt-4">// transmission ends //</div>
      </div>
    </div>
  );
}
