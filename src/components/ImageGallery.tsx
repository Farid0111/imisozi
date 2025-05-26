import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/ImageGallery.css';

interface GalleryImage {
  original: string;
  thumbnail: string;
}

interface ImageGalleryProps {
  images: string[] | GalleryImage[];
  title?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, title }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  
  console.log('ImageGallery props:', { images, title });
  
  // Process images to handle both string[] and GalleryImage[] formats
  const processedImages = images.map(image => {
    if (typeof image === 'string') {
      return { original: image, thumbnail: image };
    }
    return image as GalleryImage;
  });
  
  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = 'auto';
  };
  
  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + processedImages.length) % processedImages.length);
    }
  };
  
  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % processedImages.length);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedImageIndex === null) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      setSelectedImageIndex((selectedImageIndex - 1 + processedImages.length) % processedImages.length);
    } else if (e.key === 'ArrowRight') {
      setSelectedImageIndex((selectedImageIndex + 1) % processedImages.length);
    }
  };
  
  return (
    <div className="image-gallery-container">
      {title && <h2 className="gallery-title">{title}</h2>}
      
      <motion.div 
        className="gallery-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {processedImages.map((image, index) => (
          <motion.div 
            key={index} 
            className="gallery-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => openLightbox(index)}
          >
            <img src={image.thumbnail} alt={`${title || 'Image'} ${index + 1}`} />
          </motion.div>
        ))}
      </motion.div>
      
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div 
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <motion.div 
              className="lightbox-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="lightbox-close" onClick={closeLightbox}>&times;</button>
              
              <div className="lightbox-count">
                {selectedImageIndex + 1} / {processedImages.length}
              </div>
              
              <div className="lightbox-image-container">
                <motion.img 
                  key={selectedImageIndex}
                  src={processedImages[selectedImageIndex].original} 
                  alt={`${title || 'Image'} ${selectedImageIndex + 1}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              <button className="lightbox-nav prev" onClick={goToPrevious}>&#10094;</button>
              <button className="lightbox-nav next" onClick={goToNext}>&#10095;</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageGallery; 