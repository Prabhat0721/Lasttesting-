import React from 'react';
import { Crown, Check } from 'lucide-react';

interface PremiumToggleProps {
  isPremium: boolean;
  onToggle: (checked: boolean) => void;
}

export const PremiumToggle: React.FC<PremiumToggleProps> = ({ isPremium, onToggle }) => {
  return (
    <div className={`
      relative overflow-hidden rounded-2xl border-2 transition-all duration-300
      ${isPremium ? 'border-yellow-400 bg-gradient-to-r from-gray-900 to-gray-800' : 'border-gray-200 bg-white'}
    `}>
      <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 blur-2xl opacity-20 rounded-full pointer-events-none"></div>
      
      <div className="p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`text-lg font-bold ${isPremium ? 'text-white' : 'text-gray-900'}`}>
              Premium Collection
            </h3>
            {isPremium && <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">ACTIVATED</span>}
          </div>
          
          <div className={`text-sm ${isPremium ? 'text-gray-300' : 'text-gray-500'} space-y-1`}>
            <div className="flex items-center gap-2">
              <span className={`font-medium ${isPremium ? 'text-yellow-400' : 'text-purple-600'}`}>
                {isPremium ? '✓ 10 Premium Designs' : '• 3 Basic Designs (Free)'}
              </span>
              {!isPremium && <span className="text-gray-400 line-through text-xs">₹999</span>}
            </div>
            {!isPremium && <p className="text-xs">Upgrade to unlock 7 more exclusive designs for just ₹299!</p>}
          </div>
        </div>

        <div className="flex items-center gap-3">
            <span className={`text-sm font-medium ${isPremium ? 'text-gray-400' : 'text-gray-900'}`}>Free</span>
            <button
              type="button"
              onClick={() => onToggle(!isPremium)}
              className={`
                relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75
                ${isPremium ? 'bg-yellow-500' : 'bg-gray-200'}
              `}
            >
              <span className="sr-only">Use Premium</span>
              <span
                aria-hidden="true"
                className={`
                  pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out -mt-[1px]
                  ${isPremium ? 'translate-x-6' : 'translate-x-0'}
                `}
              />
            </button>
            <span className={`text-sm font-medium flex items-center gap-1 ${isPremium ? 'text-yellow-400' : 'text-gray-400'}`}>
                Premium <Crown className="w-3 h-3" />
            </span>
        </div>
      </div>
    </div>
  );
};