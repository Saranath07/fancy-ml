import { TalkConclusion } from './TalkConclusion';
import { assetUrl } from '../lib/asset-url';
import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Eye, Fingerprint, LockKeyhole, MessageCircle, ShieldCheck, Ticket, UserRound, Users, Vote, X } from 'lucide-react';
import { LaTeX } from './layout/LaTeX';
import { clueRatings, privacyEpisodes, privacyFilms, privacySources, ratingDates, ratingRows } from '../data/privacy';
import './privacy.css';
import { ChatLeak, NetflixLinkage, IdentityGame, PoliticalCoin, ResponseCalculator } from './PrivacyActivities';

const Eq = ({ children }: { children: string }) => <div className="pv-equation"><AnimatePresence mode="wait"><motion.div key={children} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .3, ease: 'easeInOut' }}><LaTeX math={children} display /></motion.div></AnimatePresence></div>;
const Poster = ({ film }: { film: string }) => <img src={assetUrl(`/images/posters/${film}.jpg`)} alt={`${film} movie poster`} />;
const gradients = [[50, -35], [-60, -40], [25, 52], [205, -115], [-30, 65], [75, 20]];

function GradientPlot({ clipped = false, noise = false, updated = false }: { clipped?: boolean; noise?: boolean; updated?: boolean }) {
  const vectors = gradients.map(([x, y]) => {
    const scale = clipped ? Math.min(1, 95 / Math.hypot(x, y)) : 1;
    return [x * scale, y * scale];
  });
  const mean = vectors.reduce(([x, y], [a, b]) => [x + a / vectors.length, y + b / vectors.length], [0, 0]);
  return <svg className="pv-gradient" viewBox="0 0 640 340" role="img" aria-label={noise ? 'Gaussian noise added to the clipped gradient sum; illustrative 2D projection' : clipped ? 'Individual gradients bounded by clipping radius C' : 'Individual gradients with one unusually long contribution'}>
    <defs><marker id="pv-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="context-stroke" /></marker></defs>
    <path d="M30 180H610 M290 20V320" stroke="#ffffff18" />
    <circle cx="290" cy="180" r="95" fill="none" stroke={clipped ? '#f7f7f7' : '#ffffff35'} strokeDasharray="5 7" />
    <text x="390" y="185" fill="#eee" fontSize="20">C</text>
    {vectors.map(([x, y], i) => <motion.line key={i} x1="290" y1="180" animate={{ x2: 290 + x, y2: 180 + y, opacity: noise ? 0.25 : 1 }} transition={{ duration: 0.75 }} stroke={i === 3 ? 'var(--pv-accent)' : '#aaa'} strokeWidth={i === 3 ? 5 : 3} markerEnd="url(#pv-arrow)" />)}
    {noise && Array.from({ length: 65 }, (_, i) => {
      const radius = Math.sqrt(-2 * Math.log((i + 0.5) / 65)) * 29;
      const angle = i * 2.39996;
      return <motion.circle key={i} initial={{ opacity: 0 }} animate={{ opacity: 0.55 }} transition={{ delay: i * 0.008 }} cx={290 + mean[0] + Math.cos(angle) * radius} cy={180 + mean[1] + Math.sin(angle) * radius} r="2.5" fill="var(--pv-accent)" />;
    })}
    <motion.line x1="290" y1="180" animate={{ x2: 290 + mean[0] + (noise ? 23 : 0), y2: 180 + mean[1] + (noise ? 16 : 0) }} stroke="#fff" strokeWidth="5" markerEnd="url(#pv-arrow)" />
    {updated && <motion.circle initial={{ cx: 290, cy: 180 }} animate={{ cx: 290 - mean[0] - 23, cy: 180 - mean[1] - 16 }} r="9" fill="#fff" />}
  </svg>;
}

function Distributions({ gap }: { gap: number }) {
  const curve = (shift: number) => Array.from({ length: 121 }, (_, i) => {
    const x = i * 5;
    return `${i === 0 ? 'M' : 'L'}${x},${220 - 180 * Math.exp(-((x - 300 - shift) ** 2) / (2 * 65 ** 2))}`;
  }).join(' ');
  return <svg viewBox="0 0 600 245" className="pv-curves" role="img" aria-label="Illustrative overlapping output distributions for neighboring datasets">
    <path d="M20 220H580" stroke="#ffffff35" />
    <motion.path animate={{ d: curve(-gap / 2) }} fill="none" stroke="var(--pv-accent)" strokeWidth="5" />
    <motion.path animate={{ d: curve(gap / 2) }} fill="none" stroke="#fff" strokeWidth="4" strokeDasharray="9 6" />
  </svg>;
}

