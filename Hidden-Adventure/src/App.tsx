import MapCanvas from "./components/MapCanvas";
import { useMapStore } from "./store/useMapStore";

function App() {
  const { setMapImage } = useMapStore();

  const handleUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    setMapImage(url);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "10px",
      }}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
      />

      <MapCanvas />
    </div>
  );
}

export default App;