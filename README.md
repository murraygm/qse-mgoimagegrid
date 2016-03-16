# qse-mgoimagegrid
Qlik Sense Extension to display images - for use with Qlik Sense 2.2

This is version 2 of the MGO Image Grid. It enables you to display external images referenced via a field in a Qlik Sense datamodel. 





##Known issues
This is NOT FOR PRODUCTION CRITICAL apps.
This version is a proof of concept and has only been built with Chrome and Qlik Sense 2.2 desktop support .
It has been tested on a Qlik Sense server and works, although when attempting to embed iFrames there has been mixed results (some instances would not load) due to security. When using external resources there may be issues with certificates and security warnings, if outside of the domain that the server is on, or http rather than https is used.

With large numbers of images the UI will slow down, use the limit display option. However you may still run into memory trouble if you view/page a lot of images.

In edit mode the grid does not display true to what will appear in analysis mode. Gaps appear between the images when the width of the object is less that the width of the images on the grid.

If the width of the object is less that the width of the images on the grid any measure added to the object will not display.

PNG preview for the extension not displaying.


