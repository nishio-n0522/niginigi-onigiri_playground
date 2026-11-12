import { useState, useRef } from "react";

import { Fab, Stack } from "@mui/material";

type MindMapNode = {
  id: string;
  text: string;
  parentId: string | null;
  children: MindMapNode[];
  position: { x: number; y: number };
};

const initialMindMap: MindMapNode = {
  id: "root",
  text: "中央のノード",
  parentId: null,
  position: { x: 300, y: 200 },
  children: [],
};

export default function MindMap() {
  const [nodes, setNodes] = useState<MindMapNode[]>([initialMindMap]);
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const positionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseDown = (id: string, event: React.MouseEvent) => {
    setDraggingNodeId(id);
    positionRef.current = { x: event.clientX, y: event.clientY };
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!draggingNodeId) return;

    const dx = event.clientX - positionRef.current.x;
    const dy = event.clientY - positionRef.current.y;
    positionRef.current = { x: event.clientX, y: event.clientY };

    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === draggingNodeId
          ? {
              ...node,
              position: { x: node.position.x + dx, y: node.position.y + dy },
            }
          : node
      )
    );
  };

  const addNode = (parentId: string) => {
    setNodes((prevNodes) => [
      ...prevNodes,
      {
        id: Math.random().toString(36).substr(2, 9),
        text: "新しいノード",
        parentId,
        position: { x: 400, y: 300 },
        children: [],
      },
    ]);
  };

  const handleMouseUp = () => {
    setDraggingNodeId(null);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="relative w-full h-screen bg-gray-100"
    >
      {nodes.map((node) => (
        <div
          key={node.id}
          className="absolute bg-white p-3 border rounded shadow cursor-pointer"
          style={{ left: node.position.x, top: node.position.y }}
          onMouseDown={(e) => handleMouseDown(node.id, e)}
        >
          {node.text}
        </div>
      ))}
    </div>
  );
}
