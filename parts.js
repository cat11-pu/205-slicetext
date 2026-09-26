// parts.js：两半（slice 起点到末尾，head 开头到起点前面，tail 等于 slice）
import { sliceFrom } from "./cut.js";

export function splitAt(text, start) {
  const slice = sliceFrom(text, start);
  const head = String(text).slice(0, start);
  return { slice: slice, head: head, tail: slice };
}
