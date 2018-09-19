# huddle-tutorial
Huddle showing steps to set up a system of your own. The files above are the 3d printable files for the Moteino Base Station box that sits on top of the Windows machine.



<strong> Sensor Hardware:</strong>

Moteino
<br>
https://lowpowerlab.com/shop/moteino-r4

PIR Sensor
<br>
https://www.amazon.com/DIYmall-HC-SR501-Pyroelectric-Infrared-Detector/dp/B012ZZ4LPM/ref=sr_1_4?ie=UTF8&qid=1470775009&sr=8-4&keywords=motion+sensor+arduino

Power Switch
<br>
https://www.sparkfun.com/products/102

<br>
<br>

----------

<br>
<br>


<strong> Base Station Hardware: </strong>

Moteino
<br>
https://lowpowerlab.com/shop/moteinousb

USB Mini Cable
<br>
https://www.amazon.com/Ziotek-ZT1311550-7-5-Inch-5-Pin-Cable/dp/B004PB846W/ref=sr_1_1?ie=UTF8&qid=1470772567&sr=8-1&keywords=short+mini+usb+cable

<br>
<br>

----------

<br>
<br>


<strong> Computer: </strong>

Windows 10 machine. We used a NUC for this build.

NUC
<br>
https://www.amazon.com/Intel-NUC5CPYH-Graphics-2-5-Inch-BOXNUC5CPYH/dp/B00XPVRR5M/ref=sr_1_1?s=pc&ie=UTF8&qid=1470775155&sr=1-1&keywords=nuc

SSD
<br>
https://www.amazon.com/Kingston-Digital-SSDNow-SV300S37A-120G/dp/B00A1ZTZOG/ref=pd_bxgy_147_img_3?ie=UTF8&refRID=1VQ01J6C16BWTY2V8J6J

RAM
<br>
https://www.amazon.com/Kingston-Technology-1600MHz-PC3-12800-KVR16LS11/dp/B00CQ35GYE/ref=pd_bxgy_147_img_2?ie=UTF8&refRID=1VQ01J6C16BWTY2V8J6J

<br>
<br>


----------

<br>
<br>


<strong> Misc Hardware: </strong>

FTDI Programmer
<br>
https://www.sparkfun.com/products/9716

<br>
<br>

----------

<br>
<br>

<strong> Programs: </strong>

Arduino IDE  
https://www.arduino.cc/en/Main/Software


Windows Port Driver 
<br>
Your Arduino port will be grayed out without installing. Download the one that says Windows 7/8/8.1/10


![Schematic](https://github.com/dplumly/huddle-tutorial/blob/master/images/image3.png)

<br>
<br>

----------

<br>
<br>

AlwaysUp (this is to make sure the python script runs on startup and is always running.
<br>
http://www.coretechnologies.com/products/AlwaysUp/

Python 2.7.12
<br>
https://www.python.org/downloads/




<strong> Install Dependencies </strong>
<br>
pip install pyserial
<br>
pip install paho-mqtt

<br>
<br>

----------

<br>
<br>

<strong> Tutorial: </strong>

For this tutorial we will assume you already have a computer running Windows 10.

First thing we will want to do is get the computer or Base Station setup. In our case, this is our NUC computer and Moteino with USB port. We need to install the programs listed above to the Windows machine. 

Now that we have all the programs installed we can move on to the Arduino or more specific, the Moteino. We will start by building out the hardware. Here is a Fritzing of how we will hook this up (do not forget to solder on the antenna sold with the Moteino). 


![Schematic](https://github.com/dplumly/huddle-tutorial/blob/master/images/image4.jpg)

<br>
<br>

----------

<br>
<br>

Before we actually load the sketch onto the board we need to install the necessary arduino libraries into the libraries folder. Here is a link if you need more information on how to do so, https://www.arduino.cc/en/Guide/Libraries. We will use the FTDI programmer to load the sketch on this Moteino. The sketch is called MoteinoGate.ino. We are only going to program one node in this example, if you want to program more you will change the “NODEID” to a different number as shown in the picture below. 

![Schematic](https://github.com/dplumly/huddle-tutorial/blob/master/images/image1.png)

<br>
<br>

----------

<br>
<br>


Now that we have the motion sensor all hooked up and the programmed we can setup the Moteino Base Station. We need to load ArduinoBaseGate.ino on to the Moteino. This we can just use a mini USB cable to load the sketch. Make note of the COM PORT you are on because this will have to match the same in the huddle-echo.py script. (just change the COM PORT in the python script). Picture below.


![Schematic](https://github.com/dplumly/huddle-tutorial/blob/master/images/image6.png)

<br>
<br>

----------

<br>
<br>


We are almost done. The last things we have left are going to be on the computer. First, we will install the Python Modules. Here is a link for further information on how to do so. https://docs.python.org/2/installing/ 

Now open up AlwaysUp and click on the gear icon with the plus. The screenshots below depict what you will need to fill in. The tabs you will enter information in are as followed

<br>
<br>

----------

<br>
<br>


<strong> General: </strong>

![Schematic](https://github.com/dplumly/huddle-tutorial/blob/master/images/image5.png)


<br>
<br>

----------

<br>
<br>


<strong> Logon: </strong>

![Schematic](https://github.com/dplumly/huddle-tutorial/blob/master/images/image8.png)


<br>
<br>

----------

<br>
<br>


<strong> Restart: </strong>

![Schematic](https://github.com/dplumly/huddle-tutorial/blob/master/images/image9.png)


<br>
<br>

----------

<br>
<br>


<strong> Start Up: </strong>

![Schematic](https://github.com/dplumly/huddle-tutorial/blob/master/images/image2.png)


<br>
<br>

----------

<br>
<br>

<strong> Extras: </strong>

![Schematic](https://github.com/dplumly/huddle-tutorial/blob/master/images/image7.png)


<br>
<br>



Now we have everything installed and running. 

----------
