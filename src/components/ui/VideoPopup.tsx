import React from 'react';
import Link from 'next/link';

interface VideoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  title: string;
  description: string;
}

const VideoPopup: React.FC<VideoPopupProps> = ({ 
  isOpen, 
  onClose, 
  videoSrc, 
  title,
  description
}) => {
  if (!isOpen) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: description,
        url: window.location.href + '?feature=' + encodeURIComponent(title)
      }).catch(error => console.log('Error sharing:', error));
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href + '?feature=' + encodeURIComponent(title))
        .then(() => alert('Link copied to clipboard!'))
        .catch(err => console.log('Error copying link: ', err));
    }
  };

  return (
    <div className="fixed inset-0 bg-white/20 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out backdrop-blur-md">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden animate-fade-in">
        <div className="p-4 flex items-center justify-between border-b">
          <h3 className="text-xl font-bold text-[#333333]">{title}</h3>
          <div className="flex space-x-4">
            <button 
              onClick={handleShare}
              className="text-gray-600 hover:text-[#5e3b94] transition-colors"
              aria-label="Share this video"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
              </svg>
            </button>
            <button 
              onClick={onClose} 
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              aria-label="Close popup"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="relative pt-[56.25%] overflow-hidden rounded-b-xl">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#e62e4d]/80 via-[#5e3b94]/80 to-[#3e5f8a]/80 flex items-center justify-center">
            <div className="text-center p-8">
              <svg className="w-16 h-16 mx-auto mb-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="text-white text-xl font-medium mb-2">Video coming soon!</p>
              <p className="text-white/80 text-sm max-w-md mx-auto">{description}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 text-center mb-2">
          <Link 
            href="/signup" 
            className="px-8 py-3 bg-gradient-to-r from-[#e62e4d] to-[#5e3b94] text-white rounded-lg hover:opacity-90 transition-all shadow-md inline-block font-medium"
          >
            Try It Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoPopup;
