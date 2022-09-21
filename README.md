# ProteusXMLDrawing

Experiment on trying to take dexpi xml and convert to drawing using [Paper.js](http://paperjs.org/)



> Feel free to open a [discussion](https://github.com/vegarringdal/ProteusXMLDrawing/discussions) if you have ideas/question

[demo link](https://vegarringdal.github.io/ProteusXMLDrawing)



Info/issues/missing/notes :
- filled "shape/circle/ellipse, will probably have issues with "hatch" filltype
  - do we have any samples of this ? xml and pdf?
- hidden layers? (atm I dont show text on layers that contains word "hidden")
- text alignment atm looks like 100% ok, I use extent to place it/resize it
   - so text without extent will not work /be skipped.
     - width/height should in teory be the same as extent, but looks like they never are on samples Ive looked at
   - slant text not supported yet...
     - since I havent really seen it, I really dont know how to test if I do it correctly.
- styled text
  - (not seen these used, need samples to try - this might be hard with papejs..)
- BsplineCurve 
  - (not seen these used, I need samples to try)
- CompositeCurve 
  - (not seen these used, I need samples to try)
- rotation/scale of items
  -  Inverted z axis (flip around y axis) : <Axis X="0" Y="0" Z="-1"/>
    - added a few places, TODO: check xsd file -> 4.1.1 draft.
  -  Rotation about the origin :  <Reference X=”[cosØ]” Y=”[sinØ]” Z=”0” /> (Hopefully this is fixed now)
    - can shape or lines have rotation ?
      - TODO: check xsd file -> 4.1.1 draft.
    - Equipment with rotation and ref to shapecatalog with rotation, 
      - what do we do here ? rotate both or just one ?
        - I feel rotate both is the correct answer, but maybe add as a checkbox to skip the shapeCatalog `Reference`? 
          - Looks like svg converter is not rotating all places.. bug or intended ?
        - I need feedback on whats is the correct way to read it
  -  Scaling looks ok on samples Ive found
    - TODO: check xsd file -> 4.1.1 draft.
  - dexpi 1.3 will have own graphics ?
    - looks like its missing definition for text...
      - hope they add font size and line height and line width or something, so its easier to get consistant results
    - will proteus follow ? or will we end up with 2 graphic specs ?

GUI:
- improve clicking, need to make a box behind lines/shapes, so its easier to click on
- should we make click item "selected"?
- override colors/highlighting ?
- search for ID/highligh based on ID/tagname ?


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







