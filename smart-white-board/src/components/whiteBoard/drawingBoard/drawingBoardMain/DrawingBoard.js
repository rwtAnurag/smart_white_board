import { memo, useEffect, useRef, useState } from "react";
// import { Tools } from "../index.js";
// import { uuid4 } from "../utils";
import Header from "../header/Header.js";
import SketchField from "../SketchBoard";
// import SideBar from "../sideBar/SideBar";
import "./drawingboard.scss";

const DrawingBoard = (props) => {
  const [clickedTool, setClickedTool] = useState("pencil");
  const [shapesType, setShapesType] = useState("circle");
  const [size, setSize] = useState(4);
  const [isActiveEraser, setIsActiveEraser] = useState(false)
  const [undoStep,setUndoStep] = useState(false)
  const [sizeColorTool,setSizeColorTool] = useState(false);
  const [zoom,setZoom] = useState(100)
  const [color, setColor] = useState("#050000");
  const { setSelectedType, selectedType,outSideClick, setOutSideClick, downloadFunctionCall, setDownloadFunctionCall, lecturePdfFilePath, saveWhiteBoardData, setSaveWhiteBoardData } = props;
  const canvasRef = useRef(null);
  const handleSelectedType = () => {
    switch (clickedTool) {
      case "pencil":
        setSelectedType("pencil");
        setSize(4)
        setIsActiveEraser(false);
        break;
      case "shapes":
        setSelectedType(shapesType);
        setIsActiveEraser(false);
        break;
      case "text":
        setSelectedType("text");
        setIsActiveEraser(false);
        break;
      case "selected":
        setSelectedType("select");
        setIsActiveEraser(false);
        break;
      case "pan":
        setSelectedType("pan");
        setIsActiveEraser(false);
        break;
      case "eraser":
        setSelectedType("pencil");
        setSize(17)
        setIsActiveEraser(true);
        break;

    }
  };

  useEffect(() => {
    handleSelectedType();
    console.log("this._sketch",undoStep)
  }, [clickedTool, shapesType]);

  return (
    <>
      <div className="drawing-board-container">
        <div>
          <Header
            outSideClick={outSideClick}
            setOutSideClick={setOutSideClick}
            size={size}
            sizeColorTool={sizeColorTool}
            setSizeColorTool={setSizeColorTool}
            setSize={setSize}
            setSelectedType={setSelectedType}
            color={color}
            setColor={setColor}
          />
        </div>
        <div>
          {/* <SideBar
            clickedTool={clickedTool}
            setClickedTool={setClickedTool}
            shapesType={shapesType}
            setShapesType={setShapesType}
          /> */}
        </div>
        <div>
          <SketchField
            setLecturePdfFilePath={props.setLecturePdfFilePath}
            lecturePdfFilePath={lecturePdfFilePath}
            setOutSideClick={setOutSideClick}
            outSideClick={outSideClick}
            clickedTool={clickedTool}
            setClickedTool={setClickedTool}
            shapesType={shapesType}
            setShapesType={setShapesType}
            name="sketch"
            WhiteBoardEnable={props.WhiteBoardEnable}
            setZoom={setZoom}
            zoom={zoom}
            className="canvas-area"
            forceValue
            width="94vw"
            onSelectionCreated={(e) => {console.log("on selection created", e)}}
            onSelectionUpdated={(e) => {console.log("on selection updated", e)}}
            height="100vh"
            lineColor={clickedTool==="eraser" ? "#ffff" : color }
            lineWidth={size}
            tool={selectedType}
            fontSize={size*20}
            setSelectedType={setSelectedType}
            sizeColorTool={sizeColorTool}
            isActiveEraser={isActiveEraser}
            clearWhiteBoardData={props.clearWhiteBoardData}
            setClearWhiteBoardData={props.setClearWhiteBoardData}
            downloadFunctionCall={downloadFunctionCall}
            setDownloadFunctionCall={setDownloadFunctionCall}
            saveWhiteBoardData={saveWhiteBoardData}
            setSaveWhiteBoardData={setSaveWhiteBoardData}
          />
        </div>
      </div>
    </>
  );
};

export default memo(DrawingBoard);
