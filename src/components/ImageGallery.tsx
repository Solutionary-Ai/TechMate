import React, { useState } from 'react';
import { ZoomIn } from 'lucide-react';
interface ImageGalleryProps {
  images: string[];
  productName: string;
}
export function ImageGallery({
  images,
  productName
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  return <div className="flex gap-4">
      {/* Thumbnail Gallery */}
      {images.length > 1 && <div className="flex flex-col gap-3 w-20">
          {images.map((img, idx) => <button key={idx} onClick={() => setSelectedIndex(idx)} className={`aspect-square border-2 transition-all overflow-hidden ${selectedIndex === idx ? 'border-black' : 'border-gray-200 hover:border-gray-400'}`}>
              <img src={img} alt={`${productName} view ${idx + 1}`} className="w-full h-full object-cover" />
            </button>)}
        </div>}

      {/* Main Image */}
      <div className="flex-1 relative group">
        <div className="relative bg-gray-50 overflow-hidden cursor-zoom-in" onMouseEnter={() => setIsZoomed(true)} onMouseLeave={() => setIsZoomed(false)}>
          <img src={images[selectedIndex]} alt={productName} className={`w-full h-auto transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`} />
          {!isZoomed && <div className="absolute bottom-4 right-4 bg-white/90 p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-5 h-5 text-gray-700" />
            </div>}
        </div>
      </div>
    </div>;
}