#include <Arduino.h>

void setup() {
  Serial.begin(115200);
}

void loop() {
  if (Serial.available() > 0) {
    String command = Serial.readStringUntil('\n');
    
    if (command.startsWith("Play Explanation for Art Piece ")) {

      int artPieceNumber = command.substring(command.lastIndexOf(' ') + 1).toInt();
      
      Serial.write(artPieceNumber);
    }
  }
}

