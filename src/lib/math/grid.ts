/**
 * Functions for handling the grid in the canvas
 */

export function createGrid(ctx: CanvasRenderingContext2D, width: number, height: number) {
  console.log(width, height);
  ctx.beginPath();
  // ctx.strokeStyle = "blue";
  ctx.globalAlpha = 1;
  ctx.lineWidth = 1;

  for (let i = 1; i < 10; i++) {
    const div = height / 10;
    ctx.moveTo(0, div * i);
    ctx.lineTo(width, div * i);
  }

  for (let i = 1; i < 10; i++) {
    const div = width / 10;
    ctx.moveTo(div * i, 0);
    ctx.lineTo(div * i, height);
  }

  ctx.stroke();
}

export function updateGrid(ctx: CanvasRenderingContext2D) {
  ctx.lineWidth = 1;
  ctx.beginPath();

  for (let i = 0; i < 10; i++) {
    ctx.moveTo(0, i);
    ctx.lineTo(200, i);
    ctx.stroke();
  }
}
