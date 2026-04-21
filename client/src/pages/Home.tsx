/**
 * DESIGN: "The Wellness News Report"
 * Philosophy: Premium investigative health journalism aesthetic
 * Colors: Warm off-white bg, forest green #1B4D3E, amber #B8860B, near-black text
 * Fonts: Playfair Display (headlines), Merriweather (body), DM Sans (UI)
 * Layout: Single editorial column, max 720px, with publication header
 *
 * ALL ASSETS: Real client assets uploaded to CDN — no AI placeholders
 */

import { useEffect, useRef, useState } from "react";

// ─── CDN Asset URLs ───────────────────────────────────────────────────────────
// Videos (used as autoplay muted loop — GIF-style)
const VID_ABOVE_FOLD    = "https://d2xsxph8kpxj0f.cloudfront.net/310519663529409853/3AEXRUJeuYifWExCNaLMLt/Abovethefoldadv_5b253856.mp4";
const VID_PRODUCT_INTRO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663529409853/3AEXRUJeuYifWExCNaLMLt/productintroduction_0fd5b9d4.mp4";
const VID_RESULTS       = "https://d2xsxph8kpxj0f.cloudfront.net/310519663529409853/3AEXRUJeuYifWExCNaLMLt/hf_20260410_093111_67274f7b-769e-4b1f-8477-f16b0b96d5ed_08665034.mp4";

// Images
const IMG_DR_HOLMES_PRODUCT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663529409853/3AEXRUJeuYifWExCNaLMLt/dr-holmes-with-product_4bdfc30c.webp";
const IMG_INGREDIENTS       = "https://d2xsxph8kpxj0f.cloudfront.net/310519663529409853/3AEXRUJeuYifWExCNaLMLt/trybelloingredients_c211e0e0.webp";
const IMG_DR_HOLMES_LECTURE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663529409853/3AEXRUJeuYifWExCNaLMLt/dryolandaholmes_ad94cf0f.jpeg";
const IMG_GUARANTEE_SEAL    = "https://d2xsxph8kpxj0f.cloudfront.net/310519663529409853/3AEXRUJeuYifWExCNaLMLt/hf_20260408_133139_2051e41f-7abd-4b8c-97d7-98f69c244410_5c7a205f.png";
const IMG_FACETIME          = "https://d2xsxph8kpxj0f.cloudfront.net/310519663529409853/3AEXRUJeuYifWExCNaLMLt/hf_20260408_133111_9c50b3de-91f2-4c59-a08a-ad617ec5f550_74e64f4a.png";
const IMG_BEFORE_AFTER_GRID = "https://d2xsxph8kpxj0f.cloudfront.net/310519663529409853/3AEXRUJeuYifWExCNaLMLt/hf_20260408_133121_7779fd89-edec-4e0d-b860-eebd0e22adde_4ff99c57.png";
const IMG_PRICING           = "https://d2xsxph8kpxj0f.cloudfront.net/310519663529409853/3AEXRUJeuYifWExCNaLMLt/hf_20260408_133518_d160bd60-5384-4a6e-802a-5e3aed7256f7_47d453b4.png";
const IMG_WHAT_I_TOLD       = "https://d2xsxph8kpxj0f.cloudfront.net/310519663529409853/3AEXRUJeuYifWExCNaLMLt/hf_20260408_134021_58a8c422-97ea-4a1d-ab44-9093359e9320_c3ec3d50.png";
const IMG_TRASH_CAN         = "https://d2xsxph8kpxj0f.cloudfront.net/310519663529409853/3AEXRUJeuYifWExCNaLMLt/hf_20260408_132935_bfcbb607-27bb-4ce3-9aac-d8d30b46bded_cfe1a940.png";
const IMG_CELEBRITY_VS      = "https://d2xsxph8kpxj0f.cloudfront.net/310519663529409853/3AEXRUJeuYifWExCNaLMLt/hf_20260410_092057_94de24a1-06b4-48ab-a677-452bb6034827_7b2ad96c.png";
const IMG_DHT_STAGES        = "https://d2xsxph8kpxj0f.cloudfront.net/310519663529409853/3AEXRUJeuYifWExCNaLMLt/hf_20260408_132918_3477f5dc-225d-4f59-9064-3bc6009727b0_613c3740.png";
const IMG_HOLLYWOOD_SET     = "https://d2xsxph8kpxj0f.cloudfront.net/310519663529409853/3AEXRUJeuYifWExCNaLMLt/hf_20260408_133431_492a1f39-faa7-4f37-af60-b20fa99d2572_3430b986.png";
const IMG_BEFORE_AFTER_12W  = "https://d2xsxph8kpxj0f.cloudfront.net/310519663529409853/3AEXRUJeuYifWExCNaLMLt/hf_20260408_134147_08908866-2e97-4eab-95d5-e4fdb9bfe4bd_797b977d.png";
const IMG_RENEE_PORTRAIT     = "https://d36hbw14aib5lz.cloudfront.net/310519663529409853/3AEXRUJeuYifWExCNaLMLt/renee-halsted-portrait-2Tr8cMdY354SynoPHM67Rn.webp?Expires=1807955981&Signature=MTEQVMg6WI5pk2h-mTmsIIhasteNZwjlkK5kqiTLacvR9uo0ACyvcT7VPrKemg6m4nNXKXhCBVHNPdmQ1Q-JpVAzeg9uDObCXkMrOcCirVBtEKDG6vWS9NGhuIneV4FWWDijnMwhwLGXR-YaYqDXVpNtfESHGc4K5vyI5ex1bPjERUKdL7hoBzOPsclIH4aSMmiskolc-ebOfyUPfPFsA81KOgLOR4vSauaQiA-LYwXbdHDlwnYWK9m6aDaadqnG1bEyjWPD8DrmLwMT4Siwh7uQuinTJy1gTejZ4aHrcNBqEfvuaugz6C3sBHI4IKoWXYO~m~1qU4oBN0zKWnZkdg__&Key-Pair-Id=K1MP89RTKNH4J";
const IMG_DR_HOLMES_OFFICIAL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663529409853/3AEXRUJeuYifWExCNaLMLt/dr-holmes-product-official_cf1d3127.webp";
const IMG_WOMAN_IN_CHAIR4   = "https://d2xsxph8kpxj0f.cloudfront.net/310519663529409853/3AEXRUJeuYifWExCNaLMLt/adv-woman-in-chair4-exr7svjKMK2eR3yBSDe3sQ.webp";
const IMG_TIMELINE_JOURNEY  = "https://d2xsxph8kpxj0f.cloudfront.net/310519663529409853/3AEXRUJeuYifWExCNaLMLt/adv-timeline-journey-2oMSksd9EdCtD238Xc5efb.webp";
const IMG_LETTER_WRITING    = "https://d2xsxph8kpxj0f.cloudfront.net/310519663529409853/3AEXRUJeuYifWExCNaLMLt/adv-letter-writing-8t2sNYrLPMzoDZQpvuce6Y.webp";

// ─── Countdown Timer Hook ─────────────────────────────────────────────────────
function useCountdown(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// ─── Scroll Fade-In Hook ──────────────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

// ─── Section Image — preserves original ratio, no cropping ───────────────────
function SectionImage({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        margin: "2rem 0",
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", height: "auto", display: "block", borderRadius: "4px" }}
      />
      {caption && (
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "#777", marginTop: "0.5rem", fontStyle: "italic", textAlign: "center" }}>
          {caption}
        </p>
      )}
    </div>
  );
}

// ─── GIF-style Video — autoplay, muted, loop, no controls ────────────────────
function VideoGif({ src, caption, poster }: { src: string; caption?: string; poster?: string }) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        margin: "2rem 0",
      }}
    >
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        style={{ width: "100%", height: "auto", display: "block", borderRadius: "4px" }}
      />
      {caption && (
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "#777", marginTop: "0.5rem", fontStyle: "italic", textAlign: "center" }}>
          {caption}
        </p>
      )}
    </div>
  );
}

// ─── Above-Fold Video — eager preload + poster for instant above-fold display ──────
function AboveFoldVideo({ src, poster, caption }: { src: string; poster: string; caption?: string }) {
  return (
    <div style={{ margin: "2rem 0" }}>
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        style={{ width: "100%", height: "auto", display: "block", borderRadius: "4px" }}
      />
      {caption && (
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "#777", marginTop: "0.5rem", fontStyle: "italic", textAlign: "center" }}>
          {caption}
        </p>
      )}
    </div>
  );
}

