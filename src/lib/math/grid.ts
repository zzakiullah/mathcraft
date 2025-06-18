/**
 * Functions for handling the grid in the canvas
 */

const renderAxisValue = (ctx: CanvasRenderingContext2D, value: number, x: number, y: number) => {
  ctx.strokeStyle = "white";
  ctx.strokeText(`${value}`, x, y);
  ctx.fillStyle = "black";
  ctx.fillText(`${value}`, x, y);
};

export function clearGrid(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.clearRect(0, 0, width, height);
}

export function createGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  majorGridSize: number,
  minorGridSize: number,
  xAxisIncrement: number,
  yAxisIncrement: number,
  xOriginOffset: number,
  yOriginOffset: number,
) {
  ctx.beginPath();
  ctx.globalAlpha = 1;

  const labelOffset = 4;
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  const startX = halfWidth + xOriginOffset;
  const startY = halfHeight + yOriginOffset;

  ctx.strokeStyle = "#979797";
  ctx.lineWidth = 0.5;

  // Vertical minor lines
  for (let i = minorGridSize; startX + i < width; i += minorGridSize) {
    ctx.moveTo(startX + i, 0);
    ctx.lineTo(startX + i, height);
  }
  for (let i = minorGridSize; startX - i > 0; i += minorGridSize) {
    ctx.moveTo(startX - i, 0);
    ctx.lineTo(startX - i, height);
  }

  // Horizontal major lines
  for (let i = minorGridSize; startY + i < height; i += minorGridSize) {
    ctx.moveTo(0, startY + i);
    ctx.lineTo(width, startY + i);
  }
  for (let i = minorGridSize; startY - i > 0; i += minorGridSize) {
    ctx.moveTo(0, startY - i);
    ctx.lineTo(width, startY - i);
  }

  ctx.stroke();
  ctx.beginPath();
  ctx.lineWidth = 1;

  // Vertical major lines
  for (let i = majorGridSize; startX + i < width; i += majorGridSize) {
    ctx.moveTo(startX + i, 0);
    ctx.lineTo(startX + i, height);
  }
  for (let i = majorGridSize; startX - i > 0; i += majorGridSize) {
    ctx.moveTo(startX - i, 0);
    ctx.lineTo(startX - i, height);
  }

  // Horizontal major lines
  for (let i = majorGridSize; startY + i < height; i += majorGridSize) {
    ctx.moveTo(0, startY + i);
    ctx.lineTo(width, startY + i);
  }
  for (let i = majorGridSize; startY - i > 0; i += majorGridSize) {
    ctx.moveTo(0, startY - i);
    ctx.lineTo(width, startY - i);
  }

  ctx.stroke();
  ctx.beginPath();

  // Center axis
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1.5;
  ctx.moveTo(startX, 0);
  ctx.lineTo(startX, height);
  ctx.moveTo(0, startY);
  ctx.lineTo(width, startY);

  ctx.stroke();
  ctx.beginPath();

  // Origin axis label
  ctx.lineWidth = 4;
  ctx.font = "14px sans-serif";
  ctx.textAlign = "right";
  ctx.textBaseline = "top";
  renderAxisValue(ctx, 0, startX - labelOffset, startY + labelOffset);

  // Vertical axis labels
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  for (let i = 1; i * majorGridSize < height; i++) {
    renderAxisValue(ctx, i * -yAxisIncrement, startX - labelOffset, startY + i * majorGridSize);
    renderAxisValue(ctx, i * yAxisIncrement, startX - labelOffset, startY - i * majorGridSize);
  }

  // Horizontal axis labels
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  for (let i = 1; i * majorGridSize < width; i++) {
    renderAxisValue(ctx, i * xAxisIncrement, startX + i * majorGridSize, startY + labelOffset);
    renderAxisValue(ctx, i * -xAxisIncrement, startX - i * majorGridSize, startY + labelOffset);
  }

  ctx.stroke();
}
