'use client';
import { useEffect, useRef, useState } from 'react';
import { ProjectDetail } from './Gallery';
import Helix from './Helix';
import { PROFILE, TIMELINE, EXPERIENCE, SKILLS, PROJECTS } from './data';
import { useLang, loc, Rich } from './lang';

const FEATURED = PROJECTS.filter((p) => p.featured);
const LAB = PROJECTS.filter((p) => p.kind.startsWith('Personal'));

// Every slide after the hero. `.rv` children rise in once the slide gets `.in` (set in page.jsx)
export default function Sections({ onArchive }) {
  const [detail, setDetail] = useState(null);
  return (
    <>
      <About />
      <Work onOpen={setDetail} />
      <Experience />
      <Capabilities />
      <Lab onOpen={setDetail} />
      <Archive onArchive={onArchive} />
      <Contact />
      {detail && <ProjectDetail item={detail} onClose={() => setDetail(null)} />}
    </>
  );
}

function Label({ n, children }) {
  return <p className="slide-label rv">{n} — {children}</p>;
}

function About() {
  const { lang, t } = useLang();
  return (
    <section id="about" data-slide className="slide about">
      <div className="about-inner">
        <Label n="02">{t.about}</Label>
        <h2 className="about-statement">
          {t.statement.map((line, i) => (
            <span key={i} className="line"><span style={{ '--i': i }}><Rich parts={line} /></span></span>
          ))}
        </h2>
        <dl className="about-rows">
          {TIMELINE.map((row, i) => loc(row, lang)).map(({ label, title, place, period }, i) => (
            <div key={i} style={{ '--i': i + 3 }}>
              <dt>{label}</dt>
              <dd><b>{title}</b><span>{place}</span></dd>
              <dd className="about-period">{period}</dd>
            </div>
          ))}
        </dl>
        <p className="about-stack rv" style={{ '--i': 6 }}>{PROFILE.stack.join(' · ')}</p>
      </div>
    </section>
  );
}

// Pinned slides: one 100dvh snap step per item; whichever step crosses the centre line is active
function useSteps() {
  const [active, setActive] = useState(0);
  const steps = useRef([]);
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setActive(Number(e.target.dataset.step));
    }, { rootMargin: '-50% 0px -50% 0px' });
    steps.current.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  const stepRefs = (n) => Array.from({ length: n }, (_, i) => (
    <div key={i} className="work-step" data-step={i} ref={(el) => { steps.current[i] = el; }} />
  ));
  return [active, stepRefs];
}

// Pinned: the section is FEATURED.length screens tall, the stage sticks while each screen swaps the case
function Work({ onOpen }) {
  const { lang, t } = useLang();
  const [active, stepRefs] = useSteps();

  return (
    <section id="work" data-slide className="slide work" style={{ '--steps': FEATURED.length }}>
      <div className="work-stage">
        <Label n="03">{t.work}</Label>
        <div className="work-cases">
          {FEATURED.map((item, i) => [item, loc(item, lang)]).map(([item, p], i) => (
            <article key={p.title} className={i === active ? 'case on' : 'case'} aria-hidden={i !== active}>
              <div className="case-text">
                <p className="case-index">{String(i + 1).padStart(2, '0')} / {String(FEATURED.length).padStart(2, '0')} · {p.kind}</p>
                <h3>{p.title}</h3>
                <p className="case-summary">{p.summary}</p>
                <ul>{p.points.slice(0, 3).map((t) => <li key={t}>{t}</li>)}</ul>
                <button className="pill" onClick={() => onOpen(item)} tabIndex={i === active ? 0 : -1}>{t.caseDetails}</button>
              </div>
              <ol className="flow" aria-label={t.architecture}>
                {p.flow.map((node, j) => <li key={node} style={{ '--j': j }}>{node}</li>)}
              </ol>
            </article>
          ))}
        </div>
        <div className="work-dots" aria-hidden="true">
          {FEATURED.map((_, i) => <span key={i} className={i === active ? 'on' : undefined} />)}
        </div>
      </div>
      {stepRefs(FEATURED.length)}
    </section>
  );
}

