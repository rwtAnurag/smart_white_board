/*eslint no-unused-vars: 0*/

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import History from './history';
import {uuid4} from './utils';
import SideBar from './sideBar/SideBar';
import Select from './select';
import Triangle from './triangle';
import Remove from './remove';
import Pencil from './pencil';
import Line from './line';
import Arrow from './arrow';
import Rectangle from './rectangle';
import Circle from './circle';
import Pan from './pan';
import Text from './text';
import Ellipse from './ellipse';
import Polygon from './polygon';
import Tool from './tools';
import RectangleLabel from './rectangle-label';
import DefaultTool from './defaul-tool';
import Pointer from './pointer';
import { nanoid } from 'nanoid'

const fabric = require('fabric').fabric;
const calledFirstTimeCheck=false;
export let undoStep = ()=>{};
// console.log("calledFirstTimeCheck",calledFirstTimeCheck)
/**
 * Sketch Tool based on FabricJS for React Applications
 */
class SketchField extends PureComponent {

  static propTypes = {
    // the color of the line
    lineColor: PropTypes.string,
    // The width of the line
    lineWidth: PropTypes.number,
    // the fill color of the shape when applicable
    fillColor: PropTypes.string,
    // the hover icon for Remove tool
    removeIcon: PropTypes.string,
    // the background color of the sketch
    backgroundColor: PropTypes.string,
    // the opacity of the object
    opacity: PropTypes.number,
    // number of undo/redo steps to maintain
    undoSteps: PropTypes.number,
    // The tool to use, can be pencil, rectangle, circle, brush;
    tool: PropTypes.string,
    // image format when calling toDataURL
    imageFormat: PropTypes.string,
    // Sketch data for controlling sketch from
    // outside the component
    value: PropTypes.object,
    // Set to true if you wish to force load the given value, even if it is  the same
    forceValue: PropTypes.bool,
    // Specify some width correction which will be applied on auto resize
    widthCorrection: PropTypes.number,
    // Specify some height correction which will be applied on auto resize
    heightCorrection: PropTypes.number,
    // Specify action on change
    onChange: PropTypes.func,
    // Default initial value
    defaultValue: PropTypes.object,
    // Sketch width
    width: PropTypes.number,
    // Sketch height
    height: PropTypes.number,
    // event object added
    onObjectAdded: PropTypes.func,
    // event object modified
    onObjectModified: PropTypes.func,
    // event object removed
    onObjectRemoved: PropTypes.func,
    // event mouse down
    onMouseDown: PropTypes.func,
    // event mouse move
    onMouseMove: PropTypes.func,
    // event mouse up
    onMouseUp: PropTypes.func,
    // event mouse out
    onMouseOut: PropTypes.func,
    // event object move
    onObjectMoving: PropTypes.func,
    // event object scale
    onObjectScaling: PropTypes.func,
    // event object rotating
    onObjectRotating: PropTypes.func,
    // event text selected
    onSelectionCreated: PropTypes.func,
    // event text selected
    onSelectionUpdated: PropTypes.func,
    // Class name to pass to container div of canvas
    className: PropTypes.string,
    // Style options to pass to container div of canvas
    style: PropTypes.object,
    // StaticCanvas vs Canvas option
    isPreview: PropTypes.bool,
  };

  static defaultProps = {
    lineColor: 'black',
    lineWidth: 10,
    fillColor: 'transparent',
    backgroundColor: 'transparent',
    removeIcon: null,
    opacity: 1.0,
    undoSteps: 25,
    tool: null,
    widthCorrection: 0,
    heightCorrection: 0,
    forceValue: false,
    onObjectAdded:()=>null,
    onObjectModified:()=>null,
    onObjectRemoved:()=>null,
    onMouseDown:()=>null,
    onMouseMove:()=>null,
    onMouseUp:()=>null,
    onMouseOut:()=>null,
    onObjectMoving:()=>null,
    onObjectScaling:()=>null,
    onObjectRotating:()=>null,
  };

