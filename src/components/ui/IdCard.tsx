// import React, { useRef, useEffect, useState, useCallback } from 'react';

// /**
//  * Hanging ID card attached to the hero creative-preview widget,
//  * dangling down beside the About section.
//  *
//  * Physics: 2D spring-damper (Hooke's law + damping), NOT a fixed-radius
//  * pendulum — so drag movement is free in any direction, and on release
//  * it springs back toward the resting point with natural overshoot/settle,
//  * similar to mass-spring-damper (F = -kx - cv, integrated each frame).
//  */
// export const IdCard: React.FC = () => {
//   const wrapRef = useRef<HTMLDivElement>(null);
//   const cardRef = useRef<HTMLDivElement>(null);
//   const svgRef = useRef<SVGPathElement>(null);

//   // rest position (relative to anchor, in px)
//   const REST_X = 0;
//   const REST_Y = 210;
//   const MAX_DRAG_RADIUS = 150; // clamp so it can't fly off-screen

//   const pos = useRef({ x: REST_X, y: REST_Y });
//   const vel = useRef({ x: 0, y: 0 });
//   const dragging = useRef(false);
//   const dragOffset = useRef({ x: 0, y: 0 });
//   const rafId = useRef<number | null>(null);
//   const [, forceRender] = useState(0);
//   const [allowDrag, setAllowDrag] = useState(true);

//   useEffect(() => {
//     const check = () => setAllowDrag(window.innerWidth > 900);
//     check();
//     window.addEventListener('resize', check);
//     return () => window.removeEventListener('resize', check);
//   }, []);

//   const applyVisual = useCallback((x: number, y: number) => {
//     if (cardRef.current) {
//       const tilt = Math.max(-16, Math.min(16, x * 0.12));
//       cardRef.current.style.transform = `translate(${x}px, ${y}px) rotate(${tilt}deg)`;
//     }
//     if (svgRef.current) {
//       const midX = x * 0.5 + (x - REST_X) * 0.15;
//       const midY = y * 0.5;
//       svgRef.current.setAttribute('d', `M 0 0 Q ${midX} ${midY} ${x} ${y}`);
//     }
//   }, []);

//   // spring-damper simulation loop
//   useEffect(() => {
//     const STIFFNESS = 0.055; // "k" — how strongly it's pulled back
//     const DAMPING = 0.82; // velocity retained each frame (energy loss)
//     let idleT = 0;

//     const tick = () => {
//       idleT += 1;

//       if (!dragging.current) {
//         // idle sway target: rest point wobbles a touch so it's never static
//         const swayX = Math.sin(idleT * 0.018) * 6;
//         const targetX = REST_X + swayX;
//         const targetY = REST_Y;

//         const fx = (targetX - pos.current.x) * STIFFNESS;
//         const fy = (targetY - pos.current.y) * STIFFNESS;

//         vel.current.x = (vel.current.x + fx) * DAMPING;
//         vel.current.y = (vel.current.y + fy) * DAMPING;

//         pos.current.x += vel.current.x;
//         pos.current.y += vel.current.y;
//       }

//       applyVisual(pos.current.x, pos.current.y);
//       rafId.current = requestAnimationFrame(tick);
//     };

//     rafId.current = requestAnimationFrame(tick);
//     return () => {
//       if (rafId.current) cancelAnimationFrame(rafId.current);
//     };
//   }, [applyVisual]);

//   const handlePointerDown = (e: React.PointerEvent) => {
//     if (!allowDrag) return;
//     dragging.current = true;
//     vel.current = { x: 0, y: 0 };
//     dragOffset.current = { x: e.clientX - pos.current.x, y: e.clientY - pos.current.y };
//     (e.target as HTMLElement).setPointerCapture(e.pointerId);
//     forceRender((v) => v + 1);
//   };

//   const handlePointerMove = (e: React.PointerEvent) => {
//     if (!dragging.current) return;

//     let nx = e.clientX - dragOffset.current.x;
//     let ny = e.clientY - dragOffset.current.y;

//     // clamp free movement so the card can't be dragged off-canvas
//     const dx = nx - REST_X;
//     const dy = ny - REST_Y;
//     const dist = Math.sqrt(dx * dx + dy * dy);
//     if (dist > MAX_DRAG_RADIUS) {
//       const scale = MAX_DRAG_RADIUS / dist;
//       nx = REST_X + dx * scale;
//       ny = REST_Y + dy * scale;
//     }

//     pos.current = { x: nx, y: ny };
//     applyVisual(nx, ny);
//   };

//   const handlePointerUp = () => {
//     dragging.current = false;
//   };

//   return (
//     <div ref={wrapRef} className="id-card-wrap" aria-hidden="true">
//       <svg className="id-card-lanyard-svg" viewBox="-160 -10 320 260" preserveAspectRatio="none">
//         <path
//           ref={svgRef}
//           d={`M 0 0 Q 0 ${REST_Y / 2} 0 ${REST_Y}`}
//           fill="none"
//           stroke="url(#lanyardGradient)"
//           strokeWidth="4"
//           strokeLinecap="round"
//         />
//         <defs>
//           <linearGradient id="lanyardGradient" x1="0" y1="0" x2="0" y2="1">
//             <stop offset="0%" stopColor="#00d4ff" />
//             <stop offset="100%" stopColor="#7b2cbf" />
//           </linearGradient>
//         </defs>
//       </svg>

//       <div
//         ref={cardRef}
//         className="id-card"
//         onPointerDown={handlePointerDown}
//         onPointerMove={handlePointerMove}
//         onPointerUp={handlePointerUp}
//         onPointerLeave={handlePointerUp}
//         style={{
//           transform: `translate(${REST_X}px, ${REST_Y}px)`,
//           touchAction: allowDrag ? 'none' : 'auto',
//           cursor: allowDrag ? 'grab' : 'default',
//         }}
//       >
//         <div className="id-card-clip" />
//         <img
//           src="assets/creative/graphic/parentstalk/IDCard.png"
//           alt="Identity card"
//           draggable={false}
//         />
//       </div>
//     </div>
//   );
// };

// export default IdCard;