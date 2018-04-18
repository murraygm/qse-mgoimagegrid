/*globals define*/
define(["jquery","text!./MGOImageGridv3.css"], 
function($, cssContent) {'use strict';
	$("<style>").html(cssContent).appendTo("head");
	return {
		initialProperties: {
			version: 3.15,
			qHyperCubeDef: {
				qDimensions: [],
				qMeasures: [],
				qInitialDataFetch: [{
					qWidth: 6,
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
					label:"MGO Image Grid V3.15",
					component: "expandable-items",
					items: {
					imageSource: {
						type:"items",
						label:"Image source & selecting",
						grouped:true,
						items: {
							IMGLOADSET:{
								type: "items",
               					label: "Grid Source",
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
							IMGGRIDSET:{
								type: "items",
               					label: "Grid",
								items: {
									imgSelectGridTxt : {
										label:"Below you can set how selections and interactions work on the GRID",
										component: "text"
									},
									imageClickNoselect: {
										ref : "qDef.IMGGRIDNOSELECT",
										label : "Disable selection on the grid",
										type : "boolean",
										defaultValue : false
									}, 
									imageClickAction : {
										ref: "qDef.IMGLINK",
										type: "number",
										component: "buttongroup",
										label: "Image action, select data or popup image in new window",
										options: [{
											value: 1,
											label: "Select",
											tooltip: "Make selections on the field"
										}, {
											value: 0,
											label: "Popup",
											tooltip: "Pop up the image in a new window"
										}, {
											value: 2,
											label: "Both",
											tooltip: "Make select and Pop up the image in a new window"
										}],
										defaultValue: true,
										show: function(layout) { if( layout.qDef.IMGGRIDNOSELECT != true ){ return true } else { return false } }
										},
									imageClickFastselect: {
										ref : "qDef.IMGGRIDFASTSELECT",
										label : "Use instant selection (remove multi-select on grid)",
										type : "boolean",
										defaultValue : false,
										show: function(layout) { if( layout.qDef.IMGGRIDNOSELECT != true & layout.qDef.IMGLINK> 0 ){ return true } else { return false } }
									}, 
									imageDimToSelect: {
										ref : "qDef.IMGDIMTOSELECT",
										label : "Set which Dimension selections are made in",
										type: "string",
										component: "dropdown",
										options: [{
											value: "d1",
											label: "Selection 1st dimension"
										}, {
											value: "d2",
											label: "Selection 2nd dimension"
										}],
										defaultValue: "d1",
										show: function(layout) { if( layout.qDef.IMGGRIDNOSELECT != true & layout.qDef.IMGLINK> 0 ){ return true } else { return false } }
									}, 
									imgPopupEditTxt : {
										label:"Note - popups are disabled in edit mode",
										component: "text",
										show: function(layout) { if( layout.qDef.IMGGRIDNOSELECT != true & layout.qDef.IMGLINK !=1 ){ return true } else { return false } }
									},
									imgPopupTargType: {
										ref : "qDef.POPUPTARGTYPE",
										label : "Pop Up in same window",
										type : "boolean",
										defaultValue : false,
										show: function(layout) { if( layout.qDef.IMGGRIDNOSELECT != true & layout.qDef.IMGLINK !=1 ){ return true } else { return false } }
									}, 
									imagePopSourceLinkType : {
										type: "string",
										component: "dropdown",
										label: "Popup URL source",
										ref: "qDef.IMGLINKPOPLINKSOURCE",
										options: [{
											value: "d1",
											label: "URL 1st dimension"
										}, {
											value: "d2",
											label: "URL 2nd dimension"
										}, {
											value: "c",
											label: "Custom URL"
										}],
										defaultValue: "d1",
										show: function(layout) { if( layout.qDef.IMGGRIDNOSELECT != true & layout.qDef.IMGLINK !=1 ){ return true } else { return false } }
										},
									imagePopCustomLink : {
										ref: "qDef.IMGLINKPOPLINK",
										label: "URL or path for popup link",
										type: "string",
										expression: "optional",
										defaultValue: "",
										show: function(layout) { if( layout.qDef.IMGGRIDNOSELECT != true & layout.qDef.IMGLINKPOPLINKSOURCE == "c" & layout.qDef.IMGLINK !=1 ){ return true } else { return false }  } 
										}
									}
								},
							IMGSINGLESET:{
								type: "items",
               					label: "Single image",
								items: {
									imgSelectSingleTxt : {
										label:"Below you can change source and interactions for the SELECTED single image view",
										component: "text"
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
										}
									}
								},
							IMGPAGINGSET:{
								type: "items",
               					label: "Paging and grid amount",
								items: {
									IMGPAGINGNOTE : {
										label : "Below you can adjust the number of images displayed on the grid and whether the user can page through them. The default is 100.",
										component : "text"
										},
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
										defaultValue : true,
										show: function(layout) { return layout.qDef.IMGPAGING } 
										},
									IMGPAGESIZE : {
										ref : "qDef.IMGPAGINGSIZE",
										label : "Number of images per page (use same value as initial load)",
										type : "number",
										defaultValue : 100,
										show: function(layout) { if(layout.qDef.IMGPAGING & layout.qDef.IMGPAGINGTOG ){ return true } else { return false } } 
										},
									imagePagingDisplay : {
										ref : "qDef.IMGPAGINGDISPLAY",
										label : "Hide the image paging count (1 of ####) on grid and 1up views",
										type : "boolean",
										defaultValue : false,
										show: function(layout) { return layout.qDef.IMGPAGING } 
										},
									IMGPAGING1UPNOTE : {
										label : "1 up single image paging. For best results in 1 up mode, set 'Maximum number of images to initially load' and 'Number of images per page' to 1 before selecting the below option.",
										component : "text",
										show: function(layout) {return layout.qDef.IMGPAGING } 
										},
									IMGPAGING1UP : {
										ref : "qDef.IMGPAGING1UP",
										label : "Use a 1 up single image paging display instead of a grid ",
										type : "boolean",
										defaultValue : false,
										show: function(layout) { return layout.qDef.IMGPAGING } 
										}
									}
								}	
							}
						},
					measureDisplay: {
						type:"items",
						label:"Measure display",
						items: {
							measGridDisplayTog : {
								ref: "qDef.IMGMEASGRIDDISPLAYTOG",
								label: "Show first 2 measures on grid",
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
							measColTxt : {
								ref: "qDef.IMGMEASDISPLAYSTYLETXTCOL",
								label: "Text colour for measure (HEX)",
								type: "string",
								expression: "optional",
								defaultValue: "FFF",
								show: function(layout)  { if( layout.qDef.IMGMEASGRIDDISPLAYTOG & !layout.qDef.IMGMEASDISPLAYSTYLE ){ return true } else { return false } }
								},
							measGridDisplayTitles : {
								ref: "qDef.IMGMEASGRIDDISPLAYTITLES",
								label: "Hide measure titles (show value only)",
								type: "boolean",
								defaultValue: false,
								show: function(layout)  { if( layout.qDef.IMGMEASGRIDDISPLAYTOG & !layout.qDef.IMGMEASDISPLAYSTYLE ){ return true } else { return false } }
								},
							measGridDisplayTextBGpan : {
								ref: "qDef.IMGMEASGRIDDISPLAYTEXTBG",
								label: "Hide dark background panel",
								type: "boolean",
								defaultValue: false,
								show: function(layout)  { if( layout.qDef.IMGMEASGRIDDISPLAYTOG & !layout.qDef.IMGMEASDISPLAYSTYLE ){ return true } else { return false } }
								},
							measGridDisplaySymbols : {
								ref: "qDef.IMGMEASGRIDDISPLAYSYMBOLS",
								label: "Add symbols after measure value (separate symbols for 1st and 2nd measures using ',')",
								type: "string",
								defaultValue: "",
								show: function(layout)  { if( layout.qDef.IMGMEASGRIDDISPLAYTOG & !layout.qDef.IMGMEASDISPLAYSTYLE ){ return true } else { return false } }
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
								defaultValue: true,
								show: function(layout)  { if( layout.qDef.IMGMEASGRIDDISPLAYTOG & layout.qDef.IMGMEASDISPLAYSTYLE ){ return true } else { return false } }
								},
							singleImageDisplayMeasure : {
								ref: "qDef.SINGLEIMGMEASURE",
								label: "Display measures as values in single image view",
								type: "boolean",
								defaultValue: true
								}
							}
						},	

					imageStyling: {
						type:"items",
						label:"Image grid display options",
						grouped: true,
						items: {
							
							imageScalingGrid : {
								type: "string",
								component: "buttongroup",
								label: "Custom scaling (all items)",
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
							hoverDisplay: {
								type:"items",
								label:"Size",
								items: {
									imageGridHover : {
										ref : "qDef.IMGGRIDHOVER",
										label : "Display dimension/value on hover",
										type : "boolean",
										defaultValue : false
										},
									imageGridHoverType : {
										type: "string",
										component: "dropdown",
										label: "Select text for hover",
										ref: "qDef.IMGGRIDHOVERTYPE",
										options: [{
											value: "d1",
											label: "Text = Dimension 1",
											tooltip: "Use the 1st dimension as text for the hover"
										},{
											value: "d2",
											label: "Text = Dimension 2",
											tooltip: "Use the 2nd dimension as text for the hover"
										}, {
											value: "m1",
											label: "Text = Measure 1",
											tooltip: "Use the 1st measure as text for the hover"
										}, {
											value: "m2",
											label: "Text =  Measure 2",
											tooltip: "Use the 2nd measure as text for the hover"
										},{
											value: "m3",
											label: "Text =  Measure 3",
											tooltip: "Use the 3rd measure as text for the hover"
										}],
										defaultValue: "d1",
										show: function(layout) { return layout.qDef.IMGGRIDHOVER } 
										}	
									}
								},		
							sizeDisplay: {
								type:"items",
								label:"Size",
								items: {
									customImageSize : {
										ref : "qDef.IMGSIZING",
										label : "Custom image size (all items)",
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
										}
									}
								},
							opacityDisplay: {
								type:"items",
								label:"Opacity",
								items: {
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
											label: "Opacity Measure 1",
											tooltip: "Use the first measure to set opacity per image"
										}, {
											value: "m2",
											label: "Opacity Measure 2",
											tooltip: "Use the second measure to set opacity per image"
										}, {
											value: "m3",
											label: "Opacity Measure 3",
											tooltip: "Use the third measure to set opacity per image"
										}, {
											value: "n",
											label: "Opacity Fixed amount",
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
										}
									}
								},
							bgcolDisplay: {
								type:"items",
								label:"Backgroup colour",
								items: {
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
											value: "d2",
											label: "Colour Dimension 2",
											tooltip: "Use the 2nd dimension to set custom bg colour per image"
										}, {
											value: "m1",
											label: "Colour Measure 1",
											tooltip: "Use the first measure to set custom bg colour per image"
										}, {
											value: "m2",
											label: "Colour Measure 2",
											tooltip: "Use the second measure to set custom bg colour per image"
										},{
											value: "m3",
											label: "Colour Measure 3",
											tooltip: "Use the third measure to set custom bg colour per image"
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
										show: function(layout) { if(layout.qDef.IMGOBGCOL & layout.qDef.IMGBGCOLTYPE == "n"){ return true } else { return false }  } 
										}
									}
								},
							borderDisplay: {
								type:"items",
								label:"Border",
								items: {
									imageBorder : {
										ref: "qDef.IMGBORDER",
										label: "Custom image border (all items)",
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
							customImageEffect : {
								type: "string",
								component: "dropdown",
								label: "Image effect",
								ref: "qDef.IMGEFFECTTYPE",
								options: [{
									value: "n",
									label: "No effect",
									tooltip: "No effect"
								},{
									value: "b",
									label: "Black and white",
									tooltip: "Convert to black and white"
								}, {
									value: "m",
									label: "Multiply colour blend",
									tooltip: "Make black mono and blend with background colour"
								}, {
									value: "s",
									label: "Screen colour blend",
									tooltip: "Make white mono and blend with background colour"
								}],
								defaultValue: "n"
								}	

							}
						},
					singleimages: {
						type:"items",
						label:"Single image display options",
						items: {
							singleImageDisplayHeader : {
								ref: "qDef.SINGLEIMGHEADER",
								label: "Display image name and link",
								type: "boolean",
								defaultValue: true
								},
							singleImagePopSourceLinkType : {
								type: "string",
								component: "dropdown",
								label: "Image link (URL) and label source",
								ref: "qDef.SINGLEIMGLINKPOPLINKSOURCE",
								options: [{
									value: "d1",
									label: "Link 1st dimension"
								}, {
									value: "d2",
									label: "Link 2nd dimension"
								}, {
									value: "c",
									label: "Custom link & label"
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
								label: "URL or local folder path for image link",
								type: "string",
								expression: "optional",
								defaultValue: "",
								show: function(layout) { if(layout.qDef.SINGLEIMGHEADER & layout.qDef.SINGLEIMGLINKPOPLINKSOURCE == "c"){ return true } else { return false } } 
								},
							singleImageDifCustomBG : {
								ref: "qDef.SINGLEIMGCUSTBGTOG",
								label: "Use a different background colour (separate from grid view)",
								type: "boolean",
								defaultValue: false
								},
							singleImageDifEffect : {
								ref: "qDef.SINGLEIMGEFFECTTOG",
								label: "Override image effect if applied",
								type: "boolean",
								defaultValue: false
								},
							singleImageDifCustomBGVal : {
								ref: "qDef.SINGLEIMGCUSTBGVAL",
								label: "Background colour (HEX)",
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
					imagePrinting: {
						type:"items",
						label:"Printing options",
						items: {
							IMGPRINTTEXT : {
								label:"This extension uses a custom approach to printing which allows you to print the images currently displayed (either in the grid or in single image mode).",
								component: "text"
							},
							IMGPRINTGRIDTOG : {
								ref : "qDef.IMGPRINTGRIDTOG",
								label : "Enable image printing",
								type : "boolean",
								defaultValue : false
								}
							}
						},
					colourFlag: {
						type:"items",
						label:"Colour indicator",
						items: {
							colorFlagTog : {
								ref : "qDef.IMGCOLORFLAG",
								label : "Set a custom colour indicator",
								type : "boolean",
								defaultValue : false
								},
							colorFlagRef : {
								ref: "qDef.IMGCOLORFLAGREF",
								type: "string",
								component: "dropdown",
								label: "If the value in this (dimension or measure)...",
								options: [{
									value: "1",
									label: "Dimension 1",
									tooltip: "Assess using dimension 1"
								},{
									value: "2",
									label: "Dimension 2",
									tooltip: "Assess using dimension 1"
								},{
									value: "3",
									label: "Measure 1",
									tooltip: "Assess using measure 1"
								},{
									value: "4",
									label: "Measure 2",
									tooltip: "Assess using measure 2"
								},{
									value: "5",
									label: "Measure 3",
									tooltip: "Assess using measure 3"
								}],
								defaultValue: "0",
								show: function(layout) { return layout.qDef.IMGCOLORFLAG }
								},
							colorFlagOperator : {
								type: "string",
								component: "buttongroup",
								label: "is...",
								ref: "qDef.IMGCOLORFLAGOP",
								options: [{
									value: "e",
									label: "=",
									tooltip: "Equal to"
								}, {
									value: "g",
									label: ">",
									tooltip: "Greater than"
								}, {
									value: "l",
									label: "<",
									tooltip: "Less than"
								}, {
									value: "b",
									label: "Btw",
									tooltip: "Between (exclusive)"
								}],
								defaultValue: "e",
								show: function(layout) { if((layout.qDef.IMGCOLORFLAG) & (layout.qDef.IMGCOLORFLAGREF > 2)){ return true } else { return false } } 
								},
							colorFlagValueNum : {
								type : "number",
								label : "Numeric value for measure:",
								expression: "optional",
								defaultValue : 0,
								ref: "qDef.IMGCOLORFLAGNUMVAL",
								show: function(layout) { if((layout.qDef.IMGCOLORFLAG) & (layout.qDef.IMGCOLORFLAGREF > 2)){ return true } else { return false } } 
								},
							colorFlagValueNum2 : {
								type : "number",
								expression: "optional",
								defaultValue : 0,
								ref: "qDef.IMGCOLORFLAGNUMVAL2",
								show: function(layout) { if((layout.qDef.IMGCOLORFLAG) & (layout.qDef.IMGCOLORFLAGREF > 2) & (layout.qDef.IMGCOLORFLAGOP =="b")){ return true } else { return false } } 
								},
							colorFlagValueDim : {
								type : "string",
								expression: "optional",
								label : "matches this value for dimension:",
								defaultValue : "",
								ref: "qDef.IMGCOLORFLAGDIMVAL",
								show: function(layout) { if((layout.qDef.IMGCOLORFLAG) & (layout.qDef.IMGCOLORFLAGREF < 3)){ return true } else { return false } } 
								},
							colorFlagTarget : {
								ref: "qDef.IMGCOLORFLAGTARG",
								type: "string",
								component: "dropdown",
								label: "then, flag via this property",
								options: [{
									value: "b",
									label: "Background colour",
									tooltip: "Overide background colour"
								},{
									value: "e",
									label: "Overide effect",
									tooltip: "Overide image effect (eg turn of black and white)"
								},{
									value: "t1",
									label: "Colour for measure 1",
									tooltip: "Overide colour on measure 1"
								},{
									value: "t2",
									label: "Colour for measure 2",
									tooltip: "Overide colour on measure 2"
								}],
								defaultValue: "b",
								show: function(layout) { if((layout.qDef.IMGCOLORFLAG) & (layout.qDef.IMGCOLORFLAGREF > 0)){ return true } else { return false } } 
								},
							colorFlagTargetCol : {
								type : "string",
								expression: "optional",
								label : "To this colour (HEX)",
								defaultValue : "F00",
								ref: "qDef.IMGCOLORFLAGDTARGCOL",
								show: function(layout) { if((layout.qDef.IMGCOLORFLAG) & (layout.qDef.IMGCOLORFLAGREF > 0) & (layout.qDef.IMGCOLORFLAGTARG != "e")){ return true } else { return false } } 
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
			var self = this, lastrow = 0, firstrow = 0, morebutton = false, lessbutton = false, imgSelectType = layout.qDef.IMGLINK, rowcount = this.backendApi.getRowCount(), imgFolderLocation = "", qData = layout.qHyperCube.qDataPages[(layout.qHyperCube.qDataPages.length - 1)], mymeasureCount = layout.qHyperCube.qMeasureInfo.length, mydimensionCount = layout.qHyperCube.qDimensionInfo.length, measBarCol1 = "FFF", measBarCol2="FFF", measBarHeight=10,  imgScaleSingle = "mgoImgScaleFit", imgBGCol = "FFF", imgBorderCol = "FFF", imgBorderSize = 0, imgCHeight = 100, imgCWidth = 100, imgScaleGrid = "mgoImgScaleFit";
			var imgriduniqueID = layout.qInfo.qId;
			var html = '<div id="mmI'+imgriduniqueID+'">';
			
			var imgridpage = layout.qDef.IMGPAGINGSIZE;
			var mgoSinglePicModeActive;
			var killzoomcontrols = true;


			var hideImageCount;
			if(layout.qDef.IMGPAGINGDISPLAY){
				hideImageCount = 'display: none;';
			} else {
				hideImageCount = '';
			};



			//console.log(qData);

			//local or online image source
				if(layout.qDef.IMGSRCTYPEMGO){
					imgFolderLocation = layout.qDef.IMGSRCMGO; 
				} else {
					
					var imgFolderLocationURI = "/Extensions/" + layout.qDef.IMGSRCLOCALMGO + "/";
					imgFolderLocation= encodeURI(imgFolderLocationURI);
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
			
			
			//set up measure bar
			if(imgCHeight > 20){
					measBarHeight = 10; 
				} else {
					measBarHeight = 3;
				};

			

			//measure bg panel overide
			var measBGtextPanel= '', measBGtextCol= '';
			if(layout.qDef.IMGMEASGRIDDISPLAYTEXTBG){
				measBGtextPanel = 'background:transparent;';
			};

			measBGtextCol='color:#'+layout.qDef.IMGMEASDISPLAYSTYLETXTCOL+';';



			//set up BG and Borders
			if(layout.qDef.IMGBORDER){
				imgBorderSize = layout.qDef.IMGBORDERDEFSIZE;
				imgBorderCol = layout.qDef.IMGBORDERDEFCOL;
				imgBorderCol = imgBorderCol.replace(/#/g, '');
			} else {
				imgBorderSize = 0;
				imgBorderCol = "FFF";
			};
			if(layout.qDef.IMGOBGCOL){
				imgBGCol = layout.qDef.IMGOBGCOLVAL;
				imgBGCol = imgBGCol.replace(/#/g, '');
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

			//set up measure symbols
			var measSymbols = layout.qDef.IMGMEASGRIDDISPLAYSYMBOLS, measSymbolArr, meas1Symbol='', meas2Symbol='', meas3Symbol='';
			//console.log(measSymbols);
			if((measSymbols !='') & (typeof measSymbols != 'undefined')){
				measSymbolArr = measSymbols.split(',');
				meas1Symbol = measSymbolArr[0];
				if(measSymbolArr.length == 2){
					meas2Symbol = measSymbolArr[1];
				} else if(measSymbolArr.length == 3){
					meas2Symbol = measSymbolArr[1];
					meas3Symbol = measSymbolArr[2];
				} else {
					meas2Symbol = "";
					meas3Symbol = "";
				};
			}
			
			//SET UP COLOUR FLAG IF EXISTS
			var colFlagToggle=layout.qDef.IMGCOLORFLAG, colFlagTargData = "", colFlagTargDataType ="", colFlagTargDataOP ="", colFlagTargValue= "", colFlagTargValue2= "", colFlagTargProperty ="", colFlagTargColValue="";
			var colFlagTextColInsert='color:#'+layout.qDef.IMGMEASDISPLAYSTYLETXTCOL;
			var colFlagTextColInsertM1='color:#'+layout.qDef.IMGMEASDISPLAYSTYLETXTCOL, colFlagTextColInsertM2='color:#'+layout.qDef.IMGMEASDISPLAYSTYLETXTCOL;
			if(colFlagToggle){
				
				colFlagTargData = layout.qDef.IMGCOLORFLAGREF;

				if(colFlagTargData < 3){
					colFlagTargDataType = "dim";
					colFlagTargValue = layout.qDef.IMGCOLORFLAGDIMVAL;
					colFlagTargProperty = layout.qDef.IMGCOLORFLAGTARG;
					colFlagTargColValue = layout.qDef.IMGCOLORFLAGDTARGCOL;
					colFlagTargColValue = colFlagTargColValue.replace(/#/g, '');

				} else {
					colFlagTargDataType = "meas";
					colFlagTargDataOP = layout.qDef.IMGCOLORFLAGOP;
					if(colFlagTargDataOP == 'b'){
						colFlagTargValue = layout.qDef.IMGCOLORFLAGNUMVAL;
						colFlagTargValue2 = layout.qDef.IMGCOLORFLAGNUMVAL2;
					} else {
						colFlagTargValue = layout.qDef.IMGCOLORFLAGNUMVAL;
					};
					
					colFlagTargProperty = layout.qDef.IMGCOLORFLAGTARG;
					colFlagTargColValue = layout.qDef.IMGCOLORFLAGDTARGCOL;
					colFlagTargColValue = colFlagTargColValue.replace(/#/g, '');
				};
				/**
				console.log(
					'colFlagTargData ' + colFlagTargData +
					' | colFlagTargDataType ' + colFlagTargDataType +
					' | colFlagTargDataOP ' + colFlagTargDataOP +
					' | colFlagTargValue ' + colFlagTargValue +
					' | colFlagTargValue2  ' + colFlagTargValue2+ 
					' | colFlagTargProperty ' + colFlagTargProperty+
					' | colFlagTargColValue ' + colFlagTargColValue
					);
				**/

		

			};

				
			var parentscope = angular.element($element).scope().$parent.$parent.$parent;
			$element.html(parentscope.editmode ? 'In Edit Mode' : 'Not in Edit mode');
			
			if(layout.qDef.POPUPTARGTYPE){
				var popUpType = '';
			} else  {
				var popUpType = ' target="_blank"';
			};

			//render data
				$.each(qData.qMatrix, function ( key, row  ) {
					if(mydimensionCount == 2){

						var dim = row[0], dim2 = row[1], meas1 = row[2], meas2 = row[3], meas3 = row[4];

						if(layout.qDef.IMGDIMTOSELECT != "d2"){
							var dimToSelect = dim;
						} else {
							var dimToSelect = dim2;
						};

					} else if (mydimensionCount == 1){
						var dim = row[0], meas1 = row[1], meas2 = row[2], meas3 = row[3];
						var dimToSelect = dim;
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

					if((mymeasureCount==1) & (layout.qDef.IMGMEASDISPLAYSTYLE)){
						var measBarCol1 =layout.qDef.IMGMEASDISPLAYSTYLEBARCOL1;
						var measBarCol2 ="FFF";
					} else if((mymeasureCount>1) & (layout.qDef.IMGMEASDISPLAYSTYLE)) {
						var measBarCol1 =layout.qDef.IMGMEASDISPLAYSTYLEBARCOL1;
						var measBarCol2 =layout.qDef.IMGMEASDISPLAYSTYLEBARCOL2;
					} else {
						var measBarCol1 ="FFF";
						var measBarCol2 ="FFF";
					};
					
					//set up BG colour 
					var imgBGColRGB, imgBGColRGBa, imgBGColRGBAlpha, imgBGColInsert;
					if(layout.qDef.IMGOBGCOL){
						//check setting
						if (layout.qDef.IMGBGCOLTYPE == "n"){
							//imgBGCol = layout.qDef.IMGOBGCOLVAL;
							imgBGColInsert = 'background-color: #' + imgBGCol;
						} else if(layout.qDef.IMGBGCOLTYPE == "d2"){
							//get hex calc percent tint and switch to rgba
							if(mydimensionCount>1){
								imgBGCol = dim2.qText;
								imgBGCol =imgBGCol.replace(/#/g, '');
								imgBGColInsert = 'background-color: #' + imgBGCol;
							} else {
								imgBGColInsert = 'background-color: #' + imgBGCol;
							};

						} else if(layout.qDef.IMGBGCOLTYPE == "m1"){
							//get hex calc percent tint and switch to rgba
							if(mymeasureCount>0){
								imgBGCol = meas1.qText;
								imgBGCol =imgBGCol.replace(/#/g, '');
								imgBGColInsert = 'background-color: #' + imgBGCol;
							} else {
								imgBGColInsert = 'background-color: #' + imgBGCol;
							};

						} else if (layout.qDef.IMGBGCOLTYPE == "m2"){
							if(mymeasureCount>1){
								imgBGCol = meas2.qText;
								imgBGCol =imgBGCol.replace(/#/g, '');
								imgBGColInsert = 'background-color: #' + imgBGCol;

							} else {
								imgBGColInsert = 'background-color: #' + imgBGCol;
							};
						} else if (layout.qDef.IMGBGCOLTYPE == "m3"){
							if(mymeasureCount>2){
								imgBGCol = meas3.qText;
								imgBGCol =imgBGCol.replace(/#/g, '');
								imgBGColInsert = 'background-color: #' + imgBGCol;

							} else {
								imgBGColInsert = 'background-color: #' + imgBGCol;
							};
						};

						//console.log(imgBGColInsert);
					};
				
					//SETUP IMAGE EFFECT
					var custImgEffectClass="";
					if(layout.qDef.IMGEFFECTTYPE=="n"){
						custImgEffectClass="";
					} else if (layout.qDef.IMGEFFECTTYPE=="b"){
						custImgEffectClass="mgoImgEffectBW";
					} else if (layout.qDef.IMGEFFECTTYPE=="m"){
						custImgEffectClass="mgoImgEffectBWMultiply";
					} else if (layout.qDef.IMGEFFECTTYPE=="s"){
						custImgEffectClass="mgoImgEffectBWScreen";
					} else {
						custImgEffectClass="";
					};


					//Colour flag overide
					if(colFlagToggle){
						//BG color 
						if(colFlagTargProperty=="b"){
							if(colFlagTargDataType=="meas"){
								// chose target measure
								var colFlagMeasTarg;
								if((colFlagTargData == 3) & (mymeasureCount>0)) {
									colFlagMeasTarg= meas1.qNum;
								} else if ((colFlagTargData == 4) & (mymeasureCount>1)) {
									colFlagMeasTarg= meas2.qNum;
								} else if ((colFlagTargData == 5) & (mymeasureCount>2)) {
									colFlagMeasTarg= meas3.qNum;
								};
								//assess type of operator equal


								if((colFlagTargDataOP=="e") & (colFlagMeasTarg == colFlagTargValue)){
									imgBGColInsert = 'background-color: #' + colFlagTargColValue;
								} else if((colFlagTargDataOP=="g") & (colFlagMeasTarg > colFlagTargValue)){
									imgBGColInsert = 'background-color: #' + colFlagTargColValue;
								} else if((colFlagTargDataOP=="l") & (colFlagMeasTarg < colFlagTargValue)){
									imgBGColInsert = 'background-color: #' + colFlagTargColValue;
								} else if((colFlagTargDataOP=="b") & (colFlagMeasTarg > colFlagTargValue) & (colFlagMeasTarg < colFlagTargValue2)){
									imgBGColInsert = 'background-color: #' + colFlagTargColValue;
								};

							} else {
								// chose target dim
								var colFlagDimTarg;
								if((colFlagTargData == 1) & (mydimensionCount>0)) {
									colFlagDimTarg = dim.qText;
								} else if ((colFlagTargData == 2) & (mydimensionCount>1)) {
									colFlagDimTarg = dim2.qText;
								} ;
								//assess 
								if(colFlagDimTarg == colFlagTargValue){
									imgBGColInsert = 'background-color: #' + colFlagTargColValue;
								}

							};	
						} else if(colFlagTargProperty=="e"){
							if(colFlagTargDataType=="meas"){
								// chose target measure
								var colFlagMeasTarg;
								if((colFlagTargData == 3) & (mymeasureCount>0)) {
									colFlagMeasTarg= meas1.qNum;
								} else if ((colFlagTargData == 4) & (mymeasureCount>1)) {
									colFlagMeasTarg= meas2.qNum;
								} else if ((colFlagTargData == 5) & (mymeasureCount>2)) {
									colFlagMeasTarg= meas3.qNum;
								};
								//assess type of operator equal


								if((colFlagTargDataOP=="e") & (colFlagMeasTarg == colFlagTargValue)){
									custImgEffectClass="";
								} else if((colFlagTargDataOP=="g") & (colFlagMeasTarg > colFlagTargValue)){
									custImgEffectClass="";
								} else if((colFlagTargDataOP=="l") & (colFlagMeasTarg < colFlagTargValue)){
									custImgEffectClass="";
								} else if((colFlagTargDataOP=="b") & (colFlagMeasTarg > colFlagTargValue) & (colFlagMeasTarg < colFlagTargValue2)){
									custImgEffectClass="";
								};

							} else {
								// chose target dim
								var colFlagDimTarg;
								if((colFlagTargData == 1) & (mydimensionCount>0)) {
									colFlagDimTarg = dim.qText;
								} else if ((colFlagTargData == 2) & (mydimensionCount>1)) {
									colFlagDimTarg = dim2.qText;
								} ;
								//assess 
								if(colFlagDimTarg == colFlagTargValue){
									custImgEffectClass="";
								}

							};	
						} else if(colFlagTargProperty=="t1"){
							colFlagTextColInsertM1 = 'color:#'+layout.qDef.IMGMEASDISPLAYSTYLETXTCOL;
							colFlagTextColInsertM2 = 'color:#'+layout.qDef.IMGMEASDISPLAYSTYLETXTCOL;

							if(colFlagTargDataType=="meas"){
								// chose target measure
								var colFlagMeasTarg;
								if((colFlagTargData == 3) & (mymeasureCount>0)) {
									colFlagMeasTarg= meas1.qNum;
								} else if ((colFlagTargData == 4) & (mymeasureCount>1)) {
									colFlagMeasTarg= meas2.qNum;
								} else if ((colFlagTargData == 5) & (mymeasureCount>2)) {
									colFlagMeasTarg= meas3.qNum;
								};
								//assess type of operator equal

								if((colFlagTargDataOP=="e") & (colFlagMeasTarg == colFlagTargValue)){
									colFlagTextColInsertM1 = "color:#" + colFlagTargColValue;
									measBarCol1=colFlagTargColValue;
								} else if((colFlagTargDataOP=="g") & (colFlagMeasTarg > colFlagTargValue)){
									colFlagTextColInsertM1 = "color:#" + colFlagTargColValue;
									measBarCol1=colFlagTargColValue;
								} else if((colFlagTargDataOP=="l") & (colFlagMeasTarg < colFlagTargValue)){
									colFlagTextColInsertM1 = "color:#" + colFlagTargColValue;
									measBarCol1=colFlagTargColValue;
								} else if((colFlagTargDataOP=="b") & (colFlagMeasTarg > colFlagTargValue) & (colFlagMeasTarg < colFlagTargValue2)){
									colFlagTextColInsertM1 = "color:#" + colFlagTargColValue;
									measBarCol1=colFlagTargColValue;
								};

							} else {
								// chose target dim
								var colFlagDimTarg;
								if((colFlagTargData == 1) & (mydimensionCount>0)) {
									colFlagDimTarg = dim.qText;
								} else if ((colFlagTargData == 2) & (mydimensionCount>1)) {
									colFlagDimTarg = dim2.qText;
								} ;
								//assess 
								if(colFlagDimTarg == colFlagTargValue){
									colFlagTextColInsertM1 = "color:#" + colFlagTargColValue;
									measBarCol1=colFlagTargColValue;
								}
							};

						} else if((colFlagTargProperty=="t2")){
							colFlagTextColInsertM1 = 'color:#'+layout.qDef.IMGMEASDISPLAYSTYLETXTCOL;
							colFlagTextColInsertM2 = 'color:#'+layout.qDef.IMGMEASDISPLAYSTYLETXTCOL;

							if(colFlagTargDataType=="meas"){
								// chose target measure
								var colFlagMeasTarg;
								if((colFlagTargData == 3) & (mymeasureCount>0)) {
									colFlagMeasTarg= meas1.qNum;
								} else if ((colFlagTargData == 4) & (mymeasureCount>1)) {
									colFlagMeasTarg= meas2.qNum;
								} else if ((colFlagTargData == 5) & (mymeasureCount>2)) {
									colFlagMeasTarg= meas3.qNum;
								};
								//assess type of operator equal


								if((colFlagTargDataOP=="e") & (colFlagMeasTarg == colFlagTargValue)){
									colFlagTextColInsertM2 = "color:#" + colFlagTargColValue;
									measBarCol2=colFlagTargColValue;
								} else if((colFlagTargDataOP=="g") & (colFlagMeasTarg > colFlagTargValue)){
									colFlagTextColInsertM2 = "color:#" + colFlagTargColValue;
									measBarCol2=colFlagTargColValue;
								} else if((colFlagTargDataOP=="l") & (colFlagMeasTarg < colFlagTargValue)){
									colFlagTextColInsertM2 = "color:#" + colFlagTargColValue;
									measBarCol2=colFlagTargColValue;
								} else if((colFlagTargDataOP=="b") & (colFlagMeasTarg > colFlagTargValue) & (colFlagMeasTarg < colFlagTargValue2)){
									colFlagTextColInsertM2 = "color:#" + colFlagTargColValue;
									measBarCol2=colFlagTargColValue;
								};

							} else {
								// chose target dim
								var colFlagDimTarg;
								if((colFlagTargData == 1) & (mydimensionCount>0)) {
									colFlagDimTarg = dim.qText;
								} else if ((colFlagTargData == 2) & (mydimensionCount>1)) {
									colFlagDimTarg = dim2.qText;
								} ;
								//assess 
								if(colFlagDimTarg == colFlagTargValue){
									colFlagTextColInsertM2 = "color:#" + colFlagTargColValue;
									measBarCol2=colFlagTargColValue;
								}

							};
						};
					}

					
					//set 1up grid option
					
					//console.log(rowcount);
					if(rowcount > 1){

						grid1upDisplay = layout.qDef.IMGPAGING1UP;
					} else {
						grid1upDisplay = false;
					};

					// hover for Dim value
					var hoverDimText="";
					if(layout.qDef.IMGGRIDHOVER){
						if(layout.qDef.IMGGRIDHOVERTYPE=="d1"){
							 hoverDimText=dim.qText;
						} else if ((layout.qDef.IMGGRIDHOVERTYPE=="d2") & (mydimensionCount == 2) ){
							 hoverDimText=dim2.qText;
						} else if ((layout.qDef.IMGGRIDHOVERTYPE=="m1") & (mymeasureCount >= 1) ){
							 hoverDimText=meas1.qText;
						} else if ((layout.qDef.IMGGRIDHOVERTYPE=="m2") & (mymeasureCount >= 2) ){
							 hoverDimText=meas2.qText;
						} else if ((layout.qDef.IMGGRIDHOVERTYPE=="m3") & (mymeasureCount == 3) ){
							 hoverDimText=meas3.qText;
						}

					} else {
						hoverDimText="";
					}

					//Check count and choose Grid or Single pic layout
					if((rowcount > 1) & (!grid1upDisplay)){
						//GRID LAYOUT

						mgoSinglePicModeActive = 0;
						//Check if popup or selectable
						if(layout.qDef.IMGLINK==0){
							//if pop up add link
							if(parentscope.editmode){
								//disable pop up in edit mode
								html += '<span class="mgoPopinEdit">';
							} else {
								if(layout.qDef.IMGLINKPOPLINKSOURCE == "c"){
									
									html += '<a href="' + layout.qDef.IMGLINKPOPLINK + '"' + popUpType + ' class="mgotooltip">';

								} else if((layout.qDef.IMGLINKPOPLINKSOURCE == "d2") & (mydimensionCount == 2)){
									

									html += '<a href="' + dim2.qText + '"' + popUpType + ' class="mgotooltip">';
																	

								} else {
									html += '<a href="' + imgFolderLocation + (encodeURI(dim.qText)) + '"' + popUpType + ' class="mgotooltip">';
								}; 
							};
							
							//render image

						
							
							html += '<span class="mgoPicGrid mgoPicGridHovRef"  data-value="'+hoverDimText+'" style="'+ imgBGColInsert +'; border-bottom: '+ imgBorderSize + 'px solid #' + imgBorderCol +'; border-right: '+ imgBorderSize + 'px solid #' + imgBorderCol +';"><span class="mgoPicGrid '+imgScaleGrid+' '+custImgEffectClass+'" style="height:' + imgCHeight + 'px; width:' + imgCWidth + 'px; ';
							html += "background-image: url('"+imgFolderLocation + (encodeURI(dim.qText))+"'); ";
							html += 'background-color: transparent; opacity: '+ imageOpacity +';">';
							html += '</span></span>';
						
							//check if measure added
							//number - New options around measure display, thanks to Xavier https://github.com/xavierlp



							if((mymeasureCount==1) & (layout.qDef.IMGMEASGRIDDISPLAYTOG)){
								// For 1 measure
								
								// render measure
								// check style
								if(!layout.qDef.IMGMEASDISPLAYSTYLE){
									
									if(layout.qDef.IMGMEASGRIDDISPLAYTITLES){
										html += '<span class="mgoMeasureSingle" style="width:' + (imgCWidth-4) + 'px; height: auto ; margin-left: -'+(imgCWidth+imgBorderSize)+'px; '+ measBGtextCol + measBGtextPanel+'"> <span style="'+colFlagTextColInsertM1+'">'+ meas1.qText+' ' +meas1Symbol+'</span></span>';

									} else {
										html += '<span class="mgoMeasureSingle" style="width:' + (imgCWidth-4) + 'px; height: auto ; margin-left: -'+(imgCWidth+imgBorderSize)+'px; '+ measBGtextCol + measBGtextPanel+'"> '+ layout.qHyperCube.qMeasureInfo[0].qFallbackTitle +': <span style="'+colFlagTextColInsertM1+'">'+  meas1.qText+' ' +meas1Symbol+'</span></span>';

									};
									//html += '<span class="mgoMeasureSingle" style="width:' + (imgCWidth-4) + 'px; height: auto ; margin-left: -'+(imgCWidth+imgBorderSize)+'px;">'+ layout.qHyperCube.qMeasureInfo[0].qFallbackTitle +': '+ meas1.qNum+'</span>';
									
								} else {
									//bar
									//set if thresholds
									var meas1Max = layout.qHyperCube.qMeasureInfo[0].qMax;
									var meas1Factor = (imgCWidth - 10)/meas1Max;
									var meas1barw = Math.floor(meas1.qNum*meas1Factor);
									//measBarCol1 = layout.qDef.IMGMEASDISPLAYSTYLEBARCOL1;
									html += '<span class="mgoMeasureSingleBar" data-value="'+meas1.qText+'" style="margin-top: 0px; margin-left: -'+(imgCWidth+imgBorderSize)+'px; height:'+measBarHeight+'px; width:'+meas1barw+'px; background-color:#'+measBarCol1+';"><br></span>';
									
								};
							} else if((mymeasureCount>=2) & (layout.qDef.IMGMEASGRIDDISPLAYTOG)){
									// For 2 measures
									// render measure
									// check style
									if(!layout.qDef.IMGMEASDISPLAYSTYLE){
										//number
										if(layout.qDef.IMGMEASGRIDDISPLAYTITLES){
											html += '<span class="mgoMeasureSingle" style="width:' + (imgCWidth-4) + 'px; height: auto; margin-left: -'+(imgCWidth+imgBorderSize)+'px; '+ measBGtextCol +measBGtextPanel+'"> <span style="'+colFlagTextColInsertM1+'">'+ meas1.qText+' ' +meas1Symbol+'</span><br> <span style="'+colFlagTextColInsertM2+'">'+ meas2.qText+' ' +meas2Symbol+'</span></span>';
										} else {
											html += '<span class="mgoMeasureSingle" style="width:' + (imgCWidth-4) + 'px; height: auto; margin-left: -'+(imgCWidth+imgBorderSize)+'px; '+ measBGtextCol +measBGtextPanel+'"> '+ layout.qHyperCube.qMeasureInfo[0].qFallbackTitle +': <span style="'+colFlagTextColInsertM1+'">'+ meas1.qText+' ' +meas1Symbol+'</span><br> '+ layout.qHyperCube.qMeasureInfo[1].qFallbackTitle +': <span style="'+colFlagTextColInsertM2+'">'+ meas2.qText+' ' +meas2Symbol+'</span></span>';

											};
									} else {
										//bar
										//set if thresholds
										var meas1Max = layout.qHyperCube.qMeasureInfo[0].qMax;
										var meas1Factor = (imgCWidth - 10)/meas1Max;
										var meas1barw = Math.floor(meas1.qNum*meas1Factor);
										//measBarCol1 = layout.qDef.IMGMEASDISPLAYSTYLEBARCOL1;
										var meas2Max = layout.qHyperCube.qMeasureInfo[1].qMax;
										var meas2Factor = (imgCWidth - 10)/meas2Max;
										var meas2barw = Math.floor(meas2.qNum*meas2Factor);
										//measBarCol2 = layout.qDef.IMGMEASDISPLAYSTYLEBARCOL2;
										if(mymeasureCount==3){
											html += '<span class="mgoMeasureSingleBar" data-value="'+meas1.qText+','+meas2.qText+','+meas3.qText+'" style="margin-top: 0px; margin-left: -'+(imgCWidth+imgBorderSize)+'px; height:'+measBarHeight+'px; width:'+meas1barw+'px; background-color:#'+measBarCol1+';"><br></span>';
											html += '<span class="mgoMeasureSingleBar" data-value="'+meas1.qText+','+meas2.qText+','+meas3.qText+'"style="margin-top: '+(measBarHeight+1)+'px; margin-left: -'+(imgCWidth+imgBorderSize)+'px; height:'+measBarHeight+'px; width:'+meas2barw+'px; background-color:#'+measBarCol2+';"><br></span>';
										} else {
											html += '<span class="mgoMeasureSingleBar" data-value="'+meas1.qText+','+meas2.qText+'" style="margin-top: 0px; margin-left: -'+(imgCWidth+imgBorderSize)+'px; height:'+measBarHeight+'px; width:'+meas1barw+'px; background-color:#'+measBarCol1+';"><br></span>';
											html += '<span class="mgoMeasureSingleBar" data-value="'+meas1.qText+','+meas2.qText+'"style="margin-top: '+(measBarHeight+1)+'px; margin-left: -'+(imgCWidth+imgBorderSize)+'px; height:'+measBarHeight+'px; width:'+meas2barw+'px; background-color:#'+measBarCol2+';"><br></span>';
										};
									};
									
				
							};




							//Open in new window overlay
							html += '<span class="mgoimghoversm" style="margin-left:-'+ (24 + imgBorderSize) +'px;"> <span class="lui-icon lui-icon--new-tab" style="font-size:12px;"></span> </span>';
							
							if(parentscope.editmode){
								//close element for pop up in edit mode
								html += '</span>';
							} else {
								html += '</a>';
							};
							
						
						} else {
							//render selectable image

							//IF both select and pop add
							if(layout.qDef.IMGLINK==2 & layout.qDef.IMGGRIDNOSELECT !=true){
								if(parentscope.editmode){
									//disable pop up in edit mode
									html += '<span class="mgoPopinEdit">';
								} else {
									if(layout.qDef.IMGLINKPOPLINKSOURCE == "c"){
										
										html += '<a href="' + layout.qDef.IMGLINKPOPLINK + '"' + popUpType + ' class="mgotooltip">';

									} else if((layout.qDef.IMGLINKPOPLINKSOURCE == "d2") & (mydimensionCount == 2)){
										

										html += '<a href="' + dim2.qText + '"' + popUpType + ' class="mgotooltip">';
																		

									} else {
										html += '<a href="' + imgFolderLocation + (encodeURI(dim.qText)) + '"' + popUpType + ' class="mgotooltip">';
									}; 
								};
							};	

							if(layout.qDef.IMGGRIDNOSELECT !=true){
								html += '<span class="selectable" data-value="'+ dimToSelect.qElemNumber + '">';
							} else {
								html += '<span data-value="'+ dim.qElemNumber + '">';
							};
							// render image 
								html += '<span class="mgoPicGrid mgoPicGridHovRef" data-value="'+hoverDimText+'" style="'+ imgBGColInsert +'; border-bottom: '+ imgBorderSize + 'px solid #' + imgBorderCol +'; border-right: '+ imgBorderSize + 'px solid #' + imgBorderCol +';"><span class="mgoPicGrid '+imgScaleGrid+' '+custImgEffectClass+'" style="height:' + imgCHeight + 'px; width:' + imgCWidth + 'px; background-image: url(' + imgFolderLocation + (encodeURI(dim.qText)) + '); background-color: transparent; opacity: '+ imageOpacity +';">';
								html += '</span></span>';
							

							//check if measure added
							if((mymeasureCount==1) & (layout.qDef.IMGMEASGRIDDISPLAYTOG)){
								// For 1 measure
								
								// render measure
								// check style
								if(!layout.qDef.IMGMEASDISPLAYSTYLE){
									//number
									if(layout.qDef.IMGMEASGRIDDISPLAYTITLES){
										html += '<span class="mgoMeasureSingle" style="width:' + (imgCWidth-4) + 'px; height:auto; margin-left: -'+(imgCWidth+imgBorderSize)+'px; '+ measBGtextCol +measBGtextPanel+'"> <span style="'+colFlagTextColInsertM1+'">'+ meas1.qText+' ' +meas1Symbol+'</span></span>';
										html += '</span>';
									} else {
										html += '<span class="mgoMeasureSingle" style="width:' + (imgCWidth-4) + 'px; height:auto; margin-left: -'+(imgCWidth+imgBorderSize)+'px; '+ measBGtextCol +measBGtextPanel+'"> '+ layout.qHyperCube.qMeasureInfo[0].qFallbackTitle +': <span style="'+colFlagTextColInsertM1+'">'+ meas1.qText+' ' +meas1Symbol+'</span></span>';
										html += '</span>';
									}
								} else {
									//bar
									//set if thresholds
									var meas1Max = layout.qHyperCube.qMeasureInfo[0].qMax;
									var meas1Factor = (imgCWidth - 10)/meas1Max;
									var meas1barw = Math.floor(meas1.qNum*meas1Factor);
									//measBarCol1 = layout.qDef.IMGMEASDISPLAYSTYLEBARCOL1;
									html += '<span class="mgoMeasureSingleBar" data-value="'+meas1.qText+'" style="margin-top: 0px; margin-left: -'+(imgCWidth+imgBorderSize)+'px; height:'+measBarHeight+'px; width:'+meas1barw+'px; background-color:#'+measBarCol1+';"><br></span>';
									
								};
							} else if((mymeasureCount>=2) & (layout.qDef.IMGMEASGRIDDISPLAYTOG)){
									// For 2 measures
									// render measure
									// check style
									if(!layout.qDef.IMGMEASDISPLAYSTYLE){
										//number
										if(layout.qDef.IMGMEASGRIDDISPLAYTITLES){
											html += '<span class="mgoMeasureSingle" style="width:' + (imgCWidth-4) + 'px; height: auto; margin-left: -'+(imgCWidth+imgBorderSize)+'px; '+ measBGtextCol +measBGtextPanel+'"> <span style="'+colFlagTextColInsertM1+'">'+ meas1.qText+' ' +meas1Symbol+'</span><br> <span style="'+colFlagTextColInsertM2+'">'+ meas2.qText+' ' +meas2Symbol+'</span></span>';
											html += '</span>';
										} else {
											html += '<span class="mgoMeasureSingle" style="width:' + (imgCWidth-4) + 'px; height: auto; margin-left: -'+(imgCWidth+imgBorderSize)+'px; '+ measBGtextCol +measBGtextPanel+'"> '+ layout.qHyperCube.qMeasureInfo[0].qFallbackTitle +': <span style="'+colFlagTextColInsertM1+'">'+ meas1.qText+' ' +meas1Symbol+'</span><br> '+ layout.qHyperCube.qMeasureInfo[1].qFallbackTitle +': <span style="'+colFlagTextColInsertM2+'">'+ meas2.qText+' ' +meas2Symbol+'</span></span>';
											html += '</span>';
										}
									} else {
										//bar
										//set if thresholds
										var meas1Max = layout.qHyperCube.qMeasureInfo[0].qMax;
										var meas1Factor = (imgCWidth - 10)/meas1Max;
										var meas1barw = Math.floor(meas1.qNum*meas1Factor);
										//measBarCol1 = layout.qDef.IMGMEASDISPLAYSTYLEBARCOL1;
										var meas2Max = layout.qHyperCube.qMeasureInfo[1].qMax;
										var meas2Factor = (imgCWidth - 10)/meas2Max;
										var meas2barw = Math.floor(meas2.qNum*meas2Factor);
										//measBarCol2 = layout.qDef.IMGMEASDISPLAYSTYLEBARCOL2;
										if(mymeasureCount==3){
											html += '<span class="mgoMeasureSingleBar" data-value="'+meas1.qText+','+meas2.qText+','+meas3.qText+'" style="margin-top: 0px; margin-left: -'+(imgCWidth+imgBorderSize)+'px; height:'+measBarHeight+'px; width:'+meas1barw+'px; background-color:#'+measBarCol1+';"><br></span>';
											html += '<span class="mgoMeasureSingleBar" data-value="'+meas1.qText+','+meas2.qText+','+meas3.qText+'" style="margin-top: '+(measBarHeight+1)+'px; margin-left: -'+(imgCWidth+imgBorderSize)+'px; height:'+measBarHeight+'px; width:'+meas2barw+'px; background-color:#'+measBarCol2+';"><br></span>';
										} else {
											html += '<span class="mgoMeasureSingleBar" data-value="'+meas1.qText+','+meas2.qText+'" style="margin-top: 0px; margin-left: -'+(imgCWidth+imgBorderSize)+'px; height:'+measBarHeight+'px; width:'+meas1barw+'px; background-color:#'+measBarCol1+';"><br></span>';
											html += '<span class="mgoMeasureSingleBar" data-value="'+meas1.qText+','+meas2.qText+'" style="margin-top: '+(measBarHeight+1)+'px; margin-left: -'+(imgCWidth+imgBorderSize)+'px; height:'+measBarHeight+'px; width:'+meas2barw+'px; background-color:#'+measBarCol2+';"><br></span>';
										};
									};
									html += '</span>';
				
							};
							
							html += '</span>';
								if(layout.qDef.IMGLINK==2){
								if(parentscope.editmode){
									//close element for pop up in edit mode
									html += '</span>';
								} else {
									html += '</a>';
								};
							};
						};
						
					
					} else { 
						//SINGLE PIC (based on selection not load limitation)
						mgoSinglePicModeActive = 1;
						//Controls
						//check for custom single image

						if(layout.qDef.SINGLEIMGCUSTBGTOG){
							var singleimgBGCol = layout.qDef.SINGLEIMGCUSTBGVAL;
							singleimgBGCol= singleimgBGCol.replace(/#/g, '');
							imgBGColInsert= 'background-color: #' + singleimgBGCol;
						};
						if(layout.qDef.SINGLEIMGEFFECTTOG){
							custImgEffectClass = "";
						};

						
						if(!layout.qDef.SINGLEIMGLINKCUSTOMSOURCETOG){
							killzoomcontrols = false;
						} else if ((layout.qDef.SINGLEIMGLINKCUSTOMSOURCETOG)&(layout.qDef.SINGLEIMGLINKCUSTOMSOURCETYPE)){
							killzoomcontrols = false;
						} else {
							killzoomcontrols = true;
						};
						
						if(layout.qDef.mgoSinglePicControls){
							if((!killzoomcontrols)){
								html+= '<div class="mgoControlButs">';
								html+= '<button class="lui-button butZoomout mgoIconButAdjust" alt="Zoom Out"><span class="lui-icon lui-icon--zoom-out"></span></button> ';
								html+= '<button class="lui-button butZoomin mgoIconButAdjust" alt="Zoom In"><span class="lui-icon lui-icon--zoom-in"></span></button> ';
								html+= '<button class="lui-button butRotate mgoIconButAdjust" alt="Rotate"><span class="lui-icon lui-icon--sync"></span></button> ';
								html+= '<button class="lui-button butReposition">Reset</button>';
								if(layout.qDef.IMGPRINTGRIDTOG){
								//single print
									html+= '<button class="butPrint lui-button mgoIconButAdjust" alt="Print" type="button"><span class="lui-icon lui-icon--print"></span></button>';	
								};
								if((layout.qDef.IMGGRIDNOSELECT !=true) & (rowcount == 1)){
									html+= '<button class="lui-button butClose mgoIconButAdjust" alt="Close"><span class="lui-icon lui-icon--remove"></span></button> ';			
								};
								html+= '</div>';

							}; 

		
						} else {
							if(layout.qDef.IMGPRINTGRIDTOG){
								//single print
								html+= '<div class="mgoControlButs">';
								html+= '<button class="butPrint lui-button mgoIconButAdjust" alt="Print" type="button"><span class="lui-icon lui-icon--print"></span></button>';
								html+= '<button class="lui-button butClose mgoIconButAdjust" alt="Close"><span class="lui-icon lui-icon--remove"></span></button> ';	
								html+= '</div>';
							} else {
								html+= '<div class="mgoControlButs">';
								if((layout.qDef.IMGGRIDNOSELECT !=true) & (rowcount == 1)){
									html+= '<button class="lui-button butClose mgoIconButAdjust" alt="Close"><span class="lui-icon lui-icon--remove"></span></button> ';	
								};
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
									if(layout.qDef.IMGGRIDNOSELECT !=true){
										html += '<div class="mgoSinglePic '+imgScaleSingle+' selectable" data-value="'+ dimToSelect.qElemNumber + '" style="background-image: url(' + imgFolderLocation + (encodeURI(dim.qText)) + '); ' + imgBGColInsert +';">';
									} else {
										html += '<div class="mgoSinglePic '+imgScaleSingle+'" data-value="'+ dim.qElemNumber + '" style="background-image: url(' + imgFolderLocation + (encodeURI(dim.qText)) + '); ' + imgBGColInsert +';">';
									};
									
								} else {
									//html += '<div class="mgoSinglePic '+imgScaleSingle+'" style="background-image: url(' + imgFolderLocation + (encodeURI(dim.qText)) + ');background-color: #' + imgBGCol +';">';
									html += '<div class="mgoSinglePicC"><div class="mgoSinglePic '+imgScaleSingle+'" style="background-image: url(' + imgFolderLocation + (encodeURI(dim.qText)) + '); ' + imgBGColInsert +';"></div>';
								
								};
							};
						} else {
							//if 1 up make it selectable
								if(grid1upDisplay){
									
									//html += '<div class="mgoSinglePic '+imgScaleSingle+' selectable" data-value="'+ dim.qElemNumber + '" style="background-image: url(' + imgFolderLocation + (encodeURI(dim.qText)) + '); ' + imgBGColInsert +';">';
									if(layout.qDef.IMGGRIDNOSELECT !=true){
									html += '<div class="mgoSinglePicC"><div style="' + imgBGColInsert +'; position:absolute; width:100%; height:100%"><div class="mgoSinglePic '+imgScaleSingle+' '+custImgEffectClass+' selectable" data-value="'+ dim.qElemNumber +'" style="background-image: url(' + imgFolderLocation + (encodeURI(dim.qText)) + ');"></div></div>';
									} else {
									html += '<div class="mgoSinglePicC"><div style="' + imgBGColInsert +'; position:absolute; width:100%; height:100%"><div class="mgoSinglePic '+imgScaleSingle+' '+custImgEffectClass+'" data-value="'+ dim.qElemNumber +'" style="background-image: url(' + imgFolderLocation + (encodeURI(dim.qText)) + ');"></div></div>';

									};
								} else {
									//html += '<div class="mgoSinglePic '+imgScaleSingle+'" style="background-image: url(' + imgFolderLocation + (encodeURI(dim.qText)) + ');background-color: #' + imgBGCol +';">';
									//html += '<div class="mgoSinglePicC"><div class="mgoSinglePic '+imgScaleSingle+'" style="background-image: url(' + imgFolderLocation + (encodeURI(dim.qText)) + '); ' + imgBGColInsert +';"></div>';
									html += '<div class="mgoSinglePicC"><div style="' + imgBGColInsert +'; position:absolute; width:100%; height:100%"><div class="mgoSinglePic '+imgScaleSingle+' '+custImgEffectClass+'" style="background-image: url(' + imgFolderLocation + (encodeURI(dim.qText)) + ');"></div></div>';

								};
							//html += '<div class="mgoSinglePic '+imgScaleSingle+'" style="background-image: url(' + imgFolderLocation + (encodeURI(dim.qText)) + ');background-color: #' + imgBGCol +';">';
						};

						//check if measure added
							if((mymeasureCount==1) & (layout.qDef.SINGLEIMGMEASURE)){
								// For 1 measure
								
								// render measure
								html += '<span class="mgoMeasureSinglePic" style="height:auto; margin-left: 0px; '+ measBGtextCol +measBGtextPanel+'">'+ layout.qHyperCube.qMeasureInfo[0].qFallbackTitle +': <span style="'+colFlagTextColInsertM1+'">'+ meas1.qText+' ' +meas1Symbol+'</span></span>';
								
								
							} else if((mymeasureCount==2) & (layout.qDef.SINGLEIMGMEASURE)){
								// For 2 measures
								// render measure
									
								html += '<span class="mgoMeasureSinglePic" style="height:auto; margin-left: 0px; '+ measBGtextCol +measBGtextPanel+'">'+ layout.qHyperCube.qMeasureInfo[0].qFallbackTitle +': <span style="'+colFlagTextColInsertM1+'">'+ meas1.qText+' ' +meas1Symbol+'</span><br>'+ layout.qHyperCube.qMeasureInfo[1].qFallbackTitle +': <span style="'+colFlagTextColInsertM2+'">'+ meas2.qText+' ' +meas2Symbol+'</span></span>';
								
				
							} else if((mymeasureCount==3) & (layout.qDef.SINGLEIMGMEASURE)){
								// For 3 measures
								// render measure
									
								html += '<span class="mgoMeasureSinglePic" style="height:auto; margin-left: 0px; '+ measBGtextCol +measBGtextPanel+'">'+ layout.qHyperCube.qMeasureInfo[0].qFallbackTitle +': <span style="'+colFlagTextColInsertM1+'">'+ meas1.qText+' ' +meas1Symbol+'</span><br>'+ layout.qHyperCube.qMeasureInfo[1].qFallbackTitle +': <span style="'+colFlagTextColInsertM2+'">'+ meas2.qText+' ' +meas2Symbol+'</span><br>'+ layout.qHyperCube.qMeasureInfo[2].qFallbackTitle +': <span style="'+colFlagTextColInsertM2+'">'+ meas3.qText+' ' +meas3Symbol+'</span></span>';
								
				
							};


						//Show header
						if(layout.qDef.SINGLEIMGHEADER){

							if(grid1upDisplay){
								
								//html += '<div class="mgoHeader"><a href="' + imgFolderLocation + (encodeURI(dim.qText)) + '"' + popUpType + ' > <span class="lui-icon lui-icon--new-tab"></span> ' + dim.qText + '</a></div>';
							} else {	
								if(customSingleImageNameTog){
								html += '<div class="mgoHeader"><a href="' + customSingleImageLink + '"' + popUpType + ' > <span class="lui-icon lui-icon--new-tab"></span> ' + customSingleImageName + '</a>';
								
								} else {
									if((mydimensionCount == 2) & (layout.qDef.SINGLEIMGLINKPOPLINKSOURCE=="d1")){
										html += '<div class="mgoHeader"><a href="' + imgFolderLocation + (encodeURI(dim.qText)) + '"' + popUpType + ' > <span class="lui-icon lui-icon--new-tab"></span> ' + dim.qText + '</a>';
									} else if((mydimensionCount == 2) & (layout.qDef.SINGLEIMGLINKPOPLINKSOURCE=="d2")) {
										html += '<div class="mgoHeader"><a href="' + dim2.qText + '"' + popUpType + ' > <span class="lui-icon lui-icon--new-tab"></span> ' + dim2.qText + '</a>';
									} else {
										html += '<div class="mgoHeader"><a href="' + imgFolderLocation + (encodeURI(dim.qText)) + '"' + popUpType + ' > <span class="lui-icon lui-icon--new-tab"></span> ' + dim.qText + '</a>';
									};
								}
								html += '</div>';
							}
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
					imgPagingButtonStyle = 'style="'+ hideImageCount +' position: absolute; bottom: 0px; left:0px; z-index:100; font-size:10px; background-color:rgba(1,1,1,0.4); color:rgba(255,255,255,1); margin:0px 0px; padding: 4px;"';
					imgPagingButtonLStyle = ' mgoLessMore1upButs" style="left:5px; z-index:101; " ><span class="lui-icon lui-icon--triangle-left"></span>';
					imgPagingButtonMStyle = ' mgoLessMore1upButs" style="right:5px; z-index:102; " ><span class="lui-icon lui-icon--triangle-right"></span>';
					
				} else {
					imgPagingButtonStyle = 'style="'+ hideImageCount +' font-size:12px; color:#AAA; margin:4px 0px"';
					 imgPagingButtonLStyle = '" style="margin-right:2px;margin-bottom:8px;margin-top:4px;">Less';
					 imgPagingButtonMStyle = '" style="margin-right:2px;margin-bottom:8px;margin-top:4px;">More';
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
						html += '<div class="mgoGridImgCount" '+imgPagingButtonStyle+'>'+ ((imgpagedsofar-imgridpage)+1) + ' to ';
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
						html += '<br>' + '<button class="lui-button loadless '+imgPagingButtonLStyle+'</button>';	
					} else {
						html += '<br>' + '<button disabled class="lui-button loadless '+imgPagingButtonLStyle+'</button>';	
					};
					if((rowcount - imgpagedsofar) > 0){
						morebutton = true;
						html += '<button class="lui-button loadmore '+imgPagingButtonMStyle+'</button>';	
					} else {
						html += '<button disabled class="lui-button loadmore '+imgPagingButtonMStyle+'</button>';	

					};
				};

				


			} else {
				if((rowcount-imgridpage)==0){
					html += '<br>' + '<div style="font-size:12px; '+ hideImageCount +' color:#AAA; margin:4px 0px">Display limited to first ' + (lastrow + 1) + ' of ' + rowcount + ' images</div>';
				};

			};

			if(layout.qDef.IMGPRINTGRIDTOG){
				//grid print
				if(!mgoSinglePicModeActive){
					if(((rowcount - imgpagedsofar) < 1) || (!layout.qDef.IMGPAGINGTOG)){
						html+= '<br>';
					}; 
					html+= '<button class="butPrint lui-button" style="margin-right:2px;margin-bottom:8px;margin-top:4px;" alt="Print" type="button"><span class="lui-icon lui-icon--print"></span></button>';
					
				};
				//single print

			};
			html+= '</div>';
			$element.html( html );


			if(morebutton) {
				var requestPage = [{
					qTop : lastrow+layout.qHyperCube.qDataPages.length,
					qLeft : 0,
					qWidth : 6, //should be # of columns
					qHeight : Math.min(imgridpage, rowcount - lastrow)
				}];
				
				$element.find(".loadmore").on("qv-activate", function() {
					
					self.backendApi.getData(requestPage).then(function(dataPages) {
						self.paint($element, layout);
						
						//reset any scroll on the QV object container position
						$element.parent().parent().scrollLeft(0);
						$element.parent().parent().scrollTop(0);

					});
				});
			};
			if(lessbutton) {
				
				$element.find(".loadless").on("qv-activate", function() {
					layout.qHyperCube.qDataPages.splice((layout.qHyperCube.qDataPages.length-1), 1);
					
						self.paint($element, layout);
						
						//reset any scroll on the QV object container position
						$element.parent().parent().scrollLeft(0);
						$element.parent().parent().scrollTop(0);

					
				});
				

			};
			
			
			
			
			
			// selections
			$element.find('.selectable').on('qv-activate', function() {
				
				var targSelectedPicCont = $(this).find('>:first-child');
				var targSelectedPic = $(this).find('.mgoPicGrid > .mgoPicGrid');

				if(this.hasAttribute("data-value")) {
					var value = parseInt(this.getAttribute("data-value"), 10); 
					if(layout.qDef.IMGDIMTOSELECT !="d2"){
						var dim = 0;
					} else if((mydimensionCount == 2) & (layout.qDef.IMGDIMTOSELECT =="d2")){
						var dim = 1;
					} else {
						var dim = 0;
					};

					if(layout.qDef.IMGGRIDFASTSELECT || grid1upDisplay){
						self.backendApi.selectValues(dim, [value], true);	
					} else {
						self.selectValues(dim, [value], true);						
						$(this).toggleClass("selected");
					};

				};
				if($(this).parents('.qv-selections-active').length > 0){

					

                    if( $(this).hasClass("selected")){
                    	var origPicContBG = targSelectedPicCont.css('background-color');
						var origPicOpacity = targSelectedPic.css('opacity');
						var insertOrigBGOP = origPicContBG +'|'+origPicOpacity;

                        targSelectedPicCont.css('background-color', '#4ccd4a');
                        targSelectedPic.css('opacity', '0.7');
                        var createTickrefH=Math.round(targSelectedPicCont.css('height').replace('px',''));
                        var createTickrefW=Math.round(targSelectedPicCont.css('width').replace('px',''));
                        $(this).append('<span data-value="'+insertOrigBGOP+'" class="tickID'+value+' mgoSelectiontick" style="height:'+createTickrefH+'px;width:'+createTickrefW+'px; margin-left:-'+createTickrefW+'px; "></span>');           
                        
                    } else {
                    	var removeTick = $element.find('.tickID'+value);
                    	if(removeTick.attr("data-value")) {
                    		var origSelectvalues = removeTick.attr("data-value").split('|');
                    		targSelectedPicCont.css('background-color', origSelectvalues[0]);
                        	targSelectedPic.css('opacity', origSelectvalues[1]); 

                    	};
                        removeTick.remove();

                    }
                }


			});

			$element.find('.butClose').on('click', function(e) {

				if(layout.qDef.IMGDIMTOSELECT !="d2"){
						var dim = 0;
					} else if((mydimensionCount == 2) & (layout.qDef.IMGDIMTOSELECT =="d2")){
						var dim = 1;
					} else {
						var dim = 0;
					};

										
				require(["js/qlik"], function(qlik) {
					// open the app
					
					var app = qlik.openApp(qlik.currApp().id);
					var targNameFieldtoClear = layout.qHyperCube.qDimensionInfo[dim].qGroupFieldDefs[0];
					
					var lastNameField = app.field(targNameFieldtoClear);
					
					lastNameField.clear();
				});

				
					

				
			});

			//image mouseover
			if(layout.qDef.IMGGRIDHOVER){
				
				var mmcustomToolTipGID = 'mgoBarToolTipG' + imgriduniqueID;
				//custom bar tool tip
				$('body').append('<div id="'+mmcustomToolTipGID+'" class="tooltipG2Show" style="display:none"></div>');

				

				$element.find('.mgoPicGridHovRef').on('mouseenter', function(h) {
					var tooltipG2Show = $('#'+mmcustomToolTipGID);
						

						var thisGridID =$('#mmI'+imgriduniqueID);
						var thisGridIDPos =thisGridID.offset();
						var relAnchor = $(this).offset();
						var tipInOut='I';
						var tipAboveBelow='B';
						var tipPointerCssH='';
						var tipPointerCssV='';
						if(((Math.round(relAnchor.left)+(($(this).width()/8)*7))+100)>(Math.round(thisGridIDPos.left)+thisGridID.width())){
							var relXtip = Math.round(relAnchor.left)+(($(this).width()/8)*7)-104;
							//var relYtip = Math.round(relAnchor.top)+(($(this).height()/8)*7)-4;
							tipInOut='O';
							tipPointerCssH='style="left:86px; ';
						} else {
							var relXtip = Math.round(relAnchor.left)+(($(this).width()/8)*1)-4;
							//var relYtip = Math.round(relAnchor.top)+(($(this).height()/8)*7)-4;
							tipInOut='I';
							tipPointerCssH='style="left:0px; ';
						};

						if(((Math.round(relAnchor.top)+(($(this).height()/8)*7))+100)>(Math.round(thisGridIDPos.top)+thisGridID.height())){
							var relYtip = Math.round(relAnchor.top)+(($(this).height()/8)*1)-104;
							tipAboveBelow='A';
							tipPointerCssV='top:100px;"';
						} else {
							var relYtip = Math.round(relAnchor.top)+(($(this).height()/8)*7)-4;
							tipAboveBelow='B';
							tipPointerCssV='top:-14px"';
						};

						
						if(tipAboveBelow=='A'){

							tooltipG2Show.css({
							'display':'block',
							'position':'absolute',
							'top':relYtip+'px',
							'bottom':'-'+relYtip+'px',
							'left':relXtip+'px',
							'z-index':'1000',				
							'pointer-events': 'none'
    						});
						} else {
							tooltipG2Show.css({
							'display':'block',
							'position':'absolute',
							'top':relYtip+'px',
							'left':relXtip+'px',
							'z-index':'1000',				
							'pointer-events': 'none'
    						});

						};

						

						if((tipInOut=='I') & (tipAboveBelow=='B')){
								tooltipG2Show.html('<span class="tooltipG2point" '+tipPointerCssH+tipPointerCssV+'></span><span class="tooltipG2text">'+$(this).attr('data-value')+'</span>');
								console.log("I B");
							} else if((tipInOut=='I') & (tipAboveBelow=='A')){

								tooltipG2Show.html('<span class="tooltipG2point2" '+tipPointerCssH+tipPointerCssV+'></span><span class="tooltipG2text">'+$(this).attr('data-value')+'</span>');
	    						console.log("I A");
	    					} else if((tipInOut=='O') & (tipAboveBelow=='B')){

	    						tooltipG2Show.html('<span class="tooltipG2point" '+tipPointerCssH+tipPointerCssV+'></span><span class="tooltipG2text">'+$(this).attr('data-value')+'</span>');
	    						console.log("O B");
	    					} else {
								tooltipG2Show.html('<span class="tooltipG2point2" '+tipPointerCssH+tipPointerCssV+'></span><span class="tooltipG2text">'+$(this).attr('data-value')+'</span>');
								console.log("O A");
	    					};

						
						

					});

				$element.find('.mgoPicGridHovRef').on('mouseleave click', function(e) {
					var tooltipG2Show = $('#'+mmcustomToolTipGID);
						tooltipG2Show.css('display','none');
						
					});

				

			};
			

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
							tooltip2Show.html(layout.qHyperCube.qMeasureInfo[0].qFallbackTitle + ': '+ m1DataVal[0] + ' ' +meas1Symbol+'<br>' + layout.qHyperCube.qMeasureInfo[1].qFallbackTitle+ ': ' + m1DataVal[1] +' ' +meas2Symbol);
						} else if(m1DataVal.length == 3){
							tooltip2Show.html(layout.qHyperCube.qMeasureInfo[0].qFallbackTitle + ': '+ m1DataVal[0] + ' ' +meas1Symbol+'<br>' + layout.qHyperCube.qMeasureInfo[1].qFallbackTitle+ ': ' + m1DataVal[1] +' ' +meas2Symbol+'<br>' + layout.qHyperCube.qMeasureInfo[2].qFallbackTitle+ ': ' + m1DataVal[2] +' ' +meas3Symbol);
						} else if (m1DataVal.length == 1){
							tooltip2Show.html(layout.qHyperCube.qMeasureInfo[0].qFallbackTitle + ': '+ m1DataVal[0]+' ' +meas1Symbol);
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
							'z-index':'1000',
							'overflow':'hidden'
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
				    bgImageOrient = Math.round((bgImageheightCAPTURE / bgImagewidthCAPTURE)*100)/100;
				    

				});
				mmContainerTarg.append(bgImg);
				bgImg.attr('src', ImageUrlOrig);
				//console.log(url + ' adapt ' + url.replace('"',''));
				var rotateImgTurns= 0;

				//Zoom in/out
			
				$element.find('.butZoomout').on('click', function() {
						
						var mmContainerOrientation =Math.round((mmContainerTarg.innerHeight() / mmContainerTarg.innerWidth())*100)/100;

						
						//current zoom on image:

						var curZoomLevelArr = mmContainerTarg.css('background-size');
						var curZoomLevelArrParts = curZoomLevelArr.split(" ");
						var image100scaleFactorW = Math.round((bgImagewidthCAPTURE/mmContainerTarg.innerWidth())*100);
						var image100scaleFactorH = Math.round((bgImageheightCAPTURE/mmContainerTarg.innerHeight())*100);


						//console.log(image100scaleFactorW + ' w-h '+ image100scaleFactorH);

						if (curZoomLevelArr == "contain"){
							//check height to width (real zoom)
							//console.log('contain');
							//console.log('bgImageOrient ' +bgImageOrient+ ' - ' +'mmContainerOrientation ' + mmContainerOrientation);

							if(bgImageOrient > mmContainerOrientation){
								var curZoomLevel = Math.round((mmContainerOrientation/bgImageOrient)*100);
								//var curZoomLevel = 100;
							} else if (bgImageOrient < mmContainerOrientation){
								var curZoomLevel = 100;
							} else {
								var curZoomLevel = 100;
							}
						} else if(curZoomLevelArr == "auto"){
							//console.log('auto 1:1 factor:' + image100scaleFactorW);
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
						
						//console.log('Out cur ' + curZoomLevel);

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



					var mmContainerOrientation = Math.round((mmContainerTarg.innerHeight() / mmContainerTarg.innerWidth())*100)/100;

						
						//current zoom on image:

						var curZoomLevelArr = mmContainerTarg.css('background-size');
						var curZoomLevelArrParts = curZoomLevelArr.split(" ");
						var image100scaleFactorW = Math.round((bgImagewidthCAPTURE/mmContainerTarg.innerWidth())*100);
						var image100scaleFactorH = Math.round((bgImageheightCAPTURE/mmContainerTarg.innerHeight())*100);


						//console.log(image100scaleFactorW + ' w-h '+ image100scaleFactorH);

						if (curZoomLevelArr == "contain"){
							//check height to width (real zoom)
							//console.log('contain');
							//console.log('bgImageOrient ' +bgImageOrient+ ' - ' +'mmContainerOrientation ' + mmContainerOrientation);
							if(bgImageOrient > mmContainerOrientation){
								var curZoomLevel = Math.round((mmContainerOrientation/bgImageOrient)*100);
								//var curZoomLevel = 100;
							} else if (bgImageOrient < mmContainerOrientation){
								var curZoomLevel = 100;

							} else {
								var curZoomLevel = 100;
							}
						} else if(curZoomLevelArr == "auto"){
							//console.log('auto 1:1 factor:' + image100scaleFactorW);
							var curZoomLevel = image100scaleFactorW;
							
							
						} else if((curZoomLevelArrParts[0] == "auto") & (curZoomLevelArrParts.length == 2)){
							//console.log('auto width');
							if(bgImageOrient > mmContainerOrientation){
								var curZoomLevel = Math.round(mmContainerOrientation*100);
							} else if (bgImageOrient < mmContainerOrientation){
								var curZoomLevel = Math.round(mmContainerOrientation*100);
							} else {
								var curZoomLevel = 100;
							}

						} else {
							//console.log('set value (zoomed already)');
							var curZoomLevelValues = curZoomLevelArr.match(/-?[\d\.]+/g);
							var curZoomLevel = curZoomLevelValues[0];
						};
						var zoomInc = curZoomLevel/10;
						
						//console.log('In cur ' + curZoomLevel);

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
						//var mmContainerTargContainer = $element.find(('.mgoSinglePicC'));
						//console.log(mmContainerTargContainer);

						var mgoPicContW = Math.floor(mmContainerTarg.innerWidth());
					   	var mgoPicContH = Math.floor(mmContainerTarg.innerHeight());

					   	//mmContainerTargContainer

					   	//console.log('w ' + mgoPicContW);
					   	//console.log('h ' + mgoPicContH);

						var curRotateLevelArrA = mmContainerTarg.css('transform');
						//var curRotateLevelArrB = mmContainerTarg.css('-moz-transform');
						//var curRotateLevelArrC = mmContainerTarg.css('transform');

						//console.log(mgoPicContW + ' CW-CH ' + mgoPicContH);

						var curRotateLevel, targRotateLevel, targOffsetX, targOffsetY, targOffsetW, targOffsetH;

						

						if((rotateImgTurns == 0)){
							curRotateLevel = 0;
							targRotateLevel = 90;
							targOffsetX=mgoPicContW;
							targOffsetY=0;
							targOffsetW=mgoPicContH;
							targOffsetH=mgoPicContW;
							rotateImgTurns= 1;

						} else {
							//var curRotateLevelValuesA = curRotateLevelArrA.match(/-?[\d\.]+/g);
							//var curMatrixVals = Math.round( (parseFloat(curRotateLevelValuesA[0])) * 10 );


							if(rotateImgTurns == 3){
								targRotateLevel = 0;
								targOffsetX=0;
								targOffsetY=0;
								targOffsetW=mgoPicContH;
								targOffsetH=mgoPicContW;
								rotateImgTurns= 4;

							} else if (rotateImgTurns == 2){
								targRotateLevel = 270;
								targOffsetX=0;
								targOffsetY=mgoPicContH;
								targOffsetW=mgoPicContH;
								targOffsetH=mgoPicContW;
								rotateImgTurns= 3;
							} else if (rotateImgTurns == 1){
								targRotateLevel = 180;
								targOffsetX=mgoPicContH;
								targOffsetY=mgoPicContW;
								targOffsetW=mgoPicContH;
								targOffsetH=mgoPicContW;
								rotateImgTurns= 2;
							} else if (rotateImgTurns == 4){
								targRotateLevel = 90;
								targOffsetX=mgoPicContW;
								targOffsetY=0;
								targOffsetW=mgoPicContH;
								targOffsetH=mgoPicContW;
								rotateImgTurns= 1;
							};

							
						};

						//console.log('a '+curRotateLevelArrA);
						//console.log('vals ' + curMatrixVals);
						//console.log('turns ' + rotateImgTurns);

						mmContainerTarg.css('position', 'absolute');
						
						//mmContainerTarg.css('-moz-transform-origin', '0px 0px 0px');
						//mmContainerTarg.css('-webkit-transform-origin', '0px 0px 0px');
						mmContainerTarg.css('transform-origin', '0px 0px 0px');

						//mmContainerTarg.css('-moz-transform', 'rotate('+targRotateLevel+'deg)');
						//mmContainerTarg.css('-webkit-transform', 'rotate('+targRotateLevel+'deg)');
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
			
			$element.find('.butPrint').on('click', function() {
				 var mmToPrint = 'mmI'+imgriduniqueID;
			     var printContents = document.getElementById(mmToPrint).innerHTML;
			     //var originalContents = document.body.innerHTML;

			     if(mgoSinglePicModeActive){
				     document.body.innerHTML = '<div class="mmPrintMessage">Print using the browser or button below<br><br>'
				     +'<br><br><button class="lui-button lui-button--success mmIconButAdjust" alt="Fit Height" onclick="window.print();" type="button"><span class="lui-icon lui-icon--print"></span> Print</button> <button class="lui-button" onclick="location.reload();">Return to sheet</button></div><div id="mmIComtainer" style="background-color:#ffffff">'+printContents+'</div>';
			 	} else {
			 		document.body.innerHTML = '<div class="mmPrintMessage">Print using the browser or button below, then choose a large format (best from a PDF writer) to output to, eg A0 as this will help tiling other wise the images will page.<br><br>'
				     +'If your print dialogue does not allow for large pages, you can scale the grid using these controls.<br><br>'
				     + 'Size:<br><span class="lui-buttongroup">'
				     + ' <button class="lui-button" onclick="var tg=document.getElementById(\'mmIComtainer\'); tg.style.transformOrigin=\'0 0\'; tg.style.transform=\'scale(0.25)\'; tg.style.width=\'400%\';">25%</button>'
				     + ' <button class="lui-button" onclick="var tg=document.getElementById(\'mmIComtainer\'); tg.style.transformOrigin=\'0 0\'; tg.style.transform=\'scale(0.5)\'; tg.style.width=\'200%\';">50%</button>'
				     + ' <button class="lui-button" onclick="var tg=document.getElementById(\'mmIComtainer\'); tg.style.transformOrigin=\'50% 50%\'; tg.style.transform=\'scale(1.0)\'; tg.style.width=\'100%\';"">100%</button>'
				     + ' <button class="lui-button" onclick="var tg=document.getElementById(\'mmIComtainer\'); tg.style.transformOrigin=\'0 0\'; tg.style.transform=\'scale(2.0)\'; tg.style.width=\'50%\';">200%</button>'
				     + ' <button class="lui-button" onclick="var tg=document.getElementById(\'mmIComtainer\'); tg.style.transformOrigin=\'0 0\'; tg.style.transform=\'scale(4.0)\'; tg.style.width=\'25%\';">400%</button>'
				     + ' </span>'
				     +'<br><br><button class="lui-button lui-button--success mmIconButAdjust" alt="Fit Height" onclick="window.print();" type="button"><span class="lui-icon lui-icon--print"></span> Print</button> <button class="lui-button" onclick="location.reload();">Return to sheet</button></div><div id="mmIComtainer" style="background-color:#ffffff">'+printContents+'</div>';
			 	};
			     

			     document.body.className = "";
			     document.body.className = 'qv-object-MGOImageGridv3 forceShow';
			     document.body.style.overflow = 'scroll';

			     
			});

			
			return Promise.resolve();

		}
		
	};
} );
