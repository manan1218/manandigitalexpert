import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
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
  const [playing, setPlaying] = useState(false);
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
    if (v.paused) void v.play().catch(() => setPlaying(false));
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
      style={{ aspectRatio: "4 / 5" }}
    >
      <video
        ref={ref}
        src={src}
        poster="/assets/video/intro-poster.jpg"
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-contain"
        style={{ objectPosition: "center center" }}
      />

      {/* Controls overlay */}
      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-background/90 via-background/60 to-transparent">
        <input
          type="range"
          min={0}
          max={100}
          step={0.1}
          value={progress}
          onChange={onScrub}
          className="w-full h-1 accent-ink cursor-pointer"
          aria-label="Seek"
        />
        <div className="mt-2 flex items-center justify-between gap-2 text-ink">
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
              <span className="block h-3 w-3 bg-ink" />
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
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="h-8 w-8 rounded-full bg-ink/10 text-ink backdrop-blur-sm hover:bg-ink/25 hover:text-ink"
    >
      {children}
    </Button>
  );
}
