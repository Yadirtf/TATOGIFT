'use client';

import React from 'react';
import { Player } from '@remotion/player';
import { GardenScene } from './GardenScene';

export const RemotionPlayer: React.FC = () => {
    return (
        <div className="w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <Player
                component={GardenScene}
                durationInFrames={150}
                compositionWidth={1920}
                compositionHeight={1080}
                fps={30}
                controls={false}
                autoPlay
                loop
                style={{
                    width: '100%',
                    aspectRatio: '16/9',
                }}
            />
        </div>
    );
};
