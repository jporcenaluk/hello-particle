int ledPin = D7;

void setup() {
    pinMode(ledPin, OUTPUT);
}

void loop() {
    digitalWrite(ledPin, LOW);
    delay(250);
    digitalWrite(ledPin, HIGH);
    delay(250);
}