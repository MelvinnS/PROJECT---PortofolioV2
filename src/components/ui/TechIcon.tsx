import React from 'react';

interface TechIconProps {
  name: string;
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className = 'w-4 h-4' }) => {
  switch (name) {
    case 'React':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <ellipse cx="12" cy="12" rx="9.5" ry="3.8" stroke="#61DAFB" strokeWidth="1.4" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="9.5" ry="3.8" stroke="#61DAFB" strokeWidth="1.4" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9.5" ry="3.8" stroke="#61DAFB" strokeWidth="1.4" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.6" fill="#61DAFB" />
        </svg>
      );

    case 'TypeScript':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <rect width="24" height="24" rx="4" fill="#3178C6" />
          <path d="M4 8.5h6m-3 0v8.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M13.5 15.2c.8.9 1.9 1.3 3.1 1.3 1.2 0 2-.5 2-1.3 0-1.7-4.6-1.1-4.6-3.8 0-1.6 1.3-2.7 3.4-2.7 1.1 0 2.1.4 2.7.9" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'JavaScript':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <rect width="24" height="24" rx="4" fill="#F7DF1E" />
          <path d="M6 13.5v2.2c0 1.2.7 1.8 1.8 1.8.8 0 1.4-.4 1.7-.9m4.5-1.2c.7.8 1.7 1.2 2.7 1.2 1.1 0 1.8-.4 1.8-1.2 0-1.6-4-1-4-3.5 0-1.5 1.2-2.5 3-2.5 1 0 1.9.4 2.4.9" stroke="#000" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'HTML':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path d="M3 2l1.6 18.2L12 23l7.4-2.8L21 2H3z" fill="#E34F26" />
          <path d="M12 3.8v17.4l5.9-2.2L19.2 3.8H12z" fill="#EF652A" />
          <path d="M12 7.5H7.2l.3 3.2h4.5v-3.2zm0 6.4h-2.6l-.2-2H7l.4 4.5 4.6 1.3v-3.8z" fill="#EBEBEB" />
          <path d="M12 7.5v3.2h4.3l-.4 4.5-3.9 1.1v3.8l7.2-2.3.8-10.3H12z" fill="#fff" />
        </svg>
      );

    case 'CSS':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path d="M3 2l1.6 18.2L12 23l7.4-2.8L21 2H3z" fill="#1572B6" />
          <path d="M12 3.8v17.4l5.9-2.2L19.2 3.8H12z" fill="#33A9DC" />
          <path d="M12 7.5H7.2l.3 3.2h4.5v-3.2zm0 6.4h-2.6l-.2-2H7l.4 4.5 4.6 1.3v-3.8z" fill="#EBEBEB" />
          <path d="M12 7.5v3.2h4.3l-.4 4.5-3.9 1.1v3.8l7.2-2.3.8-10.3H12z" fill="#fff" />
        </svg>
      );

    case 'Flutter':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M13.8 2.5L3.5 12.8l3.2 3.2L20.2 2.5h-6.4z" fill="#42A5F5" />
          <path d="M13.8 11.2l-4.8 4.8 4.8 4.8h6.4l-4.8-4.8 4.8-4.8h-6.4z" fill="#0D47A1" />
          <path d="M9 16l3.2 3.2-3.2 3.2H2.6L9 16z" fill="#42A5F5" />
          <path d="M9 16l3.2 3.2h-3.2L9 16z" fill="#0D47A1" />
        </svg>
      );

    case 'Dart':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M4 4l9.5 9.5-2.5 6.5L3 12 4 4z" fill="#0175C2" />
          <path d="M13.5 13.5L21 21h-6l-5-5 3.5-2.5z" fill="#02569B" />
          <path d="M4 4l12-1 5 5-7.5 5.5L4 4z" fill="#29B6F6" />
          <path d="M21 8l-7.5 5.5 7.5 7.5V8z" fill="#00B4AB" />
        </svg>
      );

    case 'VS Code':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M17.5 2.5L6.8 11.2l-3.3-2.6-1.5 1 2.8 2.4-2.8 2.4 1.5 1 3.3-2.6 10.7 8.7 4.7-2.3V4.8l-4.7-2.3z" fill="#007ACC" />
          <path d="M17.5 7.2L9.2 12l8.3 4.8V7.2z" fill="#fff" fillOpacity="0.85" />
        </svg>
      );

    case 'GitHub':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      );

    case 'Postman':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <circle cx="12" cy="12" r="11" fill="#FF6C37" />
          <path d="M17.8 7.5L5.5 11.8c-.5.2-.5.9 0 1l3.5 1.4 1.2 4.1c.1.4.6.6.9.3l2.2-2.1 3.8 2.7c.4.3 1 .1 1.1-.4l2-10.5c.1-.5-.4-.9-.9-.8z" fill="#fff" />
        </svg>
      );

    case 'Vercel':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M12 3L22 20H2L12 3Z" fill="#fff" />
        </svg>
      );

    case 'Antigravity':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="12" cy="12" r="9.5" stroke="url(#agGrad)" strokeWidth="1.8" />
          <path d="M12 4.5v15M4.5 12h15" stroke="url(#agGrad)" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="12" r="3.2" fill="#00D4FF" />
          <defs>
            <linearGradient id="agGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00D4FF" />
              <stop offset="1" stopColor="#7B2CBF" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'Claude':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M12 3.5v17M3.5 12h17M6 6l12 12M18 6L6 18" stroke="#D97757" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="12" cy="12" r="2.2" fill="#D97757" />
        </svg>
      );

    case 'REST API':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" stroke="#00D4FF" strokeWidth="1.7" />
          <path d="M6.5 12h2.5M12 9.5v5M15 12h2.5" stroke="#00D4FF" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );

    case 'Figma':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M8 2h4v5H8a2.5 2.5 0 010-5z" fill="#F24E1E" />
          <path d="M12 2h4a2.5 2.5 0 010 5h-4V2z" fill="#FF7262" />
          <path d="M8 7h4v5H8a2.5 2.5 0 010-5z" fill="#A259FF" />
          <circle cx="14.5" cy="9.5" r="2.5" fill="#1ABCFE" />
          <path d="M8 12h4v5a2.5 2.5 0 01-5 0c0-1.38 1.12-2.5 2.5-2.5z" fill="#0ACF83" />
        </svg>
      );

    case 'Lightroom':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <rect width="24" height="24" rx="5" fill="#001D26" stroke="#31A8FF" strokeWidth="1" />
          <text x="4.5" y="16.5" fill="#31A8FF" fontSize="10.5" fontWeight="bold" fontFamily="sans-serif">Lr</text>
        </svg>
      );

    case 'DaVinci Resolve':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="12" cy="7.5" r="4.2" fill="#E03C31" opacity="0.9" />
          <circle cx="7.8" cy="15" r="4.2" fill="#009EDB" opacity="0.9" />
          <circle cx="16.2" cy="15" r="4.2" fill="#FFBF00" opacity="0.9" />
        </svg>
      );

    case 'CapCut':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M4 6.5l8 5.5-8 5.5V6.5z" fill="#00D4FF" />
          <path d="M20 6.5l-8 5.5 8 5.5V6.5z" fill="#fff" />
        </svg>
      );

    case 'Alight Motion':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect width="24" height="24" rx="5" fill="#181A26" />
          <path d="M4 14.5c3 0 4-5 8-5s5 5 8 5" stroke="#00D2D3" strokeWidth="2" strokeLinecap="round" />
          <path d="M4 9.5c3 0 4 5 8 5s5-5 8-5" stroke="#FF7675" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
        </svg>
      );

    case 'Canva':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <circle cx="12" cy="12" r="11" fill="url(#canvaGrad)" />
          <path d="M15.5 8.5c-1-1-2.5-1.5-4-1.2-2.3.5-4 2.5-4 5 0 2.8 2.2 5 5 5 1.7 0 3-.7 3.8-1.6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <defs>
            <linearGradient id="canvaGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00C4CC" />
              <stop offset="1" stopColor="#7D2AE8" />
            </linearGradient>
          </defs>
        </svg>
      );

    default:
      return (
        <div className={`${className} rounded-full bg-blue-500/20 flex items-center justify-center text-[10px] text-blue-400 font-bold`}>
          {name.slice(0, 2).toUpperCase()}
        </div>
      );
  }
};
