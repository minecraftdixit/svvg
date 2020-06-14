// audio:
var x = document.getElementById("myAudio");

function playAudio() {
  x.load();
  x.play();
}

function pauseAudio() {
  x.pause();
}

// teffect:

var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('typewrite');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #f11414}";
  document.body.appendChild(css);
};






// sine wavw:


let ctx,
  amplitude = 100,
  wavelength = .01,
  frequency = .01,
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

  ctx.strokeStyle = `rgb(238, 29, 15)`;
  ctx.stroke();

  ctx.beginPath();



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