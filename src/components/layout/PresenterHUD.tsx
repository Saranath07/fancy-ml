import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, FileText, X, Play, Pause, Layers } from 'lucide-react';
import { SlideData } from '../../types/presentation';

interface PresenterHUDProps {
  currentSlide: number;
  totalSlides: number;
  slideData: SlideData;
  allSlides: SlideData[];
  onPrev: () => void;
  onNext: () => void;
  onSelectSlide: (index: number) => void;
  autoPlay: boolean;
  onToggleAutoPlay: () => void;
}

export const PresenterHUD: React.FC<PresenterHUDProps> = ({
  currentSlide,
  totalSlides,
  slideData,
  allSlides,
  onPrev,
  onNext,
  onSelectSlide,
  autoPlay,
  onToggleAutoPlay
}) => {
  const [showNotes, setShowNotes] = useState(false);
  const [showSlideList, setShowSlideList] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => console.error(e));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((e) => console.error(e));
      setIsFullscreen(false);
    }
  };

  return (
    <>
      {/* Bottom Floating Control Dock (Reveals on hover) */}
      <div className="fixed bottom-0 left-0 right-0 h-16 flex items-center justify-center z-50 group">
        <motion.div
          initial={{ y: 35, opacity: 0.3 }}
          whileHover={{ y: 0, opacity: 1 }}
          className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 shadow-2xl transition-all duration-300"
        >
          {/* Previous Button */}
          <button
            onClick={onPrev}
            disabled={currentSlide === 0}
            className="p-1.5 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition text-slate-300 hover:text-white"
            title="Previous Slide (Left Arrow)"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Slide Progress Counter */}
          <button
            onClick={() => setShowSlideList(!showSlideList)}
            className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-white/10 transition text-sm font-mono text-amber-400 font-semibold"
            title="Jump to Slide"
          >
            <Layers className="w-4 h-4 text-slate-400" />
            <span>{currentSlide + 1}</span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-400">{totalSlides}</span>
          </button>

          {/* Next Button */}
          <button
            onClick={onNext}
            disabled={currentSlide === totalSlides - 1}
            className="p-1.5 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition text-slate-300 hover:text-white"
            title="Next Slide (Right Arrow / Space)"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="w-[1px] h-4 bg-slate-700 mx-1" />

          {/* Auto-advance toggle */}
          <button
            onClick={onToggleAutoPlay}
            className={`p-1.5 rounded-full transition ${
              autoPlay ? 'bg-amber-500/20 text-amber-400' : 'hover:bg-white/10 text-slate-400 hover:text-white'
            }`}
            title={autoPlay ? 'Pause Auto-Advance' : 'Auto-Advance Slides'}
          >
            {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Speaker Notes Toggle */}
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`p-1.5 rounded-full transition ${
              showNotes ? 'bg-cyan-500/20 text-cyan-400' : 'hover:bg-white/10 text-slate-400 hover:text-white'
            }`}
            title="Toggle Speaker Notes (Key: N)"
          >
            <FileText className="w-4 h-4" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-full hover:bg-white/10 transition text-slate-400 hover:text-white"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </motion.div>
      </div>

      {/* Slide Navigation List Modal */}
      <AnimatePresence>
        {showSlideList && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setShowSlideList(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-700/80 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h3 className="text-xl font-bold font-display text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-amber-400" />
                  Table of Contents
                </h3>
                <button
                  onClick={() => setShowSlideList(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid gap-2 mt-4">
                {allSlides.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => {
                      onSelectSlide(idx);
                      setShowSlideList(false);
                    }}
                    className={`flex items-start gap-4 p-3 rounded-xl text-left transition ${
                      currentSlide === idx
                        ? 'bg-amber-500/15 border border-amber-500/40 text-white'
                        : 'hover:bg-slate-800/60 text-slate-300'
                    }`}
                  >
                    <span className="font-mono text-sm font-bold text-amber-400 mt-0.5">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h4 className="font-semibold text-sm">{slide.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{slide.subtitle}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Speaker Notes Floating Drawer */}
      <AnimatePresence>
        {showNotes && (
          <motion.div
            initial={{ x: 420, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 420, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-6 right-6 bottom-20 w-96 z-40 bg-slate-950/95 backdrop-blur-2xl border border-slate-700/80 rounded-2xl shadow-2xl p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold tracking-wider text-amber-400 uppercase">
                    Presenter Teleprompter
                  </span>
                </div>
                <button
                  onClick={() => setShowNotes(false)}
                  className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4">
                <span className="text-xs font-mono text-slate-400">SLIDE {currentSlide + 1} OF {totalSlides}</span>
                <h3 className="text-lg font-bold text-white font-display mt-0.5">{slideData.title}</h3>
                <p className="text-xs text-cyan-400 mt-0.5">{slideData.subtitle}</p>
              </div>

              <div className="mt-5 space-y-3.5 max-h-[50vh] overflow-y-auto pr-2 text-sm leading-relaxed text-slate-200">
                {slideData.speakerNotes.map((paragraph, i) => (
                  <p key={i} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500 flex justify-between">
              <span>← / → Navigate</span>
              <span>Space: Advance</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
