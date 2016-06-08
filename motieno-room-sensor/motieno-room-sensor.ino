#include <RFM69.h>
#include <SPI.h>
#include <LowPower.h> 
                      
#define NODEID        39    // Unique for each node on same network. CHANGE THIS EACH TIME.
#define NETWORKID     100  // the same on all nodes that talk to each other
#define GATEWAYID     1

#define SERIAL_BAUD   115200
#define FREQUENCY     RF69_433MHZ
#define ENCRYPTKEY    "sampleEncryptKey"
#define ACK_TIME      30   // max # of ms to wait for an ack
#define LED           9    // Moteinos have LEDs on D9
#define MOTIONPIN     1    //hardware interrupt 1 (D3)

int TRANSMITPERIOD = 300; //transmit a packet to gateway so often (in ms)
RFM69 radio;
volatile boolean motionDetected=false;

void setup() {
    Serial.begin(SERIAL_BAUD);
    radio.initialize(FREQUENCY,NODEID,NETWORKID);
    #ifdef IS_RFM69HW
        radio.setHighPower(); 
    #endif
    radio.encrypt(ENCRYPTKEY);
    attachInterrupt(MOTIONPIN, motionIRQ, RISING);
    char buff[50];
    sprintf(buff, "\nTransmitting at %d Mhz...", FREQUENCY==RF69_433MHZ ? 433 : FREQUENCY==RF69_868MHZ ? 868 : 915);
    Serial.println(buff);
}




void motionIRQ()
{
  motionDetected=true;
}



void loop() {
  if (motionDetected)
  {
      if (radio.sendWithRetry(GATEWAYID, "MOTION", 6))
      {
         Serial.println (" ok!");
         Blink(LED,3);
      }
      else Serial.println (" nothing...");
      motionDetected=false;
      }
      radio.sleep();
      LowPower.powerDown(SLEEP_8S, ADC_OFF, BOD_OFF);
   }




  void Blink(byte PIN, int DELAY_MS)
  {
      pinMode(PIN, OUTPUT);
      digitalWrite(PIN,HIGH);
      delay(DELAY_MS);
      digitalWrite(PIN,LOW);
  }




