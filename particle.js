// A simple Particle class
var Particle = function(x, y) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.damping = 0.98;
}

// Newton's 2nd law: A = ΣF / M
// If M = 1        : A = ΣF
Particle.prototype.applyForce = function(force) {
  // Accumilate acceleration
  this.acc.add(force);
}

// Method to update location
Particle.prototype.update = function() {
  // Change velocity by acceleration
  this.vel.add(this.acc);
  // Apply some damping
  this.vel.mult(this.damping);
  // Change location by velocity
  this.pos.add(this.vel);
  // Start over with accumilating
  this.acc.mult(0);
}

Particle.prototype.moveTo = function(x, y) {
  var xOffset = this.pos.x - x;
  var yOffset = this.pos.y - y;
  this.pos.set(x, y);
}

Particle.prototype.display = function() {
  // Draw a circle!
  stroke(0);
  strokeWeight(2);
  fill(127);
  ellipse(this.pos.x, this.pos.y, 24, 24);
}
