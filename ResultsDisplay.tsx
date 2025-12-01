import React from 'react';
import { DesignResult } from '../types';
import { Download, Share2, Sparkles, ArrowLeft } from 'lucide-react';

interface ResultsDisplayProps {
  results: {
    brideName: string;
    groomName: string;
    totalDesigns: number;
    designs: DesignResult[];
  };
  onReset: () => void;
  isPremium: boolean;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, onReset, isPremium }) => {
  return (
    <div className="animate-fade-in-up space-y-8">
      {/* Success Header */}
      <div className="text-center bg-white rounded-2xl p-8 shadow-sm border border-green-100">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {isPremium 
            ? "🎉 बधाई हो! आपके 10 प्रीमियम वेडिंग कार्ड डिज़ाइन तैयार हैं!" 
            : "✨ आपके 3 मुफ्त वेडिंग कार्ड डिज़ाइन तैयार हैं!"}
        </h2>
        <p className="text-gray-600">
          Ready for {results.brideName} & {results.groomName}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.designs.map((design, index) => (
            // Placeholder visuals for demo purposes since we don't have real AI generation in frontend only
          <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="relative aspect-[4/5] bg-gray-200 overflow-hidden cursor-pointer">
              {/* This would be the real generated image URL */}
              <img 
                src={`https://picsum.photos/400/500?random=${index}`} 
                alt={design.designName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-6">
                  <span className="text-white font-medium">Click to Preview</span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-gray-900">{design.designName}</h3>
                  <p className="text-xs text-purple-600 uppercase tracking-wide font-semibold mt-1">{design.style}</p>
                </div>
                <div className="bg-gray-100 px-2 py-1 rounded text-xs font-mono text-gray-500">
                  #{index + 1}
                </div>
              </div>
              
              <div className="flex gap-2">
                <a 
                  href={design.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors"
                >
                  <Download className="w-4 h-4" />
                  डाउनलोड
                </a>
                <button className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upsell for Free Users */}
      {!isPremium && (
        <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded-2xl p-8 text-white text-center shadow-xl relative overflow-hidden">
           <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
           <h3 className="text-2xl font-bold mb-2">Want 7 more premium designs?</h3>
           <p className="mb-6 opacity-90">Unlock our exclusive Royal Collection for just ₹299</p>
           <button 
             onClick={onReset}
             className="bg-white text-amber-600 font-bold py-3 px-8 rounded-full hover:bg-yellow-50 transition-colors shadow-lg"
           >
             Upgrade to Premium for ₹299
           </button>
        </div>
      )}

      <div className="text-center pt-8">
        <button 
            onClick={onReset}
            className="text-gray-500 hover:text-purple-600 flex items-center justify-center gap-2 mx-auto font-medium transition-colors"
        >
            <ArrowLeft className="w-4 h-4" />
            Create New Card (नया कार्ड बनाएं)
        </button>
      </div>
    </div>
  );
};