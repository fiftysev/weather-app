import { reactive } from "vue";

type DragState = {
  dragStartIndex: number | null;
  dragOverIndex: number | null;
};

export function useDragAndDrop<T extends { id: string }>(
  onReorder: (ids: string[]) => void,
) {
  const dragState = reactive<DragState>({
    dragStartIndex: null,
    dragOverIndex: null,
  });

  function handleDragStart(index: number) {
    dragState.dragStartIndex = index;
  }

  function handleDragOver(index: number) {
    dragState.dragOverIndex = index;
  }

  function handleDrop(index: number, items: T[]) {
    if (dragState.dragStartIndex === null) return;

    const data = [...items];
    const movedItem = data[dragState.dragStartIndex];

    data.splice(dragState.dragStartIndex, 1);
    data.splice(index, 0, movedItem);

    onReorder(data.map((v) => v.id));

    dragState.dragStartIndex = null;
    dragState.dragOverIndex = null;
  }

  function handleDragEnd() {
    dragState.dragStartIndex = null;
    dragState.dragOverIndex = null;
  }

  return {
    dragState,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
  };
}
