// app.js：渲染结果
import { sliceFrom } from "./cut.js";
import { splitAt } from "./parts.js";

export function render(spec) {
  const text = String(spec.text === undefined ? "" : spec.text);
  const start = spec.start === undefined ? 0 : spec.start;
  const view = splitAt(text, start);
  const slice = String(view.slice === undefined ? "" : view.slice);
  const head = String(view.head === undefined ? "" : view.head);
  const rest = text.slice(0, Math.max(0, Math.min(text.length, start)));
  return { slice: slice, head: head, tail: sliceFrom(text, start),
           length: slice.length, head_length: head.length, tail_length: slice.length,
           original: text.length, start: start, head_ok: head === rest };
}
