#include <SPI.h>
#include <mcp2515.h>
#include <MQTT_SIM800L>

uint8_t data = 0b00000000;

char *buffer;

void setup(){
  for(int i = 8; i > 0; i--){
    buffer += bitRead(data,i) ? '1' : '0';
  }
  
}
void loop(){
  
}