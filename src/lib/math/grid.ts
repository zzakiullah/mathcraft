/**
 * Functions for handling the grid in the canvas
 */

const BLACK = "#000";
const GREY = "#979797";
const DARK_GREY = "#535353";

const drawAxisLines = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  gridIncrementX: number,
  gridIncrementY: number,
  originX: number,
  originY: number,
) => {
  // Vertical lines
  for (let i = gridIncrementX; originX + i < width; i += gridIncrementX) {
    if (originX + i < 0) {
      continue;
    }
    ctx.moveTo(originX + i, 0);
    ctx.lineTo(originX + i, height);
  }
  for (let i = gridIncrementX; originX - i > 0; i += gridIncrementX) {
    if (originX - i > width) {
      continue;
    }
    ctx.moveTo(originX - i, 0);
    ctx.lineTo(originX - i, height);
  }

  // Horizontal lines
  for (let i = gridIncrementY; originY + i < height; i += gridIncrementY) {
    if (originY + i < 0) {
      continue;
    }
    ctx.moveTo(0, originY + i);
    ctx.lineTo(width, originY + i);
  }
  for (let i = gridIncrementY; originY - i > 0; i += gridIncrementY) {
    if (originY - i > height) {
      continue;
    }
    ctx.moveTo(0, originY - i);
    ctx.lineTo(width, originY - i);
  }
};

const renderAxisValue = (
  ctx: CanvasRenderingContext2D,
  value: number,
  x: number,
  y: number,
  fillStyle: string,
) => {
  ctx.strokeStyle = "white";
  ctx.strokeText(`${value}`, x, y);
  ctx.fillStyle = fillStyle;
  ctx.fillText(`${value}`, x, y);
};

const renderAxisValues = (
  ctx: CanvasRenderingContext2D,
  labelOffset: number,
  width: number,
  height: number,
  gridIncrementX: number,
  gridIncrementY: number,
  incrementX: number,
  incrementY: number,
  originX: number,
  originY: number,
) => {
  // Vertical labels
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";

  let verticalLabelFillStyle = BLACK;
  let verticalLabelPositionX = originX - labelOffset;

  // Left out of bounds
  if (originX - labelOffset < 0) {
    ctx.textAlign = "left";
    verticalLabelFillStyle = DARK_GREY;
    verticalLabelPositionX = labelOffset;
  }
  // Right out of bounds
  else if (originX - labelOffset > width) {
    verticalLabelFillStyle = DARK_GREY;
    verticalLabelPositionX = width - labelOffset;
  }

  // Negative values
  for (let i = 1; originY + i * gridIncrementY < height; i++) {
    if (originY + i * gridIncrementY < 0) {
      continue;
    }
    renderAxisValue(
      ctx,
      i * -incrementY,
      verticalLabelPositionX,
      originY + i * gridIncrementY,
      verticalLabelFillStyle,
    );
  }
  // Positive values
  for (let i = 1; originY - i * gridIncrementY > 0; i++) {
    if (originY - i * gridIncrementY > height) {
      continue;
    }
    renderAxisValue(
      ctx,
      i * incrementY,
      verticalLabelPositionX,
      originY - i * gridIncrementY,
      verticalLabelFillStyle,
    );
  }

  // Horizontal labels
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  let horizontalLabelFillStyle = BLACK;
  let horizontalLabelPositionY = originY + labelOffset;

  // Up out of bounds
  if (originY + labelOffset < 0) {
    horizontalLabelFillStyle = DARK_GREY;
    horizontalLabelPositionY = labelOffset;
  }
  // Down out of bounds
  else if (originY + labelOffset > height) {
    ctx.textBaseline = "bottom";
    horizontalLabelFillStyle = DARK_GREY;
    horizontalLabelPositionY = height - labelOffset;
  }

  // Positive values
  for (let i = 1; originX + i * gridIncrementX < width; i++) {
    if (originX + i * gridIncrementX < 0) {
      continue;
    }
    renderAxisValue(
      ctx,
      i * incrementX,
      originX + i * gridIncrementX,
      horizontalLabelPositionY,
      horizontalLabelFillStyle,
    );
  }
  // Negative values
  for (let i = 1; originX - i * gridIncrementX > 0; i++) {
    if (originX + i * gridIncrementX > width) {
      continue;
    }
    renderAxisValue(
      ctx,
      i * -incrementX,
      originX - i * gridIncrementX,
      horizontalLabelPositionY,
      horizontalLabelFillStyle,
    );
  }
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
  ctx.strokeStyle = GREY;
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

  const showVerticalOriginAxis = originX > -labelOffset && originX < width + labelOffset;
  const showHorizontalOriginAxis = originY > -labelOffset && originY < height + labelOffset;

  // Center axis
  ctx.strokeStyle = BLACK;
  ctx.lineWidth = 1.5;
  if (showVerticalOriginAxis) {
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
  }
  if (showHorizontalOriginAxis) {
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
  }

  ctx.stroke();
  ctx.beginPath();

  // Origin axis label
  ctx.lineWidth = 4;
  ctx.font = "14px sans-serif";
  if (showVerticalOriginAxis && showHorizontalOriginAxis) {
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    renderAxisValue(ctx, 0, originX - labelOffset, originY + labelOffset);
  }

  renderAxisValues(
    ctx,
    labelOffset,
    width,
    height,
    majorGridSizeX,
    majorGridSizeY,
    incrementX,
    incrementY,
    originX,
    originY,
  );

  // // Vertical axis labels
  // ctx.textAlign = "right";
  // ctx.textBaseline = "middle";
  // for (let i = 1; i * majorGridSizeX < height; i++) {
  //   renderAxisValue(ctx, i * -incrementY, originX - labelOffset, originY + i * majorGridSizeX);
  //   renderAxisValue(ctx, i * incrementY, originX - labelOffset, originY - i * majorGridSizeX);
  // }

  // // Horizontal axis labels
  // ctx.textAlign = "center";
  // ctx.textBaseline = "top";
  // for (let i = 1; i * majorGridSizeY < width; i++) {
  //   renderAxisValue(ctx, i * incrementX, originX + i * majorGridSizeY, originY + labelOffset);
  //   renderAxisValue(ctx, i * -incrementX, originX - i * majorGridSizeY, originY + labelOffset);
  // }

  ctx.stroke();
};
