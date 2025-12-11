import React, { useRef, useState, useEffect } from 'react';

const FollowingEyes = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Refs for each eye and pupil
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const updatePupilPosition = (eyeRef, pupilRef) => {
      if (!eyeRef.current || !pupilRef.current) return;

      const eyeRect = eyeRef.current.getBoundingClientRect();
      const eyeCenterX = eyeRect.left + eyeRect.width / 2;
      const eyeCenterY = eyeRect.top + eyeRect.height / 2;

      const deltaX = mousePos.x - eyeCenterX;
      const deltaY = mousePos.y - eyeCenterY;

      const angle = Math.atan2(deltaY, deltaX);
      const maxDistance = 14; // How far the pupil can move inside the eye (adjustable)

      const offsetX = Math.cos(angle) * maxDistance;
      const offsetY = Math.sin(angle) * maxDistance;

      pupilRef.current.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
    };

    updatePupilPosition(leftEyeRef, leftPupilRef);
    updatePupilPosition(rightEyeRef, rightPupilRef);
  }, [mousePos]);

  return (
    <div
    className="absolute top-[95px] sm:top-[118px] left-[42%] -translate-x-1/2 flex gap-[14px] z-[9999] pointer-events-none"
    >
      {/* Left Eye */}
      <div
        ref={leftEyeRef}
        style={{
          width: '40px',
          height: '35px',
          borderRadius: '50%',
          backgroundColor: 'white',
          position: 'relative',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)',
          overflow: 'hidden',
        }}
      >
        <div
          ref={leftPupilRef}
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #fff 10%, #1a1a1a 11%)',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            transition: 'transform 0.1s ease-out',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}
        />
      </div>

      {/* Right Eye */}
      <div
        ref={rightEyeRef}
        style={{
          width: '40px',
          height: '35px',
          borderRadius: '50%',
          backgroundColor: 'white',
          position: 'relative',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)',
          overflow: 'hidden',
        }}
      >
        <div
          ref={rightPupilRef}
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #fff 10%, #1a1a1a 11%)',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            transition: 'transform 0.1s ease-out',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}
        />
      </div>
    </div>
  );
};

export default FollowingEyes;