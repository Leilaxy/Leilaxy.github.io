let gridSize = 20;
let noiseScale = 0.1;
let particles = [];
let ripples = [];

function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);

  noiseDetail(4, 0.5);
  generateParticles();
}

function draw() {
  background(0, 0, 30);

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
    p.interact();
  }

  for (let i = 0; i < ripples.length; i++) {
    let ripple = ripples[i];
    ripple.interact();
    ripple.display();
    ripple.update();
  }
}

function generateParticles() {
  for (let x = 0; x < width; x += gridSize) {
    for (let y = 0; y < height; y += gridSize) {
      let xOffset = random(1000);
      let yOffset = random(1000);
      let particle = new Particle(x, y, xOffset, yOffset);
      particles.push(particle);
    }
  }
}

class Particle {
  constructor(x, y, xOffset, yOffset) {
    this.x = x;
    this.y = y;
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.radius = gridSize / 2;
    this.color = color(random(200, 260), 80, random(60, 100), 10);
  }

  update() {
    let noiseVal = noise(this.xOffset + frameCount * noiseScale, this.yOffset);
    this.x += map(noiseVal, 0, 1, -1, 1);
    noiseVal = noise(this.xOffset, this.yOffset + frameCount * noiseScale);
    this.y += map(noiseVal, 0, 1, -1, 1);
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  display() {
    stroke(this.color);
    strokeWeight(1);
    line(this.x, this.y, this.x + this.radius, this.y + this.radius);
  }

  interact() {
    for (let i = 0; i < particles.length; i++) {
      let other = particles[i];
      if (other != this) {
        let d = dist(this.x, this.y, other.x, other.y);
        if (d < gridSize) {
          let alpha = map(d, 0, gridSize, 255, 30);
          stroke(hue(this.color), saturation(this.color), brightness(this.color), alpha);
          strokeWeight(map(d, 0, gridSize, 6, 1));
          line(this.x, this.y, other.x, other.y);
        }
      }
    }
  }
}

class Ripple {
  constructor(x, y, strength, hue) {
    this.x = x;
    this.y = y;
    this.strength = strength;
    this.radius = 0;
    this.maxRadius = random(40, 80);
    this.color = color(hue, 80, 80, 50);
    this.opacity = 255;
  }

  update() {
    this.radius += 5;
    this.opacity -= 5;
    if (this.opacity <= 0) {
      ripples.splice(ripples.indexOf(this), 1);
    }
  }

  display() {
    noFill();
    stroke(hue(this.color), saturation(this.color), brightness(this.color), this.opacity);
    strokeWeight(map(this.radius, 0, this.maxRadius, 10, 0));
    ellipse(this.x, this.y, this.radius, this.radius);
  }

  interact() {
    for (let i = 0; i < ripples.length; i++) {
      let other = ripples[i];
      if (other != this) {
        let d = dist(this.x, this.y, other.x, other.y);
        if (d < this.radius && d > this.radius - 20) {
          let strength = map(d, this.radius - 20, this.radius, this.strength, 0);
          other.strength = max(strength, other.strength);
        }
      }
    }
  }
}

function mouseClicked() {
  let ripple = new Ripple(mouseX, mouseY, random(30, 70), random(220, 300));
  ripples.push(ripple);
}