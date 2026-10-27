import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  ExternalLink,
  Gamepad2,
  Mail,
  Menu,
  Trophy,
  Users,
  X
} from "lucide-react";
import { languageOptions, regionOptions, translations } from "./translations.js";

const officialLinks = {
  championship: "https://supercell.com/en/games/brawlstars/blog/esports/your-path-to-bsc-2027/",
  creator: "https://supercell.com/en/games/brawlstars/blog/community/creatorcoffins-earn-rewards-by-supporting-your-favorite-creator/",
  game: "https://supercell.com/en/games/brawlstars/",
  policy: "https://supercell.com/en/fan-content-policy/"
};

function getInitialLanguage() {
  const queryLanguage = new URLSearchParams(window.location.search).get("lang");
  if (queryLanguage === "es" || queryLanguage === "en") return queryLanguage;

  try {
    return localStorage.getItem("korall-language") === "en" ? "en" : "es";
  } catch {
    return "es";
  }
}

function SectionLabel({ number, children }) {
  return <p className="section-label"><span>{number}</span><span className="section-slash">/</span>{children}</p>;
}

function HeadingLines({ lines, className = "" }) {
  return (
    <>
      {lines.map((line, index) => (
        <span className={index === lines.length - 1 ? "heading-outline" : undefined} key={line}>
          {line}{index < lines.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}

function ArrowLink({ children, href, light = false, ...props }) {
  return (
    <a className={`arrow-link${light ? " arrow-link-light" : ""}`} href={href} {...props}>
      {children}<ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.8} />
    </a>
  );
}

function App() {
  const [language, setLanguage] = useState(getInitialLanguage);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);
  const t = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t.metaTitle;
    document.querySelector('meta[name="description"]').content = t.metaDescription;
    document.querySelector('meta[property="og:title"]').content = t.metaTitle;
    document.querySelector('meta[property="og:description"]').content = t.metaDescription;
    document.querySelector('meta[property="og:locale"]').content = language === "es" ? "es_ES" : "en_US";
    document.querySelector('meta[property="og:url"]').content = `https://korall-bs.presentto.online/${language === "en" ? "?lang=en" : ""}`;
    document.querySelector('link[rel="canonical"]').href = `https://korall-bs.presentto.online/${language === "en" ? "?lang=en" : ""}`;

    try {
      localStorage.setItem("korall-language", language);
    } catch {
      // The selected language still works when storage is unavailable.
    }
  }, [language, t.metaDescription, t.metaTitle]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    function handlePointerDown(event) {
      if (!menuRef.current?.contains(event.target) && !menuButtonRef.current?.contains(event.target)) setMenuOpen(false);
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (motionPreference.matches || !("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  function changeLanguage() {
    const nextLanguage = language === "es" ? "en" : "es";
    setLanguage(nextLanguage);
    setMenuOpen(false);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", nextLanguage);
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  }

  function handleTryoutSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const values = new FormData(form);
    const roleLabel = t[languageOptions.find(([value]) => value === values.get("role"))?.[1]];
    const regionLabel = t[regionOptions.find(([value]) => value === values.get("region"))?.[1]];
    const body = [
      `${t.mailPlayer}: ${values.get("playerName").trim()}`,
      `${t.mailTag}: ${values.get("playerTag").trim()}`,
      `${t.mailRole}: ${roleLabel}`,
      `${t.mailRegion}: ${regionLabel}`,
      `${t.mailAvailability}: ${values.get("availability").trim()}`,
      `${t.mailEmail}: ${values.get("email").trim()}`,
      `${t.mailExperience}: ${values.get("experience").trim() || t.mailNone}`,
      `${t.mailConsent}: yes`
    ].join("\n");

    setFormStatus(t.formReady);
    window.location.href = `mailto:hola@korall.team?subject=${encodeURIComponent(t.mailTitle)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <>
      <a className="skip-link" href="#main">{t.skip}</a>
      <header className="site-header">
        <a className="nav-brand" href="#top" aria-label="KORALL BS, inicio">
          <img src="/korall-logo.png" alt="" />
          <span>KORALL <b>BS / KRL</b></span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          aria-label={menuOpen ? t.menuClose : t.menuOpen}
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
          ref={menuButtonRef}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={`main-nav${menuOpen ? " is-open" : ""}`} id="main-nav" aria-label={t.navAria} ref={menuRef}>
          <a href="#playbook" onClick={() => setMenuOpen(false)}>{t.navPlaybook}</a>
          <a href="#game" onClick={() => setMenuOpen(false)}>{t.navGame}</a>
          <a href="#circuit" onClick={() => setMenuOpen(false)}>{t.navCircuit}</a>
          <a href="https://korall.presentto.online" target="_blank" rel="noreferrer">{t.navKorall}<ExternalLink size={12} aria-hidden="true" /></a>
          <button className="language-toggle" type="button" onClick={changeLanguage} aria-label={t.languageToggle} lang={language === "es" ? "en" : "es"}>{language === "es" ? "EN" : "ES"}</button>
          <a className="nav-cta" href="#join" onClick={() => setMenuOpen(false)}>{t.navJoin}<ArrowUpRight size={14} aria-hidden="true" /></a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-grid-mark" aria-hidden="true"></div>
          <div className="hero-copy">
            <div className="hero-lockup reveal">
              <span className="hero-logo"><img src="/korall-logo.png" alt="" /></span>
              <span className="hero-wordmark">KORALL<span>BS / KRL</span></span>
            </div>
            <p className="hero-eyebrow"><span></span>{t.eyebrow}<i>/</i> BRAWL STARS</p>
            <h1 id="hero-title"><HeadingLines lines={t.heroTitle} /></h1>
            <p className="hero-lede">{t.heroLede}</p>
            <div className="hero-actions">
              <a className="button button-light" href="#playbook">{t.heroExplore}<ArrowRight size={16} aria-hidden="true" /></a>
              <ArrowLink href="#join" light>{t.heroApply}</ArrowLink>
            </div>
            <div className="hero-index"><span>01</span><i></i><span>BS / KRL</span></div>
          </div>
          <figure className="hero-game reveal">
            <a className="image-frame" href={officialLinks.game} target="_blank" rel="noreferrer" aria-label={t.imageSource}>
              <img src="/images/brawl-stars/championship-ingame.jpg" alt={t.heroAlt} fetchPriority="high" />
              <span className="image-open"><ArrowUpRight aria-hidden="true" size={18} /></span>
            </a>
            <figcaption><span>{t.gameImageCaption}</span><span>{t.imageSource}</span></figcaption>
          </figure>
          <a className="scroll-cue" href="#playbook"><ArrowDown size={14} aria-hidden="true" />{t.scrollCue}</a>
          <span className="hero-side-label" aria-hidden="true">KRL / 2026</span>
        </section>

        <div className="ticker" aria-label={t.ticker.join(". ")}>
          <div className="ticker-track" aria-hidden="true">
            {[...t.ticker, ...t.ticker].map((phrase, index) => <span key={`${phrase}-${index}`}>{phrase}<b>✳</b></span>)}
          </div>
        </div>

        <section className="playbook section-light" id="playbook" aria-labelledby="playbook-title">
          <div className="section-top reveal">
            <SectionLabel number="01">{t.labelPlaybook}</SectionLabel>
            <p className="section-aside">{t.asideTeamPlay}</p>
          </div>
          <div className="playbook-heading reveal">
            <h2 id="playbook-title"><HeadingLines lines={t.playbookTitle} /></h2>
            <p>{t.playbookIntro}</p>
          </div>
          <div className="training-grid">
            {[1, 2, 3, 4].map((step) => (
              <article className="training-step reveal" key={step}>
                <span className="step-number">0{step}</span>
                <h3>{t[`step${step}Title`]}</h3>
                <p>{t[`step${step}Body`]}</p>
                <span className="step-line" aria-hidden="true"></span>
              </article>
            ))}
          </div>
          <div className="playbook-foot reveal"><span>{t.playbookFootLeft}</span><span>{t.playbookFootRight}<ArrowRight size={13} aria-hidden="true" /></span></div>
        </section>

        <section className="game-section" id="game" aria-labelledby="game-title">
          <div className="game-heading reveal">
            <SectionLabel number="02">{t.labelGame}</SectionLabel>
            <h2 id="game-title"><HeadingLines lines={t.gameTitle} /></h2>
            <p>{t.gameIntro}</p>
          </div>
          <div className="game-gallery">
            <figure className="game-art game-art-banner reveal">
              <a className="image-frame" href={officialLinks.championship} target="_blank" rel="noreferrer" aria-label={t.imageBscCaption}>
                <img src="/images/brawl-stars/bsc-2027-hero.jpg" alt={t.imageBscAlt} loading="lazy" />
                <span className="image-open"><ArrowUpRight aria-hidden="true" size={18} /></span>
              </a>
              <figcaption><span>{t.imageBscCaption}</span><a href={officialLinks.championship} target="_blank" rel="noreferrer">SUPERCELL / BRAWL STARS <ExternalLink size={12} aria-hidden="true" /></a></figcaption>
            </figure>
            <figure className="game-art game-art-community reveal">
              <a className="image-frame" href={officialLinks.creator} target="_blank" rel="noreferrer" aria-label={t.imageCreatorCaption}>
                <img src="/images/brawl-stars/creator-coffins.png" alt={t.imageCreatorAlt} loading="lazy" />
                <span className="image-open"><ArrowUpRight aria-hidden="true" size={18} /></span>
              </a>
              <figcaption><span>{t.imageCreatorCaption}</span><a href={officialLinks.creator} target="_blank" rel="noreferrer">SUPERCELL / BRAWL STARS <ExternalLink size={12} aria-hidden="true" /></a></figcaption>
            </figure>
            <figure className="game-art game-art-match reveal">
              <a className="image-frame" href={officialLinks.game} target="_blank" rel="noreferrer" aria-label={t.imageIngameCaption}>
                <img src="/images/brawl-stars/championship-ingame.jpg" alt={t.imageIngameAlt} loading="lazy" />
                <span className="image-open"><ArrowUpRight aria-hidden="true" size={18} /></span>
              </a>
              <figcaption><span>{t.imageIngameCaption}</span><a href={officialLinks.game} target="_blank" rel="noreferrer">SUPERCELL / BRAWL STARS <ExternalLink size={12} aria-hidden="true" /></a></figcaption>
            </figure>
          </div>
          <p className="image-attribution reveal"><Gamepad2 size={15} aria-hidden="true" />{t.imageAttribution}</p>
        </section>

        <section className="manifesto" aria-labelledby="manifesto-title">
          <div className="manifesto-copy reveal">
            <SectionLabel number="03">{t.labelManifesto}</SectionLabel>
            <h2 id="manifesto-title"><HeadingLines lines={t.manifestoTitle} /></h2>
            <p>{t.manifestoBody}</p>
            <ArrowLink href="https://korall.presentto.online" target="_blank" rel="noreferrer" light>{t.mainSite}</ArrowLink>
          </div>
          <div className="manifesto-index reveal" aria-hidden="true"><span>KRL</span><span>TEAM<br />FIRST</span><span>EST. MMXXIV</span></div>
        </section>

        <section className="circuit section-light" id="circuit" aria-labelledby="circuit-title">
          <div className="circuit-copy reveal">
            <SectionLabel number="04">{t.labelCircuit}</SectionLabel>
            <h2 id="circuit-title"><HeadingLines lines={t.circuitTitle} /></h2>
            <p>{t.circuitBody}</p>
            <a className="button button-dark" href="https://event.supercell.com/brawlstars/" target="_blank" rel="noreferrer">{t.circuitLink}<ArrowUpRight size={15} aria-hidden="true" /></a>
          </div>
          <a className="circuit-banner reveal" href={officialLinks.championship} target="_blank" rel="noreferrer" aria-label={t.imageBscCaption}>
            <img src="/images/brawl-stars/bsc-2027-hero.jpg" alt={t.imageBscAlt} loading="lazy" />
            <span><Trophy size={14} aria-hidden="true" />BRAWL STARS CHAMPIONSHIP / 2027</span>
          </a>
        </section>

        <section className="join" id="join" aria-labelledby="join-title">
          <div className="join-content reveal">
            <SectionLabel number="05">{t.labelJoin}</SectionLabel>
            <h2 id="join-title"><HeadingLines lines={t.joinTitle} /></h2>
            <p>{t.joinIntro}</p>
            <p className="join-note">{t.joinNote}</p>
            <span className="join-signature"><Users size={15} aria-hidden="true" /> KORALL BS / KRL</span>
          </div>
          <form className="tryout-form reveal" onSubmit={handleTryoutSubmit} aria-describedby="form-privacy">
            <p className="form-kicker"><Mail size={14} aria-hidden="true" />{t.formKicker}</p>
            <div className="form-grid">
              <label className="form-field"><span>{t.aliasLabel}</span><input name="playerName" type="text" autoComplete="nickname" maxLength={32} placeholder={t.aliasPlaceholder} required /></label>
              <label className="form-field"><span>{t.tagLabel}</span><input name="playerTag" type="text" maxLength={20} placeholder={t.tagPlaceholder} required /></label>
              <label className="form-field"><span>{t.roleLabel}</span><select name="role" defaultValue="" required><option value="" disabled>{t.selectOption}</option>{languageOptions.map(([value, key]) => <option value={value} key={value}>{t[key]}</option>)}</select></label>
              <label className="form-field"><span>{t.regionLabel}</span><select name="region" defaultValue="" required><option value="" disabled>{t.selectOption}</option>{regionOptions.map(([value, key]) => <option value={value} key={value}>{t[key]}</option>)}</select></label>
              <label className="form-field form-field-wide"><span>{t.availabilityLabel}</span><textarea name="availability" rows="2" maxLength={500} placeholder={t.availabilityPlaceholder} required></textarea></label>
              <label className="form-field form-field-wide"><span>{t.emailLabel}</span><input name="email" type="email" autoComplete="email" maxLength={120} placeholder={t.emailPlaceholder} required /></label>
              <label className="form-field form-field-wide"><span>{t.experienceLabel}</span><textarea name="experience" rows="2" maxLength={700} placeholder={t.experiencePlaceholder}></textarea></label>
            </div>
            <label className="consent-field"><input name="consent" type="checkbox" required /><span>{t.consent}</span></label>
            <button className="button button-light form-submit" type="submit">{t.submitLabel}<ChevronRight size={15} aria-hidden="true" /></button>
            <p className="form-privacy" id="form-privacy">{t.formPrivacy}</p>
            <p className="form-status" role="status" aria-live="polite">{formStatus}</p>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <a className="footer-brand" href="#top"><img src="/korall-logo.png" alt="" /><span>KORALL <b>BS / KRL</b></span></a>
        <p>{t.footerTagline}</p>
        <nav className="footer-links" aria-label={t.footerAria}>
          <a href="https://korall.presentto.online" target="_blank" rel="noreferrer">{t.footerKorall}<ArrowUpRight size={13} aria-hidden="true" /></a>
          <a href="https://event.supercell.com/brawlstars/" target="_blank" rel="noreferrer">{t.footerChampionship}<ArrowUpRight size={13} aria-hidden="true" /></a>
          <a href="mailto:hola@korall.team">{t.footerContact}<ArrowUpRight size={13} aria-hidden="true" /></a>
        </nav>
        <div className="legal-note"><p>{t.footerDisclaimer}</p><p>{t.fanNotice} <a href={officialLinks.policy} target="_blank" rel="noreferrer">{language === "es" ? "Leer política" : "Read policy"}<ExternalLink size={11} aria-hidden="true" /></a></p></div>
        <div className="footer-bottom"><span>© KORALL BS {new Date().getFullYear()}</span><span>PLAY THE NEXT LEVEL / KRL</span></div>
      </footer>
    </>
  );
}

export default App;