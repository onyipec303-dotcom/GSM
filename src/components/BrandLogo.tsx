import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  inverted?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  inverted = false,
}) => {
  const sizeMap = {
    sm: { img: 'w-7 h-7', text: 'text-xs', sub: 'text-[8px]' },
    md: { img: 'w-10 h-10', text: 'text-sm', sub: 'text-[9px]' },
    lg: { img: 'w-14 h-14', text: 'text-base', sub: 'text-[10px]' },
    xl: { img: 'w-20 h-20', text: 'text-xl', sub: 'text-xs' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* High-res Monogram Logo Graphic */}
      <div
        className={`${currentSize.img} rounded-lg overflow-hidden bg-white flex items-center justify-center p-0.5 border border-zinc-700 shadow-sm shrink-0`}
      >
        <img
          src="/src/assets/images/peculiar_stores_logo_1786886385339.jpg"
          alt="Peculiar Stores"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain mix-blend-multiply"
        />
      </div>

      {showText && (
        <div className="flex flex-col text-left leading-none">
          <span
            className={`font-serif italic font-bold tracking-wider ${
              inverted ? 'text-zinc-950' : 'text-white'
            } ${currentSize.text}`}
          >
            PECULIAR STORES
          </span>
          <span
            className={`font-mono uppercase tracking-[0.2em] font-medium text-amber-500 mt-0.5 ${currentSize.sub}`}
          >
            Official Verified Store
          </span>
        </div>
      )}
    </div>
  );
};
