# ProteusXMLDrawing

Experiment on trying to take dexpi xml and convert to drawing using [Paper.js](http://paperjs.org/)

Also been expanded into adding validation with LibXml2 and id list.

>  No files is uploaded to any third party - all work is done in the browser - important so anyone can use without beeing worried

> Feel free to open a [discussion](https://github.com/vegarringdal/ProteusXMLDrawing/discussions) if you have ideas/question




[demo link](https://vegarringdal.github.io/ProteusXMLDrawing)

![msedge_YnH2klOIdm](https://user-images.githubusercontent.com/2901416/191956656-6513a0b8-b042-46e7-8149-23d6a4ba3cb6.gif)


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

GUI:
- improve clicking, need to make a box behind lines/shapes, so its easier to click on
- should we make click item "selected"?
- override colors/highlighting ?
- search for ID/highligh based on ID/tagname ?
- add excel export of datagrid

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



# LibXml2 - wasm
* Currently @ 21b24b51 Release v2.10.2 ++ latest commit (20 sept - 2022)
* https://gitlab.gnome.org/GNOME/libxml2/-/commit/e2bae1bc049f7ffac9c35eefa33f8a00d4032170


# License

See license file on root of repo.
Code under src is part of this license, see dependencies in package.json 
for license info about libraries used.

## Licenses not in package.json

xmlvalidate.js - Apache License 2.0
* https://github.com/openscd/xmlvalidate.js/blob/main/LICENSE
* my fork - https://github.com/vegarringdal/xmlvalidate.js


## Icons

I get icons from these amazing sites

* https://tabler-icons.io/   (MIT license)
* https://heroicons.com/  (MIT license)
