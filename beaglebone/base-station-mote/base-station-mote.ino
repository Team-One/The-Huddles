#include <SPI.h>
#include <Ethernet.h>
#include <PubSubClient.h>

// Update these with values suitable for your network.
byte mac[]    = {  0x90, 0xA2, 0xDA, 0x0E, 0xC8, 0x62 };
byte server[] = { 184, 169, 164, 30 };
byte ip[]     = { 192, 168, 0, 177 };


boolean lastConnected = false; 

void callback(char* topic, byte* payload, unsigned int length) 
  {                                                     
  }                                                      // handle message arrived

EthernetClient ethClient;
PubSubClient client(server, 1883, callback, ethClient);

char val = 0;
int incoming = 0;
String content="";                                       //this is where we say "conent" is gonna be a string.

void setup()
{
  Serial.begin(115200);     
  Serial.println("Serial Monitor Connected");
  Ethernet.begin(mac, ip);
    if (Ethernet.begin(mac) == 0) 
      {                                                                                           
      }                                                 // try to congifure using IP address instead of DHCP:     
      
  delay(1000);
    Serial.println("Initialized. BEGIN THE TERROR.");   // Initialize Ethernet
}


void loop()
{
  
  while(Serial.available()) 
    {
        val = Serial.read();
        content.concat(val);
        delay (10);
    }
    
   if (content != "") 
     {
        String rooms = "rooms/";                           //reset the rooms string every time.
        rooms += content[1];
        rooms += content[2];                               //since we're throwing it [xx], we gotta hit places 1 and 2.
        
        Serial.println(rooms);                             //test by printing.
        char roomsBuffer[10];
        rooms.toCharArray(roomsBuffer, 50);
        Serial.println(roomsBuffer);
        
         
          if (client.connect("arduinoClient")) 
            {
              Serial.println("Connected!");
              Serial.println(val);                            //display val with a line return afterward
              client.publish(roomsBuffer, "2");
              Serial.println("Sent true!!");
              Serial.println("disconnecting.");
              client.disconnect();                            //end the connection
             }
          else 
            {
              Serial.println("connection failed");           // kf you didn't get a connection to the server:
            }
      }

    content="";
}


