import React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center animate-fade-in">
      <div className="relative mb-8">
        {/* Outer rotating ring */}
        <div className="w-24 h-24 rounded-full border-4 border-purple-100 border-t-purple-600 animate-spin"></div>
        {/* Inner reverse rotating ring */}
        <div className="absolute top-2 left-2 w-20 h-20 rounded-full border-4 border-transparent border-b-pink-500 animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl">✨</span>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
        आपके वेडिंग कार्ड बन रहे हैं...
      </h2>
      <p className="text-gray-600 mb-6">Generating your beautiful invitations...</p>
      
      <div className="bg-purple-50 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium animate-pulse">
        कृपया प्रतीक्षा करें, इसमें 30-60 सेकंड लग सकते हैं
      </div>
    </div>
  );
};