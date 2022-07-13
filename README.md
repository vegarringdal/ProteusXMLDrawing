# ProteusXMLDrawing

Experiment on trying to take dexpi xml and convert to drawing using svg/or canvas lib
Will be some repeated code in many classes, but easier for me while developing..

See spec folder under public for more info


Issues/Need more work:
- add missing attributes/geometry items
- prob should add group/refactor all
- text is hard to work off when these is no lineheight/fontsize, not sure how justification is supposed to work without this
- TrimmedCurve ( have a plan... just need to bruch up some math first..)
- BsplineCurve (not seen these used...)
- CompositeCurve (not seen these used...)
- rotation/scale of items -> this will need some work..
- not added a lot of the attributes... only the ones I needed to for drawing++

Image of progress

[C01V01-HEX.EX03.xml](https://github.com/vegarringdal/ProteusXMLDrawing/blob/main/public/TrainingTestCases/tests/C01%20the%20complete%20DEXPI%20PnID/C01V01-HEX.EX03.xml)

![image](https://user-images.githubusercontent.com/2901416/178831083-3ff8cb28-7dcf-420d-9817-8df85ff24894.png)



How to get started
* `git clone git@github.com:vegarringdal/ProteusXMLDrawing.git` or `https://github.com/vegarringdal/vegarringdal/ProteusXMLDrawing`
* `cd vegarringdal/ProteusXMLDrawing`
* `npm install`
* `npm start` <- dev server during development







