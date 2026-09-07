import { PresenterTools } from './components/PresenterTools';
import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CinemaCanvas } from './components/layout/CinemaCanvas';
import { PrivacyDeck } from './components/PrivacyDeck';
import { TalkOpening } from './components/TalkOpening';
import { privacyEpisodes } from './data/privacy';
import {
  Scene01FiveFilms,
  Scene02HundredFilms,
  Scene03Tournament,
  SceneStoryTimeTitle,
  Scene05Story,
  Scene07Framework,
  Scene08Concepts,
  Scene09Applications
} from './components/PresentationScenes';

const TOTAL_SCENES = 9;
const STORY_MAX_STAGE = 5;

export const App = () => {
  const [scene, setScene] = useState(() => location.hash.startsWith('#privacy') ? 8 : -1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [frameworkStep, setFrameworkStep] = useState(0);
  const [storyStage, setStoryStage] = useState(0);

  const next = useCallback(() => {
    if (scene === 4 && storyStage < STORY_MAX_STAGE) {
      setStoryStage((current) => current + 1);
      return;
    }
    if (scene === 5 && frameworkStep < 5) {
      setFrameworkStep((current) => current + 1);
      return;
    }
    setDirection(1);
    setScene((current) => {
      const nextScene = Math.min(current + 1, TOTAL_SCENES - 1);
      if (nextScene === 4) {
        setStoryStage(0);
      }
      return nextScene;
    });
  }, [frameworkStep, scene, storyStage]);

  const previous = useCallback(() => {
    if (scene === 5 && frameworkStep > 0) {
      setFrameworkStep((current) => current - 1);
      return;
    }
    if (scene === 4 && storyStage > 0) {
      setStoryStage((current) => current - 1);
      return;
    }
    setDirection(-1);
    setScene((current) => {
      const prevScene = Math.max(current - 1, -1);
      if (prevScene === 4) {
        setStoryStage(STORY_MAX_STAGE);
      }
      return prevScene;
    });
  }, [frameworkStep, scene, storyStage]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (scene === 8) return;
      if (event.repeat || (event.target as HTMLElement)?.closest('input, textarea, select, [contenteditable="true"]')) return;
      if (event.key === ' ' && (event.target as HTMLElement)?.closest('button, a, summary')) return;
      if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault();
        next();
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        previous();
      }
      if (event.key.toLowerCase() === 'f') {
        event.preventDefault();
        if (document.fullscreenElement) {
          void document.exitFullscreen().catch(() => {});
        } else {
          void document.documentElement.requestFullscreen().catch(() => {});
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [next, previous, scene]);

  useEffect(() => {
    setFrameworkStep(0);
    if (scene < 4) {
      setStoryStage(0);
    }
  }, [scene]);

  const content = [
    <Scene01FiveFilms key="five" />,
    <Scene02HundredFilms key="hundred" />,
    <Scene03Tournament key="tournament" />,
    <SceneStoryTimeTitle key="story-title" />,
    <Scene05Story
      key="story"
      stage={storyStage}
      onAdvance={next}
    />,
    <Scene07Framework key="framework" step={frameworkStep} />,
    <Scene08Concepts key="concepts" />,
    <Scene09Applications key="applications" />,
    <PrivacyDeck key="privacy" onExit={() => setScene(7)} />
  ];

  return (
    <CinemaCanvas>
      <PresenterTools />
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={scene}
          custom={direction}
          initial={{ opacity: 0, x: direction * 56, scale: 0.985 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: direction * -56, scale: 1.015 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="presentation-scene"
        >
          {scene === -1 ? <TalkOpening /> : content[scene]}
        </motion.div>
      </AnimatePresence>
      {scene < 8 && <span className="talk-page-number" aria-label={`Page ${scene + 2} of ${9 + privacyEpisodes.length}`}>{String(scene + 2).padStart(2, '0')} / {9 + privacyEpisodes.length}</span>}
    </CinemaCanvas>
  );
};

export default App;
