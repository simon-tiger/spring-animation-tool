// A simple Spring class
var Spring = function(a, b, len, strength) {
  this.a = a;
  this.b = b;
  this.restLength = len;
  this.strength = strength;
}

// Method to apply the "Spring Force"
Spring.prototype.applyForce = function() {
  // the Force
  var force = p5.Vector.sub(this.b.pos, this.a.pos);
  // We need to get the distance between point A and point B
  var d = force.mag();
  // How much do we need to stretch?
  var stretch = d - this.restLength;

  // What you saw before with the force variable, was just the first step.
  // The following is calculating the Force further.
  force.setMag(-1 * this.strength * stretch);

  // Apply the Force to point B
  this.b.applyForce(force);

  // Apply the inverse of the Force to point A
  force.mult(-1);
  this.a.applyForce(force);
}

// Method to slow down and stop
Spring.prototype.constrainLength = function(min, max) {
  var dir = p5.Vector.sub(this.b.pos, this.a.pos);
  // We need to get the distance between point A and point B
  var d = dir.mag();
  // Is it too short?
  if (d < min) {
    dir.setMag(min);
    // Stop moving
    this.b.pos.set(p5.Vector.add(this.a.pos, dir));
    this.b.vel.mult(0);
  }
  // Is it too long?
  else if (d > max) {
    dir.setMag(max);
    // Stop moving
    this.b.pos.set(p5.Vector.add(this.a.pos, dir));
    this.b.vel.mult(0);
  }
}

Spring.prototype.displayA = function() {
  rectMode(CENTER);
  stroke(0);
  strokeWeight(2);
  fill(127);
  rect(this.a.pos.x, this.a.pos.y, 10, 10);
}

Spring.prototype.display = function() {
  stroke(0);
  strokeWeight(2);
  line(this.a.pos.x, this.a.pos.y, this.b.pos.x, this.b.pos.y);
}
