Raphael.fn.panZoom = function(){

	// if no viewBox is set, set a default one
	if( !this._viewBox ){
		this.setViewBox(0,0,this.width,this.height);
	}
	
	var paper 				= this,
		container			= paper.canvas.parentNode,
		isMouseDown			= false,
		isMouseMove			= false,
		isPanDisable 		= false,
		isZoomDisable 		= false,
		initialZoom			= 100, // 100%
		zoomStep 			= 10, // 10%
		maxZoom 			= 200, // 100%
		minZoom 			= 10, // 10%
		deltaX, deltaY, initX, initY, endX, endY, overlay;

	function appendOverlay(){
		overlay 			= document.createElement("div"),
		overlay.className 	= "overlay",
		container.appendChild(overlay);
	}

	function removeOverlay(){
		container.removeChild(overlay);
	}

	appendOverlay();
	fillContainer();

	function fillContainer(){
		var pw = paper._viewBox[2],
			ph = paper._viewBox[3];
		if( container.offsetWidth > pw ){ 
			var gutter = Math.round( (container.offsetWidth-pw)/2 );
			container.style.padding = "0px 0px 0px "+gutter+"px";
		}else if( container.offsetHeight > ph ){
			var gutter = Math.round( (container.offsetHeight-ph)/2 );
			container.style.padding = gutter+"px"+" 0px 0px 0px";
		} else if( container.offsetWidth > pw && container.offsetHeight > ph ){
			var gutterLeft = Math.round( (container.offsetWidth-pw)/2 );
			var gutterTop = Math.round( (container.offsetHeight-ph)/2 );
			container.style.padding = gutterTop+"px"+" 0px 0px "+gutterLeft+"px";
		}
		/*if( container.offsetWidth > paper.width ){ 
			var gutter = Math.round( (container.offsetWidth-paper.width)/2 );
			container.style.padding = "0px 0px 0px "+gutter+"px";
		}else if( container.offsetHeight > paper.height ){
			var gutter = Math.round( (container.offsetHeight-paper.height)/2 );
			container.style.padding = gutter+"px"+" 0px 0px 0px";
		} else if( container.offsetWidth > paper.width && container.offsetHeight > paper.height ){
			var gutterLeft = Math.round( (container.offsetWidth-paper.width)/2 );
			var gutterTop = Math.round( (container.offsetHeight-paper.height)/2 );
			container.style.padding = gutterTop+"px"+" 0px 0px "+gutterLeft+"px";
		}*/
	}

	function getCenterCoord(){
		var centerX = Math.round( ( paper._viewBox[0] + container.offsetWidth ) / 2 ) ;
		var centerY = Math.round( ( paper._viewBox[1] + container.offsetHeight ) / 2 ) ;
		return {
			x: centerX,
			y: centerY
		};
	}

	function getAspectRatio(){
		return paper.height / paper.width ;
	}

	/*********
	 * Zoom
	 *********/
	function applyZoom(){
		var centerCoord = getCenterCoord();
		var newWidth = Math.round( initialZoom*paper.width / 100 );
		var newHeight = newWidth*getAspectRatio();

		paper.setViewBox(centerCoord.x, centerCoord.y, newWidth, newHeight);
		fillContainer();
		var currentZoomLevel = (maxZoom*2)-initialZoom;
		console.log("Zoom: "+currentZoomLevel+"%");
	}

	function zoomIn(){
		if( initialZoom == minZoom || isZoomDisable ){
			return;
		}
		initialZoom -= zoomStep;
		applyZoom();
	}

	function zoomOut(){
		if( initialZoom == maxZoom || isZoomDisable ){
			return;
		}
		initialZoom += zoomStep;
		applyZoom();
	}

	/*********
	 * Pan 
	 ********/
	function panTo(x,y){
		var currentViewBox = paper._viewBox;
		console.log(currentViewBox);
		return paper.setViewBox(x,y,currentViewBox[2],currentViewBox[3]);
	}

	container.onmousedown = function(e){
		if( isPanDisable ){
			return;
		}
		isMouseDown = true;
		container.style.cursor = "move";
		initX = e.offsetX;
		initY = e.offsetY;
		endX = (paper._viewBox)? paper._viewBox[0] : 0,
		endY = (paper._viewBox)? paper._viewBox[1] : 0;
	}

	container.onmouseup = function(e){
		isMouseDown = false;
		container.style.cursor = "default";
		endX = deltaX;
		endY = deltaY;		
	}

	container.onmousemove = function(e){
		if( !isMouseDown ){
			return;
		}

		/*deltaX = endX + paper.width - ( ( paper.width - initX ) + e.offsetX );
		deltaY = endY + paper.height - ( ( paper.height - initY ) + e.offsetY );

		if( deltaX < 0 ){ deltaX = 0; }
		if( deltaX > paper.width -container.offsetWidth ){ deltaX = paper.width - container.offsetWidth }
		if( container.offsetWidth >= paper.width ){ deltaX = 0; }
		
		if( deltaY < 0 ){ deltaY = 0; }
		if( deltaY > paper.height - container.offsetHeight ){ deltaY = paper.height - container.offsetHeight }
		if( container.offsetHeight >= paper.height ){ deltaY = 0; }*/
		var pw = paper._viewBox[2],
			ph = paper._viewBox[3];
		
		deltaX = endX + pw - ( ( pw - initX ) + e.offsetX );
		deltaY = endY + ph - ( ( ph - initY ) + e.offsetY );
		console.log(pw+' '+container.offsetWidth);

		if( deltaX < 0 ){ deltaX = 0; }
		if( deltaX > pw - container.offsetWidth ){ deltaX = pw - container.offsetWidth }
		if( container.offsetWidth >= pw ){ deltaX = 0; }
		
		if( deltaY < 0 ){ deltaY = 0; }
		if( deltaY > ph - container.offsetHeight ){ deltaY = ph - container.offsetHeight }
		if( container.offsetHeight >= ph ){ deltaY = 0; }

		panTo(deltaX, deltaY);

	}

	return {
		disablePan: function(){
			isPanDisable = true;
			removeOverlay();
		},
		enablePan: function(){
			isPanDisable = false;
			appendOverlay();
		},
		disableZoom: function(){
			isZoomDisable = true;
		},
		enableZoom: function(){
			isZoomDisable = false;
		},
		isPanEnable: function(){
			return isPanDisable;
		},
		panTo: panTo,
		zoomIn: zoomIn,
		zoomOut: zoomOut
	};

};