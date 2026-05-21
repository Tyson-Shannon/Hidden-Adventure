import {
  Stage,
  Layer,
  Image as KonvaImage,
  Line,
  Circle,
} from "react-konva";
import { useEffect, useState } from "react";
import { useMapStore } from "../store/useMapStore";

export default function MapCanvas() {
  const { mapImage, rooms, addRoom } = useMapStore();

  const [image, setImage] =
    useState<HTMLImageElement | null>(null);

  const [dimensions, setDimensions] = useState({
    width: 800,
    height: 600,
  });

  const [currentPoints, setCurrentPoints] = useState<number[]>(
    []
  );

  useEffect(() => {
    if (!mapImage) return;

    const img = new window.Image();

    img.src = mapImage;

    img.onload = () => {
      setImage(img);

      setDimensions({
        width: img.width,
        height: img.height,
      });
    };
  }, [mapImage]);

  const handleClick = (e: any) => {
    // Only allow LEFT click
    /*
    0 = left click
    1 = middle click
    2 = right click
    */
    if (e.evt.button !== 0) return;

    const stage = e.target.getStage();

    const pointer = stage.getPointerPosition();

    if (!pointer) return;

    // If we already have at least 3 points
    // check if user clicked near the start point
    if (currentPoints.length >= 6) {
      const startX = currentPoints[0];
      const startY = currentPoints[1];

      const distance = Math.sqrt(
        Math.pow(pointer.x - startX, 2) +
        Math.pow(pointer.y - startY, 2)
      );

      // Close polygon if close enough
      if (distance < 15) {
        addRoom({
          id: crypto.randomUUID(),
          label: "New Room",
          points: currentPoints,
          visible: false,
        });

        setCurrentPoints([]);

        return;
      }
    }

    setCurrentPoints((prev) => [
      ...prev,
      pointer.x,
      pointer.y,
    ]);
  };

  //undo last dot
  const handleRightClick = (e: any) => {
    e.evt.preventDefault();

    setCurrentPoints((prev) => prev.slice(0, -2));
  };

  return (
    <div
      style={{
        border: "1px solid gray",
        width: "fit-content",
      }}
    >
      <Stage
        width={dimensions.width}
        height={dimensions.height}
        onClick={handleClick}
        onContextMenu={handleRightClick}
      >
        <Layer>
          {image && (
            <KonvaImage
              image={image}
              width={dimensions.width}
              height={dimensions.height}
            />
          )}

          {/* Existing Rooms */}
          {rooms.map((room) => (
            <Line
              key={room.id}
              points={room.points}
              closed
              fill="rgba(0,0,0,0.7)"
              stroke="red"
              strokeWidth={2}
            />
          ))}

          {/* Current Drawing */}
          {currentPoints.length > 0 && (
            <>
              <Line
                points={currentPoints}
                stroke="yellow"
                strokeWidth={2}
              />

              {currentPoints.map((point, index) => {
                if (index % 2 !== 0) return null;

                return (
                  <Circle
                    key={index}
                    x={currentPoints[index]}
                    y={currentPoints[index + 1]}
                    radius={4}
                    fill="yellow"
                  />
                );
              })}
            </>
          )}
        </Layer>
      </Stage>
    </div>
  );
}