let ctx,
  amplitude = 50,
  wavelength = .01,
  frequency = 0.01,
  df = frequency,
  W = innerWidth,
  H = innerHeight;


const update = () => {
  if (ctx == null) return;

  df += frequency;

  ctx.beginPath();
  ctx.moveTo(0, H / 2);
  for (let i = 0; i < W; i++) {
    ctx.lineTo(i, (H / 2) + Math.cos(i * wavelength + df -
      Math.cos(amplitude / df)) * amplitude * Math.tan(df));
  }

  ctx.strokeStyle = `red`;
  ctx.stroke();

  ctx.beginPath();



  ctx.fill();
  ctx.closePath();
}

alpha = 0;
const animate = () => {
  alpha++;
  ctx.fillStyle = `rgba(0, 0, 0, ${Math.abs(Math.sin(alpha) * 0.05)})`;
  ctx.fillRect(0, 0, W, H);
  update();
  requestAnimationFrame(animate);
}

const init = () => {
  ctx = document.querySelector("#cvs").getContext("2d");
  ctx.canvas.width = W;
  ctx.canvas.height = H;

  requestAnimationFrame(animate);
}

window.addEventListener("load", init);