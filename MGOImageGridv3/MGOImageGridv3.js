/*globals define*/
define(["jquery","text!./MGOImageGridv3.css"], 
function($, cssContent) {'use strict';
	$("<style>").html(cssContent).appendTo("head");
	return {
		initialProperties: {
			version: 1.0,
			qHyperCubeDef: {
				qDimensions: [],
				qMeasures: [],
				qInitialDataFetch: [{
					qWidth: 4,
					qHeight: 100
				}]
			}
		},
		definition: {
			type: "items",
			component: "accordion",
			items: {
				dimensions: {
					uses: "dimensions",
					min : 1,
					max: 2

				},
				measures: {
					uses: "measures",
					min : 0,
					max: 3

				},
				sorting: {
					uses: "sorting"
				},
				externalimages: {
					label:"MGO Image Grid V3",
					component: "expandable-items",
					items: {
					imageSource: {
						type:"items",
						label:"Image source",
						items: {
							imgSourceType : {
								ref: "qDef.IMGSRCTYPEMGO",
								type: "boolean",
								component: "buttongroup",
								label: "Location of image folder",
								options: [{
									value: true,
									label: "ONLINE",
									tooltip: "Use a web based folder"
								}, {
									value: false,
									label: "LOCAL",
									tooltip: "Use the predefined local folder"
								}],
								defaultValue: true
								},
							imgSourceFolder : {
								ref: "qDef.IMGSRCMGO",
								label: "Full URL to online image folder",
								type: "string",
								expression: "optional",
								defaultValue: "",
								show: function(layout) { return layout.qDef.IMGSRCTYPEMGO} 
								},
							imgSourceFolderLocal : {
								ref: "qDef.IMGSRCLOCALMGO",
								label: "Place your images folder here: >Qlik >Sense >Extensions",
								type: "string",
								expression: "optional",
								defaultValue: "folder name",
								show: function(layout) { if(layout.qDef.IMGSRCTYPEMGO == false){ return true } else { return false }} 
								}
							}
						},
					measureDisplay: {
						type:"items",
						label:"Measure display on grid",
						items: {
							measGridDisplayTog : {
								ref: "qDef.IMGMEASGRIDDISPLAYTOG",
								label: "Show measures on grid",
								type: "boolean",
								defaultValue: true
								},
							measOverStyle : {
								ref: "qDef.IMGMEASDISPLAYSTYLE",
								type: "boolean",
								component: "buttongroup",
								label: "If a measure used, display as number or bar",
								options: [{
									value: true,
									label: "Bar",
									tooltip: "Display as bar"
								}, {
									value: false,
									label: "Number",
									tooltip: "Display as number"
								}],
								defaultValue: false,
								show: function(layout) { return layout.qDef.IMGMEASGRIDDISPLAYTOG } 
								},
							measColOne : {
								ref: "qDef.IMGMEASDISPLAYSTYLEBARCOL1",
								label: "Bar colour for 1st measure (HEX)",
								type: "string",
								expression: "optional",
								defaultValue: "FFF",
								show: function(layout)  { if( layout.qDef.IMGMEASGRIDDISPLAYTOG & layout.qDef.IMGMEASDISPLAYSTYLE ){ return true } else { return false } }
								},
							measColtwo : {
								ref: "qDef.IMGMEASDISPLAYSTYLEBARCOL2",
								label: "Bar colour for 2nd measure (HEX)",
								type: "string",
								expression: "optional",
								defaultValue: "FFF",
								show: function(layout)  { if( layout.qDef.IMGMEASGRIDDISPLAYTOG & layout.qDef.IMGMEASDISPLAYSTYLE ){ return true } else { return false } }
								},
							measGridDisplayHoverBar : {
								ref: "qDef.IMGMEASGRIDDISPLAYHOVER",
								label: "Show popup on hover with values",
								type: "boolean",
								defaultValue: false,
								show: function(layout)  { if( layout.qDef.IMGMEASGRIDDISPLAYTOG & layout.qDef.IMGMEASDISPLAYSTYLE ){ return true } else { return false } }
								}
							}
						},	

					imageStyling: {
						type:"items",
						label:"Image grid options",
						items: {
							imageClickAction : {
								ref: "qDef.IMGLINK",
								type: "boolean",
								component: "buttongroup",
								label: "Image action, select data or popup image in new window",
								options: [{
									value: true,
									label: "Select",
									tooltip: "Make selections on the field"
								}, {
									value: false,
									label: "Popup",
									tooltip: "Pop up the image in a new window"
								}],
								defaultValue: true
								},
							imagePopSourceLinkType : {
								type: "string",
								component: "dropdown",
								label: "Popup URL source",
								ref: "qDef.IMGLINKPOPLINKSOURCE",
								options: [{
									value: "d1",
									label: "1st dimension"
								}, {
									value: "d2",
									label: "2nd dimension"
								}, {
									value: "c",
									label: "Custom"
								}],
								defaultValue: "d1",
								show: function(layout) { if( layout.qDef.IMGLINK == false ){ return true } else { return false } }
								},
							imagePopCustomLink : {
								ref: "qDef.IMGLINKPOPLINK",
								label: "URL or path for popup link",
								type: "string",
								defaultValue: "",
								show: function(layout) { if( layout.qDef.IMGLINKPOPLINKSOURCE == "c" & layout.qDef.IMGLINK == false ){ return true } else { return false }  } 
								},
							imageScalingGrid : {
								type: "string",
								component: "buttongroup",
								label: "Custom scaling options",
								ref: "qDef.IMGSCALEGRIDOPT",
								options: [{
									value: "a",
									label: "Fit",
									tooltip: "Always fit image in grid cell"
								}, {
									value: "s",
									label: "Stretch",
									tooltip: "Stretch image to fit cell"
								}, {
									value: "b",
									label: "Box",
									tooltip: "Boxed & stretched image to appear windowed in cell"
								}],
								defaultValue: "a",
								},
							customImageSize : {
								ref : "qDef.IMGSIZING",
								label : "Custom image size",
								type : "boolean",
								defaultValue : false
								},
							customImageWidth : {
								ref: "qDef.IMGWIDTH",
								label: "Image width (px)",
								type: "number",
								expression: "optional",
								defaultValue: 100,
								show: function(layout) { return layout.qDef.IMGSIZING} 
								},
							customImageHeight : {
								ref: "qDef.IMGHEIGHT",
								label: "Image height (px)",
								type: "number",
								expression: "optional",
								defaultValue: 100,
								show: function(layout) { return layout.qDef.IMGSIZING } 
								},
							customImageOpacity : {
								ref : "qDef.IMGOPACITY",
								label : "Custom opacity for each image",
								type : "boolean",
								defaultValue : false
								},
							customImageOpacityType : {
								type: "string",
								component: "dropdown",
								label: "Set the opacity using a measure or a fixed amount",
								ref: "qDef.IMGOPACITYTYPE",
								options: [{
									value: "m1",
									label: "Measure 1",
									tooltip: "Use the first measure to set opacity per image"
								}, {
									value: "m2",
									label: "Measure 2",
									tooltip: "Use the second measure to set opacity per image"
								}, {
									value: "m3",
									label: "Measure 3",
									tooltip: "Use the third measure to set opacity per image"
								}, {
									value: "n",
									label: "Fixed amount",
									tooltip: "Set a fixed opacity for the grid"
								}],
								defaultValue: "n",
								show: function(layout) { return layout.qDef.IMGOPACITY } 
								},
							customImageOpacityVal : {
								ref: "qDef.IMGOPACITYVAL",
								label: "Image opacity (range 1-100) %",
								type: "number",
								expression: "optional",
								defaultValue: 100,
								show: function(layout) { if( layout.qDef.IMGOPACITY & layout.qDef.IMGOPACITYTYPE == "n"){ return true } else { return false } }
								},
							customImageBGCol : {
								ref : "qDef.IMGOBGCOL",
								label : "Custom background colour for each image",
								type : "boolean",
								defaultValue : false
								},
							customImageBGColType : {
								type: "string",
								component: "dropdown",
								label: "Set the background colour using a measure or a fixed value",
								ref: "qDef.IMGBGCOLTYPE",
								options: [{
									value: "n",
									label: "Single colour",
									tooltip: "Set a fixed colour for the grid"
								},{
									value: "m1",
									label: "Measure 1 for colour opacity",
									tooltip: "Use the first measure to set ccustom colour saturation per image"
								}, {
									value: "m2",
									label: "Measure 2 for colour opacity",
									tooltip: "Use the second measure to set ccustom colour saturation per image"
								},{
									value: "m3",
									label: "Measure 3 for colour opacity",
									tooltip: "Use the third measure to set ccustom colour saturation per image"
								}],
								defaultValue: "n",
								show: function(layout) { return layout.qDef.IMGOBGCOL } 
								},
							customImageBGColvalue : {
								ref: "qDef.IMGOBGCOLVAL",
								label: "Image background colour (HEX)",
								type: "string",
								expression: "optional",
								defaultValue: "FFF",
								show: function(layout) { return layout.qDef.IMGOBGCOL } 
								},

							imageBorder : {
								ref: "qDef.IMGBORDER",
								label: "Custom image border",
								type: "boolean",
								expression: "optional",
								defaultValue: 0
								},
							customImageBorderSize: {
								type: "number",
								component: "slider",
								label: "Image border",
								ref: "qDef.IMGBORDERDEFSIZE",
								min: 0,
								max: 20,
								step: 1,
								defaultValue: 0,
								show: function(layout) { return layout.qDef.IMGBORDER} 
								},
							customImageBorderCol : {
								ref: "qDef.IMGBORDERDEFCOL",
								label: "Image border colour (HEX)",
								type: "string",
								expression: "optional",
								defaultValue: "FFF",
								show: function(layout) { return layout.qDef.IMGBORDER } 
								}	

							}
						},
					singleimages: {
						type:"items",
						label:"Single image options",
						items: {
							singleImageDisplayMeasure : {
								ref: "qDef.SINGLEIMGMEASURE",
								label: "Display first 2 measures as values",
								type: "boolean",
								defaultValue: false
								},
							singleImageDifCustomBG : {
								ref: "qDef.SINGLEIMGCUSTBGTOG",
								label: "Use a different background colour (separate from grid view)",
								type: "boolean",
								defaultValue: false
								},
							singleImageDifCustomBGVal : {
								ref: "qDef.SINGLEIMGCUSTBGVAL",
								label: "Image border colour (HEX)",
								type: "string",
								expression: "optional",
								defaultValue: "FFF",
								show: function(layout) { return layout.qDef.SINGLEIMGCUSTBGTOG } 
								},
							mgoSinglePicControls : {
								ref: "qDef.mgoSinglePicControls",
								label: "Enable zoom & rotate controls (not active for HTML option of 'Use a different image source')",
								type: "boolean",
								defaultValue: false
								},
							singleImageDisplayHeader : {
								ref: "qDef.SINGLEIMGHEADER",
								label: "Display image name and link",
								type: "boolean",
								defaultValue: true
								},
							singleImagePopSourceLinkType : {
								type: "string",
								component: "dropdown",
								label: "Popup URL source",
								ref: "qDef.SINGLEIMGLINKPOPLINKSOURCE",
								options: [{
									value: "d1",
									label: "1st dimension"
								}, {
									value: "d2",
									label: "2nd dimension"
								}, {
									value: "c",
									label: "Custom"
								}],
								defaultValue: "d1",
								show: function(layout) { return layout.qDef.SINGLEIMGHEADER }
								},
							singleImageLinkCustomName : {
								ref: "qDef.SINGLEIMGLINKCUSTOMNAME",
								label: "Text for image name",
								type: "string",
								expression: "optional",
								defaultValue: "",
								show: function(layout) { if(layout.qDef.SINGLEIMGHEADER & layout.qDef.SINGLEIMGLINKPOPLINKSOURCE == "c"){ return true } else { return false } } 
								},
							singleImageLinkCustomLink : {
								ref: "qDef.SINGLEIMGLINKCUSTOMLINK",
								label: "URL or local folder path for popup",
								type: "string",
								expression: "optional",
								defaultValue: "",
								show: function(layout) { if(layout.qDef.SINGLEIMGHEADER & layout.qDef.SINGLEIMGLINKPOPLINKSOURCE == "c"){ return true } else { return false } } 
								},
							singleImageLinkCustomSourceTog : {
								ref: "qDef.SINGLEIMGLINKCUSTOMSOURCETOG",
								label: "Use a different image source",
								type: "boolean",
								defaultValue: false
								},
							singleImageLinkCustomSourceType : {
								ref: "qDef.SINGLEIMGLINKCUSTOMSOURCETYPE",
								type: "boolean",
								component: "dropdown",
								label: "Use a URL or insert HTML",
								options: [{
									value: true,
									label: "IMG URL",
									tooltip: "URL for image"
								}, {
									value: false,
									label: "HTML",
									tooltip: "iFrame or HTML snippet"
								}],
								defaultValue: true,
								show: function(layout) { return layout.qDef.SINGLEIMGLINKCUSTOMSOURCETOG }
								},
							singleImageLinkCustomSourceURL : {
								ref: "qDef.SINGLEIMGLINKCUSTOMSOURCEURL",
								label: "URL or local folder path for single image",
								type: "string",
								expression: "optional",
								defaultValue: "",
								show: function(layout) { if(layout.qDef.SINGLEIMGLINKCUSTOMSOURCETOG & layout.qDef.SINGLEIMGLINKCUSTOMSOURCETYPE){ return true } else { return false } }
								},
							singleImageLinkCustomSourceHTML : {
								ref: "qDef.SINGLEIMGLINKCUSTOMSOURCEHTML",
								label: "HTML to insert",
								type: "string",
								expression: "optional",
								defaultValue: "",
								show: function(layout) { if(layout.qDef.SINGLEIMGLINKCUSTOMSOURCETOG & layout.qDef.SINGLEIMGLINKCUSTOMSOURCETYPE == false){ return true } else { return false } }
								},
							singleImageDisplay : {
								ref : "qDef.SINGLEIMGDISPLAY",
								label : "Scaling of image:",
								component: "switch",
								type : "boolean",
								options: [{
									value: true,
									label: "Auto"
								}, {
									value: false,
									label: "Custom"
								}],
								defaultValue: true
								},
							customSingleImageDisplay121 : {
								ref: "qDef.SINGLEIMGDISPLAYOPT121",
								label: "Display image actual size (1:1 - no scaling)",
								type: "boolean",
								defaultValue: false,
								show: function(layout) { if(layout.qDef.SINGLEIMGDISPLAY == false){ return true } else { return false } } 
								},
							customSingleImageDisplay : {
								type: "string",
								component: "buttongroup",
								label: "Custom scaling options",
								ref: "qDef.SINGLEIMGDISPLAYOPT",
								options: [{
									value: "w",
									label: "Width",
									tooltip: "Fit to width"
								}, {
									value: "h",
									label: "Height",
									tooltip: "Fit to height"
								}, {
									value: "s",
									label: "Stretch",
									tooltip: "Stretch to fit"
								}],
								defaultValue: "w",
								show: function(layout) { if((layout.qDef.SINGLEIMGDISPLAY == false)&(layout.qDef.SINGLEIMGDISPLAYOPT121 == false)){ return true } else { return false } } 
								}
							}
						},
					imageDisplayLimit: {
						type:"items",
						label:"Limit display and loading",
						items: {
							customImagePaging : {
								ref : "qDef.IMGPAGING",
								label : "Use custom limit for maximum number of images to display and optional paging",
								type : "boolean",
								defaultValue : false
								},
							initFetchRows : {
								ref : "qHyperCubeDef.qInitialDataFetch.0.qHeight",
								label : "Maximum number of images to initially display",
								type : "number",
								defaultValue : 100,
								show: function(layout) { return layout.qDef.IMGPAGING } 
								},
							IMGPAGINGTOG : {
								ref : "qDef.IMGPAGINGTOG",
								label : "Allow users to load more images if available",
								type : "boolean",
								defaultValue : false,
								show: function(layout) { return layout.qDef.IMGPAGING } 
								},
							IMGPAGESIZE : {
								ref : "qDef.IMGPAGINGSIZE",
								label : "Number of images per page (use same value as initial load)",
								type : "number",
								defaultValue : 100,
								show: function(layout) { if(layout.qDef.IMGPAGING & layout.qDef.IMGPAGINGTOG ){ return true } else { return false } } 
								},
							IMGPAGING1UP : {
								ref : "qDef.IMGPAGING1UP",
								label : "Use a 1 up single image paging display instead of a grid (for best results set above options to 1)",
								type : "boolean",
								defaultValue : false,
								show: function(layout) { return layout.qDef.IMGPAGING } 
								}

							}
						}			
					}

				},
				settings: {
					uses: "settings"				
				}
				
			}		
		},
		

		paint: function ( $element,layout ) {
			var html = "", self = this, lastrow = 0, firstrow = 0, morebutton = false, lessbutton = false, imgSelectType = layout.qDef.IMGLINK, rowcount = this.backendApi.getRowCount(), imgFolderLocation = "", qData = layout.qHyperCube.qDataPages[(layout.qHyperCube.qDataPages.length - 1)], mymeasureCount = layout.qHyperCube.qMeasureInfo.length, mydimensionCount = layout.qHyperCube.qDimensionInfo.length, measBarCol1 = "FFF", measBarCol2="FFF", measBarHeight=10,  imgScaleSingle = "mgoImgScaleFit", imgBGCol = "FFF", imgBorderCol = "FFF", imgBorderSize = 0, imgCHeight = 100, imgCWidth = 100, imgScaleGrid = "mgoImgScaleFit";
			var imgriduniqueID = layout.qInfo.qId;
			
			var imgridpage = layout.qDef.IMGPAGINGSIZE;
			var mgoSinglePicModeActive;
			var killzoomcontrols = true;

			//local or online image source
				if(layout.qDef.IMGSRCTYPEMGO){
					imgFolderLocation = layout.qDef.IMGSRCMGO; 
				} else {
					
					imgFolderLocation = "/Extensions/" + layout.qDef.IMGSRCLOCALMGO + "/";
				};

			//Set up grid image scale
				if(layout.qDef.IMGSIZING){
					imgCHeight=layout.qDef.IMGHEIGHT;
					imgCWidth=layout.qDef.IMGWIDTH;
				} else {
					imgCHeight=100;
					imgCWidth=100;
				};	

			//Set up grid image scaling
				if(layout.qDef.IMGSCALEGRIDOPT=="s"){
					imgScaleGrid = "mgoImgScaleStretch";
				} else if (layout.qDef.IMGSCALEGRIDOPT=="b"){
					imgScaleGrid = "mgoImgScaleBoxed";
				} else {
					imgScaleGrid = "mgoImgScaleFit";
				};
			
			
			//set up measure bar size
			if(imgCHeight > 20){
					measBarHeight = 10; 
				} else {
					measBarHeight = 3;
				};
			
			//set up BG and Borders
			if(layout.qDef.IMGBORDER){
				imgBorderSize = layout.qDef.IMGBORDERDEFSIZE;
				imgBorderCol = layout.qDef.IMGBORDERDEFCOL;
			} else {
				imgBorderSize = 0;
				imgBorderCol = "FFF";
			};
			if(layout.qDef.IMGOBGCOL){
				imgBGCol = layout.qDef.IMGOBGCOLVAL;
			} else {
				imgBGCol = "FFF";
			};

			//Set up single image 
			var customSingleImageName, customSingleImageLink, customSingleImageNameTog, customSingleImageNSourceTog, customSingleImageSourceType, customSingleImageSourceURL, customSingleImageSourceHTML; 
			if(layout.qDef.SINGLEIMGLINKCUSTOMSOURCETOG){
				customSingleImageSourceType = layout.qDef.SINGLEIMGLINKCUSTOMSOURCETYPE
				customSingleImageSourceURL = layout.qDef.SINGLEIMGLINKCUSTOMSOURCEURL;
				customSingleImageSourceHTML = layout.qDef.SINGLEIMGLINKCUSTOMSOURCEHTML;
				customSingleImageNSourceTog = layout.qDef.SINGLEIMGLINKCUSTOMSOURCETOG;
			} else {
				customSingleImageNSourceTog = false;
				customSingleImageSourceType = true;
				customSingleImageSourceHTML = "";
				customSingleImageSourceURL = "";
			};
			if(layout.qDef.SINGLEIMGLINKPOPLINKSOURCE == "c"){
				customSingleImageNameTog = true;
				customSingleImageName = layout.qDef.SINGLEIMGLINKCUSTOMNAME; 
				customSingleImageLink = layout.qDef.SINGLEIMGLINKCUSTOMLINK;
			} else {
				customSingleImageNameTog = false;
				customSingleImageName = ""; 
				customSingleImageLink = "";
			};


			if(layout.qDef.SINGLEIMGDISPLAY){
				imgScaleSingle = "mgoImgScaleFit";
			} else {
				if(layout.qDef.SINGLEIMGDISPLAYOPT121){
					imgScaleSingle = "mgoImgScaleActual";
				} else if(layout.qDef.SINGLEIMGDISPLAYOPT == "w"){
					imgScaleSingle = "mgoImgScaleFitWidth";
				} else if (layout.qDef.SINGLEIMGDISPLAYOPT == "h"){
					imgScaleSingle = "mgoImgScaleFitHeight";
				} else {
					imgScaleSingle = "mgoImgScaleStretch";
				};
			};

			
			var grid1upDisplay;

			function mgohexToRgb(hex) {
			    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
			    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
			    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
			        return r + r + g + g + b + b;
			    });

			    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			    return result ? {
			        r: parseInt(result[1], 16),
			        g: parseInt(result[2], 16),
			        b: parseInt(result[3], 16)
			    } : null;
			};

						
				
			var parentscope = angular.element($element).scope().$parent.$parent.$parent;
			$element.html(parentscope.editmode ? 'In Edit Mode' : 'Not in Edit mode');
			
			//render data
				$.each(qData.qMatrix, function ( key, row  ) {
					if(mydimensionCount == 2){

						var dim = row[0], dim2 = row[1], meas1 = row[2], meas2 = row[3], meas3 = row[4];

					} else if (mydimensionCount == 1){
						var dim = row[0], meas1 = row[1], meas2 = row[2], meas3 = row[3];
					};
					
					


					lastrow = key * layout.qHyperCube.qDataPages.length;
					firstrow = (key * layout.qHyperCube.qDataPages.length)-imgridpage+1;

					//set up image opacity value
					var imageOpacity = 1, mmfact4op = 0;
					if(layout.qDef.IMGOPACITY){

							if (layout.qDef.IMGOPACITYTYPE == "n"){
								imageOpacity = layout.qDef.IMGOPACITYVAL/100;
							} else if(layout.qDef.IMGOPACITYTYPE == "m1"){
								if(mymeasureCount>0){
									mmfact4op = Math.round((meas1.qNum/layout.qHyperCube.qMeasureInfo[0].qMax) * 100) / 100;
									imageOpacity = mmfact4op; 
								} else {
									imageOpacity = 1;
								};
							} else if(layout.qDef.IMGOPACITYTYPE == "m2"){
								if(mymeasureCount>1){
									mmfact4op = Math.round((meas2.qNum/layout.qHyperCube.qMeasureInfo[1].qMax) * 100) / 100;
									imageOpacity = mmfact4op; 
								} else {
									imageOpacity = 1;
								};
							} else if(layout.qDef.IMGOPACITYTYPE == "m3"){
								if(mymeasureCount>2){
									mmfact4op = Math.round((meas3.qNum/layout.qHyperCube.qMeasureInfo[2].qMax) * 100) / 100;
									imageOpacity = mmfact4op; 
								} else {
									imageOpacity = 1;
								};
							};
						} else {
							imageOpacity = 1;
						};

					//set up BG colour 
					var imgBGColRGB, imgBGColRGBa, imgBGColRGBAlpha, imgBGColInsert;
					if(layout.qDef.IMGOBGCOL){
						//check setting
						if (layout.qDef.IMGBGCOLTYPE == "n"){
							imgBGCol = layout.qDef.IMGOBGCOLVAL;
							imgBGColInsert = 'background-color: #' + imgBGCol;
						} else if(layout.qDef.IMGBGCOLTYPE == "m1"){
							//get hex calc percent tint and switch to rgba
							if(mymeasureCount>0){
								imgBGColRGB = mgohexToRgb(layout.qDef.IMGOBGCOLVAL);
								imgBGColRGBAlpha = Math.round((meas1.qNum/layout.qHyperCube.qMeasureInfo[0].qMax) * 100) / 100;
								imgBGColInsert = 'background-color: rgba('+imgBGColRGB.r + ', '+imgBGColRGB.g + ', '+imgBGColRGB.g + ', '+imgBGColRGBAlpha+ ')' ;
								
							} else {
								imgBGColInsert = 'background-color: #' + imgBGCol;
							};

						} else if (layout.qDef.IMGBGCOLTYPE == "m2"){
							if(mymeasureCount>1){
								imgBGColRGB = mgohexToRgb(layout.qDef.IMGOBGCOLVAL);
								imgBGColRGBAlpha = Math.round((meas2.qNum/layout.qHyperCube.qMeasureInfo[1].qMax) * 100) / 100;
								imgBGColInsert = 'background-color: rgba('+imgBGColRGB.r + ', '+imgBGColRGB.g + ', '+imgBGColRGB.b + ', '+imgBGColRGBAlpha+ ')' ;
								

							} else {
								imgBGColInsert = 'background-color: #' + imgBGCol;
							};
						} else if (layout.qDef.IMGBGCOLTYPE == "m3"){
							if(mymeasureCount>2){
								imgBGColRGB = mgohexToRgb(layout.qDef.IMGOBGCOLVAL);
								imgBGColRGBAlpha = Math.round((meas3.qNum/layout.qHyperCube.qMeasureInfo[2].qMax) * 100) / 100;
								imgBGColInsert = 'background-color: rgba('+imgBGColRGB.r + ', '+imgBGColRGB.g + ', '+imgBGColRGB.b + ', '+imgBGColRGBAlpha+ ')' ;
								

							} else {
								imgBGColInsert = 'background-color: #' + imgBGCol;
							};
						};

						//console.log(imgBGColInsert);
					};
				
					

					
					//set 1up grid option
					
					//console.log(rowcount);
					if(rowcount > 1){

						grid1upDisplay = layout.qDef.IMGPAGING1UP;
					} else {
						grid1upDisplay = false;
					};


					//Check count and choose Grid or Single pic layout
					if((rowcount > 1) & (!grid1upDisplay)){
						//GRID LAYOUT

						mgoSinglePicModeActive = 0;
						//Check if popup or selectable
						if(!layout.qDef.IMGLINK){
							//if pop up add link
							if(parentscope.editmode){
								//disable pop up in edit mode
								html += '<span class="mgoPopinEdit">';
							} else {
								if(layout.qDef.IMGLINKPOPLINKSOURCE == "c"){
									
									html += '<a href="' + layout.qDef.IMGLINKPOPLINK + '" target="blank" class="mgotooltip">';

								} else if((layout.qDef.IMGLINKPOPLINKSOURCE == "d2") & (mydimensionCount == 2)){
									

									html += '<a href="' + dim2.qText + '" target="blank" class="mgotooltip">';
																	

								} else {
									html += '<a href="' + imgFolderLocation + dim.qText + '" target="blank" class="mgotooltip">';
								}; 
							};
							
							//render image

							html += '<span class="mgoPicGrid" style="'+ imgBGColInsert +'; border-bottom: '+ imgBorderSize + 'px solid #' + imgBorderCol +'; border-right: '+ imgBorderSize + 'px solid #' + imgBorderCol +';"><span class="mgoPicGrid '+imgScaleGrid+'" style="height:' + imgCHeight + 'px; width:' + imgCWidth + 'px; background-image: url(' + imgFolderLocation + dim.qText + '); background-color: transparent; opacity: '+ imageOpacity +';">';
							html += '</span></span>';
						
							//check if measure added
							if((mymeasureCount==1) & (layout.qDef.IMGMEASGRIDDISPLAYTOG)){
								// For 1 measure
								
								// render measure
								// check style
								if(!layout.qDef.IMGMEASDISPLAYSTYLE){
									//number
									html += '<span class="mgoMeasureSingle" style="width:' + (imgCWidth-4) + 'px; height:' + (imgCHeight-4) + 'px; margin-left: -'+(imgCWidth+imgBorderSize)+'px;">'+ layout.qHyperCube.qMeasureInfo[0].qFallbackTitle +': '+ meas1.qNum+'</span>';
									
								} else {
									//bar
									//set if thresholds
									var meas1Max = layout.qHyperCube.qMeasureInfo[0].qMax;
									var meas1Factor = (imgCWidth - 10)/meas1Max;
									var meas1barw = Math.floor(meas1.qNum*meas1Factor);
									measBarCol1 = layout.qDef.IMGMEASDISPLAYSTYLEBARCOL1;
									html += '<span class="mgoMeasureSingleBar" data-value="'+meas1.qNum+'" style="margin-top: 0px; margin-left: -'+(imgCWidth+imgBorderSize)+'px; height:'+measBarHeight+'px; width:'+meas1barw+'px; background-color:#'+measBarCol1+';"><br></span>';
									
								};
							} else if((mymeasureCount>=2) & (layout.qDef.IMGMEASGRIDDISPLAYTOG)){
									// For 2 measures
									// render measure
									// check style
									if(!layout.qDef.IMGMEASDISPLAYSTYLE){
										//number
										html += '<span class="mgoMeasureSingle" data-value="'+meas1.qNum+'" style="width:' + (imgCWidth-4) + 'px; height:' + (imgCHeight-4) + 'px; margin-left: -'+(imgCWidth+imgBorderSize)+'px;"> '+ layout.qHyperCube.qMeasureInfo[0].qFallbackTitle +': '+ meas1.qNum+'<br> '+ layout.qHyperCube.qMeasureInfo[1].qFallbackTitle +': '+ meas2.qNum+'</span>';
										
									} else {
										//bar
										//set if thresholds
										var meas1Max = layout.qHyperCube.qMeasureInfo[0].qMax;
										var meas1Factor = (imgCWidth - 10)/meas1Max;
										var meas1barw = Math.floor(meas1.qNum*meas1Factor);
										measBarCol1 = layout.qDef.IMGMEASDISPLAYSTYLEBARCOL1;
										var meas2Max = layout.qHyperCube.qMeasureInfo[1].qMax;
										var meas2Factor = (imgCWidth - 10)/meas2Max;
										var meas2barw = Math.floor(meas2.qNum*meas2Factor);
										measBarCol2 = layout.qDef.IMGMEASDISPLAYSTYLEBARCOL2;
										html += '<span class="mgoMeasureSingleBar" data-value="'+meas1.qNum+','+meas2.qNum+'" style="margin-top: 0px; margin-left: -'+(imgCWidth+imgBorderSize)+'px; height:'+measBarHeight+'px; width:'+meas1barw+'px; background-color:#'+measBarCol1+';"><br></span>';
										html += '<span class="mgoMeasureSingleBar" data-value="'+meas1.qNum+','+meas2.qNum+'"style="margin-top: 11px; margin-left: -'+(imgCWidth+imgBorderSize)+'px; height:'+measBarHeight+'px; width:'+meas2barw+'px; background-color:#'+measBarCol2+';"><br></span>';
										
									};
									
				
							};




							//Open in new window overlay
							html += '<span class="mgoimghoversm" style="margin-left:-'+ (24 + imgBorderSize) +'px;"><span style="font-family: QlikView Icons; font-size: 22px;">w</span></span>';
							
							if(parentscope.editmode){
								//close element for pop up in edit mode
								html += '</span>';
							} else {
								html += '</a>';
							};
							
						
						} else {
							//render selectable image
							html += '<span class="selectable" data-value="'+ dim.qElemNumber + '">';
							// render image 
								html += '<span class="mgoPicGrid" style="'+ imgBGColInsert +'; border-bottom: '+ imgBorderSize + 'px solid #' + imgBorderCol +'; border-right: '+ imgBorderSize + 'px solid #' + imgBorderCol +';"><span class="mgoPicGrid '+imgScaleGrid+'" style="height:' + imgCHeight + 'px; width:' + imgCWidth + 'px; background-image: url(' + imgFolderLocation + dim.qText + '); background-color: transparent; opacity: '+ imageOpacity +';">';
								html += '</span></span>';
							

							//check if measure added
							if((mymeasureCount==1) & (layout.qDef.IMGMEASGRIDDISPLAYTOG)){
								// For 1 measure
								
								// render measure
								// check style
								if(!layout.qDef.IMGMEASDISPLAYSTYLE){
									//number
									html += '<span class="mgoMeasureSingle" style="width:' + (imgCWidth-4) + 'px; height:' + (imgCHeight-4) + 'px; margin-left: -'+(imgCWidth+imgBorderSize)+'px;">'+ layout.qHyperCube.qMeasureInfo[0].qFallbackTitle +': '+ meas1.qNum+'</span>';
									html += '</span>';
								} else {
									//bar
									//set if thresholds
									var meas1Max = layout.qHyperCube.qMeasureInfo[0].qMax;
									var meas1Factor = (imgCWidth - 10)/meas1Max;
									var meas1barw = Math.floor(meas1.qNum*meas1Factor);
									measBarCol1 = layout.qDef.IMGMEASDISPLAYSTYLEBARCOL1;
									html += '<span class="mgoMeasureSingleBar" data-value="'+meas1.qNum+'" style="margin-top: 0px; margin-left: -'+(imgCWidth+imgBorderSize)+'px; height:'+measBarHeight+'px; width:'+meas1barw+'px; background-color:#'+measBarCol1+';"><br></span>';
									
								};
							} else if((mymeasureCount>=2) & (layout.qDef.IMGMEASGRIDDISPLAYTOG)){
									// For 2 measures
									// render measure
									// check style
									if(!layout.qDef.IMGMEASDISPLAYSTYLE){
										//number
										html += '<span class="mgoMeasureSingle" style="width:' + (imgCWidth-4) + 'px; height:' + (imgCHeight-4) + 'px; margin-left: -'+(imgCWidth+imgBorderSize)+'px;">'+ layout.qHyperCube.qMeasureInfo[0].qFallbackTitle +': '+ meas1.qNum+'<br>'+ layout.qHyperCube.qMeasureInfo[1].qFallbackTitle +': '+ meas2.qNum+'</span>';
										html += '</span>';
									} else {
										//bar
										//set if thresholds
										var meas1Max = layout.qHyperCube.qMeasureInfo[0].qMax;
										var meas1Factor = (imgCWidth - 10)/meas1Max;
										var meas1barw = Math.floor(meas1.qNum*meas1Factor);
										measBarCol1 = layout.qDef.IMGMEASDISPLAYSTYLEBARCOL1;
										var meas2Max = layout.qHyperCube.qMeasureInfo[1].qMax;
										var meas2Factor = (imgCWidth - 10)/meas2Max;
										var meas2barw = Math.floor(meas2.qNum*meas2Factor);
										measBarCol2 = layout.qDef.IMGMEASDISPLAYSTYLEBARCOL2;
										html += '<span class="mgoMeasureSingleBar" data-value="'+meas1.qNum+','+meas2.qNum+'" style="margin-top: 0px; margin-left: -'+(imgCWidth+imgBorderSize)+'px; height:'+measBarHeight+'px; width:'+meas1barw+'px; background-color:#'+measBarCol1+';"><br></span>';
										html += '<span class="mgoMeasureSingleBar" data-value="'+meas1.qNum+','+meas2.qNum+'" style="margin-top: 11px; margin-left: -'+(imgCWidth+imgBorderSize)+'px; height:'+measBarHeight+'px; width:'+meas2barw+'px; background-color:#'+measBarCol2+';"><br></span>';
										
									};
									html += '</span>';
				
							};
							
							html += '</span>';

						};
						
					
					} else { 
						//SINGLE PIC (based on selection not load limitation)
						mgoSinglePicModeActive = 1;
						//Controls
						//check for custom single image

						if(layout.qDef.SINGLEIMGCUSTBGTOG){
							imgBGColInsert= 'background-color: #' + layout.qDef.SINGLEIMGCUSTBGVAL;
						};

						
						if(!layout.qDef.SINGLEIMGLINKCUSTOMSOURCETOG){
							killzoomcontrols = false;
						} else if ((layout.qDef.SINGLEIMGLINKCUSTOMSOURCETOG)&(layout.qDef.SINGLEIMGLINKCUSTOMSOURCETYPE)){
							killzoomcontrols = false;
						} else {
							killzoomcontrols = true;
						};
						
						if(layout.qDef.mgoSinglePicControls){
							if((!killzoomcontrols) & (rowcount == 1)){
								html+= '<div class="mmControlButs">';
								html+= '<button class="butZoomout qui-outlinebutton qv-pt-meta-button mmIconButAdjust" alt="Zoom Out" type="button"><span class="mmQlikIcons">Z</span></button> ';
								html+= '<button class="butZoomin qui-outlinebutton qv-pt-meta-button mmIconButAdjust" alt="Zoom In" type="button"><span class="mmQlikIcons">Y</span></button> ';
								html+= '<button class="butRotate qui-outlinebutton qv-pt-meta-button mmIconButAdjust" alt="Rotate" type="button"><span class="mmQlikIcons">b</span></button> ';
								//html+= '<button class="butZoom100 qui-outlinebutton qv-pt-meta-button " type="button">1:1</button> ';
								html+= '<button class="butReposition qui-outlinebutton qv-pt-meta-button " type="button">Reset</button>';			
								html+= '</div>';
							}; 

		
						};

						// render image 
						if(customSingleImageNSourceTog){
							if(rowcount == 1){
								if(customSingleImageSourceType){
									//html += '<div class="mgoSinglePic '+imgScaleSingle+'" style="background-image: url(' + customSingleImageSourceURL + ');background-color: #' + imgBGCol +';">';
									html += '<div class="mgoSinglePicC"><div class="mgoSinglePic '+imgScaleSingle+'" style="background-image: url(' + customSingleImageSourceURL + '); ' + imgBGColInsert +';"></div>';

								} else {
									
									html += customSingleImageSourceHTML;
								};
							} else {
								//if 1 up make it selectable
								if(grid1upDisplay){
									
									html += '<div class="mgoSinglePic '+imgScaleSingle+' selectable" data-value="'+ dim.qElemNumber + '" style="background-image: url(' + imgFolderLocation + dim.qText + '); ' + imgBGColInsert +';">';
								} else {
									//html += '<div class="mgoSinglePic '+imgScaleSingle+'" style="background-image: url(' + imgFolderLocation + dim.qText + ');background-color: #' + imgBGCol +';">';
									html += '<div class="mgoSinglePicC"><div class="mgoSinglePic '+imgScaleSingle+'" style="background-image: url(' + imgFolderLocation + dim.qText + '); ' + imgBGColInsert +';"></div>';
								
								};
							};
						} else {
							//if 1 up make it selectable
								if(grid1upDisplay){
									
									html += '<div class="mgoSinglePic '+imgScaleSingle+' selectable" data-value="'+ dim.qElemNumber + '" style="background-image: url(' + imgFolderLocation + dim.qText + '); ' + imgBGColInsert +';">';
								} else {
									//html += '<div class="mgoSinglePic '+imgScaleSingle+'" style="background-image: url(' + imgFolderLocation + dim.qText + ');background-color: #' + imgBGCol +';">';
									html += '<div class="mgoSinglePicC"><div class="mgoSinglePic '+imgScaleSingle+'" style="background-image: url(' + imgFolderLocation + dim.qText + '); ' + imgBGColInsert +';"></div>';
								};
							//html += '<div class="mgoSinglePic '+imgScaleSingle+'" style="background-image: url(' + imgFolderLocation + dim.qText + ');background-color: #' + imgBGCol +';">';
						};

						//check if measure added
							if((mymeasureCount==1) & (layout.qDef.SINGLEIMGMEASURE)){
								// For 1 measure
								
								// render measure
								html += '<span class="mgoMeasureSinglePic" style="height:auto; margin-left: 0px;">'+ layout.qHyperCube.qMeasureInfo[0].qFallbackTitle +': '+ meas1.qNum+'</span>';
								
								
							} else if((mymeasureCount>=2) & (layout.qDef.SINGLEIMGMEASURE)){
								// For 2 measures
								// render measure
									
								html += '<span class="mgoMeasureSinglePic" style="height:auto; margin-left: 0px;">'+ layout.qHyperCube.qMeasureInfo[0].qFallbackTitle +': '+ meas1.qNum+'<br>'+ layout.qHyperCube.qMeasureInfo[1].qFallbackTitle +': '+ meas2.qNum+'</span>';
								
				
							};


						//Show header
						if(layout.qDef.SINGLEIMGHEADER){

							if(customSingleImageNameTog){
							html += '<div class="mgoHeader"><a href="' + customSingleImageLink + '" target="blank"> <span style="font-family: QlikView Icons; font-size: 20px;">w</span> ' + customSingleImageName + '</a><br>';
							
							} else {
								if((mydimensionCount == 2) & (layout.qDef.SINGLEIMGLINKPOPLINKSOURCE=="d1")){
									html += '<div class="mgoHeader"><a href="' + imgFolderLocation + dim.qText + '" target="blank"> <span style="font-family: QlikView Icons; font-size: 20px;">w</span> ' + dim.qText + '</a><br>';
								} else if((mydimensionCount == 2) & (layout.qDef.SINGLEIMGLINKPOPLINKSOURCE=="d2")) {
									html += '<div class="mgoHeader"><a href="' + dim2.qText + '" target="blank"> <span style="font-family: QlikView Icons; font-size: 20px;">w</span> ' + dim2.qText + '</a><br>';
								} else {
									html += '<div class="mgoHeader"><a href="' + imgFolderLocation + dim.qText + '" target="blank"> <span style="font-family: QlikView Icons; font-size: 20px;">w</span> ' + dim.qText + '</a><br>';
								};
							}
							html += '</div>';
						};
						html += '</div>';

						
						
					};					

					


				} );
			

			
			var morebutpagetotal = Math.ceil(rowcount / imgridpage);
			var imgpagedsofar = imgridpage*layout.qHyperCube.qDataPages.length;
			//paging controls
			if(layout.qDef.IMGPAGINGTOG){ 
				//add more button
				//console.log(layout.qHyperCube.qDataPages);
				// 1 up or standard
				var imgPagingButtonStyle, imgPagingButtonLStyle, imgPagingButtonMStyle, imgPagingReset;
				if((grid1upDisplay) & (imgridpage==1)){
					imgPagingButtonStyle = 'style="position: absolute; top: 0px; right:5px; z-index:100; font-size:10px; color:#AAA; margin:4px 0px"';
					imgPagingButtonLStyle = ' mmLessMore1upButs" style="left:5px; z-index:101; " >T';
					imgPagingButtonMStyle = ' mmLessMore1upButs" style="right:5px; z-index:102; " >U';
					
				} else {
					imgPagingButtonStyle = 'style="font-size:12px; color:#AAA; margin:4px 0px"';
					 imgPagingButtonLStyle = '" style="margin:4px 4px">Less';
					 imgPagingButtonMStyle = '" style="margin:4px 4px">More';
					 imgPagingReset = '';
				};

				if(rowcount > 1){
					//console.log(imgridpage);
					if((grid1upDisplay) & (imgridpage==1)){
						html += '<div '+imgPagingButtonStyle+'>'+ ((imgpagedsofar-imgridpage)+1);
						if(imgpagedsofar > rowcount){
							html += ' of ' + rowcount + ' images</div>';
						} else {
							html += ' of ' + rowcount + ' images</div>';
						};
					} else {
						html += '<div '+imgPagingButtonStyle+'>'+ ((imgpagedsofar-imgridpage)+1) + ' to ';
						if(imgpagedsofar > rowcount){
							html += rowcount + ' of ' + rowcount + ' images</div>';
						} else {
							html += (imgpagedsofar) + ' of ' + rowcount + ' images</div>';
						};
					};

				};
				if(morebutpagetotal > 1){
					if(imgpagedsofar > imgridpage){
						lessbutton = true;
						html += '<br>' + '<button id="loadless" class="qui-outlinebutton qv-pt-meta-button ng-scope'+imgPagingButtonLStyle+'</button>';	
					} else {
						html += '<br>' + '<button id="loadless" disabled class="qui-outlinebutton qv-pt-meta-button ng-scope'+imgPagingButtonLStyle+'</button>';	
					};
					if((rowcount - imgpagedsofar) > 0){
						morebutton = true;
						html += '<button id="loadmore" class="qui-outlinebutton qv-pt-meta-button ng-scope'+imgPagingButtonMStyle+'</button>';	
					} else {
						html += '<button id="loadmore" disabled class="qui-outlinebutton qv-pt-meta-button ng-scope'+imgPagingButtonMStyle+'</button>';	

					};
				};

				


			} else {
				if(rowcount > 1){
					html += '<br>' + '<div style="font-size:12px; color:#AAA; margin:4px 0px">Display limited to first ' + (lastrow + 1) + ' of ' + rowcount + ' images</div>';
				};
			};

			
			$element.html( html );

			

			if(morebutton) {
				var requestPage = [{
					qTop : lastrow+layout.qHyperCube.qDataPages.length,
					qLeft : 0,
					qWidth : 4, //should be # of columns
					qHeight : Math.min(imgridpage, rowcount - lastrow)
				}];
				
				$element.find("#loadmore").on("qv-activate", function() {
					
					self.backendApi.getData(requestPage).then(function(dataPages) {
						self.paint($element, layout);
						
						//reset any scroll on the QV object container position
						$element.parent().parent().scrollLeft(0);
						$element.parent().parent().scrollTop(0);

					});
				});
			};
			if(lessbutton) {
				
				$element.find("#loadless").on("qv-activate", function() {
					layout.qHyperCube.qDataPages.splice((layout.qHyperCube.qDataPages.length-1), 1);
					
						self.paint($element, layout);
						
						//reset any scroll on the QV object container position
						$element.parent().parent().scrollLeft(0);
						$element.parent().parent().scrollTop(0);

					
				});
				

			};
			
			
			
			
			
			// selections
			$element.find('.selectable').on('qv-activate', function() {
				if(this.hasAttribute("data-value")) {
					var value = parseInt(this.getAttribute("data-value"), 10), dim = 0;
						self.selectValues(dim, [value], true);
						$(this).toggleClass("selected");
				}
			});

			

			//measure mouse over 

			if((layout.qDef.IMGMEASGRIDDISPLAYTOG) & (layout.qDef.IMGMEASDISPLAYSTYLE) & (layout.qDef.IMGMEASGRIDDISPLAYHOVER)){
				
				var mmcustomToolTipID = 'mgoBarToolTip' + imgriduniqueID;
				//custom bar tool tip
				$('body').append('<div id="'+mmcustomToolTipID+'" style="display:none"></div>');



				$element.find('.mgoMeasureSingleBar').on('mousemove', function(h) {
					var tooltip2Show = $('#'+mmcustomToolTipID);
						

						
						var relXtip = Math.round(h.pageX + 8);
						var relYtip = Math.round(h.pageY - 50);
						var m1DataVal= $(this).attr('data-value').split(',');
						
						if(m1DataVal.length == 2){
							tooltip2Show.html(layout.qHyperCube.qMeasureInfo[0].qFallbackTitle + ': '+ m1DataVal[0] + '<br>' + layout.qHyperCube.qMeasureInfo[1].qFallbackTitle+ ': ' + m1DataVal[1] )
						} else {
							tooltip2Show.html(layout.qHyperCube.qMeasureInfo[0].qFallbackTitle + ': '+ m1DataVal[0])
						};
						tooltip2Show.css({
    						'font-size': '12px',
							'color': '#fff',
							'background-color': 'rgba(0,0,0,0.7)',
							'border-radius':'4px',
							'padding': '4px',
							'display':'block',
							'position':'absolute',
							'top':relYtip+'px',
							'left':relXtip+'px',
							'width':'100px',
							'height':'auto',
							'z-index':'1000'
    					});
	

					});

				$element.find('.mgoMeasureSingleBar').on('mouseleave', function(e) {
					var tooltip2Show = $('#'+mmcustomToolTipID);
						tooltip2Show.css('display','none');
					});

				

			};
			


			//Single pic controls

	

			if((mgoSinglePicModeActive) & (layout.qDef.mgoSinglePicControls) & (!killzoomcontrols)){


				var mmContainerTarg = $element.find(('.mgoSinglePic'));
				var mmContainerTargContainer = $element.find(('.mgoSinglePicC'));
				
				var bgImageheightCAPTURE, bgImagewidthCAPTURE, bgImageOrient;
				//get and store bg image orig size in px
				var ImageUrlOrigA = mmContainerTarg.css('background-image').replace('url(', '').replace(')', '').replace("'", '').replace('"', '');
				var ImageUrlOrig = ImageUrlOrigA.replace('"','');
				var bgImg = $('<img />');
				bgImg.hide();
				bgImg.bind('load', function()
				{
				    bgImageheightCAPTURE = $(this).height();
				    bgImagewidthCAPTURE = $(this).width();
				    bgImageOrient = bgImageheightCAPTURE / bgImagewidthCAPTURE;
				    

				});
				mmContainerTarg.append(bgImg);
				bgImg.attr('src', ImageUrlOrig);
				//console.log(url + ' adapt ' + url.replace('"',''));
				var rotateImgTurns= 0;

				//Zoom in/out
			
				$element.find('.butZoomout').on('click', function() {
						
						var mmContainerOrientation = mmContainerTarg.innerHeight() / mmContainerTarg.innerWidth();

						
						//current zoom on image:

						var curZoomLevelArr = mmContainerTarg.css('background-size');
						var curZoomLevelArrParts = curZoomLevelArr.split(" ");
						var image100scaleFactorW = Math.round((bgImagewidthCAPTURE/mmContainerTarg.innerWidth())*100);
						var image100scaleFactorH = Math.round((bgImageheightCAPTURE/mmContainerTarg.innerHeight())*100);


						//console.log(image100scaleFactorW + ' w-h '+ image100scaleFactorH);

						if (curZoomLevelArr == "contain"){
							//check height to width (real zoom)
							//console.log('bgImageOrient ' +bgImageOrient+ ' - ' +'mmContainerOrientation ' + mmContainerOrientation);

							if(bgImageOrient > mmContainerOrientation){
								var curZoomLevel = Math.round(mmContainerOrientation*100);
							} else if (bgImageOrient < mmContainerOrientation){
								var curZoomLevel = 100;
							} else {
								var curZoomLevel = 100;
							}
						} else if(curZoomLevelArr == "auto"){
							console.log('auto 1:1 factor:' + image100scaleFactorW);
							var curZoomLevel = image100scaleFactorW;
								
						} else if(curZoomLevelArrParts[0] == "auto"){
							if(bgImageOrient > mmContainerOrientation){
								var curZoomLevel = Math.round(mmContainerOrientation*100);
								//console.log('>bgImageOrient: ' + bgImageOrient + ' - mmContainerOrientation: ' +mmContainerOrientation);
							} else if (bgImageOrient < mmContainerOrientation){
								var curZoomLevel = Math.round(mmContainerOrientation*100);
								//console.log('<bgImageOrient: ' + bgImageOrient + ' - mmContainerOrientation: ' +mmContainerOrientation);
							} else {
								var curZoomLevel = 100;
								//console.log('=bgImageOrient: ' + bgImageOrient + ' - mmContainerOrientation: ' +mmContainerOrientation);
							}

						} else {
							var curZoomLevelValues = curZoomLevelArr.match(/-?[\d\.]+/g);
							var curZoomLevel = curZoomLevelValues[0];
						};
						var zoomInc = curZoomLevel/10;
						
						//console.log('Out cur ' + curZoomLevelArr);

						var targZoomLevel = Math.round( (parseFloat(curZoomLevel) - parseFloat(zoomInc)) * 10 )/10;
						
						//console.log('Out targ' + targZoomLevel);


						if(targZoomLevel<5){
							$element.find('.butZoomout').prop('disabled', true);
							$element.find('.butZoomin').prop('disabled', false);
						} else {
							$element.find('.butZoomout').prop('disabled', false);
							$element.find('.butZoomin').prop('disabled', false);

							mmContainerTarg.css('background-size', targZoomLevel+'% auto');
							
						};
						
						
						

				});
				$element.find('.butZoomin').on('click', function() {



					var mmContainerOrientation = mmContainerTarg.innerHeight() / mmContainerTarg.innerWidth();

						
						//current zoom on image:

						var curZoomLevelArr = mmContainerTarg.css('background-size');
						var curZoomLevelArrParts = curZoomLevelArr.split(" ");
						var image100scaleFactorW = Math.round((bgImagewidthCAPTURE/mmContainerTarg.innerWidth())*100);
						var image100scaleFactorH = Math.round((bgImageheightCAPTURE/mmContainerTarg.innerHeight())*100);


						//console.log(image100scaleFactorW + ' w-h '+ image100scaleFactorH);

						if (curZoomLevelArr == "contain"){
							//check height to width (real zoom)
							console.log('contain');
							//console.log('bgImageOrient ' +bgImageOrient+ ' - ' +'mmContainerOrientation ' + mmContainerOrientation);
							if(bgImageOrient > mmContainerOrientation){
								var curZoomLevel = Math.round(mmContainerOrientation*100);

							} else if (bgImageOrient < mmContainerOrientation){
								var curZoomLevel = 100;

							} else {
								var curZoomLevel = 100;
							}
						} else if(curZoomLevelArr == "auto"){
							console.log('auto 1:1 factor:' + image100scaleFactorW);
							var curZoomLevel = image100scaleFactorW;
							
							
						} else if((curZoomLevelArrParts[0] == "auto") & (curZoomLevelArrParts.length == 2)){
							console.log('auto width');
							if(bgImageOrient > mmContainerOrientation){
								var curZoomLevel = Math.round(mmContainerOrientation*100);
							} else if (bgImageOrient < mmContainerOrientation){
								var curZoomLevel = Math.round(mmContainerOrientation*100);
							} else {
								var curZoomLevel = 100;
							}

						} else {
							console.log('set value (zoomed already)');
							var curZoomLevelValues = curZoomLevelArr.match(/-?[\d\.]+/g);
							var curZoomLevel = curZoomLevelValues[0];
						};
						var zoomInc = curZoomLevel/10;
						
						//console.log('In cur ' + curZoomLevelArr);

						var targZoomLevel = Math.round( (parseFloat(curZoomLevel) + parseFloat(zoomInc)) * 10 )/10;

						//console.log('In targ' + targZoomLevel);

					if(targZoomLevel>800){
						$element.find('.butZoomin').prop('disabled', true);
						$element.find('.butZoomout').prop('disabled', false);
					} else {
						$element.find('.butZoomin').prop('disabled', false);
						$element.find('.butZoomout').prop('disabled', false);
						mmContainerTarg.css('background-size', targZoomLevel+'% auto');
					};

				});
				
				/**
				$element.find('.butZoom100').on('click', function() {
					var actualWasPer;
					if((rotateImgTurns== 0) || (rotateImgTurns== 2) || (rotateImgTurns== 4) ){
						actualWasPer = Math.round((mmContainerTarg.innerWidth()/bgImagewidthCAPTURE)*100);
						mmContainerTarg.css('background-size', actualWasPer+'% auto');
					} else {
						actualWasPer = Math.round((bgImagewidthCAPTURE/mmContainerTarg.innerWidth())*100);
						mmContainerTarg.css('background-size', actualWasPer+'% auto');
					};

					
					$element.find('.butZoomout').prop('disabled', false);
					$element.find('.butZoomin').prop('disabled', false);
					

				
				});
				
				**/
				//mouseover move on zoomed images
					
				
					$element.find('.mgoSinglePic').on('mousemove', function(e) {
					
						var mgoPicContW = mmContainerTarg.innerWidth();
					   	var mgoPicContH = mmContainerTarg.innerHeight();
						var curZoomLevelArr = mmContainerTarg.css('background-size');
						var curZoomLevelArrParts = curZoomLevelArr.split(" ");

						//console.log('curZoomLevelArr: ' + curZoomLevelArr);

						if((curZoomLevelArr!="contain") & (curZoomLevelArr!="100% 100%") ){
							var imageSizeAfterzoomW, imageSizeAfterzoomH;

							if(curZoomLevelArrParts[0] == 'auto'){
								//fixed height
								//console.log("fixed height");
								imageSizeAfterzoomH = Math.round((mgoPicContH * parseFloat(curZoomLevelArrParts[1]))/100);
								imageSizeAfterzoomW = Math.round((bgImagewidthCAPTURE * (imageSizeAfterzoomH/bgImageheightCAPTURE)));

							} else {
								//fixed width
								//console.log("fixed width");
								imageSizeAfterzoomW = Math.round((mgoPicContW * parseFloat(mmContainerTarg.css('background-size')))/100);
								imageSizeAfterzoomH = Math.round((bgImageheightCAPTURE * (imageSizeAfterzoomW/bgImagewidthCAPTURE)));
							};
							//console.log('imageSizeAfterzoomW: '+imageSizeAfterzoomW + ' imageSizeAfterzoomH: '+imageSizeAfterzoomH );

							//get mouse rel
							var parentOffset = $(this).parent().offset(); 
							var relX = Math.round(e.pageX - parentOffset.left);
							var relY = Math.round(e.pageY - parentOffset.top);
						   
						    //work out positioning
													
							var imageOversizednessW = imageSizeAfterzoomW - mgoPicContW;
							var relXasPer = relX/mgoPicContW;

							var imageOversizednessH = imageSizeAfterzoomH - mgoPicContH;
							var relYasPer = relY/mgoPicContH;

							var lupebgPosTargX, lupebgPosTargY;

							if((rotateImgTurns== 0) || (rotateImgTurns== 4) ){
								
								lupebgPosTargX = Math.round(0 - (imageOversizednessW*relXasPer));
								lupebgPosTargY = Math.round(0 - (imageOversizednessH*relYasPer));
								//console.log(rotateImgTurns + ' right way up - relX:' + relX +  ' lupebgPosTargX:' +lupebgPosTargX+ ' relXasPer:' +relXasPer);

							} else if (rotateImgTurns== 2){
								
								lupebgPosTargX = Math.round((0-imageOversizednessW) + (imageOversizednessW*relXasPer));
								lupebgPosTargY = Math.round((0-imageOversizednessH ) + (imageOversizednessH*relYasPer));
								//console.log(rotateImgTurns + ' upside down - relX:' + relX +  ' lupebgPosTargX:' +lupebgPosTargX+ ' relXasPer:' +relXasPer);
							
							} else if (rotateImgTurns== 1){
								
								imageOversizednessH = imageSizeAfterzoomW - mgoPicContW;
								relXasPer = relX/mgoPicContH;

								imageOversizednessW = imageSizeAfterzoomH - mgoPicContH;
								relYasPer = relY/mgoPicContW;
								
								lupebgPosTargY = Math.round((0-imageOversizednessW) + (imageOversizednessW*relXasPer));
								lupebgPosTargX = Math.round(0 - (imageOversizednessH*relYasPer));

								//console.log('imageOversizednessW: '+imageOversizednessW + ' imageOversizednessH: '+imageOversizednessH );
								//console.log(rotateImgTurns + ' turned right - relX:' + relX +  ' lupebgPosTargX:' +lupebgPosTargX+ ' relXasPer:' +relXasPer);
							
							} else if (rotateImgTurns== 3){
								
								imageOversizednessH = imageSizeAfterzoomW - mgoPicContW;
								relXasPer = relX/mgoPicContH;

								imageOversizednessW = imageSizeAfterzoomH - mgoPicContH;
								relYasPer = relY/mgoPicContW;
								
								lupebgPosTargY = Math.round(0 - (imageOversizednessW*relXasPer));
								lupebgPosTargX = Math.round((0-imageOversizednessH ) + (imageOversizednessH*relYasPer));

								//console.log('imageOversizednessW: '+imageOversizednessW + ' imageOversizednessH: '+imageOversizednessH );
								//console.log(rotateImgTurns + ' turned right - relX:' + relX +  ' lupebgPosTargX:' +lupebgPosTargX+ ' relXasPer:' +relXasPer);
							};

							

								
								if((imageOversizednessH > 0) & (imageOversizednessW <= 0) ){   
							   		//console.log('moving height');
							   		mmContainerTarg.css('background-position', ('50% '+ lupebgPosTargY+'px'));
								} else if ((imageOversizednessH <= 0) & (imageOversizednessW > 0) ){
									//console.log('moving width');
							   		mmContainerTarg.css('background-position', (lupebgPosTargX+'px 50%'));
								} else if ((imageOversizednessH > 0) & (imageOversizednessW > 0) ){
									//console.log('moving 2 ways');
							   		mmContainerTarg.css('background-position', (lupebgPosTargX+'px '+ lupebgPosTargY+'px'));
								} else {
									//console.log('dont move');
							   		mmContainerTarg.css('background-position', ('50% 50%'));
								};
								//console.log('imageOversizednessH:' + imageOversizednessH + ' - imageOversizednessW:' + imageOversizednessW);
							
						};


					});

				

					$element.find('.mgoSinglePic').on('mouseleave', function(e) {
						mmContainerTarg.css('background-position', '50% 50%');
					});
				
				
				
				//Rotate
				$element.find('.butRotate').on('click', function() {

						if(layout.qDef.SINGLEIMGDISPLAY){
							mmContainerTarg.css('background-size', 'contain');
						} else if (layout.qDef.SINGLEIMGDISPLAYOPT121){
							mmContainerTarg.css('background-size', 'auto');
						} else if (layout.qDef.SINGLEIMGDISPLAYOPT == "h"){
							mmContainerTarg.css('background-size', 'auto 100%');
						} else if(layout.qDef.SINGLEIMGDISPLAYOPT == "w"){
							mmContainerTarg.css('background-size', '100%');
						} else if(layout.qDef.SINGLEIMGDISPLAYOPT == "s"){
							mmContainerTarg.css('background-size', '100% 100%');
						};

						var mgoPicContW = Math.floor(mmContainerTargContainer.innerWidth());
					   	var mgoPicContH = Math.floor(mmContainerTargContainer.innerHeight());

						var curRotateLevelArrA = mmContainerTarg.css('-webkit-transform');
						var curRotateLevelArrB = mmContainerTarg.css('-moz-transform');
						var curRotateLevelArrC = mmContainerTarg.css('transform');

						//console.log(mgoPicContW + ' CW-CH ' + mgoPicContH);

						var curRotateLevel, targRotateLevel, targOffsetX, targOffsetY, targOffsetW, targOffsetH;

						

						if((curRotateLevelArrA == "none") || (curRotateLevelArrB == "none") || (curRotateLevelArrC == "none")){
							curRotateLevel = 0;
							targRotateLevel = 90;
							targOffsetX=mgoPicContW;
							targOffsetY=0;
							targOffsetW=mgoPicContH;
							targOffsetH=mgoPicContW;
							rotateImgTurns= 1;

						} else {
							var curRotateLevelValuesA = curRotateLevelArrA.match(/-?[\d\.]+/g);
							var curMatrixVals = Math.round( (parseFloat(curRotateLevelValuesA[0])) * 10 );

							if(curMatrixVals == -18){
								targRotateLevel = 0;
								targOffsetX=0;
								targOffsetY=0;
								targOffsetW=mgoPicContW;
								targOffsetH=mgoPicContH;
								rotateImgTurns= 4;

							} else if (curMatrixVals == -10){
								targRotateLevel = 270;
								targOffsetX=0;
								targOffsetY=mgoPicContH;
								targOffsetW=mgoPicContH;
								targOffsetH=mgoPicContW;
								rotateImgTurns= 3;
							} else if (curMatrixVals == 61){
								targRotateLevel = 180;
								targOffsetX=mgoPicContW;
								targOffsetY=mgoPicContH;
								targOffsetW=mgoPicContW;
								targOffsetH=mgoPicContH;
								rotateImgTurns= 2;
							} else {
								targRotateLevel = 90;
								targOffsetX=mgoPicContW;
								targOffsetY=0;
								targOffsetW=mgoPicContH;
								targOffsetH=mgoPicContW;
								rotateImgTurns= 1;
							};

							
						};


						//console.log(rotateImgTurns);

						mmContainerTarg.css('position', 'absolute');
						
						mmContainerTarg.css('-moz-transform-origin', '0px 0px 0px');
						mmContainerTarg.css('-webkit-transform-origin', '0px 0px 0px');
						mmContainerTarg.css('transform-origin', '0px 0px 0px');

						mmContainerTarg.css('-moz-transform', 'rotate('+targRotateLevel+'deg)');
						mmContainerTarg.css('-webkit-transform', 'rotate('+targRotateLevel+'deg)');
						mmContainerTarg.css('transform', 'rotate('+targRotateLevel+'deg)');

						mmContainerTarg.css('top', targOffsetY+'px');
						mmContainerTarg.css('left', targOffsetX+'px');
						
						mmContainerTarg.css('width', targOffsetW+'px');
						mmContainerTarg.css('height', targOffsetH+'px');
						
						//console.log(mmContainerTarg.position());
						//console.log(mmContainerTarg.innerWidth() + ' W - H '+mmContainerTarg.innerHeight());
						
				});
				
				
				//reset
				$element.find('.butReposition').on('click', function() {
					
					if(layout.qDef.SINGLEIMGDISPLAY){
						mmContainerTarg.css('background-size', 'contain');
					} else if (layout.qDef.SINGLEIMGDISPLAYOPT121){
						mmContainerTarg.css('background-size', 'auto');
					} else if (layout.qDef.SINGLEIMGDISPLAYOPT == "h"){
						mmContainerTarg.css('background-size', 'auto 100%');
					} else if(layout.qDef.SINGLEIMGDISPLAYOPT == "w"){
						mmContainerTarg.css('background-size', '100%');
					} else if(layout.qDef.SINGLEIMGDISPLAYOPT == "s"){
						mmContainerTarg.css('background-size', '100% 100%');
					} ;
					
					$element.find('.butZoomout').prop('disabled', false);
					$element.find('.butZoomin').prop('disabled', false);
					mmContainerTarg.css('-moz-transform', 'none');
					mmContainerTarg.css('-webkit-transform', 'none');
					mmContainerTarg.css('transform', 'none');
					mmContainerTarg.css('height', '100%');
					mmContainerTarg.css('width', '100%');
					mmContainerTarg.css('position', 'absolute');
					mmContainerTarg.css('top', '0px');
					mmContainerTarg.css('left', '0px');

					rotateImgTurns= 0;

				});
			};
			
		}
		
	};
} );
