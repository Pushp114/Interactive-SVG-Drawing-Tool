const svg = document.getElementById("canvas");
const colorInput = document.getElementById("color");
const widthInput = document.getElementById("width");
const widthValue = document.getElementById("width-value");
const clearButton = document.getElementById("clear");

let drawing = false;
let currentPath = null;

function pointFromEvent(evt) {
  const rect = svg.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function startDrawing(evt) {
  drawing = true;
  const { x, y } = pointFromEvent(evt);

  currentPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  currentPath.setAttribute("stroke", colorInput.value);
  currentPath.setAttribute("stroke-width", widthInput.value);
  currentPath.setAttribute("fill", "none"); // Prevent fill
  currentPath.setAttribute("d", `M ${x} ${y}`);
  svg.appendChild(currentPath);

  evt.preventDefault();
}

function draw(evt) {
  if (!drawing || !currentPath) return;
  const { x, y } = pointFromEvent(evt);
  const d = currentPath.getAttribute("d");
  currentPath.setAttribute("d", `${d} L ${x} ${y}`);
  evt.preventDefault();
}

function stopDrawing() {
  drawing = false;
  currentPath = null;
}

svg.addEventListener("mousedown", startDrawing);
svg.addEventListener("mousemove", draw);
svg.addEventListener("mouseup", stopDrawing);
svg.addEventListener("mouseleave", stopDrawing);

clearButton.addEventListener("click", () => {
  svg.innerHTML = "";
});

widthInput.addEventListener("input", () => {
  widthValue.textContent = widthInput.value;
});
