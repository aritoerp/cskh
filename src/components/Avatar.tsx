import React from 'react';

interface AvatarProps {
  initials: string;
  active?: boolean;
  selected?: boolean;
  size?: 'sm' | 'md' | 'lg';
  needsSupport?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ 
  initials, 
  active = true, 
  selected = false,
  size = 'md',
  needsSupport = false
}) => {
  const getSize = () => {
    switch (size) {
      case 'sm': return 'w-8 h-8 text-xs';
      case 'lg': return 'w-12 h-12 text-base';
      default: return 'w-10 h-10 text-sm';
    }
  };

  const getBackgroundColor = () => {
    if (!active) return 'bg-gray-300';
    if (needsSupport) return 'bg-orange-500';
    
    // Simple hash function to get consistent color based on initials
    const hash = initials.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = [
      'bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 
      'bg-pink-500', 'bg-red-500', 'bg-orange-500',
      'bg-amber-500', 'bg-yellow-500', 'bg-lime-500',
      'bg-green-500', 'bg-emerald-500', 'bg-teal-500',
      'bg-cyan-500', 'bg-sky-500'
    ];
    
    return colors[hash % colors.length];
  };

  return (
    <div 
      className={`${getSize()} ${getBackgroundColor()} rounded-full flex items-center justify-center text-white font-medium
        ${selected ? 'ring-2 ring-offset-2 ring-blue-600' : ''} transition-all duration-200`}
    >
      {initials.substring(0, 2)}
    </div>
  );
};

export default Avatar