// A Connected System class with Inheritance
var ConnectedSystem = function() {
  Cloth.call(this);
}

ConnectedSystem.prototype = Object.create(Cloth.prototype);

ConnectedSystem.prototype.constructor = ConnectedSystem;

ConnectedSystem.prototype.display = function() {
  Cloth.prototype.display.call(this);
  for (var i = 0; i < this.particles.length; i++) {
    this.particles[i].particle.display();
  }
}
