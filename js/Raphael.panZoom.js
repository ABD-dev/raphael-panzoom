Raphael.fn.panZoom = function(){

	if( !this._viewBox ){
		this.setViewBox(0,0,this.width,this.height);
	}

	var paper 			= this,
		container 		= paper.canvas.parentNode,
		aspectRatio 	= getAspectRatio().toFixed(2),
		isMouseDown		= false,
		isMouseMove		= false,
		isPanDisable	= false,
		isZoomDisable	= false,
		initialZoom 	= 1,
		currentZoom 	= initialZoom,
		zoomStep 		= 0.1,
		minZoom 		= 1,
		maxZoom 		= 2,
		initX, initY, endX, endY, deltaX, deltaY;
	console.log(aspectRatio);

	function getAspectRatio(){
		return paper.height / paper.width;
	}

	function getCurrentViewBox(){
		return{
			x: 		paper._viewBox[0],
			y: 		paper._viewBox[1],
			w: 		paper._viewBox[2],
			h: 		paper._viewBox[3],
			fit: 	paper._viewBox[4]
		};
	}

	/* Zoom */
	function setZoom(zoomLevel){
		var currentViewBox = getCurrentViewBox();
		console.log(zoomLevel);
	}

	function zoomIn(){
		// set viewBox bigger
		//console.log("scale 110%+");
	}

	function zoomOut(){
		// set viewBox smaller
		var currentViewBox = getCurrentViewBox();
		var maxWidth = ( paper.width - container.offsetWidth ) + currentViewBox.w;
		var newWidth = Math.ceil( (currentViewBox.w*110)/100 );
		if( newWidth > maxWidth ){
			newWidth = maxWidth;
		}
		var newHeight = Math.ceil( aspectRatio*newWidth );
		console.log(newWidth+"x"+newHeight);
		paper.setViewBox(0,0,newWidth,newHeight);

	}

	/* Pan */
	container.onmousedown = function(e){
		if( isPanDisable ){
			return;
		}
		isMouseDown = true;
		var currentViewBox = getCurrentViewBox();
		initX = e.offsetX;
		initY = e.offsetY;
		endX = currentViewBox.x,
		endY = currentViewBox.y;
	}

	container.onmouseup = function(e){
		isMouseDown = false;
		var currentViewBox = getCurrentViewBox();
		endX = currentViewBox.x;
		endY = currentViewBox.y;
	}

	container.onmousemove = function(e){
		if( !isMouseDown ){
			return;
		}
		var currentViewBox = getCurrentViewBox();
		deltaX = endX + currentViewBox.w - ( ( currentViewBox.w - initX ) + e.offsetX );
		deltaY = endY + currentViewBox.h - ( ( currentViewBox.h - initY ) + e.offsetY );

		if( deltaX < 0 ){ 
			deltaX = 0 
		}else if( currentViewBox.w > paper.width ){
			deltaX = 0;
		}else if( deltaX > currentViewBox.w - container.offsetWidth ){
			deltaX = currentViewBox.w - container.offsetWidth ;
		}

		if( deltaY < 0 ){ 
			deltaY = 0 
		}else if( deltaY > currentViewBox.h - container.offsetHeight ){
			deltaY = currentViewBox.h - container.offsetHeight ;
		}
	
		paper.setViewBox(deltaX, deltaY, currentViewBox.w, currentViewBox.h);
		console.log(deltaX, deltaY, currentViewBox.w, currentViewBox.h);
	}

	// @todo panTo
	
	return {
		zoomIn: zoomIn,
		zoomOut: zoomOut
	};
};