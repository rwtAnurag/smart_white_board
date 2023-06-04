/*eslint no-unused-vars: 0*/

import FabricCanvasTool from './fabrictool'

const fabric = require('fabric').fabric;

class Text extends FabricCanvasTool {

  configureCanvas(props) {
    let canvas = this._canvas;
    canvas.isDrawingMode = canvas.selection = false;
    canvas.forEachObject((o) => o.selectable = o.evented = false);
    // if(props.clickedTool==="text") canvas.defaultCursor = 'text';
    this._width = props.lineWidth;
    this._color = props.lineColor;
    this._fill = props.lineColor;
    this.fontSize=props.fontSize
  }

  doMouseDown(o) {
    let canvas = this._canvas;
    let exitElement = null;
    const objects = canvas.getObjects();
    objects.forEach(el => {
      if(el.exited) {
        exitElement = el;
      }
    });

    if(exitElement) {
      exitElement.exited = false;
      return;
    }

    if(!o.target){
        this.isDown = true;
        let pointer = canvas.getPointer(o.e);
        this.startX = pointer.x;
        this.startY = pointer.y;
        this.text = new fabric.IText('', {
            left: this.startX,
            top: this.startY,
            fill: this._fill,
            stroke: this._color,
            selectable: true,
            evented: false,
            fontSize:this.fontSize,
            fontWeight:100
          }
        )
        canvas.add(this.text);
        canvas.setActiveObject(this.text);
        this.text.enterEditing();
        this.text.hiddenTextarea.focus();
        canvas.defaultCursor = 'default';
    }
  }

  doMouseUp(o) {
    this.isDown = false;
  }
}

export default Text;