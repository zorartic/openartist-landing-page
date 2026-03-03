"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

/* ───────────────────────── COLOR TOKENS ───────────────────────── */
const C = {
  black: "#0D0B0A",
  ivory: "#F2EDE4",
  sienna: "#C4622D",
  umber: "#7A5C3E",
  gold: "#C9A84C",
  dusk: "#2A3F5F",
  white: "#FAF7F2",
  ash: "#4A4540",
  amber: "#E8943A",
};

/* ───────────────────────── GRAIN OVERLAY ───────────────────────── */
function GrainOverlay() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0.04,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

/* ───────────────────────── FLOATING PARTICLES ───────────────────────── */
function Particles() {
  const [particles] = useState(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 3,
      dur: 4 + Math.random() * 6,
      delay: Math.random() * 5,
      opacity: 0.08 + Math.random() * 0.2,
    }))
  );

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        zIndex: 5,
        overflow: "hidden",
      }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          animate={{
            y: [0, -20, 0],
            x: [0, 8, 0],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor: C.gold,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

/* ───────────────────────── SECTION REVEAL WRAPPER ───────────────────────── */
function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ───────────────────────── GOLD DIVIDER ───────────────────────── */
function GoldLine() {
  return (
    <div
      style={{
        height: 1,
        background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`,
        margin: "3rem auto",
        maxWidth: 200,
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN LANDING PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
export default function OpenArtistLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [vh, setVh] = useState(800);

  useEffect(() => {
    setVh(window.innerHeight);
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      setScrollY(e.currentTarget.scrollTop);
    },
    []
  );

  /* Transition progress values */
  const skyProgress = Math.min(
    Math.max((scrollY - vh * 0.3) / (vh * 1.2), 0),
    1
  );
  const heroFade = Math.min(scrollY / (vh * 0.6), 1);
  const beamOpacity = Math.min(skyProgress * 0.35, 0.25);

  return (
    <>
      {/* ── Global styles ── */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          100% { transform: translateY(-15px) translateX(5px); }
        }

        @keyframes chromatic-ab {
          0%   { text-shadow: -3px 0 rgba(255,160,160,0.7),  3px 0 rgba(160,185,255,0.7); }
          25%  { text-shadow:  3px 0 rgba(255,160,160,0.7), -3px 0 rgba(160,185,255,0.7); }
          50%  { text-shadow: -2px 0 rgba(255,160,160,0.6),  2px 0 rgba(160,185,255,0.6); }
          75%  { text-shadow:  2px 0 rgba(255,160,160,0.7), -2px 0 rgba(160,185,255,0.7); }
          100% { text-shadow: -3px 0 rgba(255,160,160,0.7),  3px 0 rgba(160,185,255,0.7); }
        }

        .artist-word {
          display: inline;
          font-family: 'Mondwest', sans-serif;
        }
        .artist-word:hover {
          animation: chromatic-ab 0.35s infinite;
        }

        .scroll-container::-webkit-scrollbar { width: 4px; }
        .scroll-container::-webkit-scrollbar-track { background: transparent; }
        .scroll-container::-webkit-scrollbar-thumb {
          background: ${C.umber}40;
          border-radius: 2px;
        }

        .tier-card {
          background: ${C.black}cc;
          border: 1px solid ${C.umber}40;
          border-radius: 12px;
          padding: 2.5rem 2rem;
          backdrop-filter: blur(20px);
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }
        .tier-card:hover {
          border-color: ${C.gold}80;
          transform: translateY(-4px);
          box-shadow: 0 20px 60px ${C.black}80;
        }
        .tier-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
        }
        .tier-select::before {
          background: linear-gradient(90deg, transparent, ${C.sienna}, transparent);
        }
        .tier-signature::before {
          background: linear-gradient(90deg, transparent, ${C.gold}, transparent);
        }

        .apply-btn {
          display: inline-block;
          padding: 16px 48px;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 14px;
          letter-spacing: 2px;
          text-transform: uppercase;
          border: 1px solid ${C.gold};
          color: ${C.ivory};
          background: transparent;
          cursor: pointer;
          transition: all 0.4s ease;
          text-decoration: none;
        }
        .apply-btn:hover {
          background: ${C.gold};
          color: ${C.black};
        }
      `}</style>

      {/* ── Fixed background layers ── */}

      {/* LAYER 1: Grassland painting (fades out on scroll) */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url('/hero-grassland.jpg')",
          backgroundSize: "cover",
          backgroundPosition: `center ${50 + scrollY * 0.015}%`,
          opacity: 1 - skyProgress,
          zIndex: 0,
          transition: "opacity 0.15s ease-out",
        }}
      />

      {/* LAYER 2: Sky/clouds painting (fades in on scroll) */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url('/sky-clouds.jpg')",
          backgroundSize: "cover",
          backgroundPosition: `center ${60 - scrollY * 0.01}%`,
          opacity: skyProgress,
          zIndex: 0,
          transition: "opacity 0.15s ease-out",
        }}
      />

      {/* LAYER 3: Dark overlay for text readability */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(
            180deg,
            ${C.black}88 0%,
            ${C.black}55 40%,
            ${C.black}77 100%
          )`,
          zIndex: 1,
        }}
      />

      {/* LAYER 4: Warm light beam */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "60%",
          height: "100%",
          background: `radial-gradient(ellipse at top right, rgba(232,148,58,${beamOpacity}) 0%, transparent 70%)`,
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      <GrainOverlay />
      <Particles />

      {/* ── Scrollable content ── */}
      <div
        ref={containerRef}
        className="scroll-container"
        onScroll={handleScroll}
        style={{
          position: "relative",
          zIndex: 10,
          height: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
          fontFamily: "'Inter', sans-serif",
          color: C.ivory,
        }}
      >
        {/* ════════════════════ HERO ════════════════════ */}
        <section
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ opacity: 1 - heroFade * 0.6 }}
          >
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: C.gold,
                marginBottom: "2rem",
                fontWeight: 500,
              }}
            >
              Invitation Only
            </p>

            <h1
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                fontWeight: 400,
                lineHeight: 0.85,
                gap: 0,
                marginBottom: "0.5rem",
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                  fontSize: "clamp(18px, 3.5vw, 32px)",
                  color: C.ivory,
                  marginBottom: "0.05em",
                }}
              >
                The
              </span>
              <span
                style={{
                  fontSize: "clamp(48px, 10vw, 100px)",
                  letterSpacing: -2,
                  color: C.ivory,
                  marginBottom: "0.02em",
                }}
              >
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.8em" }}>
                  Open
                </span>
                <span className="artist-word" style={{ color: C.ivory }}>
                  Artist
                </span>
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                  fontSize: "clamp(24px, 4.5vw, 44px)",
                  color: C.ivory,
                  alignSelf: "flex-end",
                }}
              >
                Program
              </span>
            </h1>

            <GoldLine />

            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "clamp(16px, 2.2vw, 22px)",
                color: `${C.ivory}bb`,
                maxWidth: 500,
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Not a creator network.
              <br />
              A creative standard.
            </p>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              position: "absolute",
              bottom: "2rem",
              opacity: Math.max(1 - heroFade * 3, 0),
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                fontSize: 11,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: `${C.ivory}55`,
              }}
            >
              Scroll
            </span>
            <div
              style={{
                width: 1,
                height: 40,
                background: `linear-gradient(to bottom, ${C.ivory}44, transparent)`,
              }}
            />
          </motion.div>
        </section>

        {/* ════════════════════ MANIFESTO ════════════════════ */}
        <section
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "6rem 2rem",
          }}
        >
          <div
            style={{
              maxWidth: 640,
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <Reveal>
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: "clamp(24px, 4vw, 42px)",
                  lineHeight: 1.5,
                  color: C.ivory,
                  fontWeight: 400,
                }}
              >
                We don&apos;t find OpenArtists.
                <br />
                <span style={{ color: C.gold }}>
                  We recognize them.
                </span>
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <GoldLine />
            </Reveal>

            <Reveal delay={0.25}>
              <p
                style={{
                  fontSize: "clamp(15px, 1.6vw, 17px)",
                  lineHeight: 1.9,
                  color: `${C.ivory}bb`,
                  fontWeight: 300,
                }}
              >
                The OpenArtist Program is a hand-selected group of
                creators who represent the future of AI-generated
                content. You&apos;ll get early access to every model
                on OpenArt before the public sees it. A direct line to
                our team. Your work amplified when it performs. And
                compensation for every post you create.
              </p>
            </Reveal>

            <Reveal delay={0.35}>
              <p
                style={{
                  fontSize: "clamp(15px, 1.6vw, 17px)",
                  lineHeight: 1.9,
                  color: `${C.ivory}bb`,
                  fontWeight: 300,
                  marginTop: "1.5rem",
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                }}
              >
                This is not a brand deal. This is a membership.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════ BENEFITS ════════════════════ */}
        <section style={{ padding: "6rem 2rem" }}>
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <Reveal>
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  color: C.gold,
                  marginBottom: "1rem",
                  textAlign: "center",
                }}
              >
                What you get
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(28px, 4vw, 40px)",
                  fontWeight: 400,
                  textAlign: "center",
                  marginBottom: "3rem",
                  fontStyle: "italic",
                }}
              >
                Built for the people defining
                <br />
                what AI content looks like.
              </h2>
            </Reveal>

            {[
              {
                icon: "🔮",
                title: "First access to every model",
                desc: "New models hit your dashboard before anyone else sees them. Test, create, and post first.",
              },
              {
                icon: "💰",
                title: "Paid per post",
                desc: "Compensation for every post you create, with performance bonuses when your content breaks through.",
              },
              {
                icon: "🎨",
                title: "Full creative freedom",
                desc: "A light brief with direction. No scripts. No rigid formats. Your voice, your style, always.",
              },
              {
                icon: "📡",
                title: "Amplified by OpenArt",
                desc: "When your content performs, we feature and amplify it across OpenArt's official channels.",
              },
              {
                icon: "🔑",
                title: "Direct line to the team",
                desc: "Product access, roadmap input, and a named point of contact who responds in 24 hours.",
              },
              {
                icon: "⚡",
                title: "Pro account included",
                desc: "Full OpenArt Pro access from day one. Every tool, every model, no limits.",
              },
            ].map((b, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 16,
                    padding: "1.25rem 0",
                    borderBottom: `1px solid ${C.umber}15`,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontSize: 16,
                      background: `${C.umber}20`,
                    }}
                  >
                    {b.icon}
                  </div>
                  <div>
                    <p
                      style={{
                        fontWeight: 500,
                        fontSize: 15,
                        marginBottom: 4,
                        color: C.ivory,
                      }}
                    >
                      {b.title}
                    </p>
                    <p
                      style={{
                        fontSize: 14,
                        color: `${C.ivory}99`,
                        lineHeight: 1.6,
                        fontWeight: 300,
                      }}
                    >
                      {b.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ════════════════════ TIERS ════════════════════ */}
        <section style={{ padding: "6rem 2rem" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <Reveal>
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  color: C.gold,
                  marginBottom: "1rem",
                  textAlign: "center",
                }}
              >
                Two tiers
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(28px, 4vw, 40px)",
                  fontWeight: 400,
                  textAlign: "center",
                  marginBottom: "3rem",
                  fontStyle: "italic",
                }}
              >
                Earn your place. Then rise.
              </h2>
            </Reveal>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {/* ── Foundry ── */}
              <Reveal delay={0.1}>
                <div className="tier-card tier-select">
                  <span
                    style={{
                      display: "inline-block",
                      padding: "4px 14px",
                      borderRadius: 20,
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      background: `${C.sienna}25`,
                      color: C.sienna,
                      border: `1px solid ${C.sienna}40`,
                    }}
                  >
                    Select
                  </span>

                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 32,
                      fontWeight: 400,
                      margin: "1.5rem 0 0.5rem",
                    }}
                  >
                    $50
                    <span
                      style={{
                        fontSize: 16,
                        color: `${C.ivory}66`,
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 300,
                      }}
                    >
                      /post
                    </span>
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      color: `${C.ivory}88`,
                      marginBottom: "2rem",
                      fontWeight: 300,
                    }}
                  >
                    + $50 performance bonus per post
                  </p>

                  {[
                    "2–3 posts per month",
                    "Early model access",
                    "Pro account included",
                    "Creative freedom on every brief",
                    "OpenArtist badge",
                    "Path to Signature at 90 days",
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "10px 0",
                        borderBottom: `1px solid ${C.umber}15`,
                        fontSize: 14,
                        color: `${C.ivory}bb`,
                        fontWeight: 300,
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <span
                        style={{ color: C.sienna, fontSize: 10 }}
                      >
                        ◆
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* ── Vanguard ── */}
              <Reveal delay={0.2}>
                <div
                  className="tier-card tier-signature"
                  style={{ borderColor: `${C.gold}30` }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      padding: "4px 14px",
                      borderRadius: 20,
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      background: `${C.gold}20`,
                      color: C.gold,
                      border: `1px solid ${C.gold}50`,
                    }}
                  >
                    Signature
                  </span>

                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 32,
                      fontWeight: 400,
                      margin: "1.5rem 0 0.5rem",
                    }}
                  >
                    $100
                    <span
                      style={{
                        fontSize: 16,
                        color: `${C.ivory}66`,
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 300,
                      }}
                    >
                      /post
                    </span>
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      color: `${C.ivory}88`,
                      marginBottom: "2rem",
                      fontWeight: 300,
                    }}
                  >
                    + $50 performance bonus per post
                  </p>

                  {[
                    "2–3 posts per month",
                    "First access to every model drop",
                    "Direct Slack with the team",
                    "Quarterly roadmap input",
                    "Featured on OpenArt's channels",
                    "Campaign lead opportunities",
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "10px 0",
                        borderBottom: `1px solid ${C.umber}15`,
                        fontSize: 14,
                        color: `${C.ivory}bb`,
                        fontWeight: 300,
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <span style={{ color: C.gold, fontSize: 10 }}>
                        ◆
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.3}>
              <p
                style={{
                  textAlign: "center",
                  fontSize: 13,
                  color: `${C.ivory}66`,
                  marginTop: "2rem",
                  fontStyle: "italic",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Performance thresholds: 250K views (IG) or 50K
                impressions (X)
              </p>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════ HOW IT WORKS ════════════════════ */}
        <section style={{ padding: "6rem 2rem" }}>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <Reveal>
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  color: C.gold,
                  marginBottom: "1rem",
                  textAlign: "center",
                }}
              >
                How it works
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(28px, 4vw, 40px)",
                  fontWeight: 400,
                  textAlign: "center",
                  marginBottom: "3rem",
                  fontStyle: "italic",
                }}
              >
                Five steps. Then momentum.
              </h2>
            </Reveal>

            {[
              {
                num: "01",
                title: "Get familiar",
                desc: "Spend time in OpenArt. Try the models. Build something you're proud of. Your first post should feel like a discovery, not an assignment.",
              },
              {
                num: "02",
                title: "Receive your brief",
                desc: "A light creative direction with a feature to explore and full creative freedom beyond that. No scripts. No corporate tone.",
              },
              {
                num: "03",
                title: "Create and post",
                desc: "Include at least one piece of content made in OpenArt. Use your tracking link. Post when it feels right for your audience.",
              },
              {
                num: "04",
                title: "Get paid",
                desc: "Payment is processed on the 15th of every month. Bonus payments process within 14 days of hitting performance thresholds.",
              },
              {
                num: "05",
                title: "Grow together",
                desc: "The better your content performs, the more we amplify it. Top OpenArtists move to Signature. First in line for every campaign.",
              },
            ].map((step, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div
                  style={{
                    display: "flex",
                    gap: "1.5rem",
                    marginBottom: "2.5rem",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 36,
                      fontWeight: 300,
                      color: `${C.gold}40`,
                      lineHeight: 1,
                      flexShrink: 0,
                      width: 50,
                    }}
                  >
                    {step.num}
                  </span>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 20,
                        fontStyle: "italic",
                        marginBottom: 6,
                        color: C.ivory,
                      }}
                    >
                      {step.title}
                    </p>
                    <p
                      style={{
                        fontSize: 14,
                        lineHeight: 1.7,
                        color: `${C.ivory}99`,
                        fontWeight: 300,
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ════════════════════ CLOSING CTA ════════════════════ */}
        <section
          style={{
            minHeight: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "6rem 2rem",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 600 }}>
            <Reveal>
              <div
                style={{
                  position: "relative",
                  marginBottom: "2rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 80,
                    lineHeight: 1,
                    color: `${C.gold}30`,
                    position: "absolute",
                    top: -10,
                    left: 0,
                  }}
                >
                  &ldquo;
                </span>
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontSize: "clamp(22px, 3.5vw, 34px)",
                    lineHeight: 1.5,
                    color: C.ivory,
                    paddingLeft: 20,
                  }}
                >
                  The best seat at the table in AI content right now
                  is available to a very small number of people.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(18px, 2.5vw, 24px)",
                  color: C.gold,
                  marginBottom: "3rem",
                  fontStyle: "italic",
                }}
              >
                You have one of them.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <GoldLine />
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  color: `${C.ivory}55`,
                  marginTop: "2rem",
                  marginBottom: "2rem",
                }}
              >
                Invitation only. Always.
              </p>
            </Reveal>

            <Reveal delay={0.35}>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(14px, 2vw, 18px)",
                  color: `${C.ivory}66`,
                  marginTop: "4rem",
                  fontStyle: "italic",
                }}
              >
                — The OpenArt Team
              </div>

              {/* OpenArt logo mark */}
              <div style={{ marginTop: "3rem" }}>
                <svg
                  width="40"
                  height="24"
                  viewBox="0 0 40 24"
                  fill="none"
                >
                  <path
                    d="M8 4C4 4 0 8 0 12s4 8 8 8c2 0 4-1 5.5-2.5L20 12l-6.5-5.5C12 5 10 4 8 4z"
                    stroke={`${C.ivory}44`}
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M32 4c4 0 8 4 8 8s-4 8-8 8c-2 0-4-1-5.5-2.5L20 12l6.5-5.5C28 5 30 4 32 4z"
                    stroke={`${C.ivory}44`}
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer
          style={{
            padding: "2rem",
            textAlign: "center",
            borderTop: `1px solid ${C.umber}15`,
          }}
        >
          <p
            style={{
              fontSize: 12,
              color: `${C.ivory}33`,
              fontWeight: 300,
            }}
          >
            © 2025 OpenArt. The OpenArtist Program.
          </p>
        </footer>
      </div>
    </>
  );
}