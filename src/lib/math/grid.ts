/**
 * Functions for handling the grid in the canvas
 */

const drawAxisLines = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  incrementX: number,
  incrementY: number,
  originX: number,
  originY: number,
) => {
  // Vertical lines
  for (let i = incrementX; originX + i < width; i += incrementX) {
    if (originX + i < 0) {
      continue;
    }
    ctx.moveTo(originX + i, 0);
    ctx.lineTo(originX + i, height);
  }
  for (let i = incrementX; originX - i > 0; i += incrementX) {
    if (originX - i > width) {
      continue;
    }
    ctx.moveTo(originX - i, 0);
    ctx.lineTo(originX - i, height);
  }

  // Horizontal lines
  for (let i = incrementY; originY + i < height; i += incrementY) {
    if (originY + i < 0) {
      continue;
    }
    ctx.moveTo(0, originY + i);
    ctx.lineTo(width, originY + i);
  }
  for (let i = incrementY; originY - i > 0; i += incrementY) {
    if (originY - i > height) {
      continue;
    }
    ctx.moveTo(0, originY - i);
    ctx.lineTo(width, originY - i);
  }
};

const renderAxisValue = (ctx: CanvasRenderingContext2D, value: number, x: number, y: number) => {
  ctx.strokeStyle = "white";
  ctx.strokeText(`${value}`, x, y);
  ctx.fillStyle = "black";
  ctx.fillText(`${value}`, x, y);
};

export const clearGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  ctx.clearRect(0, 0, width, height);
};

export const createGrid = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  majorGridSizeX: number,
  majorGridSizeY: number,
  minorGridSizeX: number,
  minorGridSizeY: number,
  incrementX: number,
  incrementY: number,
  originX: number,
  originY: number,
) => {
  const labelOffset = 4;

  ctx.beginPath();
  ctx.globalAlpha = 1;
  ctx.strokeStyle = "#979797";
  ctx.lineWidth = 0.5;

  // Minor axis lines
  drawAxisLines(ctx, width, height, minorGridSizeX, minorGridSizeY, originX, originY);

  ctx.stroke();
  ctx.beginPath();
  ctx.lineWidth = 1;

  // Major axis lines
  drawAxisLines(ctx, width, height, majorGridSizeX, majorGridSizeY, originX, originY);

  ctx.stroke();
  ctx.beginPath();

  // Center axis
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1.5;
  ctx.moveTo(originX, 0);
  ctx.lineTo(originX, height);
  ctx.moveTo(0, originY);
  ctx.lineTo(width, originY);

  ctx.stroke();
  ctx.beginPath();

  // Origin axis label
  ctx.lineWidth = 4;
  ctx.font = "14px sans-serif";
  ctx.textAlign = "right";
  ctx.textBaseline = "top";
  renderAxisValue(ctx, 0, originX - labelOffset, originY + labelOffset);

  // Vertical axis labels
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  for (let i = 1; i * majorGridSizeX < height; i++) {
    renderAxisValue(ctx, i * -incrementY, originX - labelOffset, originY + i * majorGridSizeX);
    renderAxisValue(ctx, i * incrementY, originX - labelOffset, originY - i * majorGridSizeX);
  }

  // Horizontal axis labels
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  for (let i = 1; i * majorGridSizeY < width; i++) {
    renderAxisValue(ctx, i * incrementX, originX + i * majorGridSizeY, originY + labelOffset);
    renderAxisValue(ctx, i * -incrementX, originX - i * majorGridSizeY, originY + labelOffset);
  }

  ctx.stroke();
};
