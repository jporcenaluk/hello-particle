// ------------
// Blink an LED
// ------------

int led1 = D0; // Turn pin into a friendly name

void setup() {

  pinMode(led1, OUTPUT); // Set pin to output

}

void loop() {
    
  // Turn on LED
  digitalWrite(led1, HIGH);

  // We'll leave it on for 6 seconds...
  delay(6000);
  
  // Tell IoT Hub
  Particle.publish("default_event", "You turned the light on", PRIVATE);

  // Then we'll turn it off...
  digitalWrite(led1, LOW);

  // Wait 6 seconds...
  delay(6000);
  
  // Tell IoT Hub
  Particle.publish("default_event", "You turned the light off", PRIVATE);

  // And repeat!
}
