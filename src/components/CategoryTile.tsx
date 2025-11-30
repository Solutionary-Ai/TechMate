import React from 'react';
import { BoxIcon } from 'lucide-react';
interface CategoryTileProps {
  name: string;
  icon: BoxIcon;
  count: number;
  onClick: () => void;
}
export function CategoryTile({
  name,
  icon: Icon,
  count,
  onClick
}: CategoryTileProps) {
  return <button onClick={onClick} className="flex flex-col items-center gap-3 sm:gap-4 p-6 sm:p-8 bg-white border-2 border-gray-200 hover:border-black hover:shadow-lg active:scale-95 transition-all group min-w-[140px] sm:min-w-[160px] min-h-[140px] sm:min-h-[160px]">
      <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-gray-100 group-hover:bg-black transition-colors">
        <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-gray-700 group-hover:text-white transition-colors" />
      </div>
      <div className="text-center">
        <p className="font-bold text-sm sm:text-base mb-1">{name}</p>
        <p className="text-xs text-gray-500">{count} products</p>
      </div>
    </button>;
}