
import FabricCanvasTool from './fabrictool'
// import PencilIcon from "./sideBar/assets/icons8-filled-circle-16.png"
import color1 from "./sideBar/assets/color1.svg"
import color2 from "./sideBar/assets/color2.svg"
import color3 from "./sideBar/assets/color3.svg"
import color4 from "./sideBar/assets/color4.svg"
import color6 from "./sideBar/assets/color6.svg"
import color7 from "./sideBar/assets/color7.svg"
import color8 from "./sideBar/assets/color8.svg"
import color9 from "./sideBar/assets/color9.svg"
import color10 from "./sideBar/assets/color10.svg"
import color11 from "./sideBar/assets/color11.svg"
import color12 from "./sideBar/assets/color12.svg"
import color13 from "./sideBar/assets/color13.svg"
import EraserIcon from "./sideBar/assets/eraser_img.png"
class Pencil extends FabricCanvasTool {

  configureCanvas(props) {
    this._canvas.isDrawingMode = true;
    this._canvas.freeDrawingBrush.width = props.lineWidth;
    this._canvas.freeDrawingBrush.color = props.lineColor;
    if(props?.lineColor == "#fcba03")
        if(props.clickedTool==="pencil") this._canvas.freeDrawingCursor = `url('${color1}') 4 64, auto`;
    if(props?.lineColor == "#14fc03")
      if(props?.clickedTool==="pencil") this._canvas.freeDrawingCursor = `url('${color2}') 4 64, auto`
    if(props?.lineColor == "#050000")
      if(props?.clickedTool==="pencil") this._canvas.freeDrawingCursor = `url('${color3}') 4 64, auto`
    if(props?.lineColor == "#134fd1")
      if(props?.clickedTool==="pencil") this._canvas.freeDrawingCursor = `url('${color4}') 4 64, auto`
    if(props?.lineColor == "#ffff")
      if(props?.clickedTool==="pencil") this._canvas.freeDrawingCursor = `url('${color3}') 4 64, auto`
    if(props?.lineColor == "#0c702e")
      if(props?.clickedTool==="pencil") this._canvas.freeDrawingCursor = `url('${color6}') 4 64, auto`
    if(props?.lineColor == "#fa0217")
      if(props?.clickedTool==="pencil") this._canvas.freeDrawingCursor = `url('${color7}') 4 64, auto`
    if(props?.lineColor == "#c9c7c8")
      if(props?.clickedTool==="pencil") this._canvas.freeDrawingCursor = `url('${color8}') 4 64, auto`
    if(props?.lineColor == "#09ede6")
      if(props?.clickedTool==="pencil") this._canvas.freeDrawingCursor = `url('${color9}') 4 64, auto`
    if(props?.lineColor == "#fcf003")
      if(props?.clickedTool==="pencil") this._canvas.freeDrawingCursor = `url('${color10}') 4 64, auto`
    if(props?.lineColor == "#0317fc")
      if(props?.clickedTool==="pencil") this._canvas.freeDrawingCursor = `url('${color11}') 4 64, auto`
    if(props?.lineColor == "#fc7303")
      if(props?.clickedTool==="pencil") this._canvas.freeDrawingCursor = `url('${color12}') 4 64, auto`
    if(props?.lineColor == "#9d03fc")
      if(props?.clickedTool==="pencil") this._canvas.freeDrawingCursor = `url('${color13}') 4 64, auto`
    else
      if(props?.clickedTool==="pencil") this._canvas.freeDrawingCursor = `url('${color3}') 4 64, auto`

    if(props.clickedTool==="eraser") this._canvas.freeDrawingCursor = `url('${EraserIcon}') 4 64, auto`
  }
}

export default Pencil;