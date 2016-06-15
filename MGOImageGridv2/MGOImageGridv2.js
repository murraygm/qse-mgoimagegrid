/*globals define*/
define(["jquery","text!./MGOImageGridv2.css"], 
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
					max: 2

				},
				sorting: {
					uses: "sorting"
				},
				externalimages: {
					label:"MGO Image Grid V2",
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
									label: "Always fit",
									tooltip: "Always fit image in grid cell"
								}, {
									value: "s",
									label: "Stretch",
									tooltip: "Stretch image to fit cell"
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
								label : "Custom image opacity",
								type : "boolean",
								defaultValue : false
								},
							customImageOpacityType : {
								type: "string",
								component: "buttongroup",
								label: "Set the opacity using the 1st measure or by a fixed amount",
								ref: "qDef.IMGOPACITYTYPE",
								options: [{
									value: "m",
									label: "Measure 1",
									tooltip: "Use the first measure to set opacity per image"
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
								label : "Custom image background colour",
								type : "boolean",
								defaultValue : false
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
								label: "Display measure(s)",
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
								component: "buttongroup",
								label: "Use a URL or insert HTML",
								options: [{
									value: true,
									label: "URL",
									tooltip: "Make selections on the field"
								}, {
									value: false,
									label: "HTML",
									tooltip: "Pop up the image in a new window"
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
								show: function(layout) { if(layout.qDef.SINGLEIMGDISPLAY == false){ return true } else { return false } } 
								}
							}
						},
					imageDisplayLimit: {
						type:"items",
						label:"Limit display and loading",
						items: {
							customImagePaging : {
								ref : "qDef.IMGPAGING",
								label : "Use custom limit for number of images to initiallly display",
								type : "boolean",
								defaultValue : false
								},
							initFetchRows : {
								ref : "qHyperCubeDef.qInitialDataFetch.0.qHeight",
								label : "No. of images to initially display",
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
								label : "No. of images per page (use same value as initial load)",
								type : "number",
								defaultValue : 100,
								show: function(layout) { if(layout.qDef.IMGPAGING & layout.qDef.IMGPAGINGTOG ){ return true } else { return false } } 
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
		snapshot: {
			canTakeSnapshot: false
		},
		

		paint: function ( $element,layout ) {
			var html = "", self = this, lastrow = 0, firstrow = 0, morebutton = false, lessbutton = false, imgSelectType = layout.qDef.IMGLINK, rowcount = this.backendApi.getRowCount(), imgFolderLocation = "", qData = layout.qHyperCube.qDataPages[(layout.qHyperCube.qDataPages.length - 1)], mymeasureCount = layout.qHyperCube.qMeasureInfo.length, mydimensionCount = layout.qHyperCube.qDimensionInfo.length, measBarCol1 = "FFF", measBarCol2="FFF", measBarHeight=10,  imgScaleSingle = "mgoImgScaleFit", imgBGCol = "FFF", imgBorderCol = "FFF", imgBorderSize = 0, imgCHeight = 100, imgCWidth = 100, imgScaleGrid = "mgoImgScaleFit";
			var imgriduniqueID = layout.qInfo.qId;
			var imgridpage = layout.qDef.IMGPAGINGSIZE;


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
				if(layout.qDef.SINGLEIMGDISPLAYOPT == "w"){
					imgScaleSingle = "mgoImgScaleFitWidth";
				} else if (layout.qDef.SINGLEIMGDISPLAYOPT == "h"){
					imgScaleSingle = "mgoImgScaleFitHeight";
				} else {
					imgScaleSingle = "mgoImgScaleStretch";
				};
			};

			
			
			var parentscope = angular.element($element).scope().$parent.$parent.$parent;
			$element.html(parentscope.editmode ? 'In Edit Mode' : 'Not in Edit mode');
			
			//render data
				$.each(qData.qMatrix, function ( key, row  ) {
					if(mydimensionCount == 2){

						var dim = row[0], dim2 = row[1], meas1 = row[2], meas2 = row[3];

					} else if (mydimensionCount == 1){
						var dim = row[0], meas1 = row[1], meas2 = row[2];
					};
					
					//console.log(qData.qMatrix);


					lastrow = key * layout.qHyperCube.qDataPages.length;
					firstrow = (key * layout.qHyperCube.qDataPages.length)-imgridpage+1;

					//set up image opacity value
					var imageOpacity = 1;
							if(layout.qDef.IMGOPACITY){
									if(layout.qDef.IMGOPACITYTYPE == "m"){
										if(mymeasureCount>0){
											var mmfact4op = meas1.qNum/layout.qHyperCube.qMeasureInfo[0].qMax;
											imageOpacity = mmfact4op; 
										} else {
											imageOpacity = 1;
										};
									} else if (layout.qDef.IMGOPACITYTYPE == "n"){
										imageOpacity = layout.qDef.IMGOPACITYVAL/100;
									};
								} else {
									imageOpacity = 1;
								};
					
					//Check count and choose Grid or Single pic layout
					if(rowcount > 1){
						//GRID LAYOUT
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

							html += '<span class="mgoPicGrid '+imgScaleGrid+'" style="height:' + imgCHeight + 'px; width:' + imgCWidth + 'px; background-image: url(' + imgFolderLocation + dim.qText + '); background-color: #' + imgBGCol +'; border-bottom: '+ imgBorderSize + 'px solid #' + imgBorderCol +'; border-right: '+ imgBorderSize + 'px solid #' + imgBorderCol +'; opacity: '+ imageOpacity +';">';
							html += '</span>';
						
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
									html += '<span class="mgoMeasureSingleBar" style="margin-top: 0px; margin-left: -'+(imgCWidth+imgBorderSize)+'px; height:'+measBarHeight+'px; width:'+meas1barw+'px; background-color:#'+measBarCol1+';"><br></span>';
									
								};
							} else if((mymeasureCount==2) & (layout.qDef.IMGMEASGRIDDISPLAYTOG)){
									// For 2 measures
									// render measure
									// check style
									if(!layout.qDef.IMGMEASDISPLAYSTYLE){
										//number
										html += '<span class="mgoMeasureSingle" style="width:' + (imgCWidth-4) + 'px; height:' + (imgCHeight-4) + 'px; margin-left: -'+(imgCWidth+imgBorderSize)+'px;"> '+ layout.qHyperCube.qMeasureInfo[0].qFallbackTitle +': '+ meas1.qNum+'<br> '+ layout.qHyperCube.qMeasureInfo[1].qFallbackTitle +': '+ meas2.qNum+'</span>';
										
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
										html += '<span class="mgoMeasureSingleBar" style="margin-top: 0px; margin-left: -'+(imgCWidth+imgBorderSize)+'px; height:'+measBarHeight+'px; width:'+meas1barw+'px; background-color:#'+measBarCol1+';"><br></span>';
										html += '<span class="mgoMeasureSingleBar" style="margin-top: 11px; margin-left: -'+(imgCWidth+imgBorderSize)+'px; height:'+measBarHeight+'px; width:'+meas2barw+'px; background-color:#'+measBarCol2+';"><br></span>';
										
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
								html += '<span class="mgoPicGrid '+imgScaleGrid+'" style="height:' + imgCHeight + 'px; width:' + imgCWidth + 'px; background-image: url(' + imgFolderLocation + dim.qText + '); background-color: #' + imgBGCol +'; border-bottom: '+ imgBorderSize + 'px solid #' + imgBorderCol +'; border-right: '+ imgBorderSize + 'px solid #' + imgBorderCol +'; opacity: '+ imageOpacity +';">';
								html += '</span>';
							

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
									html += '<span class="mgoMeasureSingleBar" style="margin-top: 0px; margin-left: -'+(imgCWidth+imgBorderSize)+'px; height:'+measBarHeight+'px; width:'+meas1barw+'px; background-color:#'+measBarCol1+';"><br></span>';
									
								};
							} else if((mymeasureCount==2) & (layout.qDef.IMGMEASGRIDDISPLAYTOG)){
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
										html += '<span class="mgoMeasureSingleBar" style="margin-top: 0px; margin-left: -'+(imgCWidth+imgBorderSize)+'px; height:'+measBarHeight+'px; width:'+meas1barw+'px; background-color:#'+measBarCol1+';"><br></span>';
										html += '<span class="mgoMeasureSingleBar" style="margin-top: 11px; margin-left: -'+(imgCWidth+imgBorderSize)+'px; height:'+measBarHeight+'px; width:'+meas2barw+'px; background-color:#'+measBarCol2+';"><br></span>';
										
									};
									html += '</span>';
				
							};
							
							html += '</span>';

						};
						
					
					} else { 
						//SINGLE PIC (based on selection not load limitation)
						// render image 
						if(customSingleImageNSourceTog){
							if(customSingleImageSourceType){
								html += '<div class="mgoSinglePic '+imgScaleSingle+'" style="background-image: url(' + customSingleImageSourceURL + ');background-color: #' + imgBGCol +';">';
							} else {
								html += customSingleImageSourceHTML;
							};
						} else {
							html += '<div class="mgoSinglePic '+imgScaleSingle+'" style="background-image: url(' + imgFolderLocation + dim.qText + ');background-color: #' + imgBGCol +';">';
						};
						//check if measure added
							if((mymeasureCount==1) & (layout.qDef.SINGLEIMGMEASURE)){
								// For 1 measure
								
								// render measure
								html += '<span class="mgoMeasureSinglePic" style="height:auto; margin-left: 0px;">'+ layout.qHyperCube.qMeasureInfo[0].qFallbackTitle +': '+ meas1.qNum+'</span>';
								
								
							} else if((mymeasureCount==2) & (layout.qDef.SINGLEIMGMEASURE)){
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
				if(rowcount > 1){
					html += '<div style="font-size:12px; color:#AAA; margin:4px 0px">'+ ((imgpagedsofar-imgridpage)+1) + ' to ';
					if(imgpagedsofar > rowcount){
						html += rowcount + ' of ' + rowcount + ' images</div>';
					} else {
						html += (imgpagedsofar) + ' of ' + rowcount + ' images</div>';
					};

				};
				if(morebutpagetotal > 1){
					if(imgpagedsofar > imgridpage){
						lessbutton = true;
						html += '<br>' + '<button id="loadless" class="qui-outlinebutton qv-pt-meta-button ng-scope" style="margin:4px 4px">Less</button>';	
					} else {
						html += '<br>' + '<button id="loadless" disabled class="qui-outlinebutton qv-pt-meta-button ng-scope" style="margin:4px 4px">Less</button>';	
					};
					if((rowcount - imgpagedsofar) > 0){
						morebutton = true;
						html += '<button id="loadmore" class="qui-outlinebutton qv-pt-meta-button ng-scope" style="margin:4px 4px">More</button>';	
					} else {
						html += '<button id="loadmore" disabled class="qui-outlinebutton qv-pt-meta-button ng-scope" style="margin:4px 4px">More</button>';	

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
			
			
		}
		
	};
} );