  state = {
    parentWidth: 550,
    calledFirstTime:false,
    action: true,
    canvasElement:this._fc
  };
  _initTools = (fabricCanvas) => {
    this._tools = {};
    this._tools[Tool.Select] = new Select(fabricCanvas);
    this._tools[Tool.Pencil] = new Pencil(fabricCanvas);
    this._tools[Tool.Line] = new Line(fabricCanvas);
    this._tools[Tool.Arrow] = new Arrow(fabricCanvas);
    this._tools[Tool.Rectangle] = new Rectangle(fabricCanvas);
    this._tools[Tool.RectangleLabel] = new RectangleLabel(fabricCanvas);
    this._tools[Tool.Circle] = new Circle(fabricCanvas);
    this._tools[Tool.Pan] = new Pan(fabricCanvas);
    this._tools[Tool.Triangle] = new Triangle(fabricCanvas);
    this._tools[Tool.Remove] = new Remove(fabricCanvas);
    this._tools[Tool.Text] = new Text(fabricCanvas);
    this._tools[Tool.Ellipse] = new Ellipse(fabricCanvas);
    this._tools[Tool.Polygon] = new Polygon(fabricCanvas);
    this._tools[Tool.DefaultTool] = new DefaultTool(fabricCanvas);
    this._tools[Tool.Pointer] = new Pointer(fabricCanvas);
  };

  /**
   * Enable touch Scrolling on Canvas
   */
  enableTouchScroll = () => {
    let canvas = this._fc;
    if (canvas.allowTouchScrolling) return;
    canvas.allowTouchScrolling = true
  };

  /**
   * Disable touch Scrolling on Canvas
   */
  disableTouchScroll = () => {
    let canvas = this._fc;
    if (canvas.allowTouchScrolling) {
      canvas.allowTouchScrolling = false
    }
  };

  /**
   * Add an image as object to the canvas
   *
   * @param dataUrl the image url or Data Url
   * @param options object to pass and change some options when loading image, the format of the object is:
   *
   * {
   *   left: <Number: distance from left of canvas>,
   *   top: <Number: distance from top of canvas>,
   *   scale: <Number: initial scale of image>
   * }
   */
  addImg = (dataUrl, options = {}) => {
    let canvas = this._fc;
    fabric.Image.fromURL(dataUrl, (oImg) => {
      let opts = {
        left: Math.random() * (canvas.getWidth() - oImg.width * 0.5),
        top: Math.random() * (canvas.getHeight() - oImg.height * 0.5),
        scale: 0.5
      };
      Object.assign(opts, options);
      oImg.scale(opts.scale);
      oImg.set({
        'left': opts.left,
        'top': opts.top
      });
      canvas.add(oImg);
    });
  };

  _onTextExited = (e) => {
    let obj = e.target;
    obj.set({ 'exited': true })
  }

  /**
   * Action when an object selection is created
   */
  _onSelectionCreated = (e) => {
    const {onSelectionCreated} = this.props;
    onSelectionCreated(e);
  };

    /**
   * Action when an object selection is updated
   */
  _onSelectionUpdated = (e) => {
    const {onSelectionUpdated} = this.props;
    onSelectionUpdated(e);
  };

  /**
   * Action when an object is added to the canvas
   */
  _onObjectAdded = (e) => {
    const {onObjectAdded} = this.props;
    if (!this.state.action) {
      this.setState({ action: true });
      return
    }
    let obj = e.target;
    obj.__version = 1;
    // record current object state as json and save as originalState
    let objState = obj.toJSON();
    obj.__originalState = objState;
    let state = JSON.stringify(objState);
    // object, previous state, current state
    this._history.keep([obj, state, state])

    if(!obj.id && !obj.temporary) {
      obj.set('id', nanoid())
      obj.setCoords()
      this._fc.renderAll()
      
      const delay_objs = ['circle', 'rect', 'line', 'triangle', 'group', 'i-text']
      if(obj.type == 'ellipse') {
        setTimeout(() => {
          onObjectAdded(JSON.stringify(obj), obj.id);
        }, 800);
      } else if (delay_objs.includes(obj.type)) {
        setTimeout(() => {
          onObjectAdded(JSON.stringify(obj), obj.id);
        }, 600);
      } else {
        onObjectAdded(JSON.stringify(obj), obj.id);
      }
    }
  };