export function PrivacyDeck({ onExit }: { onExit: () => void }) {
  const reducedMotion = useReducedMotion();
  const initial = Number(location.hash.split('/')[1] || 1) - 1;
  const [shot, setShot] = useState(Number.isInteger(initial) ? Math.max(0, Math.min(privacyEpisodes.length - 1, initial)) : 0);
  const [step, setStep] = useState(0);
  const [notes, setNotes] = useState(false);
  const [guess, setGuess] = useState<string | null>(null);
  const [gap, setGap] = useState(32);
  const episode = privacyEpisodes[shot];
  const next = useCallback(() => {
    if (step < episode.steps) setStep(s => s + 1);
    else if (shot < privacyEpisodes.length - 1) { setShot(s => s + 1); setStep(0); setGuess(null); }
  }, [episode.steps, shot, step]);
  const previous = useCallback(() => {
    if (step > 0) setStep(s => s - 1);
    else if (shot > 0) { setShot(s => s - 1); setStep(privacyEpisodes[shot - 1].steps); setGuess(null); }
    else { history.replaceState(null, '', location.pathname + location.search); onExit(); }
  }, [onExit, shot, step]);
  useEffect(() => { history.replaceState(null, '', `#privacy/${shot + 1}`); }, [shot]);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.closest('input, textarea, select, [contenteditable="true"]')) return;
      if (e.key === ' ' && (e.target as HTMLElement)?.closest('button, a')) return;
      if (e.repeat) return;
      if (['ArrowRight', ' ', 'PageDown'].includes(e.key)) { e.preventDefault(); next(); }
      if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); previous(); }
      if (e.key.toLowerCase() === 'n') setNotes(n => !n);
      if (e.key === 'Escape') setNotes(false);
      if (e.key.toLowerCase() === 'f') {
        const request = document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
        void request.catch(() => {});
      }
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [next, previous]);

  const render = () => {
    if (shot === 13) return <TalkConclusion />;
    if (shot === 3) return <IdentityGame revealed={step > 0} />;
    const scene = shot === 5 ? 5 : shot === 6 ? 4 : shot > 3 ? shot - 1 : shot;
    if (scene === 0) return <ChatLeak step={step} />;
    if (scene === 1) return <div className="pv-prize">
      <div className="pv-poster-wall">{[...privacyFilms, 'vikram', ...privacyFilms, 'vikram'].map((film, i) => <Poster key={i} film={film} />)}</div>
      <div className="pv-prize-copy"><span className="pv-wordmark">NETFLIX</span><span className="pv-kicker">THE PRIZE / 2006</span><h1>$1,000,000</h1><Eq>{String.raw`\mathrm{RMSE}\downarrow 10\%`}</Eq>
      {step > 0 && <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pv-stats"><div><b>100M</b><small>ratings</small></div><div><b>≈480K</b><small>people</small></div><div><b>{step > 1 ? '#104' : 'Kavin'}</b><small>{step > 1 ? 'Names removed. Patterns remain.' : 'Illustrative profile'}</small></div></motion.div>}</div>
    </div>;
    if (scene === 2) return <NetflixLinkage step={step} />;
    if (scene === 3) return <PoliticalCoin step={step} />;
    if (scene === 4) return <div className="pv-probability"><h1>Same answer.<br /><em>Two stories.</em></h1><div className="pv-prob-grid"><span>X → Y</span><b>YES</b><b>NO</b><b>YES</b><strong>¾</strong><strong>¼</strong><b>NO</b><strong>¼</strong><strong>¾</strong></div>{step > 0 && <Eq>{String.raw`\frac{3/4}{1/4}=3=e^\epsilon\qquad\epsilon=\ln 3`}</Eq>}</div>;
    if (scene === 5) return <ResponseCalculator />;
    if (scene === 6) return <div className="pv-neighbors"><h1>With you. <em>Without you.</em></h1><div className="pv-worlds">{[0, 1].map(world => <div key={world}><span>{world === 0 ? 'D' : 'D′'}</span><div className="pv-people">{Array.from({ length: 12 }, (_, i) => <UserRound key={i} className={i === 11 ? world === 0 ? 'pv-you' : 'pv-missing' : ''} />)}</div></div>)}</div><div className="pv-world-output"><AnimatePresence mode="wait"><motion.div key={step === 0 ? 'adjacency' : 'distributions'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .35 }}>{step === 0 ? <Eq>{String.raw`D\simeq D'`}</Eq> : <Distributions gap={32} />}</motion.div></AnimatePresence></div></div>;
    if (scene === 7) return <div className="pv-definition"><h1>Differential <em>privacy.</em></h1><Distributions gap={gap} /><Eq>{String.raw`\Pr[\mathcal M(D)\in S]\leq e^\epsilon\Pr[\mathcal M(D')\in S]+\delta`}</Eq>{step > 0 && <motion.label initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pv-slider"><span>More overlap</span><input aria-label="Illustrative distribution separation, not calibrated epsilon" type="range" min="8" max="95" value={gap} onChange={e => setGap(Number(e.target.value))} /><span>Less overlap</span></motion.label>}<span className="pv-caption">Every neighboring pair. Every output event.</span></div>;
    if (scene === 8 || scene === 9) return <div className="pv-training"><h1>{scene === 8 ? <>Every viewer<br /><em>pulls.</em></> : <>Limit<br /><em>each pull.</em></>}</h1><GradientPlot clipped={scene === 9 && step > 0} /><Eq>{scene === 8 ? step === 0 ? String.raw`g_i=\nabla_\theta\ell(\theta;x_i)` : String.raw`\theta_{t+1}=\theta_t-\eta_t\frac1L\sum_i g_i` : String.raw`\bar g_i=\frac{g_i}{\max(1,\lVert g_i\rVert_2/C)}`}</Eq></div>;
    if (scene === 10) return <div className="pv-training pv-noise"><motion.h1 key={step < 2 ? "noise-title" : "step-title"} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{step < 2 ? <>Add <em>noise.</em></> : <>Take the <em>step.</em></>}</motion.h1><GradientPlot clipped noise={step > 0} updated={step > 1} /><Eq>{step < 2 ? String.raw`\widetilde g_t=\frac1L\left(\sum_{i\in B_t}\bar g_i+\mathcal N(0,\sigma^2C^2I)\right)` : String.raw`\theta_{t+1}=\theta_t-\eta_t\widetilde g_t`}</Eq><span className="pv-caption">Poisson sample · L = qN · fresh noise each step</span></div>;
    return <div className="pv-finale"><ShieldCheck className="pv-finale-icon" /><h1>Learn patterns.<br /><em>Limit individual influence.</em></h1><AnimatePresence mode="wait"><motion.div key={step} className="pv-finale-output" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .35 }}>{step === 0 ? <div className="pv-pipeline"><UserRound /><ArrowRight /><span>C</span><ArrowRight /><span>+ Z</span><ArrowRight /><ShieldCheck /></div> : <><Eq>{String.raw`(q,\sigma,T,\delta;\;\text{adjacency})\xrightarrow{\text{accountant}}\epsilon_{\mathrm{total}}`}</Eq><div className="pv-finale-units"><Ticket /> one rating <span>≠</span><Users /> one viewer</div></>}</motion.div></AnimatePresence></div>;
  };

  const theme = shot === 0 ? 'chatgpt' : shot <= 2 ? 'netflix' : 'learning';
  const shade = shot === 3 || (shot === 4 && step < 2) || shot === 9
    ? 'red'
    : shot === 4 || shot === 5 || shot === 10 || shot === 12 || shot === 13
      ? 'gold'
      : shot === 6 ? 'violet' : 'blue';
  return <MotionConfig reducedMotion="user" transition={{ duration: .6, ease: [.22, 1, .36, 1] }}><section className={`privacy-deck pv-theme-${theme}`} aria-label={`Privacy presentation: ${episode.title}`}>
    <AnimatePresence>
      {theme === 'learning' && <motion.div key={shade} aria-hidden="true" className={`pv-atmosphere pv-shade-${shade}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .7 }} />}
    </AnimatePresence>
    <AnimatePresence mode="wait"><motion.div key={shot} className="pv-frame" initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotion ? 0 : -6 }} transition={{ duration: .5, ease: [.22, 1, .36, 1] }}>{render()}</motion.div></AnimatePresence>
    <span className="talk-page-number" aria-label={`Page ${shot + 10} of ${9 + privacyEpisodes.length}`}>{String(shot + 10).padStart(2, '0')} / {9 + privacyEpisodes.length}</span>
    {notes && <aside className="pv-notes" aria-label="Speaker notes"><button onClick={() => setNotes(false)} aria-label="Close notes"><X /></button><h2>{episode.title}</h2><p>{episode.notes}</p><div className="pv-sources">{privacySources.map(s => <a key={s.url} href={s.url} target="_blank" rel="noreferrer">{s.title}</a>)}</div><small>← / → or Space: reveal · N: notes · F: fullscreen · Esc: close notes</small></aside>}
  </section></MotionConfig>;
}
