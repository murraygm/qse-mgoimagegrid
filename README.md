# qse-mgoimagegrid
Qlik Sense Extension to display images - for use with Qlik Sense

**Download a zip of just the v3.13 extension, ready to add to server [zip of MGOImageGridv3 folder] (https://github.com/murraygm/qse-mgoimagegrid/raw/master/MGOImageGridv3.zip)**

**DOWNLOAD FULL PROJECT VIA GITHUB https://github.com/murraygm/qse-mgoimagegrid/archive/master.zip**
or grab just what you need from the project https://github.com/murraygm/qse-mgoimagegrid
or check out the project page on [Qlik Branch](http://branch.qlik.com/#!/project/56e8f64ee37930b98cf9dea4)

![hero][hero]

[hero]: https://raw.githubusercontent.com/murraygm/qse-mgoimagegrid/master/screenshots/hero.png "hero"


## Version 3 - for use in Qlik Sense 3 and later
**Version 3.13 (MAR 2018) - Tested in Qlik Sense Server/Desktop Feb 2018 release.**

*LOCALS FILE PATH ISSUES*

**In recent releases (eg: Feb 2018 ) you will need to put all the images inside a folder inside the Extensions folder. That folder needs to get registered with Qlik Sense. The best approach is to create a Mashup named the folder you want to use and put the images in there. It is also possible to add a .qext file manually on the Desktop to the folder.**

It appears that with the server you can't get away with just creating the mashup and copying the files into
C:\Qlik Sense Storage\StaticContent\Extensions. 
The only way seems to be to create a mashup folder locally on the desktop, add all the images. Zip it, then import it via the QMC to the server in the Extensions area.

**Where ever possible use the ONLINE option and fully browser accessible URLs instead of the local file approach.**

Other updates:
* Added a hover text option under "Image grid display options"

**Version 3.11 (FEB 2018) - Tested in Qlik Sense Desktop Feb 2018 release.**

* Added possibility to make the selection in 2nd dimension
* Fixed - clearing bug on single image
* Changed 1up to include zoom
* Changed selection to include popup and select option
* Reorganised properties - all loading and selection interaction under "Image source & Selecting"
* Paging is now on by default and printing is off by default. 


**FIXED in 3.7: Local images issue FEB 2018** - image path for 'local' and the image field data (the filename) are now URI encoded.


### Screenshots and possibilities

![s0][s0]

[s0]: https://raw.githubusercontent.com/murraygm/qse-mgoimagegrid/master/screenshots/mgoImageGridv311_0.png "s0"

![s1][s1]

[s1]: https://raw.githubusercontent.com/murraygm/qse-mgoimagegrid/master/screenshots/mgoImageGridv311_6.png "s1"

![s2][s2]

[s2]: https://raw.githubusercontent.com/murraygm/qse-mgoimagegrid/master/screenshots/mgoImageGridv311_5.png "s2"

![s3][s3]

[s3]: https://raw.githubusercontent.com/murraygm/qse-mgoimagegrid/master/screenshots/mgoImageGridv311_4.png "s3"

![s4][s4]

[s4]: https://raw.githubusercontent.com/murraygm/qse-mgoimagegrid/master/screenshots/mgoImageGridv311_3.png "s4"

![s5][s5]

[s5]: https://raw.githubusercontent.com/murraygm/qse-mgoimagegrid/master/screenshots/mgoImageGridv311_2.png "s5"

![s6][s6]

[s6]: https://raw.githubusercontent.com/murraygm/qse-mgoimagegrid/master/screenshots/mgoImageGridv311_1.png "s6"


## History


**Tweaks (Aug 2017 - v3.6):**
* Image effects now carry over to single image view (override option added)
* Image background colour on grid can now be driven by a dimension or measure for multiple bg colours

![multicoloured][multicoloured]

[multicoloured]: https://raw.githubusercontent.com/murraygm/qse-mgoimagegrid/master/screenshots/multicoloured.png "multicoloured"


**Tweaks (Aug 2017 - v3.5):**
* Added image effects to grid; black and white, mono colour multiply on background (black), mono colour screen on background (white). Also added the ability to use the 'colour indicator' property to override the effect. NB: some issues displaying in desktop client, works in browser.
* Added a fast select option under the grid properties - means that click on image gets instantly selected with no selections modal. Also added a clear button (x) to top right of image when in single image view, to clear that image selection. Useful for mashups etc.

![effects][effects]

[effects]: https://raw.githubusercontent.com/murraygm/qse-mgoimagegrid/master/screenshots/imageeffects.png "effects"


**Tweaks (June 2017):**
* Added printing capability to main Image Grid Extension (not to the Emo version) - Possible issue printing from desktop client (background image printing needs to be on). Option available when printing through the browser but not in all Win dialogs. FOR BEST RESULTS PRINT TO PDF FIRST

**Tweaks (mar 2017):**
* Changed the Qlik selection style, so that it now displays ticks for selected in active selection mode and the other images available for selection no longer appear knocked back 

**Tweaks (aug 2016):**
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


