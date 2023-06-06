// import ClearIcon from "../svgs/ClearIcon";
import EraserIcon from "../svgs/EraserIcon";
// import ImageIcon from "../svgs/ImageIcon";
import RedoIcon from "../svgs/RedoIcon";
// import SaveIcon from "../svgs/SaveIcon";
import ImageIcon from "../svgs/ImageIcon"
import axios from "axios";
import SelectIcon from "../svgs/SelectIcon";
import ShapeIcon from "../svgs/ShapeIcon";
import StrokeIcon from "../svgs/StrokeIcon";
import TextIcon from "../svgs/TextIcon";
import UndoIcon from "../svgs/UndoIcon";
import clearImg from "../../../../assests/icons8-delete-48.png"
import selectIconImg from "../../../../assests/icons8-select-24.png"
import ZoomIcon from "../svgs/ZoomIcon";
import { IconText } from "./Utils";
import Footer from "../../footer/Footer.js";
// import jsPDF from "jspdf";
// import useOutsideClick from "hooks/useOutsideClick";
import Triangle from "./assests/Triangle.png";
import Arrow from "./assests/arrow.png"
import Line from './assests/line.png'
// import FullScreen from "./assests/full_screen.svg"
// import EndFullScreen from './assests/end_full_screen.svg'
// import html2canvas from "html2canvas";
import "./icons.scss";
import { ClearOutlined, CaretDownOutlined, CaretUpOutlined} from "@ant-design/icons";
// import {toastMessage } from "utils/Utilities";
import {useEffect, useRef, useState } from "react";
// import {RECORDING_VIDEO_SAVE_TYPE} from "constants/appConstats";
// import {uploadLectureNotes} from "components/teachingTools/screenRecorder/uploadLectureNotes.js"
// import { useSelector } from "react-redux";

const fabric = require("fabric").fabric;
const Icons = (props) => {
const { 
  setClickedTool, 
  clickedTool, 
  shapesType, 
  setShapesType,
  undo, 
  redo, 
  clear,
  addText,
  canUndo,
  canRedo,
  canvasElement, 
  canvas, 
  zoom, 
  setLecturePdfFilePath, 
  setSelectedType, 
  _history, 
  downloadFunctionCall,
  setDownloadFunctionCall,
  deselectActiveObject,
  lecturePdfFilePath,
  changeSelectedStrokeColor}= props;
const [enableShape,setEnableShape] = useState(false);
const [pdfPageCount, setPdfPageCount] = useState(0);
const [fullScreenEnable, setFullScreenEnable] = useState(false);
const uploadImageRef = useRef(null);
// const { login } = useSelector(state => state);
// packageFeatures.school_settings.esc_setup_mode

// const { packageFeatures={} } = login
// const [doc,setDoc] = useState(new JSPDF("p", "mm"))
// const doc=new JSPDF("p", "mm")
const wrapperRef = useRef(null);
const close =() =>{
  setEnableShape(false);
}
// useOutsideClick(wrapperRef, close);
const handleShapeSelected=(type)=>{
    setShapesType(type)
}


function fullscreen(isRecodingStarting=false) {
  // let whiteboard = document.querySelector('.whiteboard-movement.whiteBoard-enable')
  // if(whiteboard) {
  //   if(!fullScreenEnable)
  //     whiteboard.style.width = `100vw`
  //   else 
  //     whiteboard.style.width = `50vw`
  // }
  var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null);
  var docElm = document.documentElement;
  if(!fullScreenEnable){
    if (!isInFullScreen) {
      if (docElm.requestFullscreen) {
          docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
          docElm.msRequestFullscreen();
      }
  } 
}
  // if(!fullScreenEnable){
  //   if (!isInFullScreen) {
  //     if (docElm.requestFullscreen) {
  //         docElm.requestFullscreen();
  //     } else if (docElm.mozRequestFullScreen) {
  //         docElm.mozRequestFullScreen();
  //     } else if (docElm.webkitRequestFullScreen) {
  //         docElm.webkitRequestFullScreen();
  //     } else if (docElm.msRequestFullscreen) {
  //         docElm.msRequestFullscreen();
  //     }
  // } else {
  //     if (document.exitFullscreen) {
  //         document.exitFullscreen();
  //     } else if (document.webkitExitFullscreen) {
  //         document.webkitExitFullscreen();
  //     } else if (document.mozCancelFullScreen) {
  //         document.mozCancelFullScreen();
  //     } else if (document.msExitFullscreen) {
  //         document.msExitFullscreen();
  //     }
  // }
  // }else if(isInFullScreen && fullScreenEnable ){
  //   if (document.exitFullscreen) {
  //     document.exitFullscreen();
  //   } else if (document.webkitExitFullscreen) {
  //     document.webkitExitFullscreen();
  //   } else if (document.mozCancelFullScreen) {
  //     document.mozCancelFullScreen();
  //   } else if (document.msExitFullscreen) {
  //     document.msExitFullscreen();
  //   }
  // }
}

