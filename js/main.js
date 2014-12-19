(function(){

	var container 		= document.getElementById('drawing'),
		paper			= Raphael(container, 1024, 768),
		panZoom 		= paper.panZoom(),
		zoomInBtn		= document.getElementById("zoomin"),
		zoomOutBtn		= document.getElementById("zoomout"),
		enablePan		= document.getElementById("panOn"),
		disablePan		= document.getElementById("panOff");

		// aspect ratio: 0.75
		var ww = 1048;
		var hh = 0.75*ww;
		//paper.setViewBox(0, 0, ww, hh);

	paper.add([
			{type: "circle",cx: 200,cy: 200,r: 20,fill: 'tomato',stroke: 'black'},
			{type: "rect",x: 5,y: 5,width: 20,height: 20,fill: 'tomato',stroke: 'black'},
			{type: "rect",x: 5,y: 375,width: 20,height: 20,fill: 'tomato',stroke: 'black'},
			{type: "rect",x: 1800,y: 1800,width: 20,height: 20,fill: 'green',stroke: 'black'},
			{type: "rect",x: 375,y: 5,width: 20,height: 20,fill: 'tomato',stroke: 'black'},
			{type: "rect", x: 0, y: 0, width: 1024, height: 768, fill: 'rgba(0,0,0,0.3)'}
			]);

	paper.add([
			{type: "circle", cx: 1024/2, cy: 768/2, r: 20},
			{type: "text", x: 1024/2, y: 768/2, text: "Center", fill: "red", stroke: "green" },
		]);

	/*var text1 = paper.text(1024/2,768/2,
	 	"What is happiness?\nThe feeling that power \nincreases - that resistance \nis being overcome.\n Friedrich Nietzsche").
	 	attr({"font-size": "32px", "font-weight": "800", fill: "yellow", stroke:"brown", "stroke-width": "3px"});*/
	 
	/* $(text1.node).css({
	 	"-webkit-touch-callout": "none",
	 	"-webkit-user-select": "none",
	 	"-khtml-user-select": "none",
	 	"-moz-user-select": "none",
	 	"-ms-user-select": "none",
	 	"user-select": "none",
	});*/

	//paper.setViewBox(0,0,3000,3000);
	zoomInBtn.addEventListener("click", function(){
			panZoom.zoomIn();
		});
	zoomOutBtn.addEventListener("click", function(){
			panZoom.zoomOut();
		});

	/*enablePan.addEventListener("click", function(){
		panZoom.enablePan();
	});
	disablePan.addEventListener("click", function(){
		panZoom.disablePan();
	});*/



})();