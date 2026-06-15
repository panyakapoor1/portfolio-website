import { useState, useEffect } from 'react';

const RippleTransition = ({ color, x, y, onComplete }) => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    // The ripple expands over 800ms. After that, we trigger onComplete to swap the real CSS vars,
    // and then fade out the ripple.
    const expandTimer = setTimeout(() => {
      onComplete();
    }, 600);

    const removeTimer = setTimeout(() => {
      setIsActive(false);
    }, 1200);

    return () => {
      clearTimeout(expandTimer);
      clearTimeout(removeTimer);
    };
  }, [onComplete]);

  if (!isActive) return null;

  return (
    <div
      className="fixed z-[99999] rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        width: 10,
        height: 10,
        backgroundColor: color,
        transform: 'translate(-50%, -50%) scale(0)',
        animation: 'ripple-expand 1.2s cubic-bezier(0.65, 0, 0.35, 1) forwards',
      }}
    />
  );
};

export default RippleTransition;
