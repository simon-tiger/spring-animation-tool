// A simple Connected System class
var Cloth = function() {
  this.particles = [];
  this.springs = [];
  this.softSprings = [];
}

// Method to add a Particle
Cloth.prototype.addParticle = function(x, y) {
  this.particles.push({
    particle: new Particle(x, y),
    isStatic: false
  });
}

// Method to add a Spring
Cloth.prototype.addSpring = function(i, j, restLength, strength) {
  this.springs.push(new Spring(this.particles[i].particle, this.particles[j].particle, restLength, strength));
}

// Method to add a Soft Spring
Cloth.prototype.addSoftSpring = function(softness, i, b, restLength, strength) {
  this.softSprings.push(new SoftSpring(softness));
  var total = this.softSprings.length;
  this.softSprings[total - 1].init(this.particles[i].pos, b, restLength, strength);
}

// Method to apply the "Spring Force"
Cloth.prototype.update = function() {
  for (var i = 0; i < this.springs.length; i++) {
    this.springs[i].applyForce();
  }
  for (var i = 0; i < this.particles.length; i++) {
    if (!this.particles[i].isStatic) {
      this.particles[i].particle.update();
    }
  }
}

// Method to "lock" Particles
Cloth.prototype.lock = function(i) {
  this.particles[i].isStatic = true;
}

Cloth.prototype.display = function() {
  for (var i = 0; i < this.springs.length; i++) {
    this.springs[i].display();
  }
  for (var i = 0; i < this.softSprings.length; i++) {
    this.softSprings[i].display();
  }
}
