// src/components/CookieItem.tsx
import React from "react";

interface Cookie {
  name: string;
  size: number;
}

interface CookieItemProps {
  cookie: Cookie;
}

const CookieItem: React.FC<CookieItemProps> = ({ cookie }) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("cookieName", cookie.name);
  };

  return (
    <button
      draggable
      onDragStart={handleDragStart}
      style={{
        padding: "10px",
        backgroundColor: "lightblue",
      }}
    >
      {cookie.name} ({cookie.size}KB)
    </button>
  );
};

export default CookieItem;
