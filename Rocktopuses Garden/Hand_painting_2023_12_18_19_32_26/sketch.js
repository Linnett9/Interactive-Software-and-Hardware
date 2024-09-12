let handpose;
let predictions = [];
let video;
let brushColor;
let brushSize;
let drawing = false;
let previousIndexFingerPosition = null;
let drawingBuffer;
let clickGestureHeld = false;
let clickGestureTime = 0;
const clickGestureDelay = 500; 

function setup() {
  createCanvas(640, 480);
  drawingBuffer = createGraphics(width, height);
  drawingBuffer.background(220);

  // Setup webcam
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // Setup handpose model
  handpose = ml5.handpose(video, modelLoaded);
  handpose.on('hand', results => {
    predictions = results;
  });

  // Create GUI
  brushColor = createColorPicker('#000000');
  brushColor.position(10, height + 10);
  brushSize = createSlider(1, 50, 10);
  brushSize.position(160, height + 10);
}

function modelLoaded() {
  console.log('Model Loaded!');
}

function draw() {
  // Display the webcam feed in the corner of the canvas
  let webcamWidth = 200;
  let webcamHeight = 200;
  image(video, 0, 0, webcamWidth, webcamHeight);

  // Draw the permanent drawing buffer on the main canvas
  image(drawingBuffer, 0, 0);

  // Check for hand predictions
  if (predictions.length > 0) {
    let hand = predictions[0];
    let indexFinger = hand.landmarks[8]; // Tip of the index finger
    let thumb = hand.landmarks[4]; // Tip of the thumb

    // Draw the cross-hair at the index finger position
    drawCrossHair(indexFinger[0], indexFinger[1]);

    // Check distance between index finger and thumb to simulate a painting action
    let d = dist(indexFinger[0], indexFinger[1], thumb[0], thumb[1]);
    if (d < 50 && !clickGestureHeld) {
      // Start the gesture
      clickGestureHeld = true;
      clickGestureTime = millis();
    } else if (d >= 50) {
      // Gesture released
      clickGestureHeld = false;
      drawing = false;
    }

    // If the gesture is held for more than the delay, start drawing
    if (clickGestureHeld && millis() - clickGestureTime > clickGestureDelay) {
      if (!drawing) {
        // Start drawing from the current index finger position
        previousIndexFingerPosition = indexFinger;
        drawing = true;
      }
    }

    // If 'drawing' is true, draw 
    if (drawing && previousIndexFingerPosition) {
      drawingBuffer.stroke(brushColor.value());
      drawingBuffer.strokeWeight(brushSize.value());
      drawingBuffer.line(previousIndexFingerPosition[0], previousIndexFingerPosition[1], indexFinger[0], indexFinger[1]);
      previousIndexFingerPosition = indexFinger;
    }
  } else {
    // If no hand is detected, do not draw
    clickGestureHeld = false;
    drawing = false;
    previousIndexFingerPosition = null;
  }
}

function drawCrossHair(x, y) {
  stroke(255, 0, 0); 
  strokeWeight(1); 
  noFill();
  let crossHairSize = 10;
  line(x - crossHairSize, y, x + crossHairSize, y);
  line(x, y - crossHairSize, x, y + crossHairSize); 
}
