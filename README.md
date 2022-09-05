# ProteusXMLDrawing

Experiment on trying to take dexpi xml and convert to drawing using svg/or canvas lib

[demo link](https://vegarringdal.github.io/ProteusXMLDrawing)

See spec folder under public for more info


Issues/Need more work:
- filled element (solid circle and ellipse should work, not tried closed paths on shape, if I can support "hatch" filltype I do not know )
- hidden layers? (atm I dont show text on layers that cointain "hidden")
- text alignment atm looks like 95% is ok (we dont get font size, atm I try and use extent of text to adjust size, since height/width have been weird in samples I tried, if spec had font size/line height it would have been so much easier)
- styled text (not seen these used, need samples to try - this might be hard with papejs..)
- extent (this is min bounding size, not tested if this match what I draw)
- BsplineCurve (not seen these used, I need samples to try)
- CompositeCurve (not seen these used, I need samples to try)
- rotation/scale of items -> this will need some work.. (I should try and get a drawing program that exports xml, so I can make tests)
  -  Inverted z axis (flip around y axis) : <Axis X="0" Y="0" Z="-1"/>
  -  Rotation about the origin :  <Reference X=”[cosØ]” Y=”[sinØ]” Z=”0” /> 

Image of progress

[C01V01-HEX.EX03.xml](https://github.com/vegarringdal/ProteusXMLDrawing/blob/main/public/TrainingTestCases/tests/C01%20the%20complete%20DEXPI%20PnID/C01V01-HEX.EX03.xml)

Update 15.07.22:

![image](https://user-images.githubusercontent.com/94840334/179200130-8f4e132b-5a5e-4388-a1d0-bfb30a498951.png)


![image](https://user-images.githubusercontent.com/94840334/179200099-426bce47-c079-4384-9f63-69f6086a1a8e.png)


![image](https://user-images.githubusercontent.com/94840334/179200167-1b3c5771-6a83-45e7-963e-072b453c2899.png)



How to get started
* `git clone git@github.com:vegarringdal/ProteusXMLDrawing.git` or `https://github.com/vegarringdal/vegarringdal/ProteusXMLDrawing`
* `cd vegarringdal/ProteusXMLDrawing`
* `npm install`
* `npm start` <- dev server during development
  *  this runs application and opens file in public folder (as seen in images): 
     * `/TrainingTestCases/tests/C01 the complete DEXPI PnID/C01V01-HEX.EX03.xml`







