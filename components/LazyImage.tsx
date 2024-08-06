import { useRef, useEffect, useState } from "react";
import type { ImgHTMLAttributes } from "react";

type LazyImageProps = { 
  src: string;
  onLazyLoad?: () => void; // Añadir onLazyLoad como un prop opcional
};

type ImageNative = ImgHTMLAttributes<HTMLImageElement>;
type Props = LazyImageProps & ImageNative;

export function LazyImage({ src, onLazyLoad, ...imgProps }: Props): JSX.Element {
  const node = useRef<HTMLImageElement>(null);
  const [currentSrc, setCurrentSrc] = useState("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=");
  const [hasLazyLoaded, setHasLazyLoaded] = useState(false); // Estado para rastrear si ya se ha ejecutado onLazyLoad

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("Foto Insertada");
          setCurrentSrc(src);
        }
      });
    });

    if (node.current) {
      observer.observe(node.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src]);

  const handleLoad = () => {
    if (onLazyLoad && !hasLazyLoaded) {
      onLazyLoad();
      setHasLazyLoaded(true); // Marcar como ejecutado
    }
  };

  return (
    <img
      ref={node}
      src={currentSrc}
      onLoad={handleLoad}
      {...imgProps}
    />
  );
}
