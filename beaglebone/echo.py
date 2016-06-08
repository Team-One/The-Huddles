# http://mosquitto.org
#
# initially Andy Piper http://andypiper.co.uk
# 2011/09/15
#!/usr/bin/env python
import serial
import mosquitto
import os
import sys

broker='184.169.164.30'
port = 1883

serialdev = '/dev/ttyO2'



#MQTT callbacks

def on_connect(mosq, obj, rc):
    if rc == 0:
        print("Connected successfully.")
    else:
        raise Exception


def on_disconnect(mosq, obj, rc):
    print("Disconnected successfully.")


def on_publish(mosq, obj, mid):
    print("Message "+str(mid)+" published.")


def on_subscribe(mosq, obj, mid, qos_list):
    print("Subscribe with mid "+str(mid)+" received.")


def on_unsubscribe(mosq, obj, mid):
    print("Unsubscribe with mid "+str(mid)+" received.")


def on_message(mosq, obj, msg):
    print("Message received on topic "+msg.topic+" with QoS "+str(msg.qos)+" and payload "+msg.payload)


#called on exit
#close serial, disconnect MQTT
def cleanup():
    print "Ending and cleaning up"
    ser.close()
    mqttc.disconnect()

try:
    print "Connecting... ", serialdev
    #connect to serial port
    ser = serial.Serial(serialdev, 115200)
except:
    print "Failed to connect serial"
    #unable to continue with no serial input
    raise SystemExit


try:
    ser.flushInput()
    #create an mqtt client
    mypid = os.getpid()
    client_uniq = "arduino_pub_"+str(mypid)
    mqttc = mosquitto.Mosquitto(client_uniq)

    #attach MQTT callbacks
    mqttc.on_connect = on_connect
    mqttc.on_disconnect = on_disconnect
    mqttc.on_publish = on_publish
    mqttc.on_subscribe = on_subscribe