// src/components/TrashBin.tsx
import React from "react";

interface TrashBinProps {
  onDrop: (cookieName: string, isEssential: boolean) => void;
}

const TrashBin: React.FC<TrashBinProps> = ({ onDrop }) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const cookieName = e.dataTransfer.getData("cookieName");
    const isEssential = e.dataTransfer.getData("essential") === "true";
    onDrop(cookieName, isEssential);
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: "darkgray",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px",
      }}
    >
      🗑️
    </div>
  );
};

export default TrashBin;