  /**
   * Action when an object is moving around inside the canvas
   */
  _onObjectMoving = (e) => {
    const {onObjectMoving} = this.props;
    onObjectMoving(e);
  };

  /**
   * Action when an object is scaling inside the canvas
   */
  _onObjectScaling = (e) => {
    const {onObjectScaling} = this.props;
    onObjectScaling(e);
  };

  /**
   * Action when an object is rotating inside the canvas
   */
  _onObjectRotating = (e) => {
    const {onObjectRotating} = this.props;
    onObjectRotating(e);
  };

  _onObjectModified = (e) => {
    const {onObjectModified} = this.props;
    let obj = e.target;
    obj.__version += 1;
    let prevState = JSON.stringify(obj.__originalState);
    let objState = obj.toJSON();
    // record current object state as json and update to originalState
    obj.__originalState = objState;
    let currState = JSON.stringify(objState);
    this._history.keep([obj, prevState, currState]);
    
    let strObj = JSON.stringify(obj);
    const delay_objs = ['circle', 'rect', 'line', 'triangle', 'group', 'i-text']
    if(obj.type == 'ellipse') {
      setTimeout(() => {
        onObjectModified(strObj, obj.id);
      }, 400);
    } else if (delay_objs.includes(obj.type)) {
      setTimeout(() => {
        onObjectModified(strObj, obj.id);
      }, 200);
    } else {
      onObjectModified(strObj, obj.id);
    }
  };

  /**
   * Action when an object is removed from the canvas
   */
  _onObjectRemoved = (e) => {
    const {onObjectRemoved} = this.props;
    let obj = e.target;
    if (obj.__removed) {
      obj.__version += 1;
      return
    }
    obj.__version = 0;
    onObjectRemoved(obj, obj.id);
  };

  /**
   * Action when the mouse button is pressed down
   */
  _onMouseDown = (e) => {
    const{onMouseDown} = this.props;
    this._selectedTool.doMouseDown(e);
    onMouseDown(e);
  };

  /**
   * Action when the mouse cursor is moving around within the canvas
   */
  _onMouseMove = (e) => {
    const {onMouseMove} = this.props;
    this._selectedTool.doMouseMove(e);
    onMouseMove(e);
  };

  /**
   * Action when the mouse cursor is moving out from the canvas
   */
  _onMouseOut = (e) => {
    const {onMouseOut} = this.props;
    this._selectedTool.doMouseOut(e);
    if (this.props.onChange) {
      let onChange = this.props.onChange;
      setTimeout(() => {
        onChange(e.e)
      }, 10)
    }
    onMouseOut(e);
  };

  _onMouseUp = (e) => {
    const {onMouseUp} = this.props;
    this._selectedTool.doMouseUp(e);
    // Update the final state to new-generated object
    // Ignore Path object since it would be created after mouseUp
    // Assumed the last object in canvas.getObjects() in the newest object
    if (this.props.tool !== Tool.Pencil) {
      const canvas = this._fc;
      const objects = canvas.getObjects();
      const newObj = objects[objects.length - 1];
      if (newObj && newObj.__version === 1) {
        newObj.__originalState = newObj.toJSON();
      }
    }
    if (this.props.onChange) {
      let onChange = this.props.onChange;
      setTimeout(() => {
        onChange(e.e)
      }, 10)
    }
    onMouseUp(e);
  };

  _onWindowDoubleClick = (e) => {
    this._selectedTool.doWindowDoubleClick(e);
  }

