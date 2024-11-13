// src/components/CookieItem.tsx
import React from "react";

interface Cookie {
  name: string;
  size: number;
  essential: boolean;
}

interface CookieItemProps {
  cookie: Cookie;
}

const CookieItem: React.FC<CookieItemProps> = ({ cookie }) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("cookieName", cookie.name);
    e.dataTransfer.setData("essential", String(cookie.essential));
  };

  return (
    <button
      draggable
      onDragStart={handleDragStart}
      style={{
        padding: "10px",
        backgroundColor: cookie.essential ? "lightcoral" : "lightblue",
      }}
    >
      {cookie.name} ({cookie.size}KB)
    </button>
  );
};

export default CookieItem;