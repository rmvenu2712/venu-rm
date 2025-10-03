import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';
import { 
  SiHtml5, 
  SiCss3, 
  SiJavascript, 
  SiBootstrap, 
  SiTailwindcss, 
  SiNetlify,
  SiFramer, 
  SiNextdotjs, 
  SiReact, 
  SiTypescript, 
  SiMysql, 
  SiGit, 
  SiGithub
} from 'react-icons/si';

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2
};

const toCssLength = value => (typeof value === 'number' ? `${value}px` : (value ?? undefined));

const useResizeObserver = (callback: () => void, elements: React.RefObject<HTMLElement>[], dependencies: any[]) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => callback();
      window.addEventListener('resize', handleResize);
      callback();
      return () => window.removeEventListener('resize', handleResize);
    }

    const observers = elements.map(ref => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });

    callback();

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

const useImageLoader = (seqRef: React.RefObject<HTMLElement>, onLoad: () => void, dependencies: any[]) => {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll('img') ?? [];

    if (images.length === 0) {
      onLoad();
      return;
    }

    let remainingImages = images.length;
    const handleImageLoad = () => {
      remainingImages -= 1;
      if (remainingImages === 0) {
        onLoad();
      }
    };

    images.forEach(img => {
      const htmlImg = img;
      if (htmlImg.complete) {
        handleImageLoad();
      } else {
        htmlImg.addEventListener('load', handleImageLoad, { once: true });
        htmlImg.addEventListener('error', handleImageLoad, { once: true });
      }
    });

    return () => {
      images.forEach(img => {
        img.removeEventListener('load', handleImageLoad);
        img.removeEventListener('error', handleImageLoad);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

const useAnimationLoop = (
  trackRef: React.RefObject<HTMLElement>, 
  targetVelocity: number, 
  seqWidth: number, 
  isHovered: boolean, 
  pauseOnHover: boolean
) => {
  const rafRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (seqWidth > 0) {
      offsetRef.current = ((offsetRef.current % seqWidth) + seqWidth) % seqWidth;
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
    }

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const target = pauseOnHover && isHovered ? 0 : targetVelocity;

      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;

      if (seqWidth > 0) {
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
        nextOffset = ((nextOffset % seqWidth) + seqWidth) % seqWidth;
        offsetRef.current = nextOffset;

        const translateX = -offsetRef.current;
        track.style.transform = `translate3d(${translateX}px, 0, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTimestampRef.current = null;
    };
  }, [targetVelocity, seqWidth, isHovered, pauseOnHover, trackRef]);
};

interface LogoItem {
  node?: React.ReactNode;
  src?: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
  alt?: string;
  title: string;
  href?: string;
  ariaLabel?: string;
}

interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right';
  width?: string | number;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  fadeOut?: boolean;
  scaleOnHover?: boolean;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

const LogoLoop = memo(({
  logos,
  speed = 120,
  direction = 'left',
  width = '100%',
  logoHeight = 40,
  gap = 32,
  pauseOnHover = true,
  fadeOut = false,
  scaleOnHover = false,
  ariaLabel = 'Partner logos',
  className,
  style
}: LogoLoopProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLUListElement>(null);

  const [seqWidth, setSeqWidth] = useState(0);
  const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const targetVelocity = useMemo(() => {
    const magnitude = Math.abs(speed);
    const directionMultiplier = direction === 'left' ? 1 : -1;
    const speedMultiplier = speed < 0 ? -1 : 1;
    return magnitude * directionMultiplier * speedMultiplier;
  }, [speed, direction]);

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const sequenceWidth = seqRef.current?.getBoundingClientRect()?.width ?? 0;

    if (sequenceWidth > 0) {
      setSeqWidth(Math.ceil(sequenceWidth));
      const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
      setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
    }
  }, []);

  useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight]);

  useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight]);

  useAnimationLoop(trackRef, targetVelocity, seqWidth, isHovered, pauseOnHover);

  const cssVariables = useMemo(
    () => ({
      '--logoloop-gap': `${gap}px`,
      '--logoloop-logoHeight': `${logoHeight}px`
    }),
    [gap, logoHeight]
  );

  const rootClassName = useMemo(
    () =>
      [
        'relative overflow-x-hidden',
        fadeOut && 'relative before:absolute before:top-0 before:bottom-0 before:w-[clamp(24px,8%,120px)] before:pointer-events-none before:z-10 after:absolute after:top-0 after:bottom-0 after:w-[clamp(24px,8%,120px)] after:pointer-events-none after:z-10',
        scaleOnHover && 'pt-[calc(var(--logoloop-logoHeight)*0.1)] pb-[calc(var(--logoloop-logoHeight)*0.1)]',
        className
      ]
        .filter(Boolean)
        .join(' '),
    [fadeOut, scaleOnHover, className]
  );

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsHovered(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsHovered(false);
  }, [pauseOnHover]);

  const renderLogoItem = useCallback((item: LogoItem, key: string) => {
    const isNodeItem = 'node' in item && item.node !== undefined;

    const content = isNodeItem ? (
      <span className="inline-flex items-center" aria-hidden={!!item.href && !item.ariaLabel}>
        {item.node}
      </span>
    ) : (
      <img
        src={item.src}
        srcSet={item.srcSet}
        sizes={item.sizes}
        width={item.width}
        height={item.height}
        alt={item.alt ?? ''}
        title={item.title}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="h-[var(--logoloop-logoHeight)] w-auto block object-contain [image-rendering:-webkit-optimize-contrast] [-webkit-user-drag:none] pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
      />
    );

    const itemAriaLabel = isNodeItem ? (item.ariaLabel ?? item.title) : (item.alt ?? item.title);

    const itemContent = item.href ? (
      <a
        className="inline-flex items-center no-underline rounded transition-opacity duration-200 ease-in-out hover:opacity-80"
        href={item.href}
        aria-label={itemAriaLabel || 'logo link'}
        target="_blank"
        rel="noreferrer noopener"
      >
        {content}
      </a>
    ) : (
      content
    );

    return (
      <li className="flex-none mr-[var(--logoloop-gap)] text-[var(--logoloop-logoHeight)] leading-none" key={key} role="listitem">
        {itemContent}
      </li>
    );
  }, []);

  const logoLists = useMemo(
    () =>
      Array.from({ length: copyCount }, (_, copyIndex) => (
        <ul
          className="flex items-center"
          key={`copy-${copyIndex}`}
          role="list"
          aria-hidden={copyIndex > 0}
          ref={copyIndex === 0 ? seqRef : undefined}
        >
          {logos.map((item, itemIndex) => renderLogoItem(item, `${copyIndex}-${itemIndex}`))}
        </ul>
      )),
    [copyCount, logos, renderLogoItem]
  );

  const containerStyle = useMemo(
    () => ({
      width: toCssLength(width) ?? '100%',
      ...cssVariables,
      ...style
    }),
    [width, cssVariables, style]
  );

  const trackStyle = useMemo(() => ({
    display: 'flex',
    width: 'max-content'
  }), []);

  return (
    <div
      ref={containerRef}
      className={rootClassName}
      style={containerStyle}
      role="region"
      aria-label={ariaLabel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {fadeOut && (
        <>
          {/* Left fade: matches container bg */}
          <div className="absolute top-0 bottom-0 left-0 w-[clamp(24px,8%,120px)] pointer-events-none z-10 bg-gradient-to-r from-gray-100 to-transparent dark:from-dark-900 dark:to-transparent" />
          {/* Right fade: matches container bg */}
          <div className="absolute top-0 bottom-0 right-0 w-[clamp(24px,8%,120px)] pointer-events-none z-10 bg-gradient-to-l from-gray-100 to-transparent dark:from-dark-900 dark:to-transparent" />
        </>
      )}
      <div className="flex w-max [will-change:transform] [user-select:none]" ref={trackRef} style={trackStyle}>
        {logoLists}
      </div>
    </div>
  );
});

LogoLoop.displayName = 'LogoLoop';

export default LogoLoop;

// Updated TechLogosSection - simplified, no color props needed
const TechLogosSection = () => {
  const techLogos = [
    // Frontend Basics
    { node: <SiHtml5 size={60} className="text-orange-500 dark:text-orange-400" />, title: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { node: <SiCss3 size={60} className="text-blue-500 dark:text-blue-400" />, title: "CSS", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    { node: <SiJavascript size={60} className="text-yellow-500 dark:text-yellow-400" />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    
    // Frameworks & Libraries
    { node: <SiBootstrap size={60} className="text-purple-600 dark:text-purple-500" />, title: "Bootstrap", href: "https://getbootstrap.com" },
    { node: <SiTailwindcss size={60} className="text-cyan-500 dark:text-cyan-400" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiReact size={60} className="text-blue-500 dark:text-blue-400" />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs size={60} className="text-black dark:text-white" />, title: "Next.js", href: "https://nextjs.org" },
    
    // Languages & Tools
    { node: <SiTypescript size={60} className="text-blue-600 dark:text-blue-500" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiMysql size={60} className="text-orange-600 dark:text-orange-500" />, title: "MySQL", href: "https://www.mysql.com" },
    
    // Animation & 3D
    { node: <SiFramer size={60} className="text-pink-500 dark:text-pink-400" />, title: "Framer Motion", href: "https://www.framer.com/motion" },
    
    // Deployment & Version Control
    { node: <SiNetlify size={60} className="text-purple-500 dark:text-purple-400" />, title: "Netlify", href: "https://www.netlify.com" },
    { node: <SiGit size={60} className="text-orange-600 dark:text-orange-500" />, title: "Git", href: "https://git-scm.com" },
    { node: <SiGithub size={60} className="text-black dark:text-white" />, title: "GitHub", href: "https://github.com" },
  ];

  return (
    <div className="h-fit relative overflow-hidden bg-background ">
      <LogoLoop
        logos={techLogos}
        speed={100}
        direction="left"
        logoHeight={60} // Matches size=60 on icons
        gap={60} // Increased gap for better spacing with more/wider logos
        pauseOnHover={true}
        scaleOnHover={true}
        fadeOut={true}
        ariaLabel="Technology stack"
      />
    </div>
  );
};

export { TechLogosSection };