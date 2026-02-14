'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Heart {
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    vx: number;
    vy: number;
    color: string;
}

export const InteractiveHearts: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const heartsRef = useRef<Heart[]>([]);
    const idCounter = useRef(0);

    useEffect(() => {
        if (!containerRef.current) return;



        const svg = d3.select(containerRef.current)
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .style('position', 'absolute')
            .style('top', 0)
            .style('left', 0)
            .style('pointer-events', 'none');

        const colors = ['#ff4d4d', '#ff3366', '#ff6699', '#ff99cc', '#ffb3d1'];

        const createHeart = (x: number, y: number) => {
            const heart: Heart = {
                id: idCounter.current++,
                x,
                y,
                size: Math.random() * 20 + 10,
                opacity: 1,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2 - 1,
                color: colors[Math.floor(Math.random() * colors.length)],
            };
            heartsRef.current.push(heart);
            if (heartsRef.current.length > 50) heartsRef.current.shift();
        };

        const update = () => {
            heartsRef.current.forEach(h => {
                h.x += h.vx;
                h.y += h.vy;
                h.opacity -= 0.01;
            });
            heartsRef.current = heartsRef.current.filter(h => h.opacity > 0);

            const selection = svg.selectAll<SVGPathElement, Heart>('path')
                .data(heartsRef.current, d => d.id);

            selection.enter()
                .append('path')
                .attr('d', d => `M ${d.x} ${d.y} 
                        c -5 -5 -15 -5 -15 5 
                        0 10 15 20 15 20 
                        0 0 15 -10 15 -20 
                        0 -10 -10 -10 -15 -5`)
                .attr('fill', d => d.color)
                .style('opacity', d => d.opacity)
                .style('transform-origin', d => `${d.x}px ${d.y}px`)
                .attr('transform', d => `scale(${d.size / 20})`);

            selection
                .attr('transform', d => `translate(${d.x - d.x}, ${d.y - d.y}) scale(${d.size / 20})`)
                .style('opacity', d => d.opacity);

            selection.exit().remove();
        };

        const timer = d3.interval(update, 16);

        const handleMouseMove = (event: MouseEvent) => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (rect) {
                createHeart(event.clientX - rect.left, event.clientY - rect.top);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            timer.stop();
            svg.remove();
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        />
    );
};
