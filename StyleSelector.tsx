import React from 'react';
import { CardStyle } from '../types';
import { Flame, Sparkles, Heart } from 'lucide-react';

interface StyleSelectorProps {
  selectedStyle: CardStyle;
  onSelect: (style: CardStyle) => void;
  error?: string;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onSelect, error }) => {
  const styles: { id: CardStyle; icon: React.ReactNode; title: string; subtitle: string; desc: string; color: string }[] = [
    {
      id: 'traditional',
      icon: <Flame className="w-6 h-6 text-red-500" />,
      title: 'Traditional',
      subtitle: 'पारंपरिक',
      desc: 'Royal colors, ornate borders, Ganesha',
      color: 'bg-gradient-to-br from-red-50 to-orange-50 border-orange-200'
    },
    {
      id: 'modern',
      icon: <Sparkles className="w-6 h-6 text-pink-500" />,
      title: 'Modern',
      subtitle: 'आधुनिक',
      desc: 'Rose gold, watercolor, contemporary',
      color: 'bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200'
    },
    {
      id: 'minimal',
      icon: <Heart className="w-6 h-6 text-teal-500" />,
      title: 'Minimal',
      subtitle: 'मिनिमल',
      desc: 'Clean, elegant, Scandinavian-Indian',
      color: 'bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-200'
    }
  ];

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Card Style (कार्ड स्टाइल) <span className="text-red-500">*</span>
      </label>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {styles.map((style) => {
          const isSelected = selectedStyle === style.id;
          return (
            <div
              key={style.id}
              onClick={() => onSelect(style.id)}
              className={`
                relative cursor-pointer rounded-xl p-4 border-2 transition-all duration-300 transform
                ${isSelected 
                  ? 'border-purple-600 shadow-md scale-[1.02] ring-1 ring-purple-600' 
                  : 'border-gray-100 shadow-sm hover:border-purple-200 hover:scale-[1.01]'
                }
                ${isSelected ? style.color : 'bg-white'}
              `}
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <div className={`p-2 rounded-full bg-white shadow-sm ${isSelected ? 'scale-110' : ''} transition-transform`}>
                  {style.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{style.title}</h3>
                  <p className="text-xs font-medium text-purple-600">{style.subtitle}</p>
                </div>
                <p className="text-xs text-gray-500 leading-tight">
                  {style.desc}
                </p>
              </div>
              
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
};