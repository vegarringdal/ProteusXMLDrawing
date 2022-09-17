# ProteusXMLDrawing

Experiment on trying to take dexpi xml and convert to drawing using svg/or canvas lib

[demo link](https://vegarringdal.github.io/ProteusXMLDrawing)

See spec folder under public for more info


Info/issues/missing/notes to my self:
- filled "shape/circle/ellipse, will probably have issues with "hatch" filltype
- hidden layers? (atm I dont show text on layers that cointain "hidden")
- text alignment atm looks like 100% ok, I use extent to place it/resize it
   - so text without extent will not work /be skipped
- styled text (not seen these used, need samples to try - this might be hard with papejs..)
- BsplineCurve (not seen these used, I need samples to try)
- CompositeCurve (not seen these used, I need samples to try)
- rotation/scale of items -> this will need some more work.
  -  Inverted z axis (flip around y axis) : <Axis X="0" Y="0" Z="-1"/>  (I have not looked into this)
  -  Rotation about the origin :  <Reference X=”[cosØ]” Y=”[sinØ]” Z=”0” /> (Hopefully this is fixed now)
    - can shape or lines have rotation ?
  -  Scaling looks ok on samples Ive found..


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







