import { useCallback, useEffect, useRef, useState } from "react";
import useSound from "use-sound";

const dir = "/music/ui/";

export const musicSelector = {
  backgroundMusic: { track: "intro.mp3", volume: 0.5 },
  battle: { track: "fight4.mp3", volume: 0.5 },
  battle2: { track: "fight5.mp3", volume: 0.5 },
  death: { track: "game_over.mp3", volume: 0.75 },
};

export const useMusic = (
  playState: { isInBattle: boolean; isDead: boolean; isMuted: boolean },
  options?: { volume?: number; loop?: boolean }
) => {
  const [music, setMusic] = useState<{ track: string; volume: number }>(
    musicSelector.backgroundMusic
  );
  const stopRef = useRef<() => void>();

  const [play, { stop }] = useSound(dir + music.track, {
    volume: music.volume,
    loop: options?.loop || false,
  });

  const start = useCallback(() => {
    play();
  }, [play]);

  const trackArray = [musicSelector.battle, musicSelector.battle2];

  useEffect(() => {
    if (stopRef.current) {
      stopRef.current();
    }
    stopRef.current = stop;

    if (!playState.isMuted) {
      if (playState.isDead) {
        setMusic(musicSelector.death);
      } else if (playState.isInBattle) {
        setMusic(trackArray[Math.floor(Math.random() * trackArray.length)]);
      } else {
        setMusic(musicSelector.backgroundMusic);
      }
      start();
    }
  }, [playState.isInBattle, playState.isDead, start, stop]);

  useEffect(() => {
    if (playState.isMuted) {
      stop();
    } else {
      play();
    }
  }, [play, stop, playState.isMuted]);

  return {
    play,
    stop,
  };
};