  /**
   * Track the resize of the window and update our state
   *
   * @param e the resize event
   * @private
   */
  _resize = (e, canvasWidth = null, canvasHeight = null) => {
    if (e) e.preventDefault();
    let { widthCorrection, heightCorrection } = this.props;
    let canvas = this._fc;
    let { offsetWidth, clientHeight } = this._container;
    let prevWidth = canvasWidth || canvas.getWidth();
    let prevHeight = canvasHeight || canvas.getHeight();
    let wfactor = ((offsetWidth - widthCorrection) / prevWidth).toFixed(2);
    let hfactor = ((clientHeight - heightCorrection) / prevHeight).toFixed(2);
    canvas.setWidth(offsetWidth - widthCorrection);
    canvas.setHeight(clientHeight - heightCorrection);
    if (canvas.backgroundImage) {
      // Need to scale background images as well
      let bi = canvas.backgroundImage;
      bi.width = bi.width * wfactor;
      bi.height = bi.height * hfactor
    }
    let objects = canvas.getObjects();
    for (let i in objects) {
      let obj = objects[i];
      let scaleX = obj.scaleX;
      let scaleY = obj.scaleY;
      let left = obj.left;
      let top = obj.top;
      let tempScaleX = scaleX * wfactor;
      let tempScaleY = scaleY * hfactor;
      let tempLeft = left * wfactor;
      let tempTop = top * hfactor;
      obj.scaleX = tempScaleX;
      obj.scaleY = tempScaleY;
      obj.left = tempLeft;
      obj.top = tempTop;
      obj.setCoords()
    }
    this.setState({
      parentWidth: offsetWidth
    });
    canvas.renderAll();
    canvas.calcOffset();
  };

  /**
   * Sets the background color for this sketch
   * @param color in rgba or hex format
   */
  _backgroundColor = (color) => {
    if (!color) return;
    let canvas = this._fc;
    canvas.setBackgroundColor(color, () => canvas.renderAll())
  };

  configureToolCanvas = () => {
    this._selectedTool = this._tools[this.props.tool];
    //Bring the cursor back to default if it is changed by a tool
    this._fc.defaultCursor = 'default';
    if(this._selectedTool){
      this._selectedTool.configureCanvas(this.props);
    }
  }

  /**
   * Zoom the drawing by the factor specified
   *
   * The zoom factor is a percentage with regards the original, for example if factor is set to 2
   * it will double the size whereas if it is set to 0.5 it will half the size
   *
   * @param factor the zoom factor
   */
  zoom = (factor) => {
    let canvas = this._fc;
    let objects = canvas.getObjects();
    for (let i in objects) {
      objects[i].scaleX = objects[i].scaleX * factor;
      objects[i].scaleY = objects[i].scaleY * factor;
      objects[i].left = objects[i].left * factor;
      objects[i].top = objects[i].top * factor;
      objects[i].setCoords();
    }
    canvas.renderAll();
    canvas.calcOffset();
  };

  /**
   * Perform an undo operation on canvas, if it cannot undo it will leave the canvas intact
   */
  undo = () => {
    let history = this._history;
    let [obj, prevState, currState] = history.getCurrent();
    history.undo();
    if (obj.__removed) {
      this.setState({ action: false }, () => {
        this._fc.add(obj);
        obj.__version -= 1;
        obj.__removed = false;
      });
    } else if (obj.__version <= 1) {
      this._fc.remove(obj);
    } else {
      obj.__version -= 1;
      obj.setOptions(JSON.parse(prevState));
      obj.setCoords();
      this._fc.renderAll()
    }
    if (this.props.onChange) {
      this.props.onChange()
    }
  };
  undoStep=this.undo;

  /**
   * Perform a redo operation on canvas, if it cannot redo it will leave the canvas intact
   */
  redo = () => {
    let history = this._history;
    if (history.canRedo()) {
      let canvas = this._fc;
      //noinspection Eslint
      let [obj, prevState, currState] = history.redo();
      if (obj.__version === 0) {
        this.setState({ action: false }, () => {
          canvas.add(obj);
          obj.__version = 1
        })
      } else {
        obj.__version += 1;
        obj.setOptions(JSON.parse(currState))
      }
      obj.setCoords();
      canvas.renderAll();
      if (this.props.onChange) {
        this.props.onChange()
      }
    }
  };

  /**
   * Delegation method to check if we can perform an undo Operation, useful to disable/enable possible buttons
   *
   * @returns {*} true if we can undo otherwise false
   */
  canUndo = () => {
    return this._history.canUndo()
  };

