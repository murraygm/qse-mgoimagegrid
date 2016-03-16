# qse-mgoimagegrid
Qlik Sense Extension to display images - for use with Qlik Sense 2.2

This is version 2 of the MGO Image Grid. Version 1 has been retired. It enables you to display external images referenced via a field in a Qlik Sense datamodel. 
This is an experimental extension, built for fun and NOT INTENDED FOR PRODUCTION LEVEL DEPLOYMENT.
Contains all the same features as v1 (custom image sizes, borders, background colors, scaling options, upto 2 measures).

### NEW stuff
1. Grid - Local path changed: root path for "local images" is now the "Extensions" folder.
2. Grid - Popup option on grid now supports custom URL
3. Grid - the limited image display/load can now be paged (nb - load limit and paging amount must be the same)
4. Single image - Custom name can be displayed
5. Single image - Custom link can be used for click action on name
6. Single image - Custom image source can be used in single view, this can be either a pointer to a different image as a URL, or can be an HTML snippet to enable iFrame embedding.

## Example App
There are 2 examples included in this propject.
**MGO Image Grid v2 example.qvf** This includes an examples of different property settings and an example of both local and remote images using Instagram. To enable the local images to work unzip and add the image folder (IG) to the "MGOImageGridv2" folder inside the "Extensions" folder.

**NY public library 2.qvf** This example uses the New York Public Library public domain dataset and calls the images from their server.

### Screenshots
![Properties][Props]
![Screenshot][Example]
![Screenshot2][Example2]
![Screenshot3][Example3]

[Props]: https://raw.githubusercontent.com/murraygm/qse-mgoimagegrid/master/screenshots/imagegrid_props.png "Properties"
[Example]: https://raw.githubusercontent.com/murraygm/qse-mgoimagegrid/master/screenshots/Screen%20Shot%202016-03-15%20at%2017.57.05.png "Example Screen" 
[Example2]: https://raw.githubusercontent.com/murraygm/qse-mgoimagegrid/master/screenshots/Screen%20Shot%202016-03-15%20at%2022.10.24.png "Example Screen2" 
[Example3]: https://raw.githubusercontent.com/murraygm/qse-mgoimagegrid/master/screenshots/Screen%20Shot%202016-03-15%20at%2022.12.08.png "Example Screen3" 


## Known issues
This is NOT FOR PRODUCTION CRITICAL apps.
This version is a proof of concept and has only been built with Chrome and Qlik Sense 2.2 desktop support .
It has been tested on a Qlik Sense server and works, although when attempting to embed iFrames there has been mixed results (some instances would not load) due to security. When using external resources there may be issues with certificates and security warnings, if outside of the domain that the server is on, or http rather than https is used.

With large numbers of images the UI will slow down, use the limit display option. However you may still run into memory trouble if you view/page a lot of images.

In edit mode the grid does not display true to what will appear in analysis mode. Gaps appear between the images when the width of the object is less that the width of the images on the grid.

If the width of the object is less that the width of the images on the grid any measure added to the object will not display.

PNG preview for the extension not displaying.


