import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

interface TrashBinProps {
  onDrop: (cookieName: string) => void;
}

// 쿠키가 먹히는 애니메이션 정의
const eatAnimation = keyframes`
  0% {
    transform: scale(1.2);
  }
  50% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
`;

const TrashContainer = styled.div<{ isDraggingOver: boolean }>`
  width: 100px;
  height: 100px;
  background-color: ${(props) =>
    props.isDraggingOver ? "#ff6b6b" : "darkgray"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  border-radius: 10px;
  transition: all 0.3s ease;
  cursor: pointer;

  ${(props) =>
    props.isDraggingOver &&
    `
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(0,0,0,0.2);
  `}

  &.eating {
    animation: ${eatAnimation} 0.5s ease;
  }
`;

const TrashBin: React.FC<TrashBinProps> = ({ onDrop }) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isEating, setIsEating] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const cookieName = e.dataTransfer.getData("cookieName");

    // 먹는 애니메이션 실행
    setIsEating(true);
    setIsDraggingOver(false);

    // 애니메이션이 끝난 후 쿠키 삭제
    setTimeout(() => {
      onDrop(cookieName);
      setIsEating(false);
    }, 500);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  return (
    <TrashContainer
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      isDraggingOver={isDraggingOver}
      className={isEating ? "eating" : ""}
    >
      {isDraggingOver ? "🗑️" : "🗑️"}
    </TrashContainer>
  );
};

export default TrashBin;