  /**
   * Delegation method to check if we can perform a redo Operation, useful to disable/enable possible buttons
   *
   * @returns {*} true if we can redo otherwise false
   */
  canRedo = () => {
    return this._history.canRedo()
  };

  /**
   * Exports canvas element to a dataurl image. Note that when multiplier is used, cropping is scaled appropriately
   *
   * Available Options are
   * <table style="width:100%">
   *
   * <tr><td><b>Name</b></td><td><b>Type</b></td><td><b>Argument</b></td><td><b>Default</b></td><td><b>Description</b></td></tr>
   * <tr><td>format</td> <td>String</td> <td><optional></td><td>png</td><td>The format of the output image. Either "jpeg" or "png"</td></tr>
   * <tr><td>quality</td><td>Number</td><td><optional></td><td>1</td><td>Quality level (0..1). Only used for jpeg.</td></tr>
   * <tr><td>multiplier</td><td>Number</td><td><optional></td><td>1</td><td>Multiplier to scale by</td></tr>
   * <tr><td>left</td><td>Number</td><td><optional></td><td></td><td>Cropping left offset. Introduced in v1.2.14</td></tr>
   * <tr><td>top</td><td>Number</td><td><optional></td><td></td><td>Cropping top offset. Introduced in v1.2.14</td></tr>
   * <tr><td>width</td><td>Number</td><td><optional></td><td></td><td>Cropping width. Introduced in v1.2.14</td></tr>
   * <tr><td>height</td><td>Number</td><td><optional></td><td></td><td>Cropping height. Introduced in v1.2.14</td></tr>
   *
   * </table>
   *
   * @returns {String} URL containing a representation of the object in the format specified by options.format
   */
  toDataURL = (options) => this._fc.toDataURL(options);

  /**
   * Returns JSON representation of canvas
   *
   * @param propertiesToInclude Array <optional> Any properties that you might want to additionally include in the output
   * @returns {string} JSON string
   */
  toJSON = (propertiesToInclude) => this._fc.toJSON(propertiesToInclude);

  /**
   * Populates canvas with data from the specified JSON.
   *
   * JSON format must conform to the one of fabric.Canvas#toDatalessJSON
   *
   * @param json JSON string or object
   */
  fromJSON = (json) => {
    if (!json) return;
    let canvas = this._fc;
    setTimeout(() => {
      canvas.loadFromJSON(json, () => {
        if(this.props.tool === Tool.DefaultTool){
          canvas.isDrawingMode = canvas.selection = false;
          canvas.forEachObject((o) => o.selectable = o.evented = false);
        }
        canvas.renderAll();
        if (this.props.onChange) {
          this.props.onChange()
        }
      })
    }, 100)
  };

  /**
   * Clear the content of the canvas, this will also clear history but will return the canvas content as JSON to be
   * used as needed in order to undo the clear if possible
   *
   * @param propertiesToInclude Array <optional> Any properties that you might want to additionally include in the output
   * @returns {string} JSON string of the canvas just cleared
   */
  clear = (propertiesToInclude) => {
    let discarded = this.toJSON(propertiesToInclude);
    this._fc.clear();
    this._history.clear();
    return discarded
  };

  /**
   * Remove selected object from the canvas
   */
  removeSelected = () => {
    let canvas = this._fc;
    let activeObj = canvas && canvas.getActiveObject();
    if (activeObj) {
      let selected = [];
      if (activeObj.type === 'activeSelection') {
        activeObj.forEachObject(obj => selected.push(obj));
      } else {
        selected.push(activeObj)
      }
      selected.forEach(obj => {
        obj.__removed = true;
        let objState = obj.toJSON();
        obj.__originalState = objState;
        let state = JSON.stringify(objState);
        this._history.keep([obj, state, state]);
        canvas.remove(obj);
      });
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    }
  };

  /**
   * Remove object by id from the canvas
   */
  removeObjectById = (id) => {
    let canvas = this._fc;
    var objToRemove = canvas.getObjects().find((o) => {
      return id == o.id;
    });
    if(objToRemove) {
      canvas.remove(objToRemove);
      canvas.requestRenderAll();
    }
  }

