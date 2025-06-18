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
  xIncrement: number,
  yIncrement: number,
) {
  ctx.beginPath();
  ctx.globalAlpha = 1;

  const labelOffset = 4;
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  ctx.strokeStyle = "#979797";
  ctx.lineWidth = 0.5;

  // Vertical minor lines
  for (let i = minorGridSize; i < width; i += minorGridSize) {
    ctx.moveTo(halfWidth + i, 0);
    ctx.lineTo(halfWidth + i, height);
    ctx.moveTo(halfWidth - i, 0);
    ctx.lineTo(halfWidth - i, height);
  }

  // Horizontal major lines
  for (let i = minorGridSize; i < height; i += minorGridSize) {
    ctx.moveTo(0, halfHeight + i);
    ctx.lineTo(width, halfHeight + i);
    ctx.moveTo(0, halfHeight - i);
    ctx.lineTo(width, halfHeight - i);
  }

  ctx.stroke();
  ctx.beginPath();
  ctx.lineWidth = 1;

  // Vertical major lines
  for (let i = majorGridSize; i < width; i += majorGridSize) {
    ctx.moveTo(halfWidth + i, 0);
    ctx.lineTo(halfWidth + i, height);
    ctx.moveTo(halfWidth - i, 0);
    ctx.lineTo(halfWidth - i, height);
  }

  // Horizontal major lines
  for (let i = majorGridSize; i < height; i += majorGridSize) {
    ctx.moveTo(0, halfHeight + i);
    ctx.lineTo(width, halfHeight + i);
    ctx.moveTo(0, halfHeight - i);
    ctx.lineTo(width, halfHeight - i);
  }

  ctx.stroke();
  ctx.beginPath();

  // Center axis
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1.5;
  ctx.moveTo(halfWidth, 0);
  ctx.lineTo(halfWidth, height);
  ctx.moveTo(0, halfHeight);
  ctx.lineTo(width, halfHeight);

  ctx.stroke();
  ctx.beginPath();

  // Origin axis label
  ctx.lineWidth = 4;
  ctx.font = "14px sans-serif";
  ctx.textAlign = "right";
  ctx.textBaseline = "top";
  renderAxisValue(ctx, 0, halfWidth - labelOffset, halfHeight + labelOffset);

  // Vertical axis labels
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  for (let i = 1; i * majorGridSize < height; i++) {
    renderAxisValue(ctx, i * -yIncrement, halfWidth - labelOffset, halfHeight + i * majorGridSize);
    renderAxisValue(ctx, i * yIncrement, halfWidth - labelOffset, halfHeight - i * majorGridSize);
  }

  // Horizontal axis labels
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  for (let i = 1; i * majorGridSize < width; i++) {
    renderAxisValue(ctx, i * xIncrement, halfWidth + i * majorGridSize, halfHeight + labelOffset);
    renderAxisValue(ctx, i * -xIncrement, halfWidth - i * majorGridSize, halfHeight + labelOffset);
  }

  ctx.stroke();
}
