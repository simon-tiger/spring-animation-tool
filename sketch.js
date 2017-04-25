var cloth; // A Connected System Object

// DOM Elements: 1. Declare
var addParticleButton;
var addSpringButton;
var removeParticleButton;
var removeSpringButton;
var clear;
var lengthSlider;
var lengthInput;
var lengthOutput;
var changeLengthButton;
var strengthSlider;
var strengthInput;
var strengthOutput;
var changeStrengthButton;
var examples;

function setup() {
  createCanvas(640, 360);
  // Initialize the Cloth:
  cloth = new ConnectedSystem();

  // DOM Elements: 2. Initialize
  var divAdd = createDiv("");
  var spanAdd = createSpan("adding things:<br><br>");
  spanAdd.parent(divAdd);
  addParticleButton = createButton("add particle");
  addSpringButton = createButton("add spring");
  addParticleButton.parent(divAdd);
  createSpan("<br><br>").parent(divAdd);
  addSpringButton.parent(divAdd);
  divAdd.style("background-color", color(255, 255, 150));
  divAdd.style("color", color(150, 50, 0));
  divAdd.style("padding", "15px 20px");

  var divRemove = createDiv("");
  var spanRemove = createSpan("removing things:<br><br>");
  spanRemove.parent(divRemove);
  removeParticleButton = createButton("remove particle");
  removeSpringButton = createButton("remove spring");
  clear = createButton("clear");
  removeParticleButton.parent(divRemove);
  createSpan("<br><br>").parent(divRemove);
  removeSpringButton.parent(divRemove);
  createSpan("<br><br>").parent(divRemove);
  clear.parent(divRemove);
  divRemove.style("background-color", color(255, 255, 150));
  divRemove.style("color", color(150, 50, 0));
  divRemove.style("padding", "15px 20px");
  divRemove.style("margin-top", "15px");

  var divParameters = createDiv("");
  var spanParameters = createSpan("parameters:<br><br>");
  spanParameters.parent(divParameters);
  lengthOutput = createSpan("32 ");
  lengthSlider = createSlider(0, width, 32);
  lengthInput = createInput("0");
  changeLengthButton = createButton("change length");
  createSpan("length: ").parent(divParameters);
  lengthOutput.parent(divParameters);
  lengthSlider.parent(divParameters);
  createSpan(" index: ").parent(divParameters);
  lengthInput.parent(divParameters);
  createSpan(" ").parent(divParameters);
  changeLengthButton.parent(divParameters);
  createSpan("<br><br>").parent(divParameters);
  strengthOutput = createSpan("0.05 ");
  strengthSlider = createSlider(0, 1, 0.05, 0.01);
  strengthInput = createInput("0");
  changeStrengthButton = createButton("change strength");
  createSpan("strength: ").parent(divParameters);
  strengthOutput.parent(divParameters);
  strengthSlider.parent(divParameters);
  createSpan(" index: ").parent(divParameters);
  strengthInput.parent(divParameters);
  createSpan(" ").parent(divParameters);
  changeStrengthButton.parent(divParameters);
  divParameters.style("background-color", color(255, 255, 150));
  divParameters.style("color", color(150, 50, 0));
  divParameters.style("padding", "15px 20px");
  divParameters.style("margin-top", "15px");

  var divExamples = createDiv("");
  var spanExamples = createSpan("examples:<br><br>");
  spanExamples.parent(divExamples);
  examples = createSelect();
  examples.option("blank");
  examples.option("trapezoid");
  examples.option("hexagon");
  examples.option("ant");
  examples.option("cloth");
  examples.parent(divExamples);
  divExamples.style("background-color", color(255, 255, 150));
  divExamples.style("color", color(150, 50, 0));
  divExamples.style("padding", "15px 20px");
  divExamples.style("margin-top", "15px");

  select("body").style("font-family", "Helvetica, sans-serif");
  select("h1").style("font-weight", "normal");

  // DOM Elements: 3. Add Interaction
  addParticleButton.mousePressed(addParticle);
  addSpringButton.mousePressed(addSpring);

  function addParticle() {
    var particleDiv = createDiv("");
    particleDiv.style("position", "fixed");
    particleDiv.style("top", "20px");
    particleDiv.style("left", "20px");
    particleDiv.style("background-color", color(255));
    particleDiv.style("border", "4px solid lightgray");
    particleDiv.style("border-radius", "10px");
    particleDiv.style("padding", "5px 20px");
    particleDiv.style("padding-bottom", "25px");
    createElement("h1", "Please enter a cartesian coordinate.").parent(particleDiv);
    var xInput = createInput("0");
    var yInput = createInput("0");
    var lock = createCheckbox();
    var createParticleButton = createButton("create particle");
    createSpan("x: ").parent(particleDiv);
    xInput.parent(particleDiv);
    createSpan("<br><br>y: ").parent(particleDiv);
    yInput.parent(particleDiv);
    createSpan("<br><br>locked: ").parent(particleDiv);
    lock.parent(particleDiv);
    createSpan("<br><br>").parent(particleDiv);
    createParticleButton.parent(particleDiv);
    createParticleButton.mousePressed(createParticle);

    function createParticle() {
      cloth.addParticle(Number(xInput.value()), Number(yInput.value()));
      if (lock.checked()) {
        var total = cloth.particles.length;
        cloth.lock(total - 1);
      }
      particleDiv.remove();
    }
  }

  function addSpring() {
    var springDiv = createDiv("");
    springDiv.style("position", "fixed");
    springDiv.style("top", "20px");
    springDiv.style("left", "20px");
    springDiv.style("background-color", color(255));
    springDiv.style("border", "4px solid lightgray");
    springDiv.style("border-radius", "10px");
    springDiv.style("padding", "5px 20px");
    springDiv.style("padding-bottom", "25px");
    createElement("h1", "Please enter two indices.").parent(springDiv);
    var indexA = createInput("0");
    var indexB = createInput("1");
    var restLength = createInput("32");
    var strength = createInput("0.05");
    var createParticleButton = createButton("create spring");
    createSpan("index a: ").parent(springDiv);
    indexA.parent(springDiv);
    createSpan("<br><br>index b: ").parent(springDiv);
    indexB.parent(springDiv);
    createSpan("<br><br>rest length: ").parent(springDiv);
    restLength.parent(springDiv);
    createSpan("<br><br>strength: ").parent(springDiv);
    strength.parent(springDiv);
    createSpan("<br><br>").parent(springDiv);
    createParticleButton.parent(springDiv);
    createParticleButton.mousePressed(createSpring);

    function createSpring() {
      cloth.addSpring(Number(indexA.value()), Number(indexB.value()), Number(restLength.value()), Number(strength.value()));
      springDiv.remove();
    }
  }
}

function draw() {
  background(255);
  // Apply the Force to the Cloth
  cloth.update();
  // Show the Cloth
  cloth.display();
}
