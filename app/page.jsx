'use client';
import { useEffect, useRef, useState } from 'react';
import Light from './Light';
import Gallery from './Gallery';
import Sections from './Sections';
import { PROFILE } from './data';

// Slide ids in scroll order; index = position in the deck counter
const SLIDES = ['top', 'about', 'work', 'experience', 'capabilities', 'lab', 'archive', 'contact'];

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [rolling, setRolling] = useState(false);
  const [shot, setShot] = useState(false); // last frame reached: flash + gallery enters
  const [archive, setArchive] = useState(false); // full-screen draggable gallery
  const [active, setActive] = useState(0); // index into SLIDES
  const [word, setWord] = useState(0);
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

  const navClass = (id) => (SLIDES[active] === id ? 'active' : undefined);

  return (
    <div className={[loaded && 'loaded', shot && 'shot', archive && 'full-gallery', active > 0 && 'scrolled'].filter(Boolean).join(' ') || undefined}>
      <div className="loader"><span>NGUYEN VAN PHU</span></div>

      <header>
        <a href="#top" className="logo reveal" style={{ '--d': '.2s' }} onClick={() => setArchive(false)}>Phu.</a>
        <div className="reveal" style={{ '--d': '.3s' }}><small>Currently</small>Backend @ {PROFILE.company}</div>
        <div className="reveal" style={{ '--d': '.4s' }}><small>Based in</small>{PROFILE.location}</div>
        <nav className="reveal" style={{ '--d': '.5s' }}>
          <a href="#work" className={navClass('work')}>Work</a>
          <a href="#about" className={navClass('about')}>About</a>
          <a href="#experience" className={navClass('experience')}>Experience</a>
          <a href="#contact" className={navClass('contact')}>Contact</a>
        </nav>
        {archive
          ? <button className="pill reveal" style={{ '--d': '.6s' }} onClick={() => setArchive(false)}>Close archive</button>
          : <a href="#contact" className="pill reveal" style={{ '--d': '.6s' }}>Let’s talk</a>}
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

        <div className="copy">
          <p className="eyebrow reveal" style={{ '--d': '.6s' }}>
            01 — <span className="ticker"><span key={word}>{PROFILE.stack[word]}</span></span>
          </p>
          <h1>
            <span className="line"><span style={{ '--d': '.7s' }}>Backend</span></span>
            <span className="line"><span style={{ '--d': '.85s' }}>Developer</span></span>
          </h1>
          <a href="#work" className="pill light reveal" style={{ '--d': '1s' }}>
            Explore Works
          </a>
        </div>

        <div className="quote reveal" style={{ '--d': '1.15s' }}>
          “Backend developer shipping <b>Magento 2, headless WordPress and Go</b> systems for real stores — clean modules, measured performance.”
          <div className="sign">{PROFILE.name}</div>
        </div>
      </section>

      <Sections onArchive={openArchive} />
    </div>
  );
}
