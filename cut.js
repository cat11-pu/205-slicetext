// cut.js：切片（从起点取到末尾）
export function badStart(start) {
  const error = new Error("E_BAD_START: start 必须是 0..text.length 之间的整数，收到 " + String(start));
  error.code = "E_BAD_START";
  return error;
}

export function sliceFrom(text, start) {
  const source = String(text);
  if (!Number.isInteger(start) || start < 0 || start > source.length) {
    throw badStart(start);
  }
  return source.substring(start);
}