  /**
   * Make active object deslected if any
   */
  deselectActiveObject = () => {
    let canvas = this._fc;
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  }

  /**
   * Get object by id from the canvas
   */
  getObjectById = (id) => {
    let canvas = this._fc;
    var obj = canvas.getObjects().find((o) => {
      return id == o.id;
    });
    return obj;
  }

  changeSelectedStrokeColor = (color) => {
    let canvas = this._fc;
    let activeObj = canvas.getActiveObject();

    // for arrow element
    if(activeObj && activeObj.type === 'group') {
      if(activeObj.item(0)) activeObj.item(0).set({stroke: color});
      if(activeObj.item(1)) activeObj.item(1).set({stroke: color});
      if(activeObj.item(0)) activeObj.item(0).set({fill: color});
      if(activeObj.item(1)) activeObj.item(1).set({fill: color});
      canvas.renderAll();
      canvas.trigger('object:modified', {target: activeObj});
    }

     // for the rest of the elements
    if(activeObj && activeObj.type !== 'group') {
      activeObj.set({stroke: color});
      canvas.renderAll();
      canvas.trigger('object:modified', {target: activeObj});
    }
  }

  changeSelectedFillColor = (color) => {
    let canvas = this._fc;
    let activeObj = canvas.getActiveObject();
    if(activeObj) {
      activeObj.set({fill: color});
      canvas.renderAll();
      canvas.trigger('object:modified', {target: activeObj});
    }
  }

  /**
   * Set object as selected on the canvas
   */
  setSelected = (id) => {
    let canvas = this._fc;
    var objToSelect = canvas.getObjects().find((o) => {
      return id == o.id;
    });
    if(objToSelect) {
      canvas.setActiveObject(objToSelect);
      canvas.requestRenderAll();
    }
  };

  /**
   * Add object to the canvas
   */
  addObject = (obj) => {

    let canvas = this._fc;
    let shapeData = JSON.parse(obj);

    let shape = null;
    const type = this._capsFirstLetter(shapeData.type);
    if (type == 'Path') {
      let string_path = '';
      shapeData.path.forEach((x) => {
        string_path += x.join(' ');
      });

      shape = new fabric.Path(string_path);
      delete shapeData.path;
      shape.set(shapeData);
    } else if (type == 'I-text') {
      shape = new fabric.IText(shapeData.text); 
      delete shapeData.text;
      shape.set(shapeData);
    } else if (type == 'Circle' || type == 'Rect' || type == 'Triangle' || type == 'Ellipse') {
      shape = new fabric[type](shapeData);
    } else if (type == 'Line') {
      shape = new fabric.Line([shapeData.x1, shapeData.y1, shapeData.x2,  shapeData.y2], shapeData)
    } else if (type == 'Group') {
      const elements = this._getGroupElements(shapeData.objects)
      shape = new fabric.Group(elements, shapeData)
    }

    canvas.add(shape);
  }

  getPointer = (e) => {
    let canvas = this._fc;
    return canvas.getPointer(e);
  }
  /**
   * Add pointer object to the canvas
   */
  addPointerObject = (options, duration = 100, userSession) => {
    let canvas = this._fc;

    var objToModify = canvas.getObjects().find((o) => {
      return userSession == o.id;
    });

    if(objToModify) {

      objToModify.animate(options, { onChange: canvas.renderAll.bind(canvas), duration });

    } else {

      fabric.Image.fromURL(this.props.pointerIcon, function(myImg) {
        let img = myImg.set({ 
          id: userSession,
          ...options,
          originX: 'left', 
          originY: 'center',
          selectable: false,
          evented: false,
        });
        canvas.add(img); 
      });
    }
  }

  _getGroupElements = (objects) => {
    const elements = []
    objects.forEach(el => {
      // TODO: handle other elements
      if(el.type == 'line') {
        elements.push(new fabric.Line([el.x1, el.y1, el.x2,  el.y2], el))
      }
      if(el.type == 'triangle') {
        elements.push(new fabric.Triangle(el))
      }
    })

    return elements;
  }

