import { assetUrl } from '../lib/asset-url';
import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HERO_FIVE_MOVIES, TOURNAMENT_TWENTY_MOVIES, HUNDRED_TAMIL_FILMS } from '../data/movies';
import { LaTeX } from './layout/LaTeX';
import { chooseWinner, createTournament } from '../lib/tournament.js';
import { BAYESIAN_LAYOUT_STAGE } from '../lib/bayesian-stage.js';
import type { Movie } from '../types/presentation';

type ImageSlotProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

const ImageSlot = ({ src, alt, className = '', priority = false }: ImageSlotProps) => {
  const [missing, setMissing] = useState(false);

  useEffect(() => setMissing(false), [src]);

  return (
    <div className={`image-slot ${className}`}>
      {!missing && (
        <img
          src={assetUrl(src)}
          alt={alt}
          draggable={false}
          loading={priority ? 'eager' : 'lazy'}
          onError={() => setMissing(true)}
        />
      )}
      {missing && <span aria-hidden="true" className="image-slot-fallback" />}
    </div>
  );
};

const Poster = ({ movie, className = '', onClick }: { movie: Movie; className?: string; onClick?: () => void }) => (
  <button className={`poster ${className}`} onClick={onClick} aria-label={`Choose ${movie.title}`}>
    <ImageSlot src={movie.poster} alt={movie.title} priority />
  </button>
);

const storyAssets = [
  '/img-1.png',
  '/img-2.png',
  '/img-3.png',
  '/img-4.png'
];

const storyTitles = [
  'A Skybound Dream',
  'An Unspoken Bond',
  'The Weight of Choice',
  'The Departures Gate'
];

export const Scene01FiveFilms = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="scene five-films-scene" aria-label="Five films for audience selection">
      <div className="audience-light" aria-hidden="true" />
      <LaTeX math={String.raw`\text{Which is the best film?}`} className="best-film-question" />
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="poster-arc">
        {HERO_FIVE_MOVIES.map((movie, index) => (
          <motion.div
            key={movie.id}
            animate={{
              opacity: selected && selected !== movie.id ? 0.46 : 1,
              y: selected === movie.id ? -42 : Math.abs(index - 2) * 22,
              scale: selected === movie.id ? 1.09 : 1
            }}
            transition={{ type: 'spring', stiffness: 160, damping: 19, delay: index * 0.06 }}
            className={selected === movie.id ? 'poster-choice selected' : 'poster-choice'}
          >
            <Poster movie={movie} onClick={() => setSelected(movie.id)} />
          </motion.div>
        ))}
      </motion.div>
      <div className="cinema-floor" aria-hidden="true" />
    </section>
  );
};

