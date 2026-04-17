import { useRef, useState } from 'react';

export function useDragSort<T extends { id: string }>(
  items: T[],
  onReorder: (items: T[]) => void
) {
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const dragId = useRef<string | null>(null);

  function handleDragStart(id: string) {
    dragId.current = id;
  }

  function handleDragOver(e: React.DragEvent, id: string) {
    e.preventDefault();
    if (id !== dragId.current) {
      setDragOverId(id);
    }
  }

  function handleDrop(targetId: string) {
    const from = dragId.current;
    if (!from || from === targetId) {
      setDragOverId(null);
      return;
    }

    const next = [...items];
    const fromIndex = next.findIndex((i) => i.id === from);
    const toIndex = next.findIndex((i) => i.id === targetId);
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);

    onReorder(next);
    dragId.current = null;
    setDragOverId(null);
  }

  function handleDragEnd() {
    dragId.current = null;
    setDragOverId(null);
  }

  return { dragOverId, handleDragStart, handleDragOver, handleDrop, handleDragEnd };
}
