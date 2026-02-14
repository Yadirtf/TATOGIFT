import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Img, spring } from 'remotion';
import React from 'react';

export const GardenScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  const photoOpacity = spring({
    frame: frame - 20,
    fps,
    config: { damping: 12 },
  });

  const photo1Scale = spring({
    frame: frame - 30,
    fps,
    config: { mass: 0.5 },
  });

  const photo2Scale = spring({
    frame: frame - 50,
    fps,
    config: { mass: 0.5 },
  });

  const photo3Scale = spring({
    frame: frame - 70,
    fps,
    config: { mass: 0.5 },
  });

  const textOpacity = interpolate(frame, [100, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill className="bg-green-50 items-center justify-center overflow-hidden">
      {/* Garden Background */}
      <AbsoluteFill>
        <Img
          src="/assets/valentine/fondo_girasol.jfif"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.8,
          }}
        />
      </AbsoluteFill>

      {/* Floating Particles/Flowers Effect Placeholder */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => {
          const delay = i * 2;
          const left = (i * 7) % 100;
          const top = interpolate(
            (frame + delay * 10) % durationInFrames,
            [0, durationInFrames],
            [-10, 110]
          );
          return (
            <div
              key={i}
              className="absolute text-pink-400"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                fontSize: '20px',
                opacity: 0.6,
              }}
            >
              🌸
            </div>
          );
        })}
      </div>

      {/* Photos Garden Layout */}
      <div className="flex gap-8 items-center justify-center z-10">
        <div style={{ transform: `scale(${photo1Scale})`, opacity: photoOpacity }}>
          <img
            src="/assets/valentine/photo1.png"
            className="w-48 h-64 object-cover rounded-xl border-8 border-white shadow-2xl rotate-[-5deg]"
            alt="Amor 1"
          />
        </div>
        <div style={{ transform: `scale(${photo2Scale})`, opacity: photoOpacity }}>
          <img
            src="/assets/valentine/photo2.png"
            className="w-56 h-72 object-cover rounded-xl border-8 border-white shadow-2xl z-20"
            alt="Amor 2"
          />
        </div>
        <div style={{ transform: `scale(${photo3Scale})`, opacity: photoOpacity }}>
          <img
            src="/assets/valentine/photo3.png"
            className="w-48 h-64 object-cover rounded-xl border-8 border-white shadow-2xl rotate-[5deg]"
            alt="Amor 3"
          />
        </div>
      </div>

      {/* Message */}
      <div
        className="absolute bottom-20 text-center z-20"
        style={{ opacity: textOpacity }}
      >
        <h1 className="text-6xl font-serif text-red-600 drop-shadow-lg font-bold">
          Feliz Día del Amor y la Amistad
        </h1>
        <p className="text-2xl text-pink-700 italic mt-4 font-semibold">
          Eres lo más bonito de mi jardín 🌹
        </p>
      </div>
    </AbsoluteFill>
  );
};
