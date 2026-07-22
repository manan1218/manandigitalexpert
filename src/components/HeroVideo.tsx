import { useEffect, useRef, useState } from "react";
import {
  Pause,
  Play,
  Rewind,
  FastForward,
  Volume2,
  VolumeX,
} from "lucide-react";

export function HeroVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const onTime = () =>
      setProgress(v.duration ? (v.currentTime / v.duration) * 100 : 0);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  const togglePlay = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };
  const stop = () => {
    const v = ref.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };
  const seek = (delta: number) => {
    const v = ref.current;
    if (!v) return;
    v.currentTime = Math.max(
      0,
      Math.min((v.duration || 0) - 0.1, v.currentTime + delta),
    );
  };
  const toggleMute = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };
  const onScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = ref.current;
    if (!v || !v.duration) return;
    v.currentTime = (Number(e.target.value) / 100) * v.duration;
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg border border-hairline bg-surface group"
      style={{ aspectRatio: "1080 / 1600" }}
    >
      <video
        ref={ref}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onClick={togglePlay}
        className="absolute inset-0 h-full w-full object-cover cursor-pointer"
        style={{ objectPosition: "center 35%" }}
      />

      {/* Controls overlay */}
      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <input
          type="range"
          min={0}
          max={100}
          step={0.1}
          value={progress}
          onChange={onScrub}
          className="w-full h-1 accent-white cursor-pointer"
          aria-label="Seek"
        />
        <div className="mt-2 flex items-center justify-between gap-2 text-white">
          <div className="flex items-center gap-1.5">
            <IconBtn onClick={() => seek(-5)} label="Rewind 5s">
              <Rewind className="h-4 w-4" />
            </IconBtn>
            <IconBtn onClick={togglePlay} label={playing ? "Pause" : "Play"}>
              {playing ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </IconBtn>
            <IconBtn onClick={stop} label="Stop">
              <span className="block h-3 w-3 bg-white" />
            </IconBtn>
            <IconBtn onClick={() => seek(5)} label="Forward 5s">
              <FastForward className="h-4 w-4" />
            </IconBtn>
          </div>
          <IconBtn onClick={toggleMute} label={muted ? "Unmute" : "Mute"}>
            {muted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </IconBtn>
        </div>
      </div>
    </div>
  );
}

function IconBtn({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/25 transition-colors"
    >
      {children}
    </button>
  );
}
