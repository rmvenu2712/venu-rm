// LightToggle.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTheme } from './ThemeProvider';

// Import GSAP bonus plugins - these require Club GreenSock membership
let MorphSVGPlugin: any;
let Draggable: any;

if (typeof window !== 'undefined') {
  // Dynamic import for client-side only
  import('gsap/MorphSVGPlugin').then((module) => {
    MorphSVGPlugin = module.MorphSVGPlugin;
    gsap.registerPlugin(MorphSVGPlugin);
  });
  
  import('gsap/Draggable').then((module) => {
    Draggable = module.Draggable;
    gsap.registerPlugin(Draggable);
  });
}

interface LightToggleProps {
  size?: number;
  className?: string;
}

const LightToggle: React.FC<LightToggleProps> = ({ size = 120, className = '' }) => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const rootRef = useRef<SVGSVGElement>(null);
  const proxyRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const stateRef = useRef({ on: !isDark });
  const draggableInstanceRef = useRef<any>(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    // Wait for plugins to load
    const initializeAnimation = async () => {
      if (!rootRef.current || !proxyRef.current || isInitializedRef.current) return;

      // Wait for plugins to be available
      await new Promise((resolve) => {
        const checkPlugins = setInterval(() => {
          if (MorphSVGPlugin && Draggable) {
            clearInterval(checkPlugins);
            resolve(true);
          }
        }, 50);
      });

      const cords = rootRef.current.querySelectorAll<SVGPathElement>('.toggle-scene__cord');
      const hit = rootRef.current.querySelector<SVGCircleElement>('.toggle-scene__hit-spot');
      const dummyLine = rootRef.current.querySelector<SVGLineElement>('.toggle-scene__dummy-cord line');

      if (!hit || !dummyLine || cords.length === 0) return;

      // Initialize audio
      audioRef.current = new Audio('https://assets.codepen.io/605876/click.mp3');

      const endX = dummyLine.getAttribute('x2')!;
      const endY = dummyLine.getAttribute('y2')!;

      const resetProxy = () => {
        gsap.set(proxyRef.current, { x: parseFloat(endX), y: parseFloat(endY) });
      };

      // Sync initial state with current theme
      stateRef.current.on = !isDark;
      
      // Set CSS custom property on document root
      if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty('--on', stateRef.current.on ? '1' : '0');
      }

      // Initialize cord display
      gsap.set(cords[0], { display: 'none' });
      resetProxy();

      const tl = gsap.timeline({
        paused: true,
        onStart: () => {
          stateRef.current.on = !stateRef.current.on;
          
          if (typeof document !== 'undefined') {
            document.documentElement.style.setProperty('--on', stateRef.current.on ? '1' : '0');
          }

          // Trigger theme change
          setTheme(stateRef.current.on ? 'light' : 'dark');

          gsap.set([hit, dummyLine.parentElement], { display: 'none' });
          gsap.set(cords[0], { display: 'block' });
          
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => {});
          }
        },
        onComplete: () => {
          gsap.set([hit, dummyLine.parentElement], { display: 'block' });
          gsap.set(cords[0], { display: 'none' });
          resetProxy();
        },
      });

      const cordDuration = 0.1;
      for (let i = 1; i < cords.length; i++) {
        tl.add(
          gsap.to(cords[0], {
            morphSVG: cords[i],
            duration: cordDuration,
            repeat: 1,
            yoyo: true,
          })
        );
      }

      timelineRef.current = tl;

      let startX = 0;
      let startY = 0;

      const draggableInstance = Draggable.create(proxyRef.current, {
        trigger: hit,
        type: 'x,y',
        onPress: function (e: any) {
          startX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
          startY = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;
        },
        onDrag: function (this: any) {
          gsap.set(dummyLine, { attr: { x2: this.x, y2: this.y } });
        },
        onRelease: function (this: any, e: any) {
          const clientX = e.clientX || (e.changedTouches && e.changedTouches[0]?.clientX) || startX;
          const clientY = e.clientY || (e.changedTouches && e.changedTouches[0]?.clientY) || startY;

          const distX = Math.abs(clientX - startX);
          const distY = Math.abs(clientY - startY);
          const travelled = Math.sqrt(distX * distX + distY * distY);

          gsap.to(dummyLine, {
            attr: { x2: endX, y2: endY },
            duration: cordDuration,
            onComplete: () => {
              if (travelled > 50) {
                tl.restart();
              } else {
                resetProxy();
              }
            },
          });
        },
      });

      draggableInstanceRef.current = draggableInstance[0];
      isInitializedRef.current = true;
    };

    initializeAnimation();

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      if (draggableInstanceRef.current) {
        draggableInstanceRef.current.kill();
      }
      isInitializedRef.current = false;
    };
  }, []); // Only run once on mount

  // Sync theme changes from external sources
  useEffect(() => {
    if (isInitializedRef.current && typeof document !== 'undefined') {
      stateRef.current.on = !isDark;
      document.documentElement.style.setProperty('--on', stateRef.current.on ? '1' : '0');
    }
  }, [isDark]);

  return (
    <div className={className}>
      <style jsx global>{`
        :root {
          --on: ${isDark ? '0' : '1'};
          --cord: hsl(0, 0%, ${isDark ? '70%' : '30%'});
          --stroke: hsl(0, 0%, ${isDark ? '70%' : '30%'});
          --shine: hsla(0, 0%, 100%, ${isDark ? '0.6' : '0.3'});
          --cap: hsl(0, 0%, ${isDark ? '60%' : '40%'});
        }

        .bulb__bulb {
          fill: hsla(calc(180 - (95 * var(--on))), 80%, 80%, calc(0.1 + (0.4 * var(--on))));
          stroke: var(--stroke);
          transition: fill 0.3s ease;
        }

        .toggle-scene__cord,
        .toggle-scene__dummy-cord,
        .toggle-scene__cord-end {
          stroke: var(--cord);
          fill: var(--cord);
        }

        .bulb__filament {
          stroke: hsl(45, calc(20% + (60% * var(--on))), calc(40% + (40% * var(--on))));
          transition: stroke 0.3s ease;
        }

        .bulb__shine {
          stroke: var(--shine);
        }

        .bulb__cap {
          fill: var(--cap);
        }

        .bulb__cap-shine {
          fill: var(--shine);
        }

        .bulb__cap-outline {
          stroke: var(--stroke);
        }
      `}</style>

      <svg
        ref={rootRef}
        className="toggle-scene drop-shadow-lg"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMinYMin meet"
        viewBox="0 0 197.451 481.081"
        style={{ height: `${size}px`, width: 'auto', overflow: 'visible' }}
      >
        <defs>
          <marker id="cord-marker-a" orient="auto" overflow="visible" refX="0" refY="0">
            <path
              className="toggle-scene__cord-end"
              fillRule="evenodd"
              strokeWidth=".2666"
              d="M.98 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </marker>

          <clipPath id="bulb-clip-g" clipPathUnits="userSpaceOnUse">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4.677"
              d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v53.6s-8.825 16-29.203 16c-21.674 0-29.203-16-29.203-16z"
            />
          </clipPath>
        </defs>

        <g className="toggle-scene__cords">
          <path 
            className="toggle-scene__cord" 
            markerEnd="url(#cord-marker-a)" 
            fill="none" 
            strokeLinecap="square" 
            strokeWidth="6" 
            d="M123.228-28.56v150.493" 
            transform="translate(-24.503 256.106)" 
          />

          <path 
            className="toggle-scene__cord" 
            markerEnd="url(#cord-marker-a)" 
            fill="none" 
            strokeLinecap="square" 
            strokeWidth="6" 
            d="M123.228-28.59s28 8.131 28 19.506-18.667 13.005-28 19.507c-9.333 6.502-28 8.131-28 19.506s28 19.507 28 19.507" 
            transform="translate(-24.503 256.106)" 
            style={{ display: 'none' }}
          />

          <g className="line toggle-scene__dummy-cord">
            <line 
              markerEnd="url(#cord-marker-a)" 
              x1="98.7255" 
              x2="98.7255" 
              y1="240.5405" 
              y2="380.5405" 
              fill="none"
              strokeLinecap="square"
              strokeWidth="6"
            />
          </g>

          <circle 
            className="toggle-scene__hit-spot cursor-pointer" 
            cx="98.7255" 
            cy="380.5405" 
            r="60" 
            fill="transparent" 
          />
        </g>

        <g className="toggle-scene__bulb bulb" transform="translate(844.069 -645.213)">
          <path 
            className="bulb__cap" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="4.677" 
            d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v53.6s-8.825 16-29.203 16c-21.674 0-29.203-16-29.203-16z" 
          />
          <path 
            className="bulb__cap-shine" 
            d="M-778.379 802.873h25.512v118.409h-25.512z" 
            clipPath="url(#bulb-clip-g)" 
            transform="matrix(.52452 0 0 .90177 -368.282 82.976)" 
          />
          <path 
            className="bulb__cap" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="4" 
            d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v0s-8.439 10.115-28.817 10.115c-21.673 0-29.59-10.115-29.59-10.115z" 
          />
          <path 
            className="bulb__cap-outline" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="4.677" 
            d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v53.6s-8.825 16-29.203 16c-21.674 0-29.203-16-29.203-16z" 
          />
          <g className="bulb__filament" fill="none" strokeLinecap="round" strokeWidth="5">
            <path d="M-752.914 823.875l-8.858-33.06" />
            <path d="M-737.772 823.875l8.858-33.06" />
          </g>
          <path 
            className="bulb__bulb" 
            strokeLinecap="round" 
            strokeWidth="5" 
            d="M-783.192 803.855c5.251 8.815 5.295 21.32 13.272 27.774 12.299 8.045 36.46 8.115 49.127 0 7.976-6.454 8.022-18.96 13.273-27.774 3.992-6.7 14.408-19.811 14.408-19.811 8.276-11.539 12.769-24.594 12.769-38.699 0-35.898-29.102-65-65-65-35.899 0-65 29.102-65 65 0 13.667 4.217 26.348 12.405 38.2 0 0 10.754 13.61 14.746 20.31z" 
          />
          <path 
            className="bulb__shine" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="12" 
            d="M-789.19 757.501a45.897 45.897 0 013.915-36.189 45.897 45.897 0 0129.031-21.957" 
          />
        </g>
      </svg>
      
      <div ref={proxyRef} style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }} />
    </div>
  );
};

export default LightToggle;