// Counts 0 → to once the slide is in view (CSS sets `.in` on the section; we watch the node ourselves)
function Count({ to }) {
  const el = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return setN(to);
      const start = performance.now();
      const step = (t) => {
        const k = Math.min(1, (t - start) / 1400);
        setN(to * (1 - (1 - k) ** 3));
        if (k < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    });
    io.observe(el.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  const decimals = (String(to).split('.')[1] || '').length;
  return <span ref={el}>{n.toFixed(decimals)}</span>;
}

// Evolution: milestones climb a 3D helix, oldest at the bottom; the rail fills upward
function Experience() {
  const { lang, t } = useLang();
  const [active, stepRefs] = useSteps();
  const section = useRef(null);
  const items = EXPERIENCE.map((x) => loc(x, lang));
  const n = items.length;

  return (
    <section id="experience" data-slide className="slide exp" ref={section} style={{ '--steps': n }}>
      <div className="exp-stage">
        <Helix count={n} active={active} track={section} />
        <div className="exp-content">
          <Label n="04">{t.experience}</Label>
          <div className="exp-ms">
            {items.map((x, i) => (
              <article key={x.company} className={i === active ? 'ms on' : 'ms'} aria-hidden={i !== active}>
                <p className="ms-index">{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')} · {x.period}</p>
                <h3>{x.company}</h3>
                <p className="ms-role">{x.role}</p>
                <p className="ms-line">{x.line}</p>
                {/* Mounted only while active so the counters replay on every visit */}
                {i === active && x.metrics.length > 0 && (
                  <div className="exp-metrics">
                    {x.metrics.map(([v, suf, label]) => (
                      <div key={label}><strong><Count to={v} />{suf}</strong><small>{label}</small></div>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
        <ol className="exp-rail" style={{ '--p': active / Math.max(1, n - 1) }} aria-hidden="true">
          {items.map((x, i) => (
            <li key={x.company} className={i <= active ? 'on' : undefined}>
              <span>{x.company}</span>
            </li>
          ))}
        </ol>
      </div>
      {stepRefs(n)}
    </section>
  );
}

function Capabilities() {
  const { t } = useLang();
  return (
    <section id="capabilities" data-slide className="slide caps">
      <div className="slide-inner">
        <Label n="05">{t.capabilities}</Label>
        <h2 className="slide-title rv" style={{ '--i': 1 }}><Rich parts={t.capsTitle} /></h2>
        <div className="caps-grid">
          {SKILLS.map(([group, items], i) => (
            <div key={group} className="rv" style={{ '--i': i + 2 }}>
              <small>{String(i + 1).padStart(2, '0')}</small>
              <h3>{t.skillGroups[i]}</h3>
              <ul>{items.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Lab({ onOpen }) {
  const { t } = useLang();
  const preview = useRef(null);
  const [hover, setHover] = useState(null);
  // Cursor-follow preview: position via CSS vars so moving the mouse never re-renders
  const move = (e) => {
    preview.current?.style.setProperty('--x', `${e.clientX}px`);
    preview.current?.style.setProperty('--y', `${e.clientY}px`);
  };
  return (
    <section id="lab" data-slide className="slide lab">
      <div className="slide-inner">
        <Label n="06">{t.lab}</Label>
        <ul className="lab-list" onPointerMove={move} onPointerLeave={() => setHover(null)}>
          {LAB.map((p, i) => (
            <li key={p.title} className="rv" style={{ '--i': i + 1 }}>
              <button onClick={() => onOpen(p)} onPointerEnter={() => setHover(p)}>
                <span className="lab-n">{String(i + 1).padStart(2, '0')}</span>
                <b>{p.title}</b>
                <span className="lab-stack">{p.stack.slice(0, 3).join(' · ')}</span>
                <span className="lab-arrow" aria-hidden="true">→</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div ref={preview} className={hover ? 'lab-preview on' : 'lab-preview'} aria-hidden="true">
        {hover && <img src={hover.src(400)} alt="" />}
      </div>
    </section>
  );
}

function Archive({ onArchive }) {
  const { t } = useLang();
  return (
    <section id="archive" data-slide className="slide archive">
      <div className="slide-inner">
        <Label n="07">{t.archive}</Label>
        <h2 className="archive-count rv" style={{ '--i': 1 }}><Count to={PROJECTS.length} /> <em>{t.projects}</em></h2>
        <p className="archive-sub rv" style={{ '--i': 2 }}>{t.archiveSub}</p>
        <div className="archive-thumbs" aria-hidden="true">
          {PROJECTS.slice(0, 6).map((p, i) => (
            <img key={p.title} className="rv" style={{ '--i': i + 3 }} src={p.src(400)} alt="" loading="lazy" />
          ))}
        </div>
        <button className="pill light rv" style={{ '--i': 9 }} onClick={onArchive}>{t.openArchive}</button>
      </div>
    </section>
  );
}

function Contact() {
  const { lang, t } = useLang();
  const word = t.talk;
  return (
    <section id="contact" data-slide className="slide contact">
      <div className="slide-inner">
        <Label n="08">{t.contact}</Label>
        <a className="contact-big" href={`mailto:${PROFILE.email}`} aria-label={`Email ${PROFILE.email}`}>
          {[...word].map((c, i) => <span key={word + i} style={{ '--i': i }}>{c === ' ' ? ' ' : c}</span>)}
          <span className="contact-arrow" aria-hidden="true">→</span>
        </a>
        <div className="contact-meta rv" style={{ '--i': 4 }}>
          <a className="pill light cv" href={`/cv/nguyen-van-phu-cv-${lang}.pdf`} download>{t.downloadCv}</a>
          <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
          <a href={`https://zalo.me/${PROFILE.zalo}`} target="_blank" rel="noreferrer">Zalo {PROFILE.zalo.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')} ↗</a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          <span>{t.location}</span>
        </div>
        <footer className="contact-foot rv" style={{ '--i': 5 }}>
          <span>© {new Date().getFullYear()} {PROFILE.name}</span>
          <a href="#top">{t.backToTop}</a>
        </footer>
      </div>
    </section>
  );
}
