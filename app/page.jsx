'use client';
import { useEffect, useRef, useState } from 'react';
import Light from './Light';
import Gallery from './Gallery';
import { PROFILE, EXPERIENCE, EDUCATION, SKILLS } from './data';

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [rolling, setRolling] = useState(false);
  const [shot, setShot] = useState(false); // last frame reached: flash + gallery enters
  const [view, setView] = useState('hero'); // 'hero' | 'works' | 'about'
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

  useEffect(() => {
    if (view !== 'about') return;
    const onKey = (e) => e.key === 'Escape' && setView('hero');
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [view]);

  const go = (next) => (e) => {
    e.preventDefault();
    if (next === 'works') setShot(true);
    setView((v) => (v === next ? 'hero' : next));
  };

  return (
    <div className={[loaded && 'loaded', shot && 'shot', view === 'works' && 'full-gallery', view === 'about' && 'about-open'].filter(Boolean).join(' ') || undefined}>
      <div className="loader"><span>NGUYEN VAN PHU</span></div>

      <header>
        <a href="#" className="logo reveal" style={{ '--d': '.2s' }} onClick={go('hero')}>Phu.</a>
        <div className="reveal" style={{ '--d': '.3s' }}><small>Currently</small>Backend @ {PROFILE.company}</div>
        <div className="reveal" style={{ '--d': '.4s' }}><small>Based in</small>{PROFILE.location}</div>
        <nav className="reveal" style={{ '--d': '.5s' }}>
          <a href="#about" className={view === 'about' ? 'active' : undefined} onClick={go('about')}>About</a>
          <a href="#works" className={view === 'works' ? 'active' : undefined} onClick={go('works')}>Works</a>
          <a href={`mailto:${PROFILE.email}`}>Contact</a>
          <a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub</a>
        </nav>
        <a href="#works" className="pill reveal" style={{ '--d': '.6s' }} onClick={go(view === 'hero' ? 'works' : 'hero')}>
          {view === 'hero' ? 'Explore Works' : 'Back to Hero'}
        </a>
      </header>

      <section className="hero">
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
          <a href="#works" className="pill light reveal" style={{ '--d': '1s' }} onClick={go('works')}>
            Explore Works
          </a>
        </div>

        <div className="quote reveal" style={{ '--d': '1.15s' }}>
          “Backend developer shipping <b>Magento 2, headless WordPress and Go</b> systems for real stores — clean modules, measured performance.”
          <div className="sign">{PROFILE.name}</div>
        </div>
      </section>

      <aside className="about" aria-hidden={view !== 'about'} inert={view !== 'about' || undefined}>
        <div className="about-inner">
          <p className="eyebrow">02 — ABOUT</p>
          <h2 style={{ '--i': 0 }}>{PROFILE.name}</h2>
          <p className="about-lead" style={{ '--i': 1 }}>{PROFILE.summary}</p>

          <h3 style={{ '--i': 2 }}>Experience</h3>
          <ol className="timeline">
            {EXPERIENCE.map((x, i) => (
              <li key={x.company} style={{ '--i': i + 3 }}>
                <div className="tl-head"><b>{x.company}</b><span>{x.period}</span></div>
                <p className="tl-role">{x.role}</p>
                <ul>{x.points.map((t) => <li key={t}>{t}</li>)}</ul>
              </li>
            ))}
          </ol>

          <h3 style={{ '--i': 6 }}>Skills</h3>
          <div className="skills">
            {SKILLS.map(([group, items], i) => (
              <div key={group} style={{ '--i': i + 7 }}>
                <small>{group}</small>
                {items.map((t) => <span key={t}>{t}</span>)}
              </div>
            ))}
          </div>

          <h3 style={{ '--i': 11 }}>Education</h3>
          <div className="tl-head" style={{ '--i': 12 }}><b>{EDUCATION.school}</b><span>{EDUCATION.period}</span></div>
          <p className="tl-role" style={{ '--i': 12 }}>{EDUCATION.degree} · {EDUCATION.note}</p>

          <div className="about-cta" style={{ '--i': 13 }}>
            <a className="pill light" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
            <a className="pill" href={PROFILE.github} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </aside>
    </div>
  );
}