  /**
   * Modify object on the canvas
   */
  modifyObject = (obj) => {
    
    let objData = JSON.parse(obj);
    let canvas = this._fc;
    
    var objToModify = canvas.getObjects().find((o) => {
      return objData.id == o.id;
    });

    if (!objToModify) return
    
    if(objToModify.type == 'line') {
      this.setSelected(objToModify.id)
      this.removeSelected()
      this.addObject(obj)
    } else {
      objToModify.set(objData); // update the object 
      objToModify.setCoords(); // useful if the object's coordinates in the canvas also changed (usually by moving)
      canvas.requestRenderAll(); // refresh the canvas so changes will appear
    }
  }

  _capsFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  copy = () => {
    let canvas = this._fc;
    canvas.getActiveObject().clone(cloned => this._clipboard = cloned);
  };

  paste = () => {
    // clone again, so you can do multiple copies.
    this._clipboard.clone(clonedObj => {
      let canvas = this._fc;
      canvas.discardActiveObject();
      clonedObj.set({
        left: clonedObj.left + 10,
        top: clonedObj.top + 10,
        evented: true,
      });
      if (clonedObj.type === 'activeSelection') {
        // active selection needs a reference to the canvas.
        clonedObj.canvas = canvas;
        clonedObj.forEachObject(obj => canvas.add(obj));
        clonedObj.setCoords();
      } else {
        canvas.add(clonedObj);
      }
      this._clipboard.top += 10;
      this._clipboard.left += 10;
      canvas.setActiveObject(clonedObj);
      canvas.requestRenderAll();
    });
  };

  /**
   * Sets the background from the dataUrl given
   *
   * @param dataUrl the dataUrl to be used as a background
   * @param options
   */
  setBackgroundFromDataUrl = (dataUrl, options = {}) => {
    let canvas = this._fc;
    if (options.stretched) {
      delete options.stretched;
      Object.assign(options, {
        width: canvas.width,
        height: canvas.height
      })
    }
    if (options.stretchedX) {
      delete options.stretchedX;
      Object.assign(options, {
        width: canvas.width
      })
    }
    if (options.stretchedY) {
      delete options.stretchedY;
      Object.assign(options, {
        height: canvas.height
      })
    }
    let img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.onload = () => canvas.setBackgroundImage(new fabric.Image(img),
      () => canvas.renderAll(), options);
    img.src = dataUrl
  };

  addText = (text, options = {}) => {
    let canvas = this._fc;
    let iText = new fabric.IText(text, options);
    let opts = {
      left: (canvas.getWidth() - iText.width) * 0.5,
      top: (canvas.getHeight() - iText.height) * 0.5,
    };
    Object.assign(options, opts);
    iText.set({
      'left': options.left,
      'top': options.top
    });

    canvas.add(iText);
  };

  getCanvasObjects = () => {
    let canvas = this._fc;
    const jsonData = []
    const objects = canvas.getObjects();
    objects.forEach(el => {
      const objState = { ...el.__originalState, id: el.id}
      jsonData.push(objState);
    })

    return jsonData;
  }

  callEvent = (e, eventFunction) => {
    if(this._selectedTool)
      eventFunction(e);
  }
  