function nodeToString(node) {
  var tmpNode = document.createElement("div");
  tmpNode.appendChild(node.cloneNode(true));
  var str = tmpNode.innerHTML;
  tmpNode = node = null; // prevent memory leaks in IE
  if(str?.includes(`class="MJX_Assistive_MathML"`)){
    str=str.replaceAll(`class="MJX_Assistive_MathML"`,`style="display:none" class="MJX_Assistive_MathML"`)
  }
  return str;
}

// Converting DataUri to blob

function DataURIToBlob(dataURI) {
  const splitDataURI = dataURI.split(',')
  const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
  const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

  const ia = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++)
  ia[i] = byteString.charCodeAt(i)

  return new Blob([ia], { type: mimeString })
}

  // function to Download Paper in Android and Ios App
  const downloadPaperinAndroid = (pdfurl,fileName="file.pdf") => {
    // pdfurl = LIVE_VIDEO_BASE_URL + pdfurl;
    let data = {
      url: pdfurl,
      fileName: fileName,
    };
    window.ReactNativeWebView.postMessage(JSON.stringify(
      {
        event: "download-pdf",
        data: data,
      }
    ));     
};

// Upload file While Downloading file in Mobile App 
 // uploadPaperOnGCP
 const identifier = "esc-leacturenotes";
 const uploadfileGCp = (fileName, file, extenion) => {
     let nameFile = `lecturenotes-pdf`
     let keyName = `${nameFile}.${extenion}`;
     const dt = new Date();
     keyName = `teacher_app/${identifier}/${dt.getFullYear()}/${dt.getMonth() + 1
       }/${dt.getDate()}`;
     keyName = `teacher_app/${identifier}/${dt.getFullYear()}/${dt.getMonth() + 1
       }/${dt.getDate()}`;
     file = DataURIToBlob(file)
     var formData = new FormData();
     formData.append("file", file, "lecturenotes.pdf");
     formData.append("folderPath", keyName);
     formData.append("bucketName", "gs://gotoschool");
     axios
       .post(`https://sabtestx.extramarks.com/uploadHandler`, formData, {
         headers: {
           "Content-Type": "multipart/form-data"
         }
       })
       .then(res => {
         if (res.status !== 200) {
           return false
         }
        //  let keyName1 = ""
        //  if (res.data.status === 1) {
        //    keyName1 = res.data.url.replace("https://storage.googleapis.com/gotoschool/", "")
        //  }
         downloadPaperinAndroid(res?.data?.url,fileName);
         return true;
       });
   }

