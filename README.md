# qse-mgoimagegrid
Qlik Sense Extension to display images - for use with Qlik Sense

**Download a zip of just the v3.7 extension, ready to add to server [zip of MGOImageGridv3 folder] (https://github.com/murraygm/qse-mgoimagegrid/raw/master/MGOImageGridv3.zip)**

**DOWNLOAD FULL PROJECT VIA GITHUB https://github.com/murraygm/qse-mgoimagegrid/archive/master.zip**
or grab just what you need from the project https://github.com/murraygm/qse-mgoimagegrid
or check out the project page on [Qlik Branch](http://branch.qlik.com/#!/project/56e8f64ee37930b98cf9dea4)

*Grab a couple of fun apps on my [Qlik Sense Apps github page](https://github.com/murraygm/qs-mgoqliksenseapps) to try the extension out with, choose from The New York Public Library (190k images), The British Library (1 million images) or The Internet Archive (65K books - 24 million page scans, 5 million images) - remember to update the existing extension in the app*

## Version 3 - for use in Qlik Sense 3.#

**Tips and Tricks:**
*FILE PATHS*

**FIXED in 3.7: Local images issue FEB 2018** - image path for 'local' and the image field data (the filename) are now URI encoded.

When using local files on the server it can be a bit tricky knowing where to store them and what the path is if you can't use a URL ref.

../resources/assets/external/mgo/IMGs/IG

That resolves to:
https://[server]/resources/assets/external/mgo/IMGs/IG

if you can see an image placed there via the browser then they should be accessible.
Also if you set the property to use 'online' instead then the URL would work: 

https://[server]/resources/assets/external/mgo/IMGs/IG/

this is the key folder to serving assets via Sense:
https://[server]/resources/assets/external/

You should be able to serve any resource from here. If you are still having issues, create a new mashup project. That registers a folder that is accessible via a browser with the Sense server. Then add the images in that folder structure.


**Recent tweaks (Aug 2017 - v3.6):**
* Image effects now carry over to single image view (override option added)
* Image background colour on grid can now be driven by a dimension or measure for multiple bg colours

![multicoloured][multicoloured]

[multicoloured]: https://raw.githubusercontent.com/murraygm/qse-mgoimagegrid/master/screenshots/multicoloured.png "multicoloured"


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


[Propsv3]: https://raw.githubusercontent.com/murraygm/qse-mgoimagegrid/master/screenshots/imagegrid_props_v3.png "Propertiesv3"

[Examplev3]: https://raw.githubusercontent.com/murraygm/qse-mgoimagegrid/master/screenshots/Screen%20Shot%20v3.png "Properties"

### OLDER and Discontinued versions
* MGO Image Grid Emo, with content, facial and emotion recognition (Uses Microsoft's Cognitive Services APIs, keys required - Computer Vision and Emotion)
* V2 for use in Qlik Sense 2.2 - still in repository but aging and superceded by V3.x


