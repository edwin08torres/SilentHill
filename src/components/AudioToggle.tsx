import { memo } from "react";

interface AudioToggleProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const AudioToggle = memo(function AudioToggle({
  isPlaying,
  onToggle,
}: AudioToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-6 right-6 z-200 flex items-center gap-2 group"
      aria-label={isPlaying ? "Silenciar audio" : "Activar audio"}
    >
      <span className="text-[0.45rem] uppercase tracking-[0.5em] text-white/20 group-hover:text-white/50 transition-colors duration-500">
        {isPlaying ? "SFX ON" : "SFX OFF"}
      </span>
      <div className="relative w-5 h-5 flex items-center justify-center">
        <div
          className={`absolute inset-0 rounded-full border border-white/10 group-hover:border-white/30 transition-all duration-500 ${isPlaying ? "scale-100" : "scale-75 opacity-50"}`}
        />
        {isPlaying && (
          <div className="absolute inset-0 rounded-full border border-white/5 animate-ping" />
        )}
        <div className="flex items-end gap-[2px] h-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-[2px] bg-white/30 group-hover:bg-white/60 rounded-full transition-colors duration-500"
              style={{
                height: isPlaying ? `${i * 30}%` : "20%",
                transition: "height 0.3s ease, background-color 0.5s ease",
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>
    </button>
  );
});
