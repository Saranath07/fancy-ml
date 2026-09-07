import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { prepareOffline } from '../lib/offline';

export function PresenterTools() {
  const [light, setLight] = useState(() => document.documentElement.dataset.theme === 'light');
  useEffect(() => {
    document.documentElement.dataset.theme = light ? 'light' : 'dark';
    try { localStorage.setItem('talk-theme', light ? 'light' : 'dark'); } catch { /* Theme still works without storage. */ }
  }, [light]);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey || (e.target as HTMLElement)?.closest('input,textarea,select,[contenteditable="true"]')) return;
      if (e.key.toLowerCase() === 'l') { e.preventDefault(); setLight(v => !v); }
    };
    window.addEventListener('keydown', key);
    void prepareOffline();
    return () => { window.removeEventListener('keydown', key); };
  }, []);
  return <div className="presenter-tools">
    <button onClick={() => setLight(v => !v)} aria-label={light ? 'Switch to dark mode (L)' : 'Switch to light mode (L)'} title="Switch projector theme · L">{light ? <Moon /> : <Sun />}<span>{light ? 'Dark' : 'Light'}</span></button>

  </div>;
}