  componentDidMount = () => {
    
    let {
      tool,
      value,
      undoSteps,
      defaultValue,
      isPreview = false,
      backgroundColor
    } = this.props;
    if(!this._fc){
      let canvas = this._fc = isPreview ? new fabric.StaticCanvas(this._canvas) : new fabric.Canvas(this._canvas/*, {
        preserveObjectStacking: false,
        renderOnAddRemove: false,
        skipTargetFind: true
        }*/);
   this._initTools(canvas);

   // set initial backgroundColor
   this._backgroundColor(backgroundColor)

   if(!isPreview) {
     let selectedTool = this._tools[tool];
     if(selectedTool)
       selectedTool.configureCanvas(this.props);
     this._selectedTool = selectedTool;
   }

   // Control resize
   window.addEventListener('resize', this._resize, false);

   // Initialize History, with maximum number of undo steps
   this._history = new History(undoSteps);

   // Events binding
   canvas.on('object:added', e => this.callEvent(e, this._onObjectAdded));
   canvas.on('object:modified', e => this.callEvent(e, this._onObjectModified));
   canvas.on('object:removed', e => this.callEvent(e, this._onObjectRemoved));
   canvas.on('mouse:down', e => this.callEvent(e, this._onMouseDown));
   canvas.on('mouse:move', e => this.callEvent(e, this._onMouseMove));
   canvas.on('mouse:up', e =>  this.callEvent(e, this._onMouseUp));
   canvas.on('mouse:out', e => this.callEvent(e, this._onMouseOut));
   canvas.on('object:moving', e => this.callEvent(e, this._onObjectMoving));
   canvas.on('object:scaling', e => this.callEvent(e, this._onObjectScaling));
   canvas.on('object:rotating', e => this.callEvent(e, this._onObjectRotating));
   canvas.on('selection:created', e => this.callEvent(e, this._onSelectionCreated))
   canvas.on('selection:updated', e => this.callEvent(e, this._onSelectionUpdated))
   // IText Events fired on Adding Text
   // canvas.on("text:event:changed", console.log)
   // canvas.on("text:selection:changed", console.log)
   canvas.on("text:editing:entered", e => {
     if(e && e.target && e.target.hiddenTextarea) e.target.hiddenTextarea.setAttribute('id', 'i-text-hidden')
   })
   canvas.on("text:editing:exited", e => this.callEvent(e, this._onTextExited))
   // window events
   fabric.util.addListener(window, 'dblclick', e => this.callEvent(e, this._onWindowDoubleClick))

   this.disableTouchScroll();

   this._resize();

   // initialize canvas with controlled value if exists
   (value || defaultValue) && this.fromJSON(value || defaultValue);

    }
    console.log("print All Canvas Data",this)
    
  };

  componentWillUnmount = () =>  { 
    window.removeEventListener('resize', this._resize);
    window.removeEventListener('dblclick', e => this.callEvent(e, this._onWindowDoubleClick));
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.parentWidth !== prevState.parentWidth
      || this.props.width !== prevProps.width
      || this.props.height !== prevProps.height) {

      this._resize()
    }

    if (this.props.tool !== prevProps.tool ||
      this.props.lineWidth !== prevProps.lineWidth ||
      this.props.lineColor !== prevProps.lineColor ||
      this.props.fillColor !== prevProps.fillColor
      ) {
      this.configureToolCanvas()
    }

    if (this.props.backgroundColor !== prevProps.backgroundColor) {
      this._backgroundColor(this.props.backgroundColor)
    }

    if ((this.props.value !== prevProps.value) || (this.props.value && this.props.forceValue)) {
      this.fromJSON(this.props.value);
    }
  };

  render = () => {
    console.log("this.props.tool",this.props.tool)
    let {
      className,
      style,
      width,
      height
    } = this.props;

    let canvasDivStyle = Object.assign({}, style ? style : {},
      width ? { width: "100vw" } : {},
      height ? { height: height } : { height: 512 });
    return (
      <div
        // className={className}
        ref={(c) => this._container = c}
        style={canvasDivStyle}>
        <div style={{display:"flex"}}>
        <SideBar
           undo={this.undo}
           redo={this.redo}
           canvasElement={this.state.canvasElement}
           zoom={this.zoom}
           canUndo={this.canUndo}
           canRedo={this.canRedo}
           canvas={this._canvas}
           clickedTool={this.props.clickedTool}
           setClickedTool={this.props.setClickedTool}
           shapesType={this.props.shapesType}
           setShapesType={this.props.setShapesType}
           zoomvalue={this.props.zoom}
           clear={this.clear}
           addText={this.addText}
        />
        <canvas
          id={uuid4()}
          ref={(c) => this._canvas = c}>
          {/* Sorry, Canvas HTML5 element is not supported by your browser
          :( */}
        </canvas>
        </div>
        
      </div>
    )
  }
}

export default SketchField