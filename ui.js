// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  let start = spec.start || 0;
  parts.log.textContent = "文本长度 " + String(spec.text || "").length + "，起点 " + start + "。";

  function draw() {
    let view = null;
    try {
      view = render(Object.assign({}, spec, { start: start }));
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    const line = document.createElement("div");
    line.className = "row";
    const head = document.createElement("span");
    head.textContent = "切片";
    line.appendChild(head);
    const mark = document.createElement("span");
    mark.className = "chip ok";
    mark.textContent = view.slice === "" ? "（空）" : view.slice;
    line.appendChild(mark);
    const tail = document.createElement("span");
    tail.className = "chip";
    tail.textContent = "尾部 " + (view.tail === "" ? "（空）" : view.tail);
    line.appendChild(tail);
    parts.stage.appendChild(line);
    parts.legend.textContent = "切片长度 " + view.length + "，尾部长度 " + view.tail_length;
    parts.log.textContent = "起点 " + start + "，文本长度 " + view.original;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "切一刀";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const moreButton = document.createElement("button");
  moreButton.textContent = "起点加一";
  moreButton.addEventListener("click", function () {
    start = start + 1;
    draw();
  });
  parts.controls.appendChild(moreButton);

  const lessButton = document.createElement("button");
  lessButton.textContent = "起点减一";
  lessButton.addEventListener("click", function () {
    start = Math.max(0, start - 1);
    draw();
  });
  parts.controls.appendChild(lessButton);

  const label = document.createElement("label");
  label.textContent = "起点";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "number";
  box.value = String(start);
  box.addEventListener("input", function () {
    const parsed = Number(box.value);
    if (parsed >= 0) { start = parsed; draw(); }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看切片长度";
  readButton.addEventListener("click", function () {
    const view = render(Object.assign({}, spec, { start: start }));
    parts.out.textContent = "切片长度 " + view.length + "，尾部长度 " + view.tail_length;
  });
  parts.controls.appendChild(readButton);

  draw();
}
