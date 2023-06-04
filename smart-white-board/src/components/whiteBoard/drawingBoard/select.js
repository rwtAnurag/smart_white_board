/*eslint no-unused-vars: 0*/

import FabricCanvasTool from './fabrictool'

class Select extends FabricCanvasTool {

  configureCanvas(props) {
    let canvas = this._canvas;
    canvas.isDrawingMode = false;
    canvas.selection = true;
    canvas.hoverCursor = 'move';
    canvas.forEachObject((o) => {
      if(o !== undefined && o?.stroke !==undefined && o?.type!==undefined && o?.stroke === "#ffff" && o?.type ==="path")
        o.selectable = o.evented = false;
      else
        o.selectable = o.evented = true;
    });
  }
}

export default Select