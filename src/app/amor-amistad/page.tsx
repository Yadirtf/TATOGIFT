'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { RemotionPlayer } from '@/components/remotion/RemotionPlayer';
import { InteractiveHearts } from '@/components/d3/InteractiveHearts';
import { Volume2, VolumeX } from 'lucide-react';

export default function AmorAmistadPage() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Intentar reproducir automáticamente al cargar
        const playAudio = async () => {
            if (audioRef.current) {
                try {
                    await audioRef.current.play();
                    setIsPlaying(true);
                } catch (err) {
                    console.log("Autoplay bloqueado por el navegador, se requiere interacción del usuario", err);
                    setIsPlaying(false);
                }
            }
        };

        playAudio();
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-purple-50 p-4 md:p-8 flex flex-col items-center relative overflow-hidden">
            <InteractiveHearts />
            
            {/* Audio Element */}
            <audio 
                ref={audioRef} 
                src="/assets/valentine/14febrerocancion.mp3" 
                loop 
            />

            {/* Floating Music Control */}
            <button
                onClick={togglePlay}
                className="fixed bottom-6 right-6 z-50 p-4 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 text-pink-600 border border-pink-200"
                aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
            >
                {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </button>

            <div className="max-w-6xl w-full relative z-10">
                <Link
                    href="/"
                    className="inline-flex items-center text-pink-600 hover:text-pink-700 font-semibold mb-8 transition-colors"
                >
                    <span className="mr-2">←</span> Volver al inicio
                </Link>

                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Feliz día del amor y la amistad Tata
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Un pequeño regalito para ti, con muchisimo amor❤️
                    </p>
                </div>

                <RemotionPlayer />

                <div className="mt-16 bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-pink-100 shadow-xl max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-serif text-red-500 mb-6 italic">Para mi persona favorita</h2>
                    <p className="text-xl text-gray-700 leading-relaxed font-light">
                        Hoy, 14 de febrero, quiero recordarte lo especial que eres para mí.
                        Gracias por ser esa personita que siempre me saca una sonrisa, por tu paciencia,
                        por tu cariño y, sobre todo, por el apoyo que me das cuando tengo el ánimo bajo.
                        Gracias por ayudarme a cultivar este amor tan bonito que tenemos.
                        Este es un &quot;te amo&quot; muy, pero muy sincero
                    </p>
                    <div className="mt-8 text-4xl">🌹❤️🌻</div>
                </div>
            </div>
        </div>
    );
}