// ─── CTA Block ────────────────────────────────────────────────────────────────
function CTABlock({ countdown }: { countdown: string }) {
  return (
    <div style={{ background: "#F2F0EB", border: "1px solid #D8D4CA", borderRadius: "6px", padding: "2rem", margin: "2.5rem 0", textAlign: "center" }}>
      <div style={{ background: "#1B4D3E", color: "#F0C040", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.35rem 0.75rem", borderRadius: "3px", display: "inline-block", marginBottom: "1rem" }}>
        ⏱ This 60% Discount Expires In: {countdown}
      </div>
      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 700, color: "#1C1C1E", marginBottom: "0.5rem", lineHeight: 1.3 }}>
        Only 4,200 Units Available at This Price
      </p>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#555", marginBottom: "1.5rem" }}>
        Regular price: <s>$120/bottle</s> → <strong style={{ color: "#1B4D3E" }}>$33/bottle</strong> (3-month supply, 60% off)
      </p>
      <a
        href="https://start.trybello.com/trybello-hair-helper-s1-a313-sp"
style={{ display: "block", background: "#1B4D3E", color: "white", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "1rem", letterSpacing: "0.06em", textTransform: "uppercase", textAlign: "center", padding: "1.1rem 2rem", borderRadius: "4px", textDecoration: "none", marginBottom: "1rem" }}
          >
            {"🔒 Claim My 60% Discount Now — Before It's Gone"}
          </a>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.75rem", marginTop: "0.75rem" }}>
        {["📦 Free Expedited Shipping", "💯 120-Day Money-Back Guarantee", "🔐 Secure Checkout"].map((item) => (
          <span key={item} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "#444", background: "white", border: "1px solid #D8D4CA", borderRadius: "3px", padding: "0.3rem 0.6rem" }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Home() {
  const countdown = useCountdown(47 * 3600 + 23 * 60 + 14);
  const [progress, setProgress] = useState(0);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(pct);
      setShowSticky(pct > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const body: React.CSSProperties = {
    fontFamily: "'Merriweather', Georgia, serif",
    fontSize: "1.05rem",
    lineHeight: 1.85,
    color: "#1C1C1E",
  };

  const p: React.CSSProperties = { marginBottom: "1.4rem" };

  const h2: React.CSSProperties = {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontWeight: 700,
    fontSize: "1.65rem",
    lineHeight: 1.25,
    color: "#1C1C1E",
    marginTop: "3rem",
    marginBottom: "0.75rem",
    paddingBottom: "0.6rem",
    borderBottom: "3px solid #B8860B",
  };

  const divider: React.CSSProperties = {
    border: "none",
    borderTop: "1px solid #D8D4CA",
    margin: "2.5rem 0",
  };

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      {/* Reading Progress Bar */}
      <div style={{ position: "fixed", top: 0, left: 0, height: "3px", background: "#B8860B", width: `${progress}%`, zIndex: 1000, transition: "width 0.1s linear" }} />

      {/* Publication Header */}
      <header style={{ background: "#1B4D3E", borderBottom: "3px solid #B8860B" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0.75rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "1.4rem", color: "white", letterSpacing: "-0.01em" }}>
              WellnessReport
            </span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "#B8D4BC", letterSpacing: "0.08em", textTransform: "uppercase", borderLeft: "1px solid #4A7A5E", paddingLeft: "1rem" }}>
              Investigative Health
            </span>
          </div>
          <nav style={{ display: "flex", gap: "1.25rem" }}>
            {["Hair Health", "Hormones", "Skincare", "Wellness"].map((item) => (
              <span key={item} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#B8D4BC", cursor: "pointer" }}>{item}</span>
            ))}
          </nav>
        </div>
      </header>



      {/* Article Container */}
      <main style={{ maxWidth: "720px", margin: "0 auto", padding: "2.5rem 1.25rem 4rem" }}>

        {/* Category + Meta */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
          <span style={{ background: "#1B4D3E", color: "white", fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.25rem 0.6rem", borderRadius: "3px" }}>
            HAIR HEALTH
          </span>
          <span style={{ background: "#C0392B", color: "white", fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.25rem 0.6rem", borderRadius: "3px" }}>
            EXCLUSIVE
          </span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#777" }}>
            April 10, 2026 · 9:47 AM EST · 18 min read
          </span>
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontSize: "clamp(1.9rem, 5vw, 2.75rem)", lineHeight: 1.15, color: "#1C1C1E", marginBottom: "1.25rem" }}>
          I Kept A-List Actresses' Hair Thick for 18 Years While 40 Million Women Went Bald. I Can't Live With That Anymore.
        </h1>

        {/* Deck / Subheadline */}
        <p style={{ fontFamily: "'Merriweather', serif", fontWeight: 700, fontSize: "1.1rem", lineHeight: 1.6, color: "#333", marginBottom: "1.5rem", borderLeft: "4px solid #B8860B", paddingLeft: "1rem" }}>
          A celebrity stylist's public confession: the plant-based DHT protocol she was forbidden from sharing, the famous clients who begged her to stay quiet, and why she's putting everything on the line to give every woman over 40 access to what actually works.
        </p>



        {/* ★ ABOVE THE FOLD VIDEO — directly under main headline+subheadline ★ */}
        {/* Uses AboveFoldVideo with poster for instant display while video loads */}
        <AboveFoldVideo
          src={VID_ABOVE_FOLD}
          poster="https://d2xsxph8kpxj0f.cloudfront.net/310519663529409853/3AEXRUJeuYifWExCNaLMLt/above-fold-poster_c8cf7a20.jpg"
          caption="The protocol applied to celebrity scalps every morning for 18 years. Now available to everyone."
        />

        {/* Author Byline */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem 0", borderTop: "1px solid #D8D4CA", borderBottom: "1px solid #D8D4CA", marginBottom: "2rem", flexWrap: "wrap" }}>
          {/* Author avatars — Renée (product+Holmes combo cropped) and Dr. Holmes solo */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <div style={{ position: "relative", width: "44px", height: "44px", flexShrink: 0 }}>
              <img
                src={IMG_RENEE_PORTRAIT}
                alt="Renée Halsted"
                style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", objectPosition: "center top", border: "2px solid white", display: "block" }}
              />
            </div>
            <div style={{ position: "relative", width: "44px", height: "44px", flexShrink: 0, marginLeft: "-12px" }}>
              <img
                src={IMG_DR_HOLMES_LECTURE}
                alt="Dr. Yolanda Holmes"
                style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", objectPosition: "center top", border: "2px solid white", display: "block" }}
              />
            </div>
          </div>
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.85rem", color: "#1C1C1E", margin: 0 }}>
              Renée Halsted, Licensed Cosmetologist & Dr. Yolanda Holmes, MD, FAAD
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#777", margin: 0 }}>
              Investigative Report · Board-Certified Dermatologist Co-Author
            </p>
          </div>
        </div>

        {/* Opening Copy */}
        <div style={body}>
          <p style={p}>This isn't an article. It's a confession.</p>
          <p style={p}>I need to tell you something I've done. Something I've carried for 18 years. Something that wakes me up at 2 AM and sits on my chest like a stone and won't let me breathe until I get up and pace around my apartment in the dark.</p>
          <p style={p}>My name is Renée Halsted. I'm a licensed cosmetologist. For the last 18 years, I've worked as a hairstylist for celebrity clients — film sets, red carpets, magazine shoots, press tours. Names you would recognize instantly. Names I'm legally prohibited from saying.</p>
          <p style={p}>I've touched their hair. Styled it. Maintained it. And every single morning for 18 years, I've applied a specific formula to their scalps — a protocol developed by their private physicians — that kept their hair thick, full, and camera-ready through menopause, through their 50s, their 60s, and beyond.</p>
          <p style={p}>That protocol works. I've watched it work thousands of times.</p>
          <p style={p}>And for 18 years, I kept it a secret from every woman who wasn't famous enough or rich enough to have access to it.</p>
          <p style={p}>I kept it a secret while 40 million American women lost their hair. While they spent thousands on products that didn't work. While they cried in bathrooms and avoided mirrors and wore hats to hide their scalps and were told by their doctors to "just accept it."</p>
          <p style={p}>I could have said something. At any point in those 18 years, I could have walked away from my career and told the truth. I didn't. Because I was well-paid. Because I was afraid. Because staying quiet was easier than blowing up the only life I'd built.</p>
          <p style={{ ...p, fontWeight: 700 }}>I want you to understand something before you read another word: I'm not the hero of this story. I'm the person who should have spoken up 15 years ago and didn't. What I'm about to share doesn't make me brave. It makes me late.</p>
          <p style={p}>But late is better than never.</p>
          <p style={p}>And never is exactly what the people who paid me were counting on.</p>
        </div>

        <hr style={divider} />

        {/* ─── SECTION: The Woman in Chair 4 ─── */}
        <h2 style={h2}>The Woman in Chair 4</h2>

        {/* Salon chair image — woman looking in mirror, reflective */}
        <SectionImage src={IMG_WOMAN_IN_CHAIR4} alt="A woman in her mid-50s sitting in a salon chair, looking quietly into the mirror" caption='Teresa. Chair 4. The last appointment. Twelve years ago. I still think about her every day.' />

        <div style={body}>
          <p style={p}>Before Hollywood, I was nobody special.</p>
          <p style={p}>I worked at a salon called Reflections in a strip mall in Dayton, Ohio. Four chairs, a reception desk, a radio that only picked up two stations. Walk-ins and regulars. Women I knew by name, whose kids I watched grow up, whose hair I did every six weeks like clockwork.</p>
          <p style={p}>Teresa sat in chair 4.</p>
          <p style={p}>She was 54. Worked reception at a dental office across the street. Came every six weeks for a color and trim. She was the kind of woman who held a room together without trying — always laughing, always asking about your life before you could ask about hers, always bringing cookies for the staff on holidays.</p>
          <p style={p}>I did Teresa's hair for almost four years. And over the last two of those years, I watched something happen that I didn't have the words for at the time.</p>
          <p style={p}>Her hair was thinning.</p>
          <p style={p}>Not breaking. Not damaged. Thinning. The way a garden thins in October — slowly, then all at once. Each appointment, there was a little less to work with. More scalp showing through the color. The ponytail getting smaller. The part getting wider. She started requesting "layers to add volume" — and every hairdresser reading this knows what that really means. It means: <em>please make it look like I have more hair than I do.</em></p>
          <p style={p}>I'd adjust the layers. Blow it out with more lift. Tease the crown. Send her off with a smile. And every six weeks she'd come back with a little less.</p>
          <p style={p}>One afternoon — it was a Tuesday, I remember the light in the salon — Teresa sat down in my chair and didn't say anything for a long time. I draped the cape. Started sectioning her hair. And she said, very quietly, almost to herself:</p>

          <blockquote style={{ borderLeft: "4px solid #B8860B", paddingLeft: "1.25rem", margin: "1.5rem 0", fontStyle: "italic", color: "#333", fontSize: "1.05rem", lineHeight: 1.8 }}>
            "I think this might be my last appointment for a while, Renée."
          </blockquote>

          <p style={p}>I looked at her in the mirror. Her eyes were wet.</p>
          <p style={p}>"I can't... I don't want to look at it anymore. I've tried everything. The Rogaine. Those biotin pills. That serum my doctor recommended. I've spent... I don't even know how much anymore. Over two thousand dollars, probably. And it just keeps getting worse."</p>
          <p style={p}>She took a breath.</p>
          <p style={p}>"I'm going to try a topper. My sister wears one. She says you get used to it."</p>
          <p style={p}>Teresa made $36,000 a year. She'd spent over $2,000 — money she did not have — on products that were never designed to fix what was actually wrong with her hair. And now she was going to spend another $800 on a hairpiece to cover up the damage those products couldn't touch.</p>
          <p style={p}>I hugged her goodbye. She left the salon. I never saw her again.</p>
          <p style={p}>That was 12 years ago.</p>
          <p style={p}>I still think about Teresa every single day.</p>
          <p style={p}>I think about her when I'm standing behind a famous woman, spraying a formula on her scalp that would have saved Teresa's hair. I think about her when I see women on the street pulling at their ponytails or adjusting scarves over their crowns. I think about her right now, writing this sentence.</p>
          <p style={p}>Because here's the part I haven't told you yet.</p>
          <p style={p}>When Teresa sat in my chair that last time and told me she'd tried everything and nothing worked — <strong>I already knew why nothing worked. I'd known for two years.</strong></p>
          <p style={p}>By then, I was already working in Hollywood. I was already applying the protocol to my celebrity clients. I already understood that Teresa's hair wasn't thinning because of aging or stress or genetics. It was thinning because of a hormone — a specific, identifiable, treatable hormone — that nobody outside the world I worked in was being told about.</p>
          <p style={p}>I knew. And I said nothing.</p>
          <p style={p}>I helped her pick out a topper style. I told her she'd look great. And I let her walk out the door.</p>
          <p style={{ ...p, fontWeight: 700, fontSize: "1.1rem" }}>Teresa isn't one woman. Teresa is 40 million women. And I stayed silent for every single one of them.</p>
        </div>

        <hr style={divider} />

        {/* ─── SECTION: Behind the Velvet Rope ─── */}
        <h2 style={h2}>Behind the Velvet Rope</h2>

        {/* Celebrity vs Regular scalp comparison */}
        <SectionImage src={IMG_CELEBRITY_VS} alt="Celebrity scalp age 59 vs regular woman's scalp — same menopause, different protocol" caption='"Same menopause. Different protocol." The only difference was access.' />

        <div style={body}>
          <p style={p}>I got into celebrity work almost by accident. A friend of a friend needed a backup stylist for an awards show. I showed up, did competent work, kept my mouth shut. Someone noticed. A phone call led to another phone call. Within six months, I was on retainer.</p>
          <p style={p}>The first thing I noticed — the thing that ate at me for years before I understood it — was the hair.</p>
          <p style={p}>Every actress I worked with over 50 had incredible hair. Not good-for-her-age hair. Not cleverly-styled-to-hide-the-thinning hair. Genuinely thick, full, healthy hair. The kind of hair that made my job almost laughably easy. Blow-outs that should have taken an hour took twenty minutes because there was so much to work with.</p>
          <p style={p}>I assumed it was extensions. It wasn't. I assumed it was wigs. It wasn't. I assumed it was genetics — that famous people were just built differently.</p>
          <p style={p}>They weren't.</p>
          <p style={p}>My first week with a major client — a household name, late 50s, post-menopausal — her personal assistant handed me a small bottle and a card with instructions.</p>

          <blockquote style={{ borderLeft: "4px solid #B8860B", paddingLeft: "1.25rem", margin: "1.5rem 0", fontStyle: "italic", color: "#333", fontSize: "1.05rem", lineHeight: 1.8 }}>
            "She gets this every morning. Part, crown, hairline. Sixty seconds. Massage gently. Don't ask about it and don't discuss it with anyone."
          </blockquote>

          <p style={p}>That was it. No explanation. No context. Just a bottle and an instruction to never talk about it.</p>
          <p style={p}>And here's the thing that haunts me more than anything else about those early years: <strong>the casualness.</strong></p>
          <p style={p}>These women didn't think about hair loss. It wasn't a battle for them. It wasn't a source of anxiety or shame or midnight Google searches. It was a complete non-issue — because someone had solved it for them quietly, privately, years ago. They'd moved on. They were thinking about scripts and charity events and vacation homes. While women like Teresa were sobbing in salon chairs.</p>
          <p style={p}>Over 18 years, I saw the same type of bottle — different doctors, different labels, same basic protocol — on every set, in every trailer, at every press junket. All the stylists knew. The makeup artists knew. The personal assistants knew. It was the most open secret in Hollywood.</p>
          <p style={p}>Nobody ever talked about it publicly.</p>
          <p style={p}>Because talking meant losing access. And access was everything.</p>
        </div>

        {/* Hollywood set product image */}
        <SectionImage src={IMG_HOLLYWOOD_SET} alt="Hair Helper Spray on a Hollywood film set styling table" caption="The bottle that was on every set, every trailer, every press junket. For 18 years." />

        <div style={body}>
          <p style={{ ...p, fontWeight: 700 }}>In Hollywood, hair loss after menopause doesn't exist. Not because it can't happen — because it was solved years ago. Quietly. Privately. For the women who could afford it. The rest of the world was never invited to know.</p>
        </div>

        <hr style={divider} />

        {/* ─── SECTION: The Hormone They Solved in Secret ─── */}
        <h2 style={h2}>The Hormone They Solved in Secret</h2>

        {/* Dr. Holmes lecturing on DHT */}
        <SectionImage src={IMG_DR_HOLMES_LECTURE} alt="Dr. Yolanda Holmes presenting menopausal hair loss and DHT to an audience" caption="Dr. Holmes presenting the DHT research that private physicians had been using for decades — while the public was told 'just accept it.'" />

        <div style={body}>
          <p style={p}>Eventually, the guilt got heavy enough that I started asking questions I'd been told not to ask.</p>
          <p style={p}>I didn't care about the protocol anymore. I cared about the WHY. Why did it work? Why didn't anything else work? And why — if the answer was this simple — was it being kept from 40 million women?</p>
          <p style={p}>A private dermatologist attached to one of my clients agreed to explain. Off the record. No names.</p>
          <p style={p}>What he told me made me physically ill. Not because it was complicated. Because it was simple. Because the answer had been sitting in published medical research for over 30 years. And nobody outside the velvet rope was being told.</p>

          <div style={{ background: "#1B4D3E", color: "white", borderRadius: "6px", padding: "1.5rem", margin: "1.5rem 0" }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.2rem", marginBottom: "0.75rem", color: "white" }}>
              Your hair isn't thinning because you're aging.
            </p>
            <p style={{ fontFamily: "'Merriweather', serif", fontSize: "1rem", lineHeight: 1.7, color: "#C8DDD0", margin: 0 }}>
              It's thinning because of a hormone called <strong style={{ color: "white" }}>DHT (Dihydrotestosterone)</strong>. After 40 — especially during perimenopause and menopause — your body starts producing dramatically more of it. DHT wraps around each follicle like a fist squeezing a garden hose shut, cutting off blood, oxygen, and nutrients until the follicle goes dormant.
            </p>
          </div>

          <p style={p}>He described it like someone slowly turning off every faucet in a house, one by one. Each hair follicle getting less blood, less oxygen, less nutrition — until it just... stops. Goes dormant. Shuts off.</p>

          <blockquote style={{ borderLeft: "4px solid #B8860B", paddingLeft: "1.25rem", margin: "1.5rem 0", fontStyle: "italic", color: "#333", fontSize: "1.1rem", lineHeight: 1.8 }}>
            "But it doesn't die. That's the part nobody tells patients. The follicle goes to sleep. It's waiting. Block the DHT, restore blood flow, and it can wake back up."
          </blockquote>

          <p style={p}>In 1994 — over 30 years ago — researchers at the University of Frankfurt published a study in the <em>Journal of Clinical Endocrinology</em>. They found that <strong>91% of menopausal women experiencing hair loss had DHT levels comparable to balding men.</strong></p>
          <p style={p}>Not slightly elevated. Comparable. To. Balding. Men.</p>
          <p style={p}>The private doctors serving celebrity clients read that study when it was published. They started developing topical DHT-blocking protocols immediately. Plant-based compounds. Applied directly to the scalp. Clinical doses. Their clients never thinned.</p>
          <p style={p}>And the public? The 40 million women without access to a private physician?</p>
          <p style={p}>They got Minoxidil — a blood vessel dilator that doesn't touch DHT and creates lifetime dependency. They got biotin supplements that stomach acid destroys before they reach the scalp. They got $3,000 PRP injections that don't address the root cause. They got $20,000 hair transplants that DHT undermines within years.</p>
          <p style={{ ...p, fontWeight: 700 }}>They got a $12 billion industry designed to manage their desperation — not fix their hair.</p>
        </div>

        {/* DHT follicle stages medical illustration */}
        <SectionImage src={IMG_DHT_STAGES} alt="Medical illustration showing 4 stages of DHT follicle miniaturization — Healthy, DHT Attacking, Suffocating, Dormant Not Dead" caption="The 4-stage DHT process. Stage 4 is the most important: dormant is NOT dead. Block DHT and the follicle wakes up." />

        <div style={body}>
          <p style={p}>I sat in my car after that conversation and cried. Not because the science was sad. Because it was so fixable. Because Teresa didn't need a $3,000 injection or a $20,000 surgery. She needed a formula that cost less than the cookies she brought to the salon. And nobody had bothered to tell her it existed.</p>
        </div>

        <hr style={divider} />

        {/* ─── SECTION: The Graveyard ─── */}
        <h2 style={h2}>The Graveyard of Everything I Recommended</h2>

        {/* Trash can image */}
        <SectionImage src={IMG_TRASH_CAN} alt="Failed hair loss products in a trash can with sticky note" caption={`"I'm sorry I told you to buy these. —R"`} />

        <div style={body}>
          <p style={p}>I need to confess something else. Something worse.</p>
          <p style={p}>Before I knew about the protocol — before Hollywood, before the private doctors, before I understood any of this — I was part of the machine.</p>
          <p style={p}>I recommended volumizing shampoos. I sold salon-brand "thickening" treatments. I told women to try Rogaine. I suggested biotin supplements. I did what every stylist does — I pushed whatever the distributors put on our shelves and whatever the beauty magazines told us worked.</p>
          <p style={p}>I didn't know I was selling false hope. But ignorance isn't innocence.</p>
          <p style={p}>Let me show you exactly what I — and the rest of the industry — sold you. And what it actually cost.</p>
        </div>

        {/* What I told you / What I knew split image */}
        <SectionImage src={IMG_WHAT_I_TOLD} alt="Split image: What I told you (Rogaine) vs What I knew (the real spray)" caption="What I recommended to you. What I was applying in Hollywood. Same time. Same years." />

        {/* Failed Products Breakdown */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", margin: "1.5rem 0" }}>
          {[
            {
              name: "Minoxidil (Rogaine)",
              why: "A blood vessel dilator that temporarily increases flow to follicles. Doesn't block DHT. Doesn't address the root cause. Stop using it and everything falls out again — sometimes worse than before.",
              cost: "$40–60/month → $6,000 over 10 years for lifetime dependency on a drug that doesn't fix anything.",
              side: "Side effects: scalp irritation, unwanted facial hair, heart palpitations.",
            },
            {
              name: "Supplements (Biotin, Nutrafol, Viviscal)",
              why: "Only 11% of women over 40 are actually biotin deficient. Stomach acid destroys most of the active ingredients before they get anywhere near your scalp. Maybe 2–3% of what you swallow actually reaches a follicle.",
              cost: "$60–90/month → $5,280 over 5 years for hope in capsule form.",
              side: "",
            },
            {
              name: "Extensions / Toppers / Wigs",
              why: "Clips and tape that damage the follicles you have left. The constant fear of wind, water, intimacy. Hiding the problem instead of fixing it.",
              cost: "$1,200 × 4/year = $4,800/year to HIDE what could be FIXED.",
              side: "",
            },
            {
              name: "PRP Injections",
              why: "Dozens of needles injected into your scalp per session. Temporary growth factor stimulation that fades within months. Doesn't touch DHT. 40% of patients see no improvement at all.",
              cost: "$1,500–3,000 per session → $10,000/year for temporary pain.",
              side: "",
            },
            {
              name: "Hair Transplants",
              why: "They relocate hair from the back of your head to the front. But DHT keeps miniaturizing every follicle — even the transplanted ones. 30–40% 'don't take.' Touch-ups needed every 2–3 years.",
              cost: "$12,000–20,000 initially → $30,000–50,000 over a decade.",
              side: "",
            },
          ].map((item) => (
            <div key={item.name} style={{ background: "#FDF2F2", borderLeft: "4px solid #C0392B", padding: "1rem 1.25rem", borderRadius: "0 4px 4px 0" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#C0392B", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                ✗ {item.name}
              </p>
              <p style={{ fontFamily: "'Merriweather', serif", fontSize: "0.9rem", lineHeight: 1.65, color: "#333", marginBottom: "0.4rem" }}>{item.why}</p>
              {item.side && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "#C0392B", marginBottom: "0.4rem" }}>{item.side}</p>}
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1C1C1E", margin: 0 }}>💸 {item.cost}</p>
            </div>
          ))}
        </div>

        <div style={{ background: "#1C1C1E", color: "white", borderRadius: "6px", padding: "1.25rem 1.5rem", margin: "1.5rem 0", textAlign: "center" }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.3rem", color: "#F0C040", marginBottom: "0.4rem" }}>
            Total Cost of "Trying Everything": $45,000+
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#C8C8C8", margin: 0 }}>
            And you're still losing hair. Because not one of these products addresses the hormone that's actually causing it.
          </p>
        </div>

        <CTABlock countdown={countdown} />

        <hr style={divider} />

        {/* ─── SECTION: The Formula ─── */}
        <h2 style={h2}>The Formula I Was Forbidden to Share</h2>

        {/* Ingredients product image */}
        <SectionImage src={IMG_INGREDIENTS} alt="TryBello Hair Helper Spray in a beaker surrounded by natural botanical ingredients" caption="The four core botanical compounds that appeared in every private formula — studied for decades, available to anyone who knew to look." />

        <div style={body}>
          <p style={p}>After that conversation with the private dermatologist, I started doing something I'd been explicitly told not to do.</p>
          <p style={p}>I started documenting.</p>
          <p style={p}>Photographing labels when assistants stepped out of the room. Writing down ingredients in a notebook I kept in my car. Cross-referencing compounds with published studies late at night after jobs, my laptop screen glowing in my dark apartment.</p>
          <p style={p}>What I found — across every private formula I encountered over the years, from different doctors, different clients, different cities — was the same foundation. The same four core botanical compounds appearing again and again:</p>
        </div>

        {/* Ingredient Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", margin: "1.5rem 0" }}>
          {[
            {
              name: "Sophora Flavescens Extract",
              claim: "Inhibits 5α-reductase — the enzyme that converts testosterone into DHT — by up to 67%.",
              source: "Published in the Journal of Dermatological Science",
            },
            {
              name: "Pharmaceutical-Grade Caffeine",
              claim: "Not your morning coffee. A topical compound that blocks DHT from binding to follicle receptors and extends the anagen (growth) phase.",
              source: "Published in the International Journal of Dermatology",
            },
            {
              name: "Rice Extract (Oryza Sativa)",
              claim: "Contains gamma-oryzanol and ferulic acid — natural compounds that inhibit DHT production. Seoul National University showed a 34% increase in follicle density in 12 weeks.",
              source: "Seoul National University Clinical Study",
            },
            {
              name: "Angelica Polymorpha Sinensis Root",
              claim: "Protects follicles from DHT damage and improves microcirculation.",
              source: "Used in traditional Chinese medicine for female hair loss for over 2,000 years",
            },
          ].map((item) => (
            <div key={item.name} style={{ background: "#F2F0EB", borderLeft: "4px solid #B8860B", padding: "1rem 1.25rem", borderRadius: "0 4px 4px 0" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#B8860B", marginBottom: "0.3rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                ✓ {item.name}
              </p>
              <p style={{ fontFamily: "'Merriweather', serif", fontSize: "0.9rem", lineHeight: 1.65, color: "#333", marginBottom: "0.3rem" }}>{item.claim}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "#777", fontStyle: "italic", margin: 0 }}>📄 {item.source}</p>
            </div>
          ))}
        </div>

        <div style={body}>
          <p style={p}>These weren't exotic. They weren't rare. They weren't expensive to source. They were plants — studied for decades, published in major journals, available to anyone who knew to look.</p>
          <p style={p}>But they had to be applied topically. Directly to the scalp. At clinically effective doses. Not swallowed in a pill where stomach acid annihilates them. Not diluted in a shampoo you rinse out in 45 seconds.</p>
          <p style={{ ...p, fontWeight: 700 }}>That's why nothing else worked for Teresa. That's why nothing else works for you. The delivery method was wrong. The doses were wrong. And the one approach that WAS right was locked behind agreements that made sure you'd never find out.</p>
        </div>

        <hr style={divider} />

        {/* ─── SECTION: The Phone Call ─── */}
        <h2 style={h2}>The Phone Call That Broke Me</h2>

        {/* Phone call / FaceTime image — placed directly under headline */}
        <SectionImage src={IMG_FACETIME} alt="FaceTime screenshot of Rachel smiling with thick healthy hair" caption={`Week 8. Rachel FaceTimed wearing her hair down. She didn't say anything about it. She just... wore it down. Like it was nothing.`} />

        <div style={body}>
          <p style={p}>January 2024.</p>
          <p style={p}>My sister called me on a Sunday night. Rachel. Three years younger than me. Funny, loud, the kind of person who makes everyone around her feel lighter.</p>
          <p style={p}>She wasn't calling to be funny.</p>
          <p style={p}>She'd been to the dermatologist that week. Her hair had been thinning for two years — she'd tried to hide it, tried to handle it on her own, tried not to "bother" anyone. But it had gotten bad enough that she finally made an appointment.</p>
          <p style={p}>The dermatologist ran some tests, asked some questions, and said: "It's hormonal. Perimenopause. There's not a lot we can do. I can prescribe Minoxidil, but it's really about management at this point."</p>
          <p style={p}><em>Management.</em> The same word they used on Teresa.</p>
          <p style={p}>Rachel was crying on the phone. Not dramatic crying — the quiet kind. The kind where someone's trying to hold it together and can't.</p>

          <blockquote style={{ borderLeft: "4px solid #B8860B", paddingLeft: "1.25rem", margin: "1.5rem 0", fontStyle: "italic", color: "#333", fontSize: "1.05rem", lineHeight: 1.8 }}>
            "I looked at myself in the mirror this morning, Renée, and I didn't recognize myself. My part is... I can see my scalp. I pulled my hair back and it's just... there's nothing there. I'm 44 years old and I look..."
          </blockquote>

          <p style={p}>She couldn't finish.</p>
          <p style={p}>And in that moment — listening to my own sister describe the exact same pain I'd heard from Teresa twelve years earlier, the exact same pain I'd watched 40 million women describe online, in forums, in salon chairs across America — something inside me broke.</p>
          <p style={p}>Not cracked. Broke.</p>
          <p style={p}>Because this wasn't a stranger anymore. This wasn't a woman in chair 4 I could hug goodbye and try to forget. This was my sister. My blood. And she was suffering from something I could fix. Something I'd been able to fix for 18 years. Something I'd been keeping from every regular woman I knew while spraying it on famous scalps five days a week.</p>
          <p style={p}>I told Rachel I'd call her back. I hung up. Sat on the edge of my bed for a long time. Then I opened my laptop and started writing an email to the one person I thought might help me end this.</p>
          <p style={p}>Her name was Dr. Yolanda Holmes.</p>
        </div>



        <hr style={divider} />

        {/* ─── SECTION: The Doctor ─── */}
        <h2 style={h2}>The Doctor Who Understood</h2>

        {/* Dr. Holmes official portrait with product — user-supplied image */}
        <SectionImage src={IMG_DR_HOLMES_OFFICIAL} alt="Dr. Yolanda Holmes, MD, Dermatology — U.S. Board Certified, with Hair Helper Spray" caption="Dr. Yolanda Holmes, MD, FAAD. U.S. Board-Certified Dermatologist. She’d been publishing about topical DHT blockers for over a decade — and had been punished for it." />

        <div style={body}>
          <p style={p}>I found Dr. Holmes through a research paper. She was a board-certified dermatologist — over 15 years specializing in women's hair and scalp conditions, affiliated with Howard University Hospital and MedStar Washington Hospital Center. She'd been publishing about DHT in women, about topical botanical blockers, about why the standard of care was failing female patients.</p>
          <p style={p}>And she'd been punished for it. Legal threats from colleagues. Peer dismissal. Accused of "promoting unproven treatments" even though 47 peer-reviewed studies backed every ingredient she wrote about.</p>
          <p style={p}>I sent her everything. My notes. My photographs. My ingredient lists. My 18 years of observation. My guilt.</p>
          <p style={p}>She called me the next morning.</p>
        </div>

        {/* Dr. Holmes Quote Block */}
        <div style={{ background: "#F2F0EB", border: "1px solid #D8D4CA", borderRadius: "6px", padding: "1.5rem", margin: "1.5rem 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <img src={IMG_DR_HOLMES_PRODUCT} alt="Dr. Holmes" style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover", objectPosition: "top" }} />
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#1C1C1E", margin: 0 }}>Dr. Yolanda Holmes, MD, FAAD</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#777", margin: 0 }}>Board-Certified Dermatologist · U.S. Board Certified</p>
            </div>
          </div>
          <p style={{ fontFamily: "'Merriweather', serif", fontStyle: "italic", fontSize: "0.95rem", lineHeight: 1.75, color: "#333", marginBottom: "1rem" }}>
            "I have two types of patients. Wealthy women whose concierge doctors proactively manage their hormonal health — those women rarely present with significant hair loss. And regular women — teachers, nurses, grandmothers on Medicare — who come to me in crisis. Showing me handfuls of hair. Sobbing. Asking me why nobody told them this would happen."
          </p>
          <p style={{ fontFamily: "'Merriweather', serif", fontStyle: "italic", fontSize: "0.95rem", lineHeight: 1.75, color: "#333", marginBottom: "1rem" }}>
            "Your follicles are NOT dead. DHT has been wrapping around them, slowly squeezing off blood supply and nutrients, like a fist tightening around a garden hose. Eventually, the follicle shuts down. Goes dormant. But dormant is not dead. Dormant is sleeping. Dormant is waiting."
          </p>
          <p style={{ fontFamily: "'Merriweather', serif", fontWeight: 700, fontSize: "0.95rem", lineHeight: 1.75, color: "#1B4D3E", margin: 0 }}>
            "Block the DHT. Restore blood flow. And those follicles can wake up. The studies are published. The science is settled. The only thing that was ever missing was the will to make the solution available to every woman — not just the ones with private doctors."
          </p>
        </div>

        <hr style={divider} />

        {/* ─── SECTION: Atonement / Product ─── */}
        <h2 style={h2}>Atonement</h2>

        {/* Product introduction video — GIF style */}
        <VideoGif src={VID_PRODUCT_INTRO} caption="TryBello Hair Helper Spray. The same formula. The same clinical doses. Finally available to every woman." />

        <div style={body}>
          <p style={p}>Dr. Holmes and I spent six months building what should have existed 15 years ago.</p>
          <p style={p}>I brought 18 years behind the chair — 18 years of knowing what hair loss feels like under my fingers, what works, what doesn't, what the textures and patterns of real regrowth look like versus what marketing photos fake. She brought the science — the clinical research, the biochemistry, the exact doses and delivery mechanisms that make the difference between a bottle of expensive water and a formula that actually wakes up dormant follicles.</p>
          <p style={p}>We partnered with a small, family-owned laboratory in the United States. No ties to the celebrity world. No NDAs. No one to answer to except the 40 million women who'd been left behind.</p>
          <p style={{ ...p, fontWeight: 700 }}>We called it TryBello Hair Helper Spray.</p>
        </div>

        {/* Triple Defense System */}
        <div style={{ background: "#1B4D3E", borderRadius: "6px", padding: "1.75rem", margin: "1.5rem 0" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#B8D4BC", marginBottom: "1.25rem" }}>
            The Triple-Defense System
          </p>
          {[
            { num: "01", title: "Block DHT Production", desc: "Sophora Flavescens Extract and Rice Extract inhibit 5α-reductase — the enzyme that creates DHT. Less enzyme activity = less DHT = less strangling of your follicles." },
            { num: "02", title: "Shield Existing Follicles", desc: "Caffeine and Angelica Root create a protective barrier. Even if DHT is circulating in your system, it can't bind to your follicle receptors. Your existing hair is protected." },
            { num: "03", title: "Reawaken Dormant Follicles", desc: "With DHT blocked and existing follicles shielded, dormant follicles begin returning to their growth cycle. Blood flow increases. Nutrients resume. The follicle wakes up. Thicker, stronger hair grows again." },
          ].map((item) => (
            <div key={item.num} style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem", alignItems: "flex-start" }}>
              <div style={{ background: "#B8860B", color: "white", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem", width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{item.num}</div>
              <div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "white", marginBottom: "0.3rem" }}>{item.title}</p>
                <p style={{ fontFamily: "'Merriweather', serif", fontSize: "0.88rem", lineHeight: 1.65, color: "#C8DDD0", margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Full Ingredient List */}
        <div style={{ background: "#F2F0EB", border: "1px solid #D8D4CA", borderRadius: "6px", padding: "1.25rem", margin: "1.5rem 0" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#777", marginBottom: "1rem" }}>
            Complete Ingredient Transparency — Every Dose Listed
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
            {[
              "Sophora Flavescens Extract — 67% DHT enzyme reduction",
              "Caffeine — 0.2% concentration, blocks DHT binding",
              "Rice Extract (Oryza Sativa) — 34% follicle density increase",
              "Angelica Polymorpha Sinensis Root — 2,000+ years traditional use",
              "Biotin — Encapsulated for direct scalp absorption",
              "Rosemary Oil — Microcirculation & anti-inflammatory",
              "Ginger Extract — Anti-inflammatory, antioxidant",
              "Saccharomyces Ferment Lysate — Scalp microbiome balance",
            ].map((ing) => (
              <div key={ing} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#333", display: "flex", gap: "0.4rem", alignItems: "flex-start" }}>
                <span style={{ color: "#1B4D3E", fontWeight: 700, flexShrink: 0 }}>✓</span>
                <span>{ing}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={body}>
          <p style={p}>Sixty seconds. Morning and night. No pills. No grease. No chemical smell. No complicated routine.</p>
          <p style={{ ...p, fontWeight: 700 }}>This bottle should have existed 15 years ago. It should have been on every shelf in every drugstore in America. Teresa should have had it. Your mother should have had it. My sister should have had it.</p>
          <p style={p}>I can't give you back the years you lost. But I can give you this.</p>
        </div>

        <hr style={divider} />

        {/* ─── SECTION: Proof ─── */}
        <h2 style={h2}>Proof That Atonement Works</h2>



        {/* Before/After grid — 4 customers */}
        <SectionImage src={IMG_BEFORE_AFTER_GRID} alt="4-panel before and after: Linda 54, Patricia 58, Margaret 61, Carol 62" caption="Linda (54), Patricia (58), Margaret (61), Carol (62). Real customers. Unretouched photos. Individual results may vary." />

        {/* Dr. Holmes Results */}
        <div style={{ background: "#F2F0EB", border: "1px solid #D8D4CA", borderRadius: "6px", padding: "1.5rem", margin: "1.5rem 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <img src={IMG_DR_HOLMES_PRODUCT} alt="Dr. Holmes" style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", objectPosition: "top" }} />
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1C1C1E", margin: 0 }}>Dr. Yolanda Holmes — Tested It On Herself First</p>
            </div>
          </div>
          {[
            { week: "Week 1", result: "Shower drain hair count dropped from 80–100 to about 35. I counted twice." },
            { week: "Week 3", result: "Baby hairs along my part line. Tiny wisps where there had been nothing." },
            { week: "Week 6", result: "My stylist asked what I was doing differently. 'Your hair feels thicker.'" },
            { week: "Week 8", result: "My part was visibly tighter. First time in years I wore my hair down without thinking about it." },
            { week: "Week 12", result: "The thickness I remembered from my thirties. Just... normal. Healthy. Mine." },
          ].map((item) => (
            <div key={item.week} style={{ display: "flex", gap: "1rem", marginBottom: "0.75rem", alignItems: "flex-start" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.78rem", color: "#1B4D3E", background: "#C8DDD0", padding: "0.2rem 0.5rem", borderRadius: "3px", flexShrink: 0, whiteSpace: "nowrap" }}>{item.week}</span>
              <span style={{ fontFamily: "'Merriweather', serif", fontSize: "0.88rem", lineHeight: 1.6, color: "#333" }}>{item.result}</span>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", margin: "1.5rem 0" }}>
          {[
            { name: "Linda M., 54", location: "Phoenix, AZ", text: "I was pricing wigs on Amazon. $1,200 for human hair. I'd given up. Six weeks with Hair Helper and people are asking if I got extensions. I just smile. Best $80 I ever spent." },
            { name: "Patricia R., 58", location: "Denver, CO", text: "I spent over $8,000 on PRP injections, laser cap therapy, everything. After 6 weeks with this spray, I'm seeing thickness I haven't had since my early 40s. My husband keeps running his fingers through my hair." },
            { name: "Margaret D., 61", location: "Austin, TX", text: "Four pills a day. FOUR. For a full year. Zero results. This spray gave me visible results in one month. I'm angry it took me this long to find it." },
            { name: "Carol T., 62", location: "Tampa, FL", text: "Six months on supplements = nothing. Six weeks on this spray = actual baby hairs I can SEE. My hairdresser ordered it for herself." },
            { name: "Sarah, 55", location: "Verified Purchase", text: "$12,000 on two hair transplants that didn't take. Ten weeks with Hair Helper and baby hairs are filling in where the transplants failed. 1/100th the cost. None of the pain." },
          ].map((t) => (
            <div key={t.name} style={{ background: "#F8F6F1", border: "1px solid #E8E4DA", borderRadius: "4px", padding: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem", flexWrap: "wrap", gap: "0.25rem" }}>
                <div>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1C1C1E" }}>{t.name}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "#777", marginLeft: "0.5rem" }}>— {t.location}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <span style={{ color: "#F0A500", fontSize: "0.85rem" }}>★★★★★</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "#777", background: "#E8E4DA", padding: "0.15rem 0.4rem", borderRadius: "2px" }}>Verified Purchase</span>
                </div>
              </div>
              <p style={{ fontFamily: "'Merriweather', serif", fontStyle: "italic", fontSize: "0.9rem", lineHeight: 1.7, color: "#333", margin: 0 }}>"{t.text}"</p>
            </div>
          ))}
        </div>

        {/* Independent Testing Stats */}
        <div style={{ background: "#1B4D3E", borderRadius: "6px", padding: "1.5rem", margin: "1.5rem 0" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#B8D4BC", marginBottom: "1.25rem" }}>
            Independent Testing — 12-Week Clinical Observation
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.25rem" }}>
            {[
              { pct: "91%", label: "Reduced shedding within 2 weeks" },
              { pct: "84%", label: "New baby hairs by week 4" },
              { pct: "78%", label: "Significantly thicker hair by week 12" },
              { pct: "88%", label: "Easier to use than previous treatments" },
            ].map((stat) => (
              <div key={stat.pct} style={{ background: "rgba(255,255,255,0.1)", borderRadius: "4px", padding: "0.75rem", textAlign: "center" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "1.75rem", color: "#F0C040" }}>{stat.pct}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "#C8DDD0", lineHeight: 1.4 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <hr style={divider} />

        {/* ─── SECTION: Timeline ─── */}
        <h2 style={h2}>What I Wish I Could Have Given You Sooner</h2>

        {/* Results video — moved here per user request */}
        <VideoGif src={VID_RESULTS} caption="Real results from real women. No filters. No extensions." />

        {/* 12-week journey journal image */}
        <SectionImage src={IMG_TIMELINE_JOURNEY} alt="12-week hair growth journal with botanical ingredients and dropper bottle" caption="The 12-week protocol, documented. Week by week, follicle by follicle." />

        <div style={{ margin: "1.5rem 0" }}>
          {[
            { weeks: "Weeks 1–2", milestone: "Less hair in your drain. Less on your pillow. Less on your brush. The shedding slows — you'll feel it before you see it." },
            { weeks: "Weeks 3–4", milestone: "Baby hairs appearing along your part line and temples. Little wisps standing up where there's been nothing. Your follicles waking up." },
            { weeks: "Weeks 6–8", milestone: "Your hairdresser notices. Your hair feels different — thicker, denser. Your part tightens. You can wear it down without worrying about what shows through." },
            { weeks: "Weeks 10–12", milestone: "You look in the mirror and recognize your hair again. The thickness from your 30s. A ponytail with weight. Hair that feels like yours." },
          ].map((item, i) => (
            <div key={item.weeks} style={{ display: "flex", gap: "1.25rem", marginBottom: "1.25rem", alignItems: "flex-start" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#1B4D3E", color: "white", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", lineHeight: 1.2 }}>
                  {i + 1}
                </div>
                {i < 3 && <div style={{ width: "2px", height: "40px", background: "#D8D4CA", marginTop: "4px" }} />}
              </div>
              <div style={{ paddingTop: "0.5rem" }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#B8860B", marginBottom: "0.3rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>{item.weeks}</p>
                <p style={{ fontFamily: "'Merriweather', serif", fontSize: "0.95rem", lineHeight: 1.7, color: "#333", margin: 0 }}>{item.milestone}</p>
              </div>
            </div>
          ))}
        </div>

        <hr style={divider} />

        {/* ─── SECTION: Offer ─── */}
        <h2 style={h2}>The Price of Making This Right</h2>

        {/* Pricing image */}
        <SectionImage src={IMG_PRICING} alt="Hair Helper Spray 60% off — $120 crossed out, now $33. What it should have cost all along." caption='"What it should have cost all along."' />

        <div style={body}>
          <p style={p}>I pushed for the lowest price we could survive on.</p>
          <p style={p}>Not the lowest price that makes business sense. Not the price a marketing team would recommend. The lowest price that lets me sleep at night. Because every woman who can't afford this bottle is another Teresa I failed.</p>
        </div>

        <div style={{ background: "#F2F0EB", border: "1px solid #D8D4CA", borderRadius: "6px", padding: "1.5rem", margin: "1.5rem 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#777", marginBottom: "0.25rem" }}>Regular price:</p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.5rem", color: "#999", textDecoration: "line-through", margin: 0 }}>$120/bottle</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#1B4D3E", fontWeight: 700, marginBottom: "0.25rem" }}>3-Month Supply Today:</p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "2rem", color: "#1B4D3E", margin: 0 }}>$33<span style={{ fontSize: "1rem", fontWeight: 400 }}>/bottle</span></p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#B8860B", fontWeight: 700, margin: 0 }}>60% OFF — 48 HOURS ONLY</p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem", marginBottom: "1rem", textAlign: "center", fontSize: "0.78rem", fontFamily: "'DM Sans', sans-serif", color: "#555" }}>
            <div style={{ background: "white", padding: "0.5rem", borderRadius: "3px", border: "1px solid #E8E4DA" }}>Less than one chiropractor appointment</div>
            <div style={{ background: "white", padding: "0.5rem", borderRadius: "3px", border: "1px solid #E8E4DA" }}>Less than your monthly Rogaine refill</div>
            <div style={{ background: "white", padding: "0.5rem", borderRadius: "3px", border: "1px solid #E8E4DA" }}>Less than gas to the dermatologist</div>
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#555", marginBottom: "0" }}>
            Why the 3-month supply? Because most women see their best results at 12 weeks. Our lab produces 800 bottles per week. Our last promotion sold out in 11 hours. We have <strong>4,200 units at this price right now.</strong>
          </p>
        </div>

        <CTABlock countdown={countdown} />

        {/* Update Box */}
        <div style={{ background: "#1C1C1E", borderRadius: "4px", padding: "1rem 1.25rem", margin: "1.5rem 0" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#F0C040", marginBottom: "0.4rem" }}>
            UPDATE: As of April 10, 2026 — 9:47 AM EST
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "#C8C8C8", margin: 0, lineHeight: 1.6 }}>
            Demand has been overwhelming since this article went live. Current inventory: <strong style={{ color: "white" }}>3,847 units remaining.</strong> Order now to lock in 60% OFF + FREE EXPEDITED SHIPPING before we sell out.
          </p>
        </div>

        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#777", fontStyle: "italic", textAlign: "center", marginBottom: "1.5rem" }}>
          NOTE: This deal is NOT available on Amazon or eBay. Beware of knockoff products. TryBello is only sold through our official website.
        </p>

        <hr style={divider} />

        {/* ─── SECTION: Guarantee ─── */}
        <h2 style={h2}>You Owe Me Nothing. I Owe You Everything.</h2>

        {/* 120-Day Guarantee Seal — placed directly under headline */}
        <SectionImage src={IMG_GUARANTEE_SEAL} alt="120 Day Money Back Guarantee — Official Certification of Promise, signed by Renée Halsted and Dr. Yolanda Holmes" caption="Signed by both Renée Halsted and Dr. Yolanda Holmes, MD, FAAD. Our personal promise." />

        <div style={body}>
          <p style={p}>You've already spent enough money on things that didn't work.</p>
          <p style={p}>You've already trusted enough products that let you down. You've already felt the sting of opening a new bottle with hope and throwing it away three months later with nothing to show for it.</p>
          <p style={p}>The last thing I'm going to do is add financial risk to the emotional risk you've already been through.</p>
        </div>

        <div style={{ background: "#1B4D3E", borderRadius: "6px", padding: "1.75rem", margin: "1.5rem 0" }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "1.3rem", color: "white", marginBottom: "0.75rem" }}>
            Our 120-Day "Thicker Hair" Money-Back Guarantee
          </p>
          <p style={{ fontFamily: "'Merriweather', serif", fontSize: "0.95rem", lineHeight: 1.75, color: "#C8DDD0", marginBottom: "1rem" }}>
            Use Hair Helper Spray for 120 days. Morning and night. Sixty seconds.
          </p>
          <p style={{ fontFamily: "'Merriweather', serif", fontSize: "0.95rem", lineHeight: 1.75, color: "#C8DDD0", marginBottom: "1rem" }}>
            If it doesn't work — if your drain doesn't clear, if baby hairs don't appear, if your hairdresser doesn't notice, if you don't feel something shift — email <strong style={{ color: "white" }}>support@trybello.com</strong>. Say "it didn't work."
          </p>
          <p style={{ fontFamily: "'Merriweather', serif", fontSize: "0.95rem", lineHeight: 1.75, color: "#C8DDD0", marginBottom: "1rem" }}>
            We send a prepaid return label. Your refund hits your account within 48 hours. No forms. No "retention specialist." No store credit.
          </p>
          <p style={{ fontFamily: "'Merriweather', serif", fontWeight: 700, fontSize: "0.95rem", lineHeight: 1.75, color: "white", margin: 0 }}>
            If it doesn't work for you, I take the loss. Not you. You've lost enough.
          </p>
        </div>

        <div style={body}>
          <p style={p}>Why am I this confident? Because in two years and 88,000 customers, our refund rate is 2.8%. That's 97.2% of women who got results and never looked back. The actual "didn't work" rate is barely 1%.</p>
          <p style={{ ...p, fontWeight: 700 }}>When you address the root cause, results aren't a mystery. They're inevitable.</p>
        </div>

        <hr style={divider} />

        {/* ─── SECTION: A Letter to You ─── */}
        <h2 style={h2}>A Letter to You</h2>

        {/* Before/After 12-week results — moved here per user request */}
        <SectionImage src={IMG_BEFORE_AFTER_12W} alt="Before and after 12 weeks — bald scalp to thick hair regrowth. Unretouched photo." caption="Unretouched photo. Clinical observation, 2026. 12 weeks of Hair Helper Spray." />

        <div style={body}>
          <p style={p}>I don't know your name.</p>
          <p style={p}>I don't know how long you've been losing your hair. I don't know how many products you've tried. How many bottles are under your bathroom sink right now. How many times you've been told to "just accept it" by someone who's never felt a clump of their own hair come loose in the shower.</p>
          <p style={p}>But I know this: you deserved better than what you got. From the industry. From the doctors. From the brands that took your money knowing their products wouldn't fix the problem. And from people like me — people who knew the truth and said nothing because silence was more comfortable than courage.</p>
          <p style={p}>I can't go back and tell Teresa. I've looked for her. I've Googled her name. I've driven past the dental office where she used to work. She's not there anymore. I don't know where she is. I don't know if she ever found something that worked. I don't know if she's wearing a wig right now or if she's given up entirely or if she's made peace with it in a way I never could.</p>
          <p style={p}>I carry that. I'll always carry that.</p>
          <p style={p}>But I can't let the weight of what I didn't do stop me from doing what I can do now.</p>
          <p style={p}>So here's what I can do:</p>
          <p style={p}>I can give you a formula that works. The same formula I applied to famous women's scalps for 18 years. The same ingredients. The same clinical doses. At a price that doesn't require fame or wealth or a husband who writes checks to private doctors.</p>
          <p style={p}>I can give you a 120-day guarantee that means if this doesn't work, I'm the one who pays — not you.</p>
          <p style={{ ...p, fontWeight: 700 }}>I can give you the truth. Finally. After 18 years of silence.</p>
          <p style={p}>If you've been waiting for someone to tell you the truth about your hair — this is it.</p>
          <p style={p}>I'm sorry it took so long.</p>
        </div>

        <CTABlock countdown={countdown} />

        {/* Signatures */}
        <div style={{ borderTop: "1px solid #D8D4CA", paddingTop: "1.5rem", marginTop: "1.5rem" }}>
          <p style={{ fontFamily: "'Merriweather', serif", fontStyle: "italic", fontSize: "0.95rem", color: "#555", marginBottom: "0.75rem" }}>
            With everything I have,
          </p>
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#1C1C1E", margin: 0 }}>Renée Halsted</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "#777", margin: 0 }}>Licensed Cosmetologist, 18 Years</p>
            </div>
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#1C1C1E", margin: 0 }}>Dr. Yolanda Holmes, MD, FAAD</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "#777", margin: 0 }}>Board-Certified Dermatologist</p>
            </div>
          </div>
        </div>

        {/* P.S. Section */}
        <div style={{ borderLeft: "4px solid #B8860B", margin: "2rem 0", background: "#FAF8F3", padding: "1.25rem 1.5rem" }}>
          <p style={{ fontFamily: "'Merriweather', serif", fontSize: "0.92rem", lineHeight: 1.75, color: "#333", marginBottom: "1rem" }}>
            <strong>P.S.</strong> — I'm still looking for Teresa. If you're out there — if you're the woman from chair 4 in Dayton who brought cookies on holidays and loved her kids more than anything and walked out of my salon twelve years ago — I'm sorry. This is for you. It was always for you.
          </p>
          <p style={{ fontFamily: "'Merriweather', serif", fontSize: "0.92rem", lineHeight: 1.75, color: "#333", marginBottom: "1rem" }}>
            <strong>P.P.S.</strong> — Hair Helper is clinically tested and backed by the same science that's been keeping celebrity hair thick for decades. 47 peer-reviewed studies. Board-certified dermatologist formulated. Trusted by working stylists who've seen both sides of the velvet rope. The only difference now is which side you're on.
          </p>
          <p style={{ fontFamily: "'Merriweather', serif", fontSize: "0.92rem", lineHeight: 1.75, color: "#333", margin: 0 }}>
            <strong>P.P.P.S.</strong> — 4,200 units. When it drops below 1,000, this page comes down. I've watched it happen twice. Don't let this be the thing you almost did.
          </p>
        </div>

        <div style={{ textAlign: "center", margin: "2rem 0" }}>
          <a
            href="https://start.trybello.com/trybello-hair-helper-s1-a313-sp"
            style={{ display: "inline-block", background: "#1B4D3E", color: "white", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "1rem 2.5rem", borderRadius: "4px", textDecoration: "none" }}
          >
            🔒 Check Availability Now →
          </a>
        </div>

        {/* Disclaimer */}
        <div style={{ borderTop: "1px solid #D8D4CA", paddingTop: "1.5rem", marginTop: "2rem" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "#999", lineHeight: 1.6, marginBottom: "0.75rem" }}>
            <strong>MEDICAL & HEALTH DISCLAIMER:</strong> The information and other content provided on this page, or in any linked materials, are not intended and should not be construed as medical advice, nor is the information a substitute for professional medical expertise or treatment. If you or any other person has a medical concern, you should consult with your health care provider or seek other professional medical treatment. Never disregard professional medical advice or delay in seeking it because of something you have read on this page or in any linked materials.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "#999", lineHeight: 1.6, margin: 0 }}>
            These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Individual results may vary.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ background: "#1C1C1E", padding: "1.5rem 1.25rem", textAlign: "center" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#777", marginBottom: "0.5rem" }}>
          <a href="#" style={{ color: "#999", textDecoration: "none", marginRight: "1rem" }}>Privacy Policy</a>
          <a href="#" style={{ color: "#999", textDecoration: "none", marginRight: "1rem" }}>Terms of Service</a>
          <a href="#" style={{ color: "#999", textDecoration: "none" }}>Refund Policy</a>
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#555", margin: 0 }}>
          © 2026 TryBello. All Rights Reserved.
        </p>
      </footer>

      {/* Sticky Bottom CTA */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#1B4D3E",
          color: "white",
          zIndex: 999,
          transform: showSticky ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.3s ease",
          boxShadow: "0 -2px 20px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0.75rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#F0C040", margin: 0, letterSpacing: "0.05em" }}>
              ⏱ OFFER EXPIRES: {countdown}
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#B8D4BC", margin: 0 }}>
              Only 4,200 units at 60% off
            </p>
          </div>
          <a
            href="https://start.trybello.com/trybello-hair-helper-s1-a313-sp"
            style={{ background: "#F0C040", color: "#1C1C1E", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.05em", textTransform: "uppercase", padding: "0.65rem 1.5rem", borderRadius: "4px", textDecoration: "none", whiteSpace: "nowrap" }}
          >
            Claim 60% Off →
          </a>
        </div>
      </div>
    </div>
  );
}
