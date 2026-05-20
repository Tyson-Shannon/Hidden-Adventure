import { Stage, Layer, Image as KonvaImage } from "react-konva";
import { useEffect, useState } from "react";
import { useMapStore } from "../store/useMapStore";

export default function MapCanvas() {
  const { mapImage } = useMapStore();

  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!mapImage) return;

    const img = new window.Image();
    img.src = mapImage;

    img.onload = () => {
      setImage(img);
    };
  }, [mapImage]);

  return (
    <Stage width={1200} height={800}>
      <Layer>
        {image && (
          <KonvaImage
            image={image}
            width={1200}
            height={800}
          />
        )}
      </Layer>
    </Stage>
  );
}