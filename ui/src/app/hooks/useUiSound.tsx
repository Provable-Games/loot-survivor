import useSound from "use-sound";

const dir = "/music/ui/";

export const soundSelector = {
  click: "beep.wav",
  discoverItem: "boost.mp3",
  flee: "flee.wav",
  jump: "jump.wav",
  slay: "slay.mp3",
  hit: "hurt.mp3",
  coin: "coin.mp3",
  spawn: "arcade-machine.mp3",
};

const volumeMap = {
  click: 0.4, // Increased volume for click
  discoverItem: 0.2,
  flee: 0.2,
  jump: 0.2,
  slay: 0.2,
  hit: 0.2,
  coin: 0.2,
  spawn: 0.1,
};

const defaultVolume = 0.2;

export const useUiSounds = (selector: string) => {
  const [play] = useSound(dir + selector, {
    volume: volumeMap[selector as keyof typeof volumeMap] || defaultVolume,
  });

  return {
    play,
  };
};
