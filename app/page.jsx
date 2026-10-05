'use client';
import { useEffect, useRef, useState } from 'react';
import Light from './Light';
import Gallery from './Gallery';
import Sections from './Sections';
import { PROFILE, UI } from './data';
import { LangContext, Rich } from './lang';

// Slide ids in scroll order; index = position in the deck counter
const SLIDES = ['top', 'about', 'work', 'experience', 'capabilities', 'lab', 'archive', 'contact'];

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [rolling, setRolling] = useState(false);
  const [shot, setShot] = useState(false); // last frame reached: flash + gallery enters
  const [archive, setArchive] = useState(false); // full-screen draggable gallery
  const [active, setActive] = useState(0); // index into SLIDES
  const [word, setWord] = useState(0);
  const [lang, setLang] = useState('en');
  const t = UI[lang];
  const video = useRef(null);

  // Next.js fonts are already loaded; keep the short preloader beat
  useEffect(() => {
    const t = setTimeout(() => {
      setLoaded(true);
      if (video.current) {
        video.current.play().catch(() => {
          setShot(true);
        });
      }
    }, 1200);

    // Fallback: ensure gallery enters after intro beat even if video playback stalls
    const shotTimer = setTimeout(() => {
      setShot(true);
    }, 4200);

    return () => {
      clearTimeout(t);
      clearTimeout(shotTimer);
    };
  }, []);

  // Cycle the stack word under the title; the key change replays the rise animation
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setWord((w) => (w + 1) % PROFILE.stack.length), 2200);
    return () => clearInterval(id);
  }, []);

  // Slide tracking: whichever slide crosses the viewport's center line is active; slides animate in once
  useEffect(() => {
    const slides = [...document.querySelectorAll('[data-slide]')];
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('in');
        setActive(slides.indexOf(e.target));
      }
    }, { rootMargin: '-50% 0px -50% 0px' });
    slides.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!archive) return;
    // Leave Escape to an open project dialog first
    const onKey = (e) => e.key === 'Escape' && !document.querySelector('.gx-lightbox') && setArchive(false);
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [archive]);

  // The draggable wall lives in the hero (perspective traps position: fixed), so jump there and lock scroll
  const openArchive = () => {
    scrollTo({ top: 0, behavior: 'instant' });
    setShot(true);
    setArchive(true);
  };

  // Language: saved choice, else the browser's; English is what the server renders
  useEffect(() => {
    let saved = null;
    try { saved = localStorage.getItem('lang'); } catch {}
    setLang(saved === 'vi' || saved === 'en' ? saved : navigator.language.startsWith('vi') ? 'vi' : 'en');
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const switchLang = () => {
    const next = lang === 'en' ? 'vi' : 'en';
    setLang(next);
    try { localStorage.setItem('lang', next); } catch {}
  };

  const navClass = (id) => (SLIDES[active] === id ? 'active' : undefined);

  return (
    <LangContext.Provider value={lang}>
    <div className={[loaded && 'loaded', shot && 'shot', archive && 'full-gallery', active > 0 && 'scrolled'].filter(Boolean).join(' ') || undefined}>
      <div className="loader"><span>NGUYEN VAN PHU</span></div>

      <header>
        <a href="#top" className="logo reveal" style={{ '--d': '.2s' }} onClick={() => setArchive(false)}>Phu.</a>
        <div className="reveal" style={{ '--d': '.3s' }}><small>{t.currently}</small>Backend @ {PROFILE.company}</div>
        <div className="reveal" style={{ '--d': '.4s' }}><small>{t.basedIn}</small>{t.location}</div>
        <nav className="reveal" style={{ '--d': '.5s' }}>
          <a href="#work" className={navClass('work')}>{t.nav.work}</a>
          <a href="#about" className={navClass('about')}>{t.nav.about}</a>
          <a href="#experience" className={navClass('experience')}>{t.nav.experience}</a>
          <a href="#contact" className={navClass('contact')}>{t.nav.contact}</a>
        </nav>
        <div className="header-actions reveal" style={{ '--d': '.6s' }}>
          <button className="lang-toggle" onClick={switchLang} aria-label={lang === 'en' ? 'Tiếng Việt' : 'English'}>
            <span className={lang === 'en' ? 'on' : undefined}>EN</span>
            <span className={lang === 'vi' ? 'on' : undefined}>VI</span>
          </button>
          {archive
            ? <button className="pill" onClick={() => setArchive(false)}>{t.closeArchive}</button>
            : <a href="#contact" className="pill">{t.talk}</a>}
        </div>
      </header>

      <div className="deck-count" aria-hidden="true">
        <b>{String(active + 1).padStart(2, '0')}</b> / {String(SLIDES.length).padStart(2, '0')}
        <i style={{ '--p': active / (SLIDES.length - 1) }} />
      </div>

      <section id="top" className="hero" data-slide>
        <Light />

        {/* Infinite curved drag gallery */}
        <div className="gallery-stage">
          <Gallery revealed={shot} driftSpeed={28} />
        </div>

        {/* WebM carries an alpha channel so the ring shows behind the model; MP4 is the opaque fallback (Safari) */}
        <video ref={video} className={`portrait${rolling ? ' rolling' : ''}`} onPlaying={() => setRolling(true)} onEnded={() => setShot(true)} muted playsInline preload="auto" aria-hidden="true">
          <source src="/sunglasses_walk_pose.webm" type="video/webm" />
          <source src="/sunglasses_walk_pose.mp4" type="video/mp4" />
        </video>
        <div className="vignette" />
        <div className="flash" />

        {/* Desktop: display: contents, children place themselves; mobile: one bottom-anchored column */}
        <div className="hero-text">
        <div className="copy">
          <p className="eyebrow reveal" style={{ '--d': '.6s' }}>
            01 — <span className="ticker"><span key={word}>{PROFILE.stack[word]}</span></span>
          </p>
          <h1>
            <span className="line"><span style={{ '--d': '.7s' }}>{t.title[0]}</span></span>
            <span className="line"><span style={{ '--d': '.85s' }}>{t.title[1]}</span></span>
          </h1>
          <a href="#work" className="pill light reveal" style={{ '--d': '1s' }}>
            {t.explore}
          </a>
        </div>

        <div className="quote reveal" style={{ '--d': '1.15s' }}>
          “<Rich parts={t.quote} as="b" />”
          <div className="sign">{PROFILE.name}</div>
        </div>
        </div>
      </section>

      <Sections onArchive={openArchive} />
    </div>
    </LangContext.Provider>
  );
}