export const Scene02HundredFilms = () => {
  const mosaic = useMemo(
    () => Array.from({ length: 100 }, (_, index) => {
      const film = HUNDRED_TAMIL_FILMS[index];
      return {
        id: index,
        title: film ? film.title : `Film ${index + 1}`,
        src: film ? film.poster : `/images/mosaic/${String(index + 1).padStart(3, '0')}.jpg`,
        tilt: ((index * 29) % 15) - 7,
        delay: (index % 25) * 0.012
      };
    }),
    []
  );

  return (
    <section className="scene hundred-films-scene" aria-label="One hundred film images">
      <LaTeX math={String.raw`\text{What if we have 100 films?}`} className="hundred-films-title" />
      <div className="mosaic-wall">
        {mosaic.map((tile) => (
          <motion.div
            key={tile.id}
            initial={{ opacity: 0, scale: 0.72 }}
            animate={{ opacity: 1, scale: 1, rotate: tile.tilt }}
            transition={{ duration: 0.45, delay: tile.delay }}
            className="mosaic-tile"
            title={tile.title}
          >
            <ImageSlot src={tile.src} alt={tile.title} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export const Scene03Tournament = () => {
  const field = useMemo(() => TOURNAMENT_TWENTY_MOVIES.slice(0, 16), []);
  const [tournament, setTournament] = useState(() => createTournament(field));
  const activePair = tournament.queue[0];
  const completedByRound = [1, 2, 3, 4].map((round) => tournament.history.filter((match) => match.round === round));

  const choose = (movie: Movie) => setTournament((current) => chooseWinner(current, movie.id));
  const restart = () => setTournament(createTournament(field));

  return (
    <section className="scene tournament-scene" aria-label="Interactive knockout tournament">
      <div className="tournament-trail" aria-hidden="true">
        {completedByRound.map((matches, roundIndex) => (
          <div className={`trail-round trail-round-${roundIndex + 1}`} key={roundIndex}>
            {matches.map(({ winner, pair }, index) => (
              <motion.div
                key={`${roundIndex}-${index}-${winner.id}`}
                layoutId={`winner-${winner.id}-${roundIndex}`}
                initial={{ opacity: 0, scale: 0.55 }}
                animate={{ opacity: 0.8, scale: 1 }}
                className="trail-match"
              >
                <ImageSlot src={pair[0].poster} alt="" />
                <ImageSlot src={pair[1].poster} alt="" />
                <div className="trail-winner"><ImageSlot src={winner.poster} alt="" /></div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tournament.champion ? (
          <motion.button
            key="champion"
            initial={{ opacity: 0, scale: 0.72 }}
            animate={{ opacity: 1, scale: 1 }}
            className="champion-poster"
            onClick={restart}
            aria-label="Restart tournament"
          >
            <ImageSlot src={tournament.champion.poster} alt={tournament.champion.title} priority />
          </motion.button>
        ) : activePair ? (
          <motion.div
            key={`${tournament.round}-${activePair[0].id}-${activePair[1].id}`}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="duel"
          >
            <Poster movie={activePair[0]} className="duel-poster" onClick={() => choose(activePair[0])} />
            <LaTeX math={String.raw`\mathrm{vs}`} className="duel-versus" />
            <Poster movie={activePair[1]} className="duel-poster" onClick={() => choose(activePair[1])} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
};

export const SceneStoryTimeTitle = () => (
  <section className="scene story-title-scene" aria-label="Story time transition">
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="story-title-content"
    >
      <LaTeX math={String.raw`\text{Story time...}`} display />
    </motion.div>
  </section>
);

export const Scene04BayesianDecision = ({ stage }: { stage: number }) => {
  const stages = [
    '/images/decision/01-prior.png',
    '/images/decision/02-likelihood.png',
    '/images/decision/03-posterior.png',
    '/images/decision/04-action.png'
  ];
  const isLayout = stage === BAYESIAN_LAYOUT_STAGE;

  return (
    <section className="scene bayes-scene" aria-label="Bayesian decision sequence">
      <AnimatePresence mode="wait" initial={false}>
        {isLayout ? (
          <motion.div
            key="decision-layout"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.46, ease: [0.16, 1, 0.3, 1] }}
            className="decision-grid"
          >
            {stages.map((src, index) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.08, duration: 0.35 }}
                className="decision-card"
              >
                <ImageSlot src={src} alt="Decision illustration" priority />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key={stages[stage]}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
            className="decision-focus"
          >
            <ImageSlot src={stages[stage]} alt="Decision illustration" priority />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export const Scene05Story = ({
  stage = 0,
  onAdvance
}: {
  stage?: number;
  onAdvance?: () => void;
}) => {
  const isAllFour = stage >= 4;
  const revealEquation = stage >= 5;

  return (
    <section
      className="scene story-scene"
      aria-label="Four-frame story and lookahead principle"
      onClick={onAdvance}
      style={{ cursor: 'pointer' }}
    >
      <AnimatePresence mode="wait">
        {!isAllFour ? (
          <motion.div
            key={`story-focus-${stage}`}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="story-focus-container"
          >
            <div className="story-focus-frame">
              <img
                src={assetUrl(storyAssets[stage])}
                alt={storyTitles[stage]}
                draggable={false}
                loading="eager"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.35 }}
              className="story-focus-title"
            >
              <LaTeX math={String.raw`\text{${storyTitles[stage]}}`} />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="story-all-four"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="story-container"
          >
            <div className="story-frames-row">
              {storyAssets.map((src, index) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, scale: 0.9, y: 18 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  className="story-frame-card"
                >
                  <div className="story-frame">
                    <ImageSlot src={src} alt={storyTitles[index]} priority />
                  </div>
                  <div className="story-frame-caption">
                    <LaTeX math={String.raw`\text{${storyTitles[index]}}`} />
                  </div>
                </motion.div>
              ))}
            </div>

            <AnimatePresence>
              {revealEquation && (
                <motion.div
                  key="story-eq"
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.96 }}
                  transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
                  className="story-equation-box"
                >
                  <LaTeX math={String.raw`V_b(\pi)=\max_{i<j}\left[p_{ij}V_{b-1}(\pi^{ij+})+p_{ji}V_{b-1}(\pi^{ij-})\right]`} display />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export const Scene06Boon = () => <Scene05Story stage={5} />;

export const Scene07Framework = ({ step }: { step: number }) => {
  const framework = [
    { words: String.raw`\text{Prior}`, math: String.raw`\pi_0(\theta)` },
    { words: String.raw`\text{Likelihood}`, math: String.raw`P(D\mid\theta)` },
    { words: String.raw`\text{Posterior}`, math: String.raw`\pi(\theta\mid D)\propto P(D\mid\theta)\pi_0(\theta)` },
    { words: String.raw`\text{Update}`, math: String.raw`\pi\xrightarrow{(i,j),\;i\succ j}\pi^{ij+}\qquad\pi\xrightarrow{(i,j),\;j\succ i}\pi^{ij-}` },
    { words: String.raw`\text{Action}`, math: String.raw`a^*=\arg\max_a\;\mathbb E\!\left[V_{b-1}(\pi')\mid\pi,a\right]` },
    { words: String.raw`\text{Dynamic programming}`, math: String.raw`V_b(\pi)=\max_{i<j}\left[p_{ij}V_{b-1}(\pi^{ij+})+p_{ji}V_{b-1}(\pi^{ij-})\right]` }
  ];

  return (
  <section className="scene framework-scene" aria-label="Mathematical framework">
    <LaTeX math={String.raw`\text{The Framework}`} className="framework-scene-title" />
    <div className="equation-stack">
      {framework.slice(0, step + 1).map((item, index) => (
        <motion.div key={item.words} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className={index === step ? 'framework-step active' : 'framework-step'}>
          <LaTeX math={item.math} display />
          <LaTeX math={item.words} className="framework-words" />
        </motion.div>
      ))}
    </div>
  </section>
  );
};

export const Scene08Concepts = () => (
  <section className="scene concepts-scene" aria-label="Bayes maximum likelihood and dynamic programming">
    <div className="concept-orbit">
      <LaTeX math={String.raw`P(\theta\mid D)=\frac{P(D\mid\theta)P(\theta)}{P(D)}`} display />
      <LaTeX math={String.raw`\hat\theta_{\mathrm{MLE}}=\arg\max_\theta P(D\mid\theta)`} display />
      <LaTeX math={String.raw`V_b=\max_a\;\mathbb E\left[V_{b-1}\right]`} display />
    </div>
  </section>
);

const reelFeedCards = [
  {
    bg: 'radial-gradient(circle at 30% 25%, rgba(245, 158, 11, 0.45), transparent 50%), radial-gradient(circle at 75% 70%, rgba(225, 29, 72, 0.4), transparent 55%), linear-gradient(150deg, #140c06, #2d180b 48%, #080709)',
    accent: '#f59e0b',
    tag: '#cinematography',
    audio: '♫ Original Soundtrack • Cinema Score',
    likes: '142K',
    comments: '1,204',
    shares: '24K'
  },
  {
    bg: 'radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.4), transparent 50%), radial-gradient(circle at 25% 75%, rgba(6, 182, 212, 0.4), transparent 55%), linear-gradient(150deg, #051412, #0d2e27 48%, #06090d)',
    accent: '#10b981',
    tag: '#editing',
    audio: '♫ Fast Cut • High Energy Beat',
    likes: '98K',
    comments: '856',
    shares: '14K'
  },
  {
    bg: 'radial-gradient(circle at 35% 70%, rgba(236, 72, 153, 0.4), transparent 50%), radial-gradient(circle at 75% 25%, rgba(139, 92, 246, 0.4), transparent 55%), linear-gradient(150deg, #180718, #351033 48%, #08060d)',
    accent: '#ec4899',
    tag: '#visualeffects',
    audio: '♫ Ambient Mood • Sound Design',
    likes: '235K',
    comments: '2,890',
    shares: '48K'
  },
  {
    bg: 'radial-gradient(circle at 60% 20%, rgba(59, 130, 246, 0.4), transparent 50%), radial-gradient(circle at 30% 80%, rgba(168, 85, 247, 0.4), transparent 55%), linear-gradient(150deg, #081020, #142442 48%, #06070e)',
    accent: '#3b82f6',
    tag: '#screenplay',
    audio: '♫ Climax Theme • Orchestral Drop',
    likes: '176K',
    comments: '1,430',
    shares: '31K'
  }
];

export const Scene09Applications = () => {
  const [choice, setChoice] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => setChoice((current) => (current + 1) % 2), 1500);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="scene applications-scene" aria-label="Real-world pairwise decision applications">
      <LaTeX math={String.raw`\text{Few more examples}`} className="applications-scene-title" />
      <div className="chatgpt-window" aria-label="AI interface with two candidate responses">
        <div className="chatgpt-topbar"><span className="chatgpt-mark" aria-hidden="true" /><span>ChatGPT</span></div>
        <div className="chatgpt-conversation">
          <div className="prompt-bubble">Which Tamil film should I watch tonight?</div>
          <div className="chatgpt-options">
            {[
              { side: 'A', text: 'A tense, emotionally precise, and quietly unforgettable masterpiece with remarkable craft.' },
              { side: 'B', text: 'A fast-paced, high-energy blockbuster with non-stop spectacle and mass moments.' }
            ].map(({ side, text }, index) => (
              <motion.div key={side} animate={{ opacity: choice === index ? 1 : 0.44, y: choice === index ? -8 : 0, scale: choice === index ? 1.025 : 0.975 }} className={choice === index ? 'chat-response active' : 'chat-response'} aria-label={`Candidate response ${side}`}>
                <span className="response-letter">{side}</span>
                <p>{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="chatgpt-composer"><span>Message ChatGPT</span><b aria-hidden="true">↑</b></div>
      </div>
      <div className="application-divider" aria-hidden="true">
        <motion.span animate={{ scale: choice === 0 ? 1 : 1.55, opacity: choice === 0 ? 1 : 0.55 }} />
      </div>
      <div className="instagram-phone" aria-label="Short-video social interface">
        <div className="instagram-topbar"><span>Reels</span><span aria-hidden="true">⌁</span></div>
        <div className="reel-viewport">
          <div className="reel-track-continuous">
            {[...reelFeedCards, ...reelFeedCards].map((reel, idx) => (
              <div key={idx} className="reel-card" style={{ background: reel.bg }}>
                <div className="reel-wave-visual">
                  <span className="wave-bar wb-1" style={{ background: reel.accent }} />
                  <span className="wave-bar wb-2" style={{ background: reel.accent }} />
                  <span className="wave-bar wb-3" style={{ background: reel.accent }} />
                  <span className="wave-bar wb-4" style={{ background: reel.accent }} />
                  <span className="wave-bar wb-5" style={{ background: reel.accent }} />
                </div>
                <div className="reel-card-actions" aria-hidden="true">
                  <div className="reel-action-btn"><span>♡</span><label>{reel.likes}</label></div>
                  <div className="reel-action-btn"><span>◯</span><label>{reel.comments}</label></div>
                  <div className="reel-action-btn"><span>↗</span><label>{reel.shares}</label></div>
                </div>
                <div className="reel-card-caption">
                  <div className="reel-user-tag"><span className="reel-avatar" /><b>@tamil_cinema</b></div>
                  <span className="reel-tag-pill">{reel.tag}</span>
                  <div className="reel-audio-ticker"><span>{reel.audio}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="instagram-nav" aria-hidden="true"><i>⌂</i><i>⌕</i><i>＋</i><i>♢</i><i>◉</i></div>
      </div>
    </section>
  );
};
