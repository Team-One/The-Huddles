#!/usr/bin/python
# -*- coding: utf-8 -*-
# simple app to read string from serial port (arduino board)
# and publish via MQTT
# uses the Python MQTT client from the Mosquitto project
# http://mosquitto.org
#
# initially Andy Piper http://andypiper.co.uk
# 2011/09/15

import serial
import paho.mqtt.client as paho
import os
import sys

broker = '184.169.164.30'
port = 1883

serialdev = 'COM4'


# MQTT callbacks

def on_connect(mosq, obj, rc):
    if rc == 0:
        print 'Connected successfully.'
    else:
        raise Exception


def on_disconnect(mosq, obj, rc):
    print 'Disconnected successfully.'


def on_publish(mosq, obj, mid):
    print 'Message ' + str(mid) + ' published.'


def on_subscribe(
    mosq,
    obj,
    mid,
    qos_list,
    ):
    print 'Subscribe with mid ' + str(mid) + ' received.'


def on_unsubscribe(mosq, obj, mid):
    print 'Unsubscribe with mid ' + str(mid) + ' received.'


def on_message(mosq, obj, msg):
    print 'Message received on topic ' + msg.topic + ' with QoS ' \
        + str(msg.qos) + ' and payload ' + msg.payload


# called on exit
# close serial, disconnect MQTT

def cleanup():
    print 'Ending and cleaning up'
    ser.close()
    mqttc.disconnect()


try:
    print 'Connecting... ', serialdev

    # connect to serial port

    ser = serial.Serial(serialdev, 115200, timeout=600)
except:
    print 'Failed to connect serial'

    # unable to continue with no serial input

    raise SystemExit

try:
    ser.flushInput()

    # create an mqtt client

    mypid = os.getpid()
    client_uniq = 'arduino_pub_' + str(mypid)
    mqttc = paho.Client(client_uniq)

    # attach MQTT callbacks

    mqttc.on_connect = on_connect
    mqttc.on_disconnect = on_disconnect
    mqttc.on_publish = on_publish
    mqttc.on_subscribe = on_subscribe
    mqttc.on_unsubscribe = on_unsubscribe

    # mqttc.on_message = on_message

    # connect to broker

    mqttc.connect(broker, port, 60)

    # remain connected to broker
    # read data from serial and publish

    while mqttc.loop() == 0:
        line = ser.readline()

        # split line as it contains V,temp

        list = line.split('/')

        # second list element is temp

        temp = list[2].rstrip()
        data = 'rooms/' + temp
        print 'data:' + data
        mqttc.publish(data, 2)
        pass
except IndexError:

# handle list index error (i.e. assume no data received)

    print 'No data received within serial timeout period'
    cleanup()
except KeyboardInterrupt:

# handle app closure

    print 'Interrupt received'
    cleanup()
except RuntimeError:
    print 'uh-oh! time to die'
    cleanup()
