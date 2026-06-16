'use client';

import { useEffect, useRef } from 'react';

export function Confetti() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const colors = ['#a855f7', '#6366f1', '#06b6d4', '#22c55e', '#f59e0b', '#ef4444', '#ec4899', '#fbbf24'];
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 100; i++) {
      const piece = document.createElement('div');
      piece.style.cssText = `
        position: absolute;
        left: ${Math.random() * 100}%;
        top: -20px;
        width: ${6 + Math.random() * 10}px;
        height: ${6 + Math.random() * 14}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        animation: confetti-fall ${2 + Math.random() * 3}s linear ${Math.random() * 0.8}s forwards;
        pointer-events: none;
      `;
      fragment.appendChild(piece);
    }

    container.appendChild(fragment);

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 z-40 pointer-events-none overflow-hidden" />;
}
