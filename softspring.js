// A simple Soft Spring class
var SoftSpring = function(softness) {
  this.softness = softness;
  this.particles = new Array(this.softness + 1);
  this.springs = new Array(this.softness);
}

SoftSpring.prototype.init = function(a, b, restLength, strength) {
  var r = restLength / this.softness;
  var pa = new Particle(a.x, a.y);
  var pb = new Particle(b.x, b.y);
  this.particles[0] = pa;
  for (var i = 1; i < this.particles.length-1; i++) {
    this.particles[i] = new Particle(a.x, a.y + r * i);
  }
  var total = this.particles.length;
  this.particles[total - 1] = pb;
  for (var i = 0; i < this.springs.length; i++) {
    this.springs[i] = new Spring(this.particles[i], this.particles[i + 1], r, strength);
  }
}

// Method to apply the "Spring Force"
SoftSpring.prototype.applyForce = function() {
  for (var i = 1; i < this.springs.length; i++) {
    this.springs[i].applyForce();
  }
  for (var i = 0; i < this.particles.length; i++) {
    this.particles[i].update();
  }
}

// Method to slow down and stop
SoftSpring.prototype.constrainLength = function(min, max) {
  for (var i = 0; i < this.springs.length; i++) {
    this.springs[i].constrainLength(min / this.softness, max / this.softness);
  }
}

SoftSpring.prototype.displayA = function() {
  this.springs[0].displayA();
}

SoftSpring.prototype.displayB = function() {
  var total = this.particles.length;
  this.particles[total - 1].display();
}

SoftSpring.prototype.display = function() {
  for (var i = 0; i < this.springs.length; i++) {
    this.springs[i].display();
  }
}
