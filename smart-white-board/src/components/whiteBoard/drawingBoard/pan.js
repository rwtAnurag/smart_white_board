/*eslint no-unused-vars: 0*/

import FabricCanvasTool from './fabrictool'

const fabric = require('fabric').fabric;

class Pan extends FabricCanvasTool {

  configureCanvas(props) {
    let canvas = this._canvas;
    canvas.isDrawingMode = canvas.selection = false;
    canvas.forEachObject((o) => o.selectable = o.evented = false);
    //Change the cursor to the move grabber
    canvas.defaultCursor = 'move';
  }

  doMouseDown(o) {
    let canvas = this._canvas;
    this.isDown = true;
    let pointer = canvas.getPointer(o.e);
    this.startX = pointer.x;
    this.startY = pointer.y;
  }

  doMouseMove(o) {
    if (!this.isDown) return;
    let canvas = this._canvas;
    let pointer = canvas.getPointer(o.e);

    // to download pan data in whiteboard
    let _previousCoordinatesObj={
        left:0,
        right:0,
        top:0,
        bottom:0
    }
    if(canvas?._previousCoordinates){
      _previousCoordinatesObj.left=canvas?._previousCoordinates?.left
      _previousCoordinatesObj.right=canvas?._previousCoordinates?.right
      _previousCoordinatesObj.top=canvas?._previousCoordinates?.top
      _previousCoordinatesObj.bottom=canvas?._previousCoordinates?.bottom
    }
    if(canvas?.vptCoords?.tl?.x<0){
      if(Math.abs(canvas?.vptCoords?.tl?.x)>Math.abs(_previousCoordinatesObj?.left)){
        let extraMove =  Math.abs(canvas?.vptCoords?.tl?.x)-Math.abs(_previousCoordinatesObj?.left)
        _previousCoordinatesObj.left+=extraMove
      }
    }
    if(canvas?.vptCoords?.tl?.x>0){
      if(Math.abs(canvas.vptCoords?.tl?.x)>Math.abs(_previousCoordinatesObj?.right)){
        let extraMove =  Math.abs(canvas?.vptCoords?.tl?.x)-Math.abs(_previousCoordinatesObj?.right)
        _previousCoordinatesObj.right+=extraMove
      }
    }

    // for top and bottom 
    if(canvas?.vptCoords?.tl?.y<0){
      if(Math.abs(canvas?.vptCoords?.tl?.y)>Math.abs(_previousCoordinatesObj?.top)){
        let extraMove =  Math.abs(canvas?.vptCoords?.tl?.y)-Math.abs(_previousCoordinatesObj?.top)
        _previousCoordinatesObj.top+=extraMove
      }
    }
    if(canvas?.vptCoords?.tl?.y>0){
      if(Math.abs(canvas?.vptCoords?.tl?.y)>Math.abs(_previousCoordinatesObj?.bottom)){
        let extraMove =  Math.abs(canvas?.vptCoords?.tl?.y)-Math.abs(_previousCoordinatesObj?.bottom)
        _previousCoordinatesObj.bottom+=extraMove
      }
    }
    canvas["_previousCoordinates"]=_previousCoordinatesObj
    canvas.relativePan({
      x: pointer.x - this.startX,
      y: pointer.y - this.startY
    });
    canvas.renderAll();
  }

  doMouseUp(o) {
    this.isDown = false;
  }

}

export default Pan;