import { useState, useEffect, useRef } from 'react';
import { getAssetPath } from '@/lib/utils';

interface OptimizedVideoProps {
  src: string;
  className?: string;
  priority?: boolean;
}

export function OptimizedVideo({ src, className = "", priority = false }: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Get the correct path for the video source
  const videoSrc = src.startsWith('http') ? src : getAssetPath(src);
  
  // For debugging purposes
  console.log("Video source path:", videoSrc);
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Load metadata first
    const handleLoadedMetadata = () => {
      console.log("Video metadata loaded");
      if (priority) {
        video.play().catch(error => console.log('Autoplay prevented:', error));
      }
    };

    // When video can play through
    const handleCanPlayThrough = () => {
      console.log("Video can play through");
      setIsLoaded(true);
      if (!priority) {
        video.play().catch(error => console.log('Autoplay prevented:', error));
      }
    };
    
    // Error handling
    const handleError = (e: Event) => {
      console.error("Video error:", (e.target as HTMLVideoElement).error);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      video.removeEventListener('error', handleError);
    };
  }, [priority, videoSrc]);

  return (
    <video
      ref={videoRef}
      src={videoSrc}
      muted
      loop
      playsInline
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
      preload={priority ? "auto" : "metadata"}
    />
  );
} 