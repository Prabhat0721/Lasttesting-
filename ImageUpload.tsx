import React, { useRef, useState } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import { compressImage } from '../services/imageUtils';

interface ImageUploadProps {
  photoBase64: string | null;
  onImageChange: (file: File, base64: string) => void;
  onClear: () => void;
  error?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ photoBase64, onImageChange, onClear, error }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('कृपया केवल इमेज फाइल चुनें (Please select an image file)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('फाइल का आकार 10MB से कम होना चाहिए (File size must be less than 10MB)');
      return;
    }

    setIsProcessing(true);
    try {
      const compressed = await compressImage(file);
      onImageChange(file, compressed);
    } catch (err) {
      console.error('Image processing failed', err);
      alert('फोटो प्रोसेस करने में समस्या हुई');
    } finally {
      setIsProcessing(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Couple Photo (युगल फोटो) <span className="text-red-500">*</span>
      </label>
      
      {!photoBase64 ? (
        <div
          onClick={handleInputClick}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`
            relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200
            ${isDragging ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'}
            ${error ? 'border-red-300 bg-red-50' : ''}
          `}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => e.target.files && handleFile(e.target.files[0])}
          />
          
          <div className="flex flex-col items-center justify-center space-y-3">
            {isProcessing ? (
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            ) : (
              <>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Camera className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Click to upload couple photo
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    JPEG, PNG up to 10MB
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="relative group rounded-xl overflow-hidden border border-gray-200 shadow-sm aspect-video bg-gray-100">
          <img 
            src={photoBase64} 
            alt="Preview" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={onClear}
              className="bg-white p-2 rounded-full text-red-500 hover:bg-red-50 transition-colors"
            >
              <Upload className="w-5 h-5" />
              <span className="sr-only">Change</span>
            </button>
            <button
              type="button"
              onClick={onClear}
              className="absolute top-2 right-2 text-white hover:text-red-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
             <p className="text-white text-xs text-center">Photo Ready ✨</p>
          </div>
        </div>
      )}
      
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
};