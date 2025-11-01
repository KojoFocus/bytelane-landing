/** src/ByteLaneLanding.tsx */
"use client";
import React, { useMemo, useEffect, useState } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  BookOpen,
  Play,
  Lightbulb,
  CheckCircle2,
  FileText,
  ListChecks,
  Search,
  ArrowRight,
  Quote,
  Home as HomeIcon,
  Video as VideoIcon,
  NotebookText,
  Sparkles,
  LayoutGrid,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ======================= Types & Labels ======================= */
type SubjectId =
  | "core-maths"
  | "integrated-science"
  | "physics"
  | "chemistry"
  | "biology"
  | "web-dev";

type ContentKind = "video" | "notes" | "past-questions";
type VideoTag = "concept" | "topic" | "past";

interface Lesson {
  id: number;
  title: string;
  description: string;
  duration: string;
  subject: SubjectId;
  kind: ContentKind;
  lessonNumber: number;
  url?: string;
  tag?: VideoTag;
}

interface Doc {
  id: string;
  subject: SubjectId;
  kind: Exclude<ContentKind, "video">;
  title: string;
  url: string;
  description?: string;
}

interface Tip {
  id: string;
  title: string;
  blurb: string;
  href?: string;
}

const SUBJECT_LABEL: Record<SubjectId, string> = {
  "core-maths": "Core Mathematics",
  "integrated-science": "Integrated Science",
  physics: "Physics",
  chemistry: "Chemistry",
  biology: "Biology",
  "web-dev": "Web Development",
};

/* ======================= Palette (hero-driven) ======================= */
const PALETTE = {
  ink: "#ECECEC",
  sub: "#C6C6C6",
  bg: "#3a3a3c", // hero stage dark
  card: "#2f3032", // hero card dark
  paper: "#faf9f7", // soft paper for light sections
  line: "rgba(255,255,255,0.08)",
  darkLine: "rgba(0,0,0,0.08)",
  dot: "rgba(255,255,255,0.18)",
  accent: "#b9c46a", // muted lime/olive accent
  accentInk: "#1a1a1a",
};

/* ======================= Sample Content ======================= */
const LESSONS: Lesson[] = [
  {
    id: 1,
    title: "Linear Equations — Fast Methods",
    description: "Simple steps + quick checks (SHS/JHS).",
    duration: "12:10",
    subject: "core-maths",
    kind: "video",
    lessonNumber: 1,
    tag: "concept",
    url: "#",
  },
  {
    id: 2,
    title: "Quadratics — Factor / Square / Formula",
    description: "Choose the fastest route for each type.",
    duration: "18:45",
    subject: "core-maths",
    kind: "video",
    lessonNumber: 2,
    tag: "topic",
    url: "#",
  },
  {
    id: 3,
    title: "Electricity: Current • Voltage • Resistance",
    description: "Concept clarity + exam-style examples.",
    duration: "16:22",
    subject: "integrated-science",
    kind: "video",
    lessonNumber: 1,
    tag: "concept",
    url: "#",
  },
  {
    id: 4,
    title: "Motion & Forces (Newton)",
    description: "Speed vs velocity; quick WASSCE drills.",
    duration: "19:31",
    subject: "physics",
    kind: "video",
    lessonNumber: 1,
    tag: "topic",
    url: "#",
  },
  {
    id: 5,
    title: "Periodic Trends — Exam Shortcuts",
    description: "Atomic radius, I.E., E.N. — memory anchors.",
    duration: "14:02",
    subject: "chemistry",
    kind: "video",
    lessonNumber: 1,
    tag: "past",
    url: "#",
  },
  {
    id: 6,
    title: "HTML/CSS Starter (Bonus)",
    description: "Project-based intro for tech-curious students.",
    duration: "22:08",
    subject: "web-dev",
    kind: "video",
    lessonNumber: 1,
    tag: "concept",
    url: "#",
  },
];

const DOCS: Doc[] = [
  {
    id: "n1",
    subject: "core-maths",
    kind: "notes",
    title: "Core Maths — Concise Revision Notes (JHS/SHS)",
    url: "#",
  },
  {
    id: "pq1",
    subject: "core-maths",
    kind: "past-questions",
    title: "Quadratics — Past Questions (with answers)",
    url: "#",
  },
  {
    id: "n2",
    subject: "integrated-science",
    kind: "notes",
    title: "Electricity — One-Pager (Key Laws + Tricks)",
    url: "#",
  },
  {
    id: "pq2",
    subject: "integrated-science",
    kind: "past-questions",
    title: "Electricity: Topic Drill (20 items)",
    url: "#",
  },
  {
    id: "n3",
    subject: "physics",
    kind: "notes",
    title: "Motion & Forces — Speed Sheet",
    url: "#",
  },
  {
    id: "n4",
    subject: "chemistry",
    kind: "notes",
    title: "Periodic Table & Trends — Pocket Guide",
    url: "#",
  },
  {
    id: "n5",
    subject: "biology",
    kind: "notes",
    title: "Cell Structure — Rapid Review",
    url: "#",
  },
];

const TIPS: Tip[] = [
  {
    id: "t1",
    title: "Parent Check-ins",
    blurb: "Ask your ward to teach back one solved question daily.",
  },
  {
    id: "t2",
    title: "Two-Column Notes",
    blurb: "Left = steps; Right = why. Fewer crams, more understanding.",
  },
  {
    id: "t3",
    title: "Short Daily Reps",
    blurb: "10–15 mins Maths/Science beats one long weekly session.",
  },
  {
    id: "t4",
    title: "Exam Rhythm",
    blurb: "Weekly timed practice—calm speed, not panic speed.",
  },
];

const SOCIAL_VIDS = [
  {
    id: "v1",
    platform: "TikTok",
    title: "Electricity made simple (series & parallel)",
    duration: "0:38",
    views: "72k",
    thumb:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "v2",
    platform: "Instagram",
    title: "Core Maths hack: Factor in 30s",
    duration: "0:45",
    views: "48k",
    thumb:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "v3",
    platform: "YouTube",
    title: "Quadratics in 30 seconds",
    duration: "0:44",
    views: "96k",
    thumb:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop",
  },
];

/* ======================= UI Primitives ======================= */
const Section = ({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <section className={`w-full py-12 md:py-16 ${className}`} style={style}>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
  </section>
);

function Tabs<Val extends string>({
  value,
  onChange,
  items,
  size = "md",
}: {
  value: Val;
  onChange: (v: Val) => void;
  items: {
    value: Val;
    label: string;
    icon?: React.ReactNode;
    badge?: number | string;
  }[];
  size?: "sm" | "md";
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((it) => (
        <button
          key={it.value}
          onClick={() => onChange(it.value)}
          className={`inline-flex items-center gap-2 rounded-md ${
            size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm"
          } font-semibold transition-colors ${
            value === it.value
              ? "bg-stone-900 text-white"
              : "bg-stone-100 text-stone-700 hover:bg-stone-200"
          }`}
        >
          {it.icon}
          {it.label}
          {it.badge !== undefined && (
            <span
              className={`ml-1 rounded-full ${
                size === "sm"
                  ? "px-1.5 py-0.5 text-[10px]"
                  : "px-2 py-0.5 text-[11px]"
              } bg-white/20`}
            >
              {it.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

/* ======================= Category Helpers ======================= */
const SUBJECTS: SubjectId[] = [
  "core-maths",
  "integrated-science",
  "physics",
  "chemistry",
  "biology",
  "web-dev",
];

const CATEGORY_LABEL: Record<ContentKind | "videos", string> = {
  notes: "Study",
  "past-questions": "Practice",
  videos: "Watch",
  video: "Watch",
};

function useURLState<T extends Record<string, string>>(
  defaults: T
): [T, (patch: Partial<T>) => void] {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const current = { ...defaults } as T;

  (Object.keys(defaults) as Array<keyof T>).forEach((k) => {
    const v = params.get(String(k));
    if (v !== null) current[k] = v as T[keyof T];
  });

  const patch = (p: Partial<T>) => {
    const next = new URLSearchParams(params);
    (Object.entries(p) as Array<[keyof T, string | undefined]>).forEach(
      ([k, v]) => {
        const key = String(k);
        if (v === undefined || v === "") next.delete(key);
        else next.set(key, v);
      }
    );
    navigate({ search: `?${next.toString()}` }, { replace: true });
  };
  return [current, patch];
}

/* ======================= HERO ======================= */
const HERO_SLIDES = [
  {
    id: "s1",
    title: "You’re not bad at math — you just need it in your language.",
    sub: "We help you understand, not just memorize.",
  },
  {
    id: "s2",
    title:
      "Every child can learn once someone teaches with patience and sense.",
    sub: "We rebuild confidence, not fear.",
  },
  {
    id: "s3",
    title:
      "Your child’s struggle isn’t failure — it’s a signal to teach differently.",
    sub: "We guide them back to confidence, one clear lesson at a time.",
  },
  {
    id: "s4",
    title: "You don’t have to be a genius to understand.",
    sub: "You just need someone who explains it the right way.",
  },
  {
    id: "s5",
    title: "We don’t train geniuses. We grow understanding.",
    sub: "Every great result begins with the right guide.",
  },
] as const;

const TICKER_ITEMS = [
  "1:1 Home Tuition",
  "Live Online Tuition",
  "Tricks & Shortcuts",
  "Concise Notes",
  "Video Library",
  "Past Questions Practice",
];

/** smooth marquee/ticker on dark */
function Ticker({ items }: { items: string[] }) {
  const content = [...items, ...items];
  return (
    <div
      className="relative overflow-hidden rounded-full"
      style={{
        border: `1px solid ${PALETTE.line}`,
        background: "#2b2c2e99",
        backdropFilter: "blur(6px)",
      }}
    >
      <motion.div
        aria-hidden
        className="flex gap-6 whitespace-nowrap px-4 py-2 text-sm font-medium"
        style={{ color: PALETTE.sub }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 24, ease: "linear", repeat: Infinity }}
      >
        {content.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: PALETTE.dot }}
            />
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* -------- NEW: Direction-aware horizontal slide variants -------- */
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0.8,
  }),
  center: { x: "0%", opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0.8,
  }),
};

/** Big centered hero card with mobile-safe typography and horizontal slide */
function HeroAttentionCard() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const len = HERO_SLIDES.length;

  useEffect(() => {
    // Slower auto-advance interval
    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((p) => (p + 1) % len);
    }, 11000); // was 6000ms
    return () => window.clearInterval(id);
  }, [len]);

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setIndex((p) => (p + dir + len) % len);
  };

  const onDragEnd = (
    _: MouseEvent | TouchEvent,
    info: { offset: { x: number } }
  ) => {
    const dx = info.offset.x;
    if (dx > 120)
      go(-1); // slightly higher threshold to avoid accidental fast slides
    else if (dx < -120) go(1);
  };

  return (
    <div className="group relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* dark stage */}
      <div
        className="relative rounded-2xl sm:rounded-[32px] p-4 sm:p-6 md:p-10"
        style={{
          background: `radial-gradient(1200px 420px at 50% -60%, #4a4b4d 0%, ${PALETTE.bg} 60%)`,
          border: `1px solid ${PALETTE.line}`,
        }}
      >
        {/* Card */}
        <div
          className="relative mx-auto w-full max-w-5xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden"
          style={{
            background: PALETTE.card,
            border: `1px solid ${PALETTE.line}`,
          }}
        >
          {/* natural height on mobile; fixed aspect only from md up */}
          <div className="relative min-h-[260px] md:aspect-[3/2]">
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="popLayout"
            >
              <motion.div
                key={HERO_SLIDES[index].id}
                className="absolute inset-0"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={onDragEnd}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  type: "tween",
                  ease: "easeInOut",
                  duration: 0.7, // was 0.45s — smoother, slower slide
                }}
              >
                <div className="h-full w-full p-4 sm:p-6 md:p-10 flex flex-col justify-between">
                  {/* badge + corner icon (hide icon on xs to reduce noise) */}
                  <div className="flex items-start justify-between">
                    <span
                      className="inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold"
                      style={{
                        background: "#161617",
                        color: PALETTE.ink,
                        border: `1px solid ${PALETTE.line}`,
                      }}
                    >
                      iTeach Pro
                    </span>
                    <span
                      className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full"
                      style={{
                        border: `1px solid ${PALETTE.line}`,
                        color: PALETTE.sub,
                        background: "#2b2c2e99",
                        backdropFilter: "blur(6px)",
                      }}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>

                  {/* Title + sub with clamp & wrapping */}
                  <div className="mt-2">
                    <h1
                      className="font-extrabold tracking-tight"
                      style={{
                        color: PALETTE.ink,
                        fontSize: "clamp(20px, 6.2vw, 40px)",
                        lineHeight: 1.15,
                        wordBreak: "break-word",
                        overflowWrap: "anywhere",
                        hyphens: "auto",
                      }}
                    >
                      {HERO_SLIDES[index].title}
                    </h1>
                    <p
                      className="mt-2"
                      style={{
                        color: PALETTE.accent,
                        fontSize: "clamp(13px, 3.8vw, 18px)",
                        lineHeight: 1.35,
                      }}
                    >
                      {HERO_SLIDES[index].sub}
                    </p>
                  </div>

                  {/* Ticker hidden on very small screens */}
                  <div className="hidden sm:block">
                    <Ticker items={TICKER_ITEMS} />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Controls + dots */}
        <div className="mt-3 sm:mt-4 flex items-center justify-center gap-2 sm:gap-3">
          <button
            onClick={() => go(-1)}
            aria-label="Previous"
            className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full"
            style={{
              background: "#2b2c2e99",
              color: PALETTE.ink,
              border: `1px solid ${PALETTE.line}`,
              backdropFilter: "blur(6px)",
            }}
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                aria-label={`Slide ${i + 1}`}
                className="h-1.5 sm:h-2 rounded-full transition-all"
                style={{
                  width: i === index ? 20 : 8,
                  background: i === index ? PALETTE.accent : PALETTE.dot,
                }}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            aria-label="Next"
            className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full"
            style={{
              background: "#2b2c2e99",
              color: PALETTE.ink,
              border: `1px solid ${PALETTE.line}`,
              backdropFilter: "blur(6px)",
            }}
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        {/* CTA pills under card */}
        <div className="mx-auto mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 sm:px-5 sm:py-2.5 text-sm font-semibold hover:opacity-90"
            style={{ background: PALETTE.accent, color: PALETTE.accentInk }}
          >
            Book Home Tutor <HomeIcon className="h-4 w-4" />
          </Link>
          {/* <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold"
            style={{
              color: PALETTE.ink,
              border: `1px solid ${PALETTE.line}`,
              background: "#2b2c2e",
            }}
          >
            Try Online Lesson <VideoIcon className="h-4 w-4" />
          </Link> */}
        </div>
      </div>
    </div>
  );
}

/* ======================= Home ======================= */
function HomePage() {
  const navigate = useNavigate();
  const goTo = (
    category: "videos" | "notes" | "past-questions",
    subject: SubjectId
  ) => {
    navigate(
      `/library?subject=${subject}&tab=${category}${
        category === "videos" ? "&vfilter=all" : ""
      }`
    );
  };

  return (
    <>
      {/* HERO — dark 3:2 carousel */}
      <Section
        className="pt-6 sm:pt-10 pb-3 sm:pb-6"
        style={{
          background:
            "linear-gradient(180deg,#2f3032 0%, #3a3a3c 60%, #3a3a3c 100%)",
        }}
      >
        <HeroAttentionCard />
      </Section>

      {/* SERVICES — light paper with accent chips */}
      <Section
        className="py-10"
        style={{
          background: PALETTE.paper,
          borderTop: `1px solid ${PALETTE.darkLine}`,
        }}
      >
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-stone-900">
            Save time, raise grades
          </h2>
          <p className="mt-2 text-stone-600">
            Focused, exam-aware teaching with simple steps and fun anchors.
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div
            className="rounded-2xl border p-6"
            style={{ background: "#f3f7ef", borderColor: "#dfe6d2" }}
          >
            <div
              className="inline-flex rounded-md text-white p-2 mb-3"
              style={{ background: PALETTE.accent }}
            >
              <HomeIcon className="h-5 w-5" />
            </div>
            <div className="text-lg font-semibold text-stone-900">
              1:1 Home Tuition (SHS/JHS)
            </div>
            <p className="text-sm text-stone-700 mt-1">
              Personal plan, calm pace, weekly feedback to parents.
            </p>
          </div>
          <div
            className="rounded-2xl border p-6"
            style={{ background: "#eef4ff", borderColor: "#dae6ff" }}
          >
            <div className="inline-flex rounded-md bg-stone-900 text-white p-2 mb-3">
              <VideoIcon className="h-5 w-5" />
            </div>
            <div className="text-lg font-semibold text-stone-900">
              Live Online Tuition
            </div>
            <p className="text-sm text-stone-700 mt-1">
              Interactive board, recordings, and homework follow-ups.
            </p>
          </div>
          <div
            className="rounded-2xl border p-6"
            style={{ background: "#fff6e6", borderColor: "#ffe6bf" }}
          >
            <div className="inline-flex rounded-md bg-stone-900 text-white p-2 mb-3">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="text-lg font-semibold text-stone-900">
              Tricks & Exam Shortcuts
            </div>
            <p className="text-sm text-stone-700 mt-1">
              Memory anchors & speed methods that match marking schemes.
            </p>
          </div>
        </div>
      </Section>

      {/* CATEGORY CHOOSER — white on paper */}
      <Section className="py-8" style={{ background: PALETTE.paper }}>
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-stone-900">
            Start by category
          </h2>
          <p className="mt-2 text-stone-600">
            Choose a category, pick a subject, then open the library.
          </p>
        </div>

        <div
          className="mx-auto mt-6 max-w-3xl rounded-2xl p-4 shadow-sm"
          style={{
            background: "#ffffff",
            border: `1px solid ${PALETTE.darkLine}`,
          }}
        >
          <form
            className="grid gap-4 sm:grid-cols-[1fr,1fr,auto]"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget as HTMLFormElement;
              const data = new FormData(form);
              const cat = data.get("category") as
                | "videos"
                | "notes"
                | "past-questions";
              const subject = data.get("subject") as SubjectId;
              goTo(cat, subject);
            }}
          >
            <label className="flex flex-col text-sm text-stone-600">
              Category
              <select
                name="category"
                id="category"
                className="mt-1 rounded-xl border border-stone-300 px-3 py-2"
                defaultValue="notes"
              >
                <option value="notes">Study (Notes)</option>
                <option value="videos">Watch (Videos)</option>
                <option value="past-questions">Practice (Past Qs)</option>
              </select>
            </label>

            <label className="flex flex-col text-sm text-stone-600">
              Subject
              <select
                name="subject"
                id="subject"
                className="mt-1 rounded-xl border border-stone-300 px-3 py-2"
                defaultValue="core-maths"
              >
                {SUBJECTS.slice(0, 5).map((s) => (
                  <option key={s} value={s}>
                    {SUBJECT_LABEL[s]}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="submit"
              className="self-end rounded-xl px-5 py-2.5 text-sm font-semibold text-stone-900 hover:opacity-90"
              style={{ background: PALETTE.accent }}
            >
              Open <ArrowRight className="ml-1 inline-block h-4 w-4" />
            </button>
          </form>
        </div>
      </Section>

      {/* WHY & PREVIEWS */}
      <Section className="py-0" style={{ background: "#ffffff" }}>
        <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr] items-center">
          <div
            className="rounded-3xl p-8 lg:p-10"
            style={{ background: "#f9f5e7", border: "1px solid #efe3c6" }}
          >
            <h3 className="text-3xl font-extrabold text-stone-900">
              Why students pass with us
            </h3>
            <ul className="mt-6 space-y-3 text-stone-800">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5" />{" "}
                Tailored plans for SHS/JHS based on strengths & gaps.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5" />{" "}
                Concept → Examples → Past Questions (fast loop).
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5" />{" "}
                Concise revision notes for night-before clarity.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5" />{" "}
                Calm progress, weekly parent updates.
              </li>
            </ul>
            <div className="mt-6 grid sm:grid-cols-3 gap-6">
              <div>
                <div className="text-4xl font-extrabold text-stone-900">5+</div>
                <div className="text-sm text-stone-700">Years teaching</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-stone-900">86</div>
                <div className="text-sm text-stone-700">Happy parents</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-stone-900">
                  32+
                </div>
                <div className="text-sm text-stone-700">School partners</div>
              </div>
            </div>
          </div>
          <div
            className="rounded-3xl overflow-hidden"
            style={{ border: "1px solid #e7e1d7", background: "#fff" }}
          >
            <img
              alt="Student revising concise notes"
              src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1400&auto=format&fit=crop"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Section>

      {/* PREVIEWS: Notes + Videos */}
      <Section style={{ background: "#ffffff" }}>
        <div className="grid gap-8 lg:grid-cols-[1fr,1fr]">
          {/* Notes preview */}
          <div
            className="rounded-3xl p-6"
            style={{
              background: "#ffffff",
              border: `1px solid ${PALETTE.darkLine}`,
            }}
          >
            <div
              className="inline-flex items-center gap-2 rounded-md px-3 py-1 text-xs font-semibold"
              style={{ background: "#1f1f1f", color: "#fff" }}
            >
              <NotebookText className="h-4 w-4" /> Concise Revision Notes
            </div>
            <h3 className="mt-3 text-2xl font-extrabold text-stone-900">
              Everything you need, nothing extra
            </h3>
            <p className="mt-1 text-stone-600">
              One-pagers and pocket guides for <b>night-before</b> clarity—key
              laws, formulas, common traps, and exam cues.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {DOCS.filter((d) => d.kind === "notes")
                .slice(0, 4)
                .map((d) => (
                  <a
                    key={d.id}
                    href={d.url}
                    className="rounded-xl p-4 hover:bg-stone-100"
                    style={{
                      background: "#f7f7f7",
                      border: `1px solid ${PALETTE.darkLine}`,
                    }}
                  >
                    <div className="text-sm font-semibold text-stone-900">
                      {d.title}
                    </div>
                  </a>
                ))}
            </div>
            <Link
              to="/library?tab=notes"
              className="mt-4 inline-flex items-center gap-2 font-semibold"
              style={{ color: "#6b4f00" }}
            >
              Browse all notes <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Videos preview */}
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-md px-3 py-1 text-xs font-semibold"
              style={{ background: "#f1f5e6", color: "#3b3d1c" }}
            >
              <Play className="h-4 w-4" /> Videos — Concepts • Topics • Past Qs
            </div>
            <h3 className="mt-3 text-2xl font-extrabold text-stone-900">
              Watch it click
            </h3>
            <p className="mt-1 text-stone-600">
              Short, focused videos that target <b>concept clarity</b>,{" "}
              <b>topic mastery</b>, or <b>past-questions</b> drills.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {SOCIAL_VIDS.map((v) => (
                <a
                  key={v.id}
                  href="#"
                  className="rounded-2xl overflow-hidden hover:shadow-sm"
                  style={{
                    background: "#ffffff",
                    border: `1px solid ${PALETTE.darkLine}`,
                  }}
                >
                  <div className="relative h-32">
                    <img
                      src={v.thumb}
                      alt={v.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute right-2 bottom-2 text-[11px] bg-stone-900/70 text-white px-2 py-0.5 rounded">
                      {v.duration}
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="text-sm font-semibold text-stone-900">
                      {v.title}
                    </div>
                    <div className="text-xs text-stone-500">
                      {v.views} views
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Testimonial + CTA */}
      <Section className="pt-0" style={{ background: PALETTE.paper }}>
        <div className="grid gap-6 lg:grid-cols-[1fr,1fr]">
          <div
            className="rounded-3xl p-6"
            style={{ background: "#eaf3ff", border: "1px solid #d6e7ff" }}
          >
            <div
              className="flex items-center gap-2 mb-2"
              style={{ color: "#205493" }}
            >
              <Quote className="h-5 w-5" />
              <div className="text-sm font-semibold">What parents say</div>
            </div>
            <p className="text-stone-800">
              “My daughter finally enjoys <b>Integrated Science</b>. The concise
              notes + past-question drills removed the fear. Her scores jumped
              in 4 weeks.” — <b>Kwesi, Parent</b>
            </p>
          </div>
          <div
            className="rounded-3xl p-6"
            style={{
              background: "#ffffff",
              border: `1px solid ${PALETTE.darkLine}`,
            }}
          >
            <h4 className="text-xl font-extrabold text-stone-900">
              Ready to raise grades?
            </h4>
            <p className="text-stone-600 mt-1">
              Tell us your goals—home or online—we’ll map a plan in 24 hours.
            </p>
            <Link
              to="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-semibold text-stone-900 hover:opacity-90"
              style={{ background: PALETTE.accent }}
            >
              Book a Tutor <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}

/* ======================= Programs ======================= */
function ProgramsPage() {
  const PROGRAMS = [
    {
      id: "jhs",
      title: "JHS — Core Maths & Integrated Science",
      summary:
        "Foundation → confidence. Simple steps, daily reps, BECE-style practice.",
      features: [
        "Concept → Examples → Past Qs",
        "Concise revision notes",
        "Weekly feedback to parents",
      ],
      icon: "book",
    },
    {
      id: "shs",
      title: "SHS — Core Maths, Physics, Chem, Bio",
      summary:
        "WASSCE-aware methods. Tricks & shortcuts with marking-scheme focus.",
      features: [
        "Topic maps & speed methods",
        "Targeted past-question drills",
        "Calm exam rhythm",
      ],
      icon: "grad",
    },
    {
      id: "web",
      title: "Online Booster (All Levels)",
      summary:
        "Live board, recordings, and homework follow-ups for remote learners.",
      features: [
        "Interactive sessions",
        "Homework support",
        "Progress tracking",
      ],
      icon: "code",
    },
  ] as const;

  return (
    <main
      className="min-h-screen"
      style={{ background: PALETTE.paper, color: "#111" }}
    >
      <Section>
        <div className="text-center">
          <h1 className="text-3xl font-extrabold">Programs</h1>
          <p className="mt-2 text-stone-700">
            Science & Maths success for SHS/JHS—home and online.
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {PROGRAMS.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl p-6 hover:shadow-sm"
              style={{
                background: "#ffffff",
                border: `1px solid ${PALETTE.darkLine}`,
              }}
            >
              <div className="mb-3 flex items-center gap-3">
                <div
                  className="rounded-md p-2 text-stone-900"
                  style={{ background: PALETTE.accent }}
                >
                  {p.icon === "book" && <BookOpen className="h-5 w-5" />}
                  {p.icon === "code" && <VideoIcon className="h-5 w-5" />}
                  {p.icon === "grad" && <LayoutGrid className="h-5 w-5" />}
                </div>
                <h3 className="text-base font-semibold">{p.title}</h3>
              </div>
              <p className="text-sm text-stone-700">{p.summary}</p>
              <ul className="mt-3 space-y-2 text-sm text-stone-800">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />{" "}
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}

/* ======================= Library ======================= */
function LibraryPage() {
  const [url, setURL] = useURLState<{
    subject: SubjectId;
    tab: "videos" | "notes" | "past-questions";
    vfilter: "all" | VideoTag;
    q: string;
  }>({
    subject: "core-maths",
    tab: "videos",
    vfilter: "all",
    q: "",
  });

  const activeSubject: SubjectId = url.subject;
  const tab: "videos" | "notes" | "past-questions" = url.tab;
  const vfilter: "all" | VideoTag = url.vfilter;
  const q = url.q || "";

  const subjects: SubjectId[] = SUBJECTS;

  const allVideos = useMemo(
    () =>
      LESSONS.filter((l) => l.kind === "video" && l.subject === activeSubject),
    [activeSubject]
  );

  const vids = useMemo(
    () =>
      allVideos.filter(
        (l) =>
          (vfilter === "all" || l.tag === vfilter) &&
          (q.trim() === "" ||
            l.title.toLowerCase().includes(q.toLowerCase()) ||
            l.description.toLowerCase().includes(q.toLowerCase()))
      ),
    [allVideos, vfilter, q]
  );

  const notes = useMemo(
    () =>
      DOCS.filter(
        (d) =>
          d.subject === activeSubject &&
          d.kind === "notes" &&
          (q.trim() === "" ||
            d.title.toLowerCase().includes(q.toLowerCase()) ||
            (d.description?.toLowerCase() ?? "").includes(q.toLowerCase()))
      ),
    [activeSubject, q]
  );

  const pqs = useMemo(
    () =>
      DOCS.filter(
        (d) =>
          d.subject === activeSubject &&
          d.kind === "past-questions" &&
          (q.trim() === "" ||
            d.title.toLowerCase().includes(q.toLowerCase()) ||
            (d.description?.toLowerCase() ?? "").includes(q.toLowerCase()))
      ),
    [activeSubject, q]
  );

  const counts = {
    videos: allVideos.length,
    notes: DOCS.filter((d) => d.subject === activeSubject && d.kind === "notes")
      .length,
    "past-questions": DOCS.filter(
      (d) => d.subject === activeSubject && d.kind === "past-questions"
    ).length,
  } as const;

  useEffect(() => {
    if (tab !== "videos" && url.vfilter !== "all") setURL({ vfilter: "all" });
  }, [tab, url.vfilter, setURL]);

  return (
    <main
      className="min-h-screen"
      style={{ background: "#ffffff", color: "#111" }}
    >
      <Section>
        {/* Subject row */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {subjects.map((s) => (
              <button
                key={s}
                onClick={() => setURL({ subject: s })}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  activeSubject === s
                    ? "text-stone-900"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
                style={
                  activeSubject === s
                    ? { background: PALETTE.accent }
                    : undefined
                }
              >
                {SUBJECT_LABEL[s]}
              </button>
            ))}
          </div>
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
            <input
              value={q}
              onChange={(e) => setURL({ q: e.target.value })}
              placeholder="Search within this subject…"
              className="w-full pl-9 pr-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:border-amber-500"
              aria-label="Search within this subject"
            />
          </div>
        </div>

        {/* Category tabs */}
        <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
          <Tabs<"videos" | "notes" | "past-questions">
            value={tab}
            onChange={(v) => setURL({ tab: v })}
            items={[
              {
                value: "videos",
                label: `${CATEGORY_LABEL["videos"]} (Videos)`,
                icon: <Play className="h-4 w-4" />,
                badge: counts.videos,
              },
              {
                value: "notes",
                label: CATEGORY_LABEL["notes"],
                icon: <FileText className="h-4 w-4" />,
                badge: counts.notes,
              },
              {
                value: "past-questions",
                label: CATEGORY_LABEL["past-questions"],
                icon: <ListChecks className="h-4 w-4" />,
                badge: counts["past-questions"],
              },
            ]}
          />

          {/* Video sub-filter */}
          {tab === "videos" && (
            <Tabs<"all" | VideoTag>
              value={vfilter}
              onChange={(v) => setURL({ vfilter: v })}
              items={[
                {
                  value: "all",
                  label: "All",
                  icon: <Filter className="h-4 w-4" />,
                },
                { value: "concept", label: "Concept" },
                { value: "topic", label: "Topic" },
                { value: "past", label: "Past Qs" },
              ]}
              size="sm"
            />
          )}
        </div>

        {/* Content grid by tab */}
        <div className="mt-8">
          {tab === "videos" &&
            (vids.length === 0 ? (
              <p className="text-sm text-stone-600">No videos yet.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {vids.map((l) => (
                  <a
                    key={l.id}
                    href={l.url || "#"}
                    className="rounded-xl p-3 hover:shadow-sm"
                    style={{
                      background: "#ffffff",
                      border: `1px solid ${PALETTE.darkLine}`,
                    }}
                  >
                    <div className="text-sm font-semibold text-stone-900">
                      {l.title}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-[11px]">
                      <span
                        className="px-2 py-0.5 rounded-full"
                        style={
                          l.tag === "concept"
                            ? { background: "#e6f5ef", color: "#0d6b4a" }
                            : l.tag === "topic"
                            ? { background: "#eaf1ff", color: "#1e4fbf" }
                            : { background: "#ffeff0", color: "#9b1c25" }
                        }
                      >
                        {l.tag === "past" ? "Past Qs" : l.tag}
                      </span>
                      <span className="text-stone-500">{l.duration}</span>
                    </div>
                    <p className="text-xs text-stone-600 mt-1">
                      {l.description}
                    </p>
                  </a>
                ))}
              </div>
            ))}

          {tab === "notes" &&
            (notes.length === 0 ? (
              <p className="text-sm text-stone-600">No notes yet.</p>
            ) : (
              <div className="grid gap-3 md:grid-cols-2">
                {notes.map((d) => (
                  <a
                    key={d.id}
                    href={d.url}
                    className="rounded-lg p-4 hover:bg-stone-100"
                    style={{
                      background: "#f7f7f7",
                      border: `1px solid ${PALETTE.darkLine}`,
                    }}
                  >
                    <div className="text-sm font-semibold text-stone-900">
                      {d.title}
                    </div>
                  </a>
                ))}
              </div>
            ))}

          {tab === "past-questions" &&
            (pqs.length === 0 ? (
              <p className="text-sm text-stone-600">No past questions yet.</p>
            ) : (
              <div className="grid gap-3 md:grid-cols-2">
                {pqs.map((d) => (
                  <a
                    key={d.id}
                    href={d.url}
                    className="rounded-lg p-4 hover:shadow-sm"
                    style={{
                      background: "#ffffff",
                      border: `1px solid ${PALETTE.darkLine}`,
                    }}
                  >
                    <div className="text-sm font-semibold text-stone-900">
                      {d.title}
                    </div>
                  </a>
                ))}
              </div>
            ))}
        </div>

        {/* Sidebar: quick wins + parents */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr,320px]">
          <div></div>
          <aside className="space-y-6">
            <div
              className="rounded-xl p-5"
              style={{
                background: "#ffffff",
                border: `1px solid ${PALETTE.darkLine}`,
              }}
            >
              <div className="mb-3 flex items-center gap-2">
                <Lightbulb className="h-5 w-5" style={{ color: "#8a7a25" }} />
                <h3 className="text-[15px] font-semibold text-stone-900">
                  Quick Wins
                </h3>
              </div>
              <ul className="space-y-3">
                {TIPS.map((t) => (
                  <li key={t.id}>
                    <div className="font-medium text-[13px] text-stone-900">
                      {t.title}
                    </div>
                    <div className="text-[12px] text-stone-600">{t.blurb}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="rounded-xl p-5"
              style={{
                background: "#ffffff",
                border: `1px solid ${PALETTE.darkLine}`,
              }}
            >
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <h3 className="text-[15px] font-semibold text-stone-900">
                  Parents First
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-stone-800">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />{" "}
                  Weekly progress notes
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />{" "}
                  Safe, clear boundaries
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />{" "}
                  Calm improvement, not cramming
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </main>
  );
}

/* ======================= Tips ======================= */
function TipsPage() {
  return (
    <main className="min-h-screen" style={{ background: PALETTE.paper }}>
      <Section>
        <div className="text-center">
          <div className="inline-flex items-center justify-center gap-2">
            <Lightbulb className="h-6 w-6" style={{ color: "#8a7a25" }} />
            <h1 className="text-3xl font-extrabold">Science & Maths Tricks</h1>
          </div>
          <p className="mt-2 text-stone-700">
            Memory anchors, speed methods, and exam cues.
          </p>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {TIPS.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl p-5"
              style={{
                background: "#ffffff",
                border: `1px solid ${PALETTE.darkLine}`,
              }}
            >
              <h3 className="text-base font-semibold text-stone-900">
                {t.title}
              </h3>
              <p className="mt-1 text-sm text-stone-700">{t.blurb}</p>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}

/* ======================= Contact ======================= */
function ContactPage() {
  return (
    <main
      className="min-h-screen"
      style={{ background: "#ffffff", color: "#111" }}
    >
      <Section className="py-10">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold">
            Book Home or Online Tuition
          </h1>
          <p className="mt-2 text-stone-700">
            Tell us the level and goals—SHS/JHS, Science & Maths.
          </p>
        </div>
        <div
          className="rounded-3xl p-6 shadow-sm border max-w-2xl mx-auto mt-8"
          style={{ background: "#ffffff", borderColor: PALETTE.darkLine }}
        >
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks! We’ll reach out within 24 hours.");
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm text-stone-700">
                <span className="sr-only">Parent/Guardian Name</span>
                <input
                  className="w-full rounded-xl border border-stone-300 px-3 py-2"
                  placeholder="Parent/Guardian Name"
                  required
                  id="parent-name"
                  name="parentName"
                />
              </label>
              <label className="text-sm text-stone-700">
                <span className="sr-only">Phone</span>
                <input
                  className="w-full rounded-xl border border-stone-300 px-3 py-2"
                  placeholder="+233 ..."
                  required
                  id="phone"
                  name="phone"
                />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm text-stone-700">
                <span className="sr-only">Level</span>
                <select
                  className="w-full rounded-xl border border-stone-300 px-3 py-2"
                  id="level"
                  name="level"
                >
                  <option>JHS</option>
                  <option>SHS</option>
                </select>
              </label>
              <label className="text-sm text-stone-700">
                <span className="sr-only">Subject</span>
                <select
                  className="w-full rounded-xl border border-stone-300 px-3 py-2"
                  id="subject-select"
                  name="subject"
                >
                  <option>Core Mathematics</option>
                  <option>Integrated Science</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                  <option>Biology</option>
                </select>
              </label>
            </div>
            <label className="text-sm text-stone-700">
              <span className="sr-only">Mode</span>
              <select
                className="w-full rounded-xl border border-stone-300 px-3 py-2"
                id="mode"
                name="mode"
              >
                <option>Home Tuition</option>
                <option>Online Tuition</option>
              </select>
            </label>
            <label className="text-sm text-stone-700 block">
              <span className="sr-only">Goals</span>
              <textarea
                rows={4}
                className="w-full rounded-xl border border-stone-300 px-3 py-2"
                placeholder="Goals, timelines, topics to fix…"
                id="goals"
                name="goals"
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-xl px-4 py-2 text-sm font-semibold text-stone-900 hover:opacity-90"
              style={{ background: PALETTE.accent }}
            >
              Request Free Assessment
            </button>
            <p className="mt-2 text-xs text-stone-500 text-center">
              Private & safe. We respond within 24 hours.
            </p>
          </form>
        </div>
      </Section>
    </main>
  );
}

/* ======================= App Shell ======================= */
export default function App() {
  return (
    <>
      {/* Header */}
      <header
        className="sticky top-0 z-50 w-full border-b backdrop-blur"
        style={{
          borderColor: "rgba(0,0,0,0.08)",
          background: "rgba(255,255,255,0.92)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-extrabold"
            style={{ color: "#5a5f28" }}
          >
            <ShieldCheck
              className="h-6 w-6"
              style={{ color: PALETTE.accent }}
            />{" "}
            iTeach Pro
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-stone-700">
            <Link to="/programs" className="hover:text-stone-900">
              Programs
            </Link>
            <Link to="/library?tab=notes" className="hover:text-stone-900">
              Study
            </Link>
            <Link to="/library?tab=videos" className="hover:text-stone-900">
              Watch
            </Link>
            <Link
              to="/library?tab=past-questions"
              className="hover:text-stone-900"
            >
              Practice
            </Link>
            <Link to="/tips" className="hover:text-stone-900">
              Tricks
            </Link>
            <Link to="/contact" className="hover:text-stone-900">
              Book Tutor
            </Link>
          </nav>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold hover:opacity-90"
            style={{ background: PALETTE.accent, color: PALETTE.accentInk }}
          >
            Book Home/Online <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      {/* Body background transitions from hero to paper */}
      <div
        className="min-h-screen"
        style={{
          background:
            "linear-gradient(180deg,#3a3a3c 0%, #3a3a3c 0%, #faf9f7 0%)",
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/tips" element={<TipsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer
        className="border-t"
        style={{ borderColor: "rgba(0,0,0,0.08)", background: "#ffffff" }}
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-10 grid gap-6 md:grid-cols-3 text-sm">
          <div>
            <div
              className="flex items-center gap-2 font-extrabold"
              style={{ color: "#5a5f28" }}
            >
              <ShieldCheck
                className="h-5 w-5"
                style={{ color: PALETTE.accent }}
              />{" "}
              iTeach Pro
            </div>
            <p className="mt-2 text-stone-600">
              Science & Maths—simple, fun, understandable.
            </p>
          </div>
          <div>
            <div className="font-semibold text-stone-900">Explore</div>
            <ul className="mt-2 space-y-1 text-stone-600">
              <li>
                <Link to="/programs" className="hover:text-stone-900">
                  Programs
                </Link>
              </li>
              <li>
                <Link to="/library?tab=notes" className="hover:text-stone-900">
                  Study (Notes)
                </Link>
              </li>
              <li>
                <Link to="/library?tab=videos" className="hover:text-stone-900">
                  Watch (Videos)
                </Link>
              </li>
              <li>
                <Link
                  to="/library?tab=past-questions"
                  className="hover:text-stone-900"
                >
                  Practice (Past Qs)
                </Link>
              </li>
              <li>
                <Link to="/tips" className="hover:text-stone-900">
                  Tricks
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-stone-900">
                  Book Tutor
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-stone-500 text-xs md:text-right">
            © {new Date().getFullYear()} iTeach Pro. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
