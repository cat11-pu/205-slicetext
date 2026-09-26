// parts.js：两半（head + slice 拼回原文，tail 等于 slice）
import { sliceFrom, badStart } from "./cut.js";

export function splitAt(text, start) {
  const source = String(text);
  if (!Number.isInteger(start) || start < 0 || start > source.length) {
    throw badStart(start);
  }
  const slice = sliceFrom(source, start);
  const head = source.substring(0, start);
  return { slice: slice, head: head, tail: slice };
}
