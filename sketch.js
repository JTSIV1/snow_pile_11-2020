const size = 500; // size of display
const numFlakes = 200;
let snowPile = new Array(size); // keeps track of the height of snow piles

// stores the color value fo each collumn of snow
let snowPileColorR = new Array(size);
let snowPileColorG = new Array(size);
let snowPileColorB = new Array(size);
let snowIncrease = 1; // the amount that 1 snowflake will increase the height of a pile
const colorMode = false; // enables color

// parallel arrays representing the position, motion, color, and size of the snow flakes
let flakeX = new Array(numFlakes);
let flakeY = new Array(numFlakes);
let flakeXSpeed = new Array(numFlakes);
let flakeYSpeed = new Array(numFlakes);
let flakeSize = new Array(numFlakes);
let flakeColorR = new Array(numFlakes);
let flakeColorG = new Array(numFlakes);
let flakeColorB = new Array(numFlakes);
let xSpeed = 0; // how much each flake will move left or right
let timer = 0; // used to prevent one button press leading to more  than one input
let smudge = 10; // determines how smooth the snow piles will be

function setup() {
  createCanvas(size - 1, size);

  // sets up piles across the screen with heights of 0
  for (i = 0; i < snowPile.length; i++) {
    snowPile[i] = 1;
    snowPileColorR[i] = 255;
    snowPileColorG[i] = 255;
    snowPileColorB[i] = 255;
  }

  // determines the random atributes of the flakes
  for (i = 0; i < numFlakes; i++) {
    flakeX[i] = int(random(0, size - 1));
    flakeY[i] = int(random(0, size - 1));
    flakeXSpeed[i] = int(random(0, 2));
    flakeYSpeed[i] = random(1, 3);
    flakeSize[i] = int(random(2, 5));
    flakeColorR[i] = int(random(0, 256));
    flakeColorG[i] = int(random(0, 256));
    flakeColorB[i] = int(random(0, 256));
  }
}

function draw() {
  timer++;
  background(0); // black
  fill(255); // white
  stroke(255); // white

  // creates a rectangle for each snow pile and makes sure the overall shape is ~smooth
  for (i = 0; i < snowPile.length; i++) {
    fill(255);
    stroke(255);
    if (colorMode) {
      fill(snowPileColorR[i], snowPileColorG[i], snowPileColorB[i]);
      stroke(snowPileColorR[i], snowPileColorG[i], snowPileColorB[i]);
    }
    rect(i, size - snowPile[i], 1, snowPile[i]);
    if (!(i == 0 || i == size)) {
      if (snowPile[i] > snowPile[i - 1] + smudge) {
        snowPile[i - 1] += smudge;
      }
      if (snowPile[i] > snowPile[i + 1] + smudge) {
        snowPile[i + 1] += smudge;
      }
    }

    // resets the screen if the snow reaches the top
    if (snowPile[i] >= size) {
      for (j = 0; j < snowPile.length; j++) {
        snowPile[j] = 0;
      }
    }
  }

  // creates a left 'wind' when left arrow is pressed
  if (keyIsDown(LEFT_ARROW) && timer > 20) {
    xSpeed -= 1;
    timer = 0;
  }

  // creates a right 'wind' when right arrow is pressed
  if (keyIsDown(RIGHT_ARROW) && timer > 20) {
    xSpeed += 1;
    timer = 0;
  }

  // moves and redraws the snowflakes
  for (i = 0; i < numFlakes; i++) {
    if (colorMode) {
      fill(flakeColorR[i], flakeColorG[i], flakeColorB[i]);
      stroke(flakeColorR[i], flakeColorG[i], flakeColorB[i]);
    }
    circle(flakeX[i], flakeY[i], flakeSize[i]);
    flakeX[i] += xSpeed * flakeXSpeed[i];
    flakeY[i] += flakeYSpeed[i];

    // if the flake is off the screen to the right or left, it gets reset to the top
    if (flakeX[i] > size || flakeX[i] < 0) {
      flakeY[i] = 0;
      flakeX[i] = int(random(0, size - 1));
    }

    // if the flake hits a snow pile at the bottom, it will grow the snow pile and reset the flake
    if (flakeY[i] > size - snowPile[flakeX[i]]) {
      snowPile[flakeX[i]] += snowIncrease;
      snowPileColorR[flakeX[i]] = flakeColorR[i];
      snowPileColorG[flakeX[i]] = flakeColorG[i];
      snowPileColorB[flakeX[i]] = flakeColorB[i];
      flakeY[i] = 0;
      flakeX[i] = int(random(0, size - 1));
    }
  }
}