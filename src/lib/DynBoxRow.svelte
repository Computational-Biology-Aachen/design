<!--
  @component

  A controlled, drag-and-drop dashboard grid: boxes laid out on a 6-column grid
  (stacked on mobile) can be moved, resized and removed, with add buttons per row
  and below. Layout is derived from the `items` seed list, and add/remove are
  delegated to callbacks so the parent owns the data. Each box's body is rendered
  via the `children` snippet, which receives the box. See [[DynBoxGrid]] for a
  self-contained demo variant.

  ### Props

  - `items: BoxSeed[]`
    Seed descriptors (`id`, `idx`, `span`, optional `col`, `title`) used to lay
    out the initial boxes.
  - `children: Snippet<[{ box: Box }]>`
    Renders the body of each box; receives `{ box }`.
  - `onAdd: (box: Box) => void`
    Called when the user adds a box.
  - `onRemove: (box: Box) => void`
    Called when the user removes a box.
  - `styleVars?: { [key: string]: string }`
    Optional CSS custom property overrides applied via inline style.

  ### Example

  ```svelte
  <DynBoxRow {items} onAdd={handleAdd} onRemove={handleRemove}>
    {#snippet children({ box })}
      <AnalysisPanel idx={box.idx} />
    {/snippet}
  </DynBoxRow>
  ```
-->
<script lang="ts">
  import Icon from "./Icon.svelte";
  import type { Snippet } from "svelte";
  import { MediaQuery } from "svelte/reactivity";

  const md = new MediaQuery("min-width: 768px");

  export type Box = {
    id: number;
    idx: number;
    col: number;
    span: number;
    title: string;
  };

  type BoxSeed = {
    id: number;
    idx: number;
    span: number;
    col?: number;
    title: string;
  };

  type DragPreview = {
    boxId: number;
    col: number;
    row: number;
    span: number;
    kind: "width" | "move";
  };

  interface Props {
    children: Snippet<[{ box: Box }]>;
    items: BoxSeed[];
    onAdd: (box: Box) => void;
    onRemove: (box: Box) => void;
    styleVars?: { [key: string]: string };
  }

  let {
    children,
    items,
    onAdd,
    onRemove,
    styleVars = {},
  }: Props = $props();

  let inlineStyle = $derived(
    Object.entries(styleVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );

  const GRID_COLS = 6;
  const DEFAULT_COL_SPAN = 3;
  const DEBUG = false;

  function getNextId(initialBoxes: Array<Box[]>): number {
    let maxId = 0;
    for (const row of initialBoxes) {
      maxId += row.length;
    }
    return maxId;
  }

  function findSpotInRowFor(
    rows: Array<Box[]>,
    row: number,
    span: number,
  ): number | null {
    // transient computation local, not reactive state
    // eslint-disable-next-line svelte/prefer-svelte-reactivity
    const occupied = new Set<number>();
    const rowBoxes = rows[row] ?? [];
    for (const box of rowBoxes) {
      for (let c = box.col; c < box.col + box.span; c += 1) {
        occupied.add(c);
      }
    }
    for (let col = 1; col <= GRID_COLS - span + 1; col += 1) {
      let fits = true;
      for (let c = col; c < col + span; c += 1) {
        if (occupied.has(c)) {
          fits = false;
          break;
        }
      }
      if (fits) return col;
    }
    return null;
  }

  function initBoxes() {
    const rows: Box[][] = [];
    let nextSeedId = 1;

    for (const item of items) {
      const span = item.span;
      let row = 0;
      while (true) {
        const col = item.col ?? findSpotInRowFor(rows, row, span);

        if (col !== null) {
          const id = item.id ?? nextSeedId;
          rows[row] = rows[row] ?? [];
          rows[row].push({
            id,
            idx: item.idx,
            col,
            span,
            title: item.title ?? `Analysis ${id}`,
          });
          nextSeedId = Math.max(nextSeedId, id + 1);
          break;
        }
        row += 1;
      }
    }
    return rows;
  }

  let boxes: Box[][] = $derived.by(() => initBoxes());
  let maxRowUsed = $derived(boxes.length);
  let nextId = $derived(getNextId(boxes));

  let gridEl: HTMLDivElement | null = $state(null);
  let DRAG_PREVIEW: DragPreview | null = $state(null);

  /** Check which columns of the row are full */
  function buildOccupancy(row: number, ignoreId?: number): Set<number> {
    // transient computation local, not reactive state
    // eslint-disable-next-line svelte/prefer-svelte-reactivity
    const occupied = new Set<number>();
    for (const box of boxes.at(row) ?? []) {
      if (box.id === ignoreId) continue;
      for (let c = box.col; c < box.col + box.span; c += 1) {
        occupied.add(c);
      }
    }
    return occupied;
  }

  function canPlace(
    row: number,
    col: number,
    span: number,
    ignoreId?: number,
  ): boolean {
    if (col < 1 || row < 0) return false;
    if (col + span - 1 > GRID_COLS) return false;

    const occupied = buildOccupancy(row, ignoreId);
    for (let c = col; c < col + span; c += 1) {
      if (occupied.has(c)) return false;
    }
    return true;
  }

  function clearEmptyRow(row: number) {
    if (boxes[row].length === 0) {
      boxes = [...boxes.slice(0, row), ...boxes.slice(row + 1)];
    }
  }

  function splitByCond(boxes: Box[], boxId: number): [Box[], Box] {
    let boxesFalse = [];
    let boxesTrue = [];

    for (const box of boxes) {
      if (box.id === boxId) {
        boxesTrue.push(box);
      } else {
        boxesFalse.push(box);
      }
    }
    return [boxesFalse, boxesTrue[0]];
  }

  function removeBox(row: number, boxId: number) {
    const [others, box] = splitByCond(boxes[row], boxId);
    boxes[row] = others;
    clearEmptyRow(row);
    onRemove(box);
  }

  function findSpotInRow(row: number, span: number): number | null {
    for (let col = 1; col <= GRID_COLS - span + 1; col += 1) {
      if (canPlace(row, col, span)) return col;
    }
    return null;
  }

  function addRightAtRow(row: number) {
    const col = findSpotInRow(row, 1);
    if (col === null) return;
    const newBox = {
      id: nextId,
      col,
      idx: -1, // garbage value
      span: GRID_COLS - col + 1,
      title: `Analysis ${nextId}`,
    };
    onAdd(newBox);
  }

  function addBelow() {
    const newBox = {
      id: nextId,
      col: 1,
      idx: -1, // garbage value
      span: DEFAULT_COL_SPAN,
      title: `Analysis ${nextId}`,
    };
    onAdd(newBox);
  }

  function getGridMetrics() {
    if (!gridEl) return null;
    const styles = getComputedStyle(gridEl);
    const cell = Number.parseFloat(styles.getPropertyValue("--cell")) || 160;
    const gap = Number.parseFloat(styles.getPropertyValue("--gap")) || 12;
    return { cell, gap, pitch: cell + gap };
  }

  function startResize(
    event: PointerEvent,
    row: number,
    boxId: number,
    kind: "width",
  ) {
    if (event.button !== 0) return;
    const metrics = getGridMetrics();
    if (!metrics) return;
    const box = boxes[row].find((item) => item.id === boxId);
    if (!box) return;

    event.preventDefault();
    (event.currentTarget as HTMLElement | null)?.setPointerCapture(
      event.pointerId,
    );

    const startX = event.clientX;
    const startColSpan = box.span;
    const maxColSpan = GRID_COLS - box.col + 1;

    DRAG_PREVIEW = {
      boxId,
      row: row,
      col: box.col,
      span: box.span,
      kind,
    };

    const handleMove = (moveEvent: PointerEvent) => {
      const delta = moveEvent.clientX - startX;
      const step = Math.round(delta / metrics.pitch);
      const nextColSpan = Math.max(
        1,
        Math.min(maxColSpan, startColSpan + step),
      );
      if (canPlace(row, box.col, nextColSpan, boxId)) {
        DRAG_PREVIEW = {
          boxId,
          row: row,
          col: box.col,
          span: nextColSpan,
          kind,
        };
      }
      return;
    };

    const handleUp = () => {
      if (DRAG_PREVIEW?.boxId === boxId) {
        resizeBox(row, boxId, DRAG_PREVIEW.span);
      }
      DRAG_PREVIEW = null;
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  }

  function startMove(event: PointerEvent, startRow: number, boxId: number) {
    if (event.button !== 0) return;
    const metrics = getGridMetrics();
    if (!metrics) return;
    const box = boxes[startRow].find((item) => item.id === boxId);
    if (!box) return;

    event.preventDefault();
    (event.currentTarget as HTMLElement | null)?.setPointerCapture(
      event.pointerId,
    );

    const startX = event.clientX;
    const startY = event.clientY;
    const startCol = box.col;
    const maxCol = GRID_COLS - box.span + 1;
    const maxRow = boxes.length;

    DRAG_PREVIEW = {
      boxId,
      row: startRow,
      col: box.col,
      span: box.span,
      kind: "move",
    };

    const handleMove = (moveEvent: PointerEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      const stepX = Math.round(deltaX / metrics.pitch);
      const stepY = Math.round(deltaY / metrics.pitch);
      const nextCol = Math.max(1, Math.min(maxCol, startCol + stepX));
      const nextRow = Math.max(0, Math.min(maxRow, startRow + stepY));
      if (canPlace(nextRow, nextCol, box.span, boxId)) {
        DRAG_PREVIEW = {
          boxId,
          row: nextRow,
          col: nextCol,
          span: box.span,
          kind: "move",
        };
      }
    };

    const handlePointerUp = () => {
      if (DRAG_PREVIEW?.boxId === boxId) {
        moveBox(boxId, startRow, DRAG_PREVIEW.row, DRAG_PREVIEW.col);
      }
      DRAG_PREVIEW = null;
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handlePointerUp);
  }

  function rowNotFull(row: number): boolean {
    return findSpotInRow(row, 1) !== null;
  }

  // Functions actually moving objects

  /** Move box to another row.
   * We don't need to check whether we can place the box here, as this is checked
   * by the dragPreview
   */
  function resizeBox(row: number, boxId: number, span: number) {
    boxes[row] = boxes[row].map((box) => {
      if (box.id !== boxId) return box;
      if (!canPlace(row, box.col, span, box.id)) return box;
      return { ...box, span };
    });
    boxes = boxes.slice();
  }

  /** Move box to another row.
   * We don't need to check whether we can place the box here, as this is checked
   * by the dragPreview
   */
  function moveBox(boxId: number, fromRow: number, toRow: number, col: number) {
    const [row, box] = splitByCond(boxes[fromRow], boxId);
    box.col = col;
    boxes[fromRow] = row;
    boxes[toRow] = [...boxes[toRow], box];
    boxes = boxes.slice();
    clearEmptyRow(fromRow);
  }
</script>

<div
  class="grid"
  bind:this={gridEl}
  style={inlineStyle}
>
  {#each boxes as boxRow, row (row)}
    {#each boxRow as box (box.id)}
      <div
        class="box"
        style={`grid-column: ${box.col} / span ${box.span}; grid-row: ${row + 1};`}
      >
        <div class="box-header">
          <div
            class="grabbable"
            role="button"
            tabindex="0"
            onpointerdown={(event) => startMove(event, row, box.id)}
          >
            <h2>{box.title}</h2>
          </div>
          <span>
            <button
              class="close"
              popovertarget="analysis-editor-{box.id}"
            >
              <Icon color="inherit">menu</Icon>
            </button>
            <button
              class="close"
              onclick={() => removeBox(row, box.id)}
            >
              <Icon color="inherit">close</Icon>
            </button>
          </span>
        </div>

        <div class="box-body">
          {@render children({ box })}
        </div>

        {#if md.current}
          <button
            class="resize-handle"
            onpointerdown={(event) => startResize(event, row, box.id, "width")}
            aria-label="Resize width"
          ></button>
        {/if}
      </div>
    {/each}
    {#if rowNotFull(row)}
      <button
        class="add"
        style={`grid-column: ${findSpotInRow(row, 1)} / span 1; grid-row: ${row + 1};`}
        onclick={() => addRightAtRow(row)}
      >
        <Icon color="inherit">add</Icon>
      </button>
    {/if}
  {/each}

  {#if DRAG_PREVIEW}
    <div
      class="preview-box"
      style={`grid-column: ${DRAG_PREVIEW.col} / span ${DRAG_PREVIEW.span}; grid-row: ${DRAG_PREVIEW.row + 1}`}
    >
      {#if DEBUG}
        {DRAG_PREVIEW.row}x{DRAG_PREVIEW.col}
      {/if}
    </div>
  {/if}
  <button
    class="add"
    style={`grid-column: 1 / span ${GRID_COLS}; grid-row: ${maxRowUsed + 1};`}
    onclick={addBelow}
  >
    <Icon color="inherit">add</Icon>
  </button>
</div>

<style>
  .grid {
    --dbr-gap: 1rem;
    --gap: var(--dbr-gap);
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    width: 100%;

    @media (min-width: 768px) {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
    }
  }
  .box {
    --dbr-box-gap: 12px;
    --dbr-box-padding: 2rem;
    display: flex;
    position: relative;
    flex-direction: column;
    gap: var(--dbr-box-gap);
    z-index: 2;
    box-shadow: var(--shadow);
    border: 1px solid #d0d0d0;
    border-radius: var(--radius-lg);
    background-color: var(--color-surface);
    padding: var(--dbr-box-padding);
    width: 100%;
  }

  .grabbable {
    cursor: grab;
  }

  .box-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 4px;
    width: 100%;
  }
  .box-header span {
    display: flex;
    flex-direction: row;
  }

  .box-header:active {
    cursor: grabbing;
  }

  button.close {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: none;
    border-radius: var(--radius-full);
    background-color: var(--color-surface);
    width: 1.5rem;
    height: 1.5rem;
    color: black;
    font-size: 0.75rem;
  }
  button.close:hover {
    background-color: lch(from var(--color-surface) calc(l - 10) c h);
    color: white;
  }

  .resize-handle {
    position: absolute;
    top: 50%;
    right: -8px;
    transform: translateY(-50%);
    opacity: 0;
    transition: opacity 0.2s ease;
    cursor: pointer;
    cursor: ew-resize;
    border: var(--border);
    border-radius: var(--radius-lg);
    background: rgba(120, 120, 120, 0.35);
    width: 18px;
    height: 18px;
  }

  .box-body {
    display: flex;
    flex: 1;
    min-height: 0;
  }

  .box:hover .resize-handle {
    opacity: 1;
  }

  .preview-box {
    z-index: 3;
    border: var(--border-dashed);
    border-radius: var(--radius-lg);
    background: rgba(160, 160, 160, 0.1);
    pointer-events: none;
  }

  button.add {
    display: grid;
    place-items: center;
    z-index: 1;
    transition:
      background 0.2s ease,
      border-color 0.2s ease;
    cursor: pointer;
    border: var(--border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    padding: 10px 16px;
    color: #1f1f1f;
    text-align: center;
  }

  button.add:hover {
    background: rgba(from var(--color-surface), r g b 0.1);
  }
</style>
