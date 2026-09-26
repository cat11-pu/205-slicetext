// cut.js：切片（从起点取到末尾，起点非法报 E_BAD_START）
export function sliceFrom(text, start) {
  const source = String(text);
  if (!Number.isInteger(start) || start < 0 || start > source.length) {
    const error = new Error("E_BAD_START: 起点 " + String(start) + " 超出 [0, " + source.length + "]");
    error.code = "E_BAD_START";
    throw error;
  }
  return source.slice(start);
}
