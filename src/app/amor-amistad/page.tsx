'use client';

import React from 'react';
import Link from 'next/link';
import { RemotionPlayer } from '@/components/remotion/RemotionPlayer';
import { InteractiveHearts } from '@/components/d3/InteractiveHearts';

export default function AmorAmistadPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-purple-50 p-4 md:p-8 flex flex-col items-center relative overflow-hidden">
            <InteractiveHearts />
            <div className="max-w-6xl w-full relative z-10">
                <Link
                    href="/"
                    className="inline-flex items-center text-pink-600 hover:text-pink-700 font-semibold mb-8 transition-colors"
                >
                    <span className="mr-2">←</span> Volver al inicio
                </Link>

                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Nuestra Historia en el Jardín
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        He preparado esta escena especial para ti. Un pequeño jardín donde florece nuestro amor cada día.
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
                        Este es un "te amo" muy, pero muy sincero
                    </p>
                    <div className="mt-8 text-4xl">🌹❤️🌻</div>
                </div>
            </div>
        </div>
    );
}
