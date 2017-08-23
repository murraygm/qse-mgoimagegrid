# qse-mgoimagegrid
Qlik Sense Extension to display images - for use with Qlik Sense

**Download a zip of just the v3.4 extension, ready to add to server [zip of MGOImageGridv3 folder] (https://github.com/murraygm/qse-mgoimagegrid/raw/master/MGOImageGridv3.zip)**

**DOWNLOAD FULL PROJECT VIA GITHUB https://github.com/murraygm/qse-mgoimagegrid/archive/master.zip**
or grab just what you need from the project https://github.com/murraygm/qse-mgoimagegrid
or check out the project page on [Qlik Branch](http://branch.qlik.com/#!/project/56e8f64ee37930b98cf9dea4)

*Grab a couple of fun apps on my [Qlik Sense Apps github page](https://github.com/murraygm/qs-mgoqliksenseapps) to try the extension out with, choose from The New York Public Library (190k images), The British Library (1 million images) or The Internet Archive (65K books - 24 million page scans, 5 million images) - remember to update the existing extension in the app*

## Version 3 - for use in Qlik Sense 3.#
**Recent tweaks (Aug 2017 - v3.5):**
* Added image effects to grid; black and white, mono colour multiply on background (black), mono colour screen on background (white). Also added the ability to use the 'colour indicator' property to override the effect. NB: some issues displaying in desktop client, works in browser.
* Added a fast select option under the grid properties - means that click on image gets instantly selected with no selections modal. Also added a clear button (x) to top right of image when in single image view, to clear that image selection. Useful for mashups etc.
![effects][effects]

[effects]: https://raw.githubusercontent.com/murraygm/qse-mgoimagegrid/master/screenshots/imageeffects.png "effects"


**Recent tweaks (June 2017):**
* Added printing capability to main Image Grid Extension (not to the Emo version) - Possible issue printing from desktop client (background image printing needs to be on). Option available when printing through the browser but not in all Win dialogs. FOR BEST RESULTS PRINT TO PDF FIRST

**Recent tweaks (mar 2017):**
* Changed the Qlik selection style, so that it now displays ticks for selected in active selection mode and the other images available for selection no longer appear knocked back 

**Recent tweaks (aug 2016):**
* option to hide the image count (on grid and 1up views)
* Minor formatting and text changes

Version three has added/changed:
* Up to 3 measures can be used
* Measures can be used to change BG colour opacity and image opacity of each image in grid view (previous fixed for all)
* Hover displays 1st 2nd and 3rd measure values when using bar display on grid
* 'Box' scale option added to force image to fit scaled to 80% on grid cell (revealing background colour)
* Image paging now has a 1 up view option for the grid
* Single image view now allows for 'actual size, 1:1 as a custom scale option
* Controls added to enable zooming and rotating of image
* Mouseover auto panning when image is cropped after zooming.
* Colour indicator added allowing you to flag images that match your criteria, can be set against measures or dimensions and applied to the background colour of those matching images or against the measure values displayed on those images.

Changes to how the measure values are displayed including; ability to change colour of text, hide measure titles and add on a symbol of additional text after measure value. Idea taken from Xavierlp's fork of V2: https://github.com/xavierlp

See new example app "MGO Image Grid v3 example.qvf" for more details

![Propertiesv3][Propsv3]
![Screenshotv3][Examplev3]


[Propsv3]: https://raw.githubusercontent.com/murraygm/qse-mgoimagegrid/v3/screenshots/imagegrid_props_v3.png "Propertiesv3"


[Examplev3]: https://raw.githubusercontent.com/murraygm/qse-mgoimagegrid/v3/screenshots/Screen%20Shot%20v3.png "Properties" 


## New side version to V3 (cut from 3.1 - for fun only) - MGO Image Grid Emo, with content, facial and emotion recognition
**Uses Microsoft's Cognitive Services APIs (keys required - Computer Vision and Emotion)**
* Different name and ID for Emo or standard Image Grid, so you can have both running
* Needs Emotion API key and the referenced image to be of a publically accessable server
* currently works on a manual (button click) request per image, to avoid burning through API limit
* works with multipl faces, mouseover face to see colour bands and scores for individual face.
* can also add API key for MS computer vision and bring back suggestion on the content of image.
* option to OCR any text found in the image (needs flat big type for MS cog services to work well).

Also:
* Changed the Qlik selection style, so that it now displays ticks for selected in active selection mode and the other images available for selection no longer appear knocked back 

** [Download zip directly mgoimagegridemo.zip](https://github.com/murraygm/qse-mgoimagegrid/raw/master/MGOImageGridEmo.zip) **

![emo1][emo1]

[emo1]: https://raw.githubusercontent.com/murraygm/qse-mgoimagegrid/master/screenshots/cognitive.png "emo1"



## About V2 for use in Qlik Sense 2.2 - still in repository but aging and superceded by V3.x