const downloadFileAsPdf = () =>{
    if(canvas!==undefined && canvas){
      let left_coord=0;
      let right_coord=0;
      let top_coord=0;
      let bottom_coord=0;
    
      if(canvas?.vptCoords?.tl?.x){
        if(canvas?.vptCoords?.tl?.x<0)
          right_coord = canvas?.vptCoords?.tl?.x;
        else
          left_coord = canvas?.vptCoords?.tl?.x;
      }
      if(canvas?.vptCoords?.tl?.y){
        if(canvas?.vptCoords?.tl?.y<0)
          bottom_coord = canvas?.vptCoords?.tl?.y;
        else
          top_coord = canvas?.vptCoords?.tl?.y;
      }
      if(canvas?.vptCoords?.tl?.x){
          if(canvas?.vptCoords?.tl?.x>=0)
              left_coord += canvas?._previousCoordinates?.left 
          else
            left_coord += canvas?._previousCoordinates?.left + canvas?.vptCoords?.tl?.x
          left_coord = -Math.abs(left_coord)
          right_coord =canvas?._previousCoordinates?.right - canvas?.vptCoords?.tl?.x
          right_coord = -Math.abs(right_coord)
      }
      if(canvas?.vptCoords?.tl?.y){
        if(canvas?.vptCoords?.tl?.y>=0)
            top_coord += canvas?._previousCoordinates?.top 
        else
          top_coord += canvas?._previousCoordinates?.top + canvas?.vptCoords?.tl?.y
        top_coord = -Math.abs(top_coord)
        bottom_coord =canvas?._previousCoordinates?.bottom - canvas?.vptCoords?.tl?.y
        bottom_coord = -Math.abs(bottom_coord)
      }
      canvas.backgroundColor = '#FFFFFF';
      var dataURL = canvas.toDataURL({
          format: 'png',
          left: left_coord,
          top: top_coord,
          right: right_coord,
          bottom: bottom_coord,
          width: 1737 + Math.abs(right_coord) + Math.abs(left_coord),
          height:  1070 + Math.abs(right_coord) + Math.abs(left_coord) + Math.abs(top_coord) + Math.abs(bottom_coord),
      });
      // var pdf = new jsPDF("l", "mm", "a4");
      // pdf.addImage(dataURL, 'PNG', 10, 10, 280, 200, undefined,'FAST');
      // if(packageFeatures && packageFeatures?.school_settings && parseInt(packageFeatures?.school_settings?.esc_setup_mode)===1){
      //   uploadLectureNotes(pdf.output("datauristring"),lecturePdfFilePath)
      // }else{
      //   pdf.save(`${lecturePdfFilePath}`);
      // }
    }
  }
  const handleImageChange= (e) =>{
    const reader = new FileReader();
    const file = e.target.files[0];
    const  fileType = file['type'];
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', "image/jpg","image/svg+xml"];
    if(validImageTypes.includes(fileType)){
      if(file){
        console.log("filefilefilefilefile",fileType)
        reader.addEventListener('load', () => {
          fabric.Image.fromURL(reader.result, (img) => {
            img.scaleToHeight(canvas.height/2);
            img.set({left: canvas?.vptCoords?.tl?.x ? canvas?.vptCoords?.tl?.x : 0, top: canvas?.vptCoords?.tl?.y ? canvas?.vptCoords?.tl?.y : 0}).scale(0.9);
            canvas.add(img);
            canvas.renderAll();
          });
        });
        const objects = canvas.getObjects();
        // objects.center();
        reader.readAsDataURL(file);
        // fullscreen()
      }else{
        // toastMessage("No file")
      }
    }else{
      // toastMessage("Only image file type is supported")
    }
    
  }

  useEffect(()=>{
     if(downloadFunctionCall){
       downloadFileAsPdf();
       setDownloadFunctionCall(false)
     }else{
      setDownloadFunctionCall(false)
     }
  },[downloadFunctionCall])
  return (
    <div   className="icons-container">
      <div onClick={()=>{deselectActiveObject();setClickedTool("selected")}} className={`icons-all ${ clickedTool=="selected" ? "slected-icon" :""}`}>
         <span  className="icon-svg">
          <SelectIcon />
          {/* <img  className="line-img" style={{opacity:"0.3"}} src={selectIconImg}></img> */}
        </span>
        {/* <span  className="icon-text">{IconText.select}</span> */}
      </div>
      <div onClick={()=>{deselectActiveObject();setClickedTool("pencil")}} className={`icons-all ${ clickedTool=="pencil" ? "slected-icon" :""}`}>
        <span className="icon-svg">
          <StrokeIcon />
        </span>
        {/* <span className="icon-text">{IconText.pencil}</span> */}
      </div>
      <div  ref ={wrapperRef} onClick={()=>{deselectActiveObject();setClickedTool("shapes");setEnableShape(prev=> !prev)}} className={`icons-all ${ clickedTool=="shapes" ? "slected-icon" :""}`}>
        <span className="icon-svg">
          <ShapeIcon />
          {/* <DoubleRightOutlined className={`header-icon ${enableShape ? "minus_90" : ""}`}/> */}
        </span>
       {!enableShape ? <CaretDownOutlined className="shapes-icon-main" /> : <CaretUpOutlined className="shapes-icon-main"  />}
        
        {/* <span className="icon-text">{IconText.shapes}</span> */}
            { enableShape ?<div style={{cursor:"default"}} className="shapes-selection">
                <div className="shapes-first-row">
                  <div className={`shapes-block1 shapes-block ${shapesType==="circle" ? "shapes-block-selected":""}`}  onClick={()=>handleShapeSelected("circle")}>
                      <div className="csr-cls shapes-circle" ></div>
                  </div>
                  <div className={`shapes-block2 shapes-block ${shapesType==="rectangle" ? "shapes-block-selected":""}`} onClick={()=>handleShapeSelected("rectangle")}>
                      <div className="csr-cls shapes-rectangle"  ></div>  
                  </div>
                  <div className={`shapes-block3 shapes-block ${shapesType==="line" ? "shapes-block-selected":""}`} onClick={()=>handleShapeSelected("line")}>
                      {/* <div className="csr-cls shapes-line"  ></div> */}
                      <img  className="line-img" style={{opacity:"0.3",height:"24px"}} src={Line}></img>
                  </div>
                  <div className={`shapes-block4 shapes-block ${shapesType==="arrow" ? "shapes-block-selected":""}`} onClick={()=>handleShapeSelected("arrow")}>
                     {/* <ArrowRightOutlined   className="csr-cls" style={{fontSize: "40px"}} /> */}
                     <img  className="arrow-img" style={{opacity:"0.3",height:"24px"}} src={Arrow}></img>
                  </div>
                  <div className={`shapes-block5 shapes-block ${shapesType==="triangle" ? "shapes-block-selected":""}`} onClick={()=>handleShapeSelected("triangle")}>
                     {/* <CaretUpOutlined  className="csr-cls" style={{fontSize: "52px"}}/> */}
                     <img  className="triangle-img" style={{opacity:"0.3",height: "24px"}} src={Triangle}></img>
                     {/* <div className="tringle-shape"></div> */}
                  </div>
                  <div className={`shapes-block6 shapes-block ${shapesType==="ellipse" ? "shapes-block-selected":""}`} onClick={()=>handleShapeSelected("ellipse")}>
                     <div className="csr-cls shapes-ellipse"  ></div>
                  </div>
                </div>
                {/* <div className="shapes-second-row">
                  
                </div> */}
                </div> : null}
      </div>
      <div  
      onClick={()=>{setClickedTool("text");
      // deselectActiveObject();
      // addText("Text",{
      //   selected:true,
      //   editable:true
      // })
       }} 
      className={`icons-all ${ clickedTool=="text" ? "slected-icon" :""}`}>
        <span className="icon-svg">
          <TextIcon />
        </span>
        {/* <span  className="icon-text">{IconText.text}</span> */}
      </div>
      <div
      onClick={() => uploadImageRef.current.click()}  
       className={`icons-all ${ clickedTool=="image" ? "slected-icon " :""}`}>
        {/* <span className="icon-svg-input"> */}
          <input ref={uploadImageRef} accept="image/*" title=" " type="file" onChange={handleImageChange} />
        {/* </span> */}
        <ImageIcon/>
        {/* <span  className="icon-text">{"Add image"}</span> */}
      </div>    
      {/* <div onClick={()=>setClickedTool("image")} className={`icons-all ${ clickedTool=="image" ? "slected-icon" :""}`}>
        <span className="icon-svg">
          <ImageIcon />
        </span>
        <span className="icon-text">{IconText.image}</span>
      </div> */}
      <div onClick={()=>{
         deselectActiveObject();
          if(canUndo())undo()
        }}  className={`icons-all ${ clickedTool=="undo" ? "slected-icon" :""}`}>
        <span className="icon-svg">
          <UndoIcon />
        </span>
        {/* <span className="icon-text">{IconText.undo}</span> */}
      </div>
      <div onClick={()=>{
        deselectActiveObject();
        if(canRedo())redo();
        }}  className={`icons-all ${ clickedTool=="redo" ? "slected-icon" :""}`}>
        <span className="icon-svg">
          <RedoIcon />
        </span>
        {/* <span className="icon-text">{IconText.redo}</span> */}
      </div>
      <div  onClick={()=>{deselectActiveObject();setClickedTool("eraser")}}  className={`icons-all ${ clickedTool=="eraser" ? "slected-icon" :""}`}>
        <span className="icon-svg">
          <EraserIcon />
        </span>
        {/* <span className="icon-text">{IconText.eraser}</span> */}
      </div>
      <div onClick={()=>{clear();}}  className={`icons-all ${ clickedTool=="clear" ? "slected-icon" :""}`}>
        <span className="icon-svg">
          {/* <ClearIcon /> */}
          {/* <ClearOutlined style={{color:"#444",fontSize:"10px",opacity:"0.4"}} />
           */}
            <img  className="triangle-img" style={{opacity:"0.6",height: "24px"}} src={clearImg}></img>
        </span>
        {/* <span className="icon-text">{IconText.clear}</span> */}
      </div>
      <div onClick={()=>setClickedTool("pan")}  className={`icons-all ${ clickedTool=="pan" ? "slected-icon" :""}`}>
        <span className="icon-svg">
          <ZoomIcon />
        </span>
        {/* <span className="icon-text">{IconText.pan}</span> */}
      </div>
      {/* <div onClick={()=>{downloadFileAsPdf()}}  className={`icons-all ${ clickedTool=="save" ? "slected-icon" :""}`}>
        <span  className="icon-svg">
           <PlusOutlined  style={{color:"#f45e29"}} />
        </span>
        <span className="icon-text">{"Add page"}</span>
      </div> */}
      {/* <div onClick={()=>{downloadFileAsPdf()}}  className={`icons-all ${ clickedTool=="save" ? "slected-icon" :""}`}>
        <span className="icon-svg">
          <SaveIcon />
         
        </span>
        <span className="icon-text ">{IconText.save}</span>
      </div> */}
      {/* <div  onClick={()=>{setFullScreenEnable((prev)=>!prev);fullscreen()}} className={`icons-all`}>
        <span className="icon-svg">
          <img src={!fullScreenEnable ? FullScreen : EndFullScreen}></img> */}
          {/* <span className="number_pdf">{pdfPageCount}</span> */}
        {/* </span>
        <span className="icon-text ">{!fullScreenEnable ? "Full Screen" : "Exit Full Screen"}</span>
      </div> */}
       {/* <div>
           <Footer
             zoom={zoom}
           />
        </div> */}
    </div>
  );
};

export default Icons;
