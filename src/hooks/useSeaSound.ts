import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Ambient sea loop plus a short UI "tick" played on interactions while sound is on.
 */
export function useSeaSound() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const enabledRef = useRef(false);
  const [enabled, setEnabled] = useState(false);

  const setSound = useCallback((on: boolean) => {
    enabledRef.current = on;
    setEnabled(on);
    const audio = audioRef.current;
    if (!audio) return;
    if (on) {
      audio.play().catch(() => {
        enabledRef.current = false;
        setEnabled(false);
        audio.pause();
      });
    } else {
      audio.pause();
    }
  }, []);

  const tick = useCallback(() => {
    if (!enabledRef.current) return;
    try {
      const ctx = (ctxRef.current ??= new AudioContext());
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = 150;
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch {
      // Web Audio unavailable — ticks are decorative only.
    }
  }, []);

  useEffect(
    () => () => {
      ctxRef.current?.close().catch(() => {});
      ctxRef.current = null;
    },
    [],
  );

  return { audioRef, enabled, setSound, tick };
}
