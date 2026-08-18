import React, { useState, useEffect, useRef } from 'react';

const ROLES: string[] = [
  'Frontend Developer',
  'Mobile App Developer',
  'UI/UX Designer',
  'Videographer',
  'Video Editor',
];

const TYPING_SPEED = 70;   // ms per char
const ERASE_SPEED  = 40;   // ms per char
const PAUSE_TYPED  = 1800; // ms after full word
const PAUSE_ERASED = 400;  // ms after full erase

type Phase = 'typing' | 'pausing' | 'erasing' | 'waiting';

export const TypingRole: React.FC = () => {
  const [display, setDisplay]   = useState('');
  const [roleIdx, setRoleIdx]   = useState(0);
  const [phase, setPhase]       = useState<Phase>('typing');
  const timeoutRef               = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = ROLES[roleIdx];

    const tick = () => {
      if (phase === 'typing') {
        setDisplay(prev => {
          const next = current.slice(0, prev.length + 1);
          if (next === current) {
            setPhase('pausing');
          }
          return next;
        });
        timeoutRef.current = setTimeout(tick, TYPING_SPEED);
      } else if (phase === 'pausing') {
        timeoutRef.current = setTimeout(() => setPhase('erasing'), PAUSE_TYPED);
      } else if (phase === 'erasing') {
        setDisplay(prev => {
          const next = prev.slice(0, -1);
          if (next === '') {
            setPhase('waiting');
          }
          return next;
        });
        timeoutRef.current = setTimeout(tick, ERASE_SPEED);
      } else if (phase === 'waiting') {
        timeoutRef.current = setTimeout(() => {
          setRoleIdx(i => (i + 1) % ROLES.length);
          setPhase('typing');
        }, PAUSE_ERASED);
      }
    };

    timeoutRef.current = setTimeout(tick, phase === 'pausing' ? PAUSE_TYPED : 30);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, roleIdx]);

  return (
    <span className="typing-role" aria-label={ROLES[roleIdx]}>
      {display}
      <span className="typing-cursor" aria-hidden="true">|</span>
    </span>
  );
};
