import React from 'react';

interface LogoProps {
  className?: string;
  withText?: boolean;
  withSlogan?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  withText = true,
  withSlogan = false,
  size = 'md',
}) => {
  const iconSizeClasses = {
    sm: 'w-7 h-7 text-sm',
    md: 'w-9 h-9 text-base',
    lg: 'w-12 h-12 text-xl',
  };

  const titleSizeClasses = {
    sm: 'text-base font-bold',
    md: 'text-lg sm:text-xl font-extrabold',
    lg: 'text-2xl sm:text-3xl font-extrabold',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Emplacement emblème officiel ComicCrafte Studio */}
      <div
        className={`${iconSizeClasses[size]} rounded-xl bg-gradient-to-br from-[#1E1E1E] to-[#0A0A0A] border border-[#FF6A00]/40 flex items-center justify-center shadow-md shadow-[#FF6A00]/10 shrink-0 relative overflow-hidden group`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6A00]/20 to-transparent opacity-60 pointer-events-none" />
        <svg
          viewBox="0 0 40 40"
          className="w-full h-full p-1.5 drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* C stylisé avec motif plume & livre de création */}
          <path
            d="M28 11C25 8.5 21 8 17 9.5C11.5 11.5 8 16.5 8 22C8 28 12.5 32 18 32C22.5 32 26 29.5 28.5 26.5"
            stroke="#FF6A00"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M20 16L32 16M22 22L30 22"
            stroke="#FF8A33"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="31" cy="28" r="2.5" fill="#FF8A33" />
        </svg>
      </div>

      {withText && (
        <div className="flex flex-col">
          <div className={`${titleSizeClasses[size]} tracking-tight text-white flex items-center`}>
            <span>COMIC</span>
            <span className="text-[#FF6A00]">CRAFTE</span>
            <span className="ml-1 text-xs font-semibold px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 uppercase tracking-widest border border-neutral-700/60 hidden sm:inline-block">
              Studio
            </span>
          </div>
          {withSlogan && (
            <span className="text-[11px] sm:text-xs text-neutral-400 font-medium">
              Là où les histoires prennent vie.
            </span>
          )}
        </div>
      )}
    </div>
  );
};
