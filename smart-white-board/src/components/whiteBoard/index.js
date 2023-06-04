
// import DrawingBoard from "react-drawing-board"
import React, { useState } from "react";
import DrawingBoard from "./drawingBoard/drawingBoardMain/DrawingBoard.js"
import './index.scss'

function WhiteBoard(props) {

  const [selectedType,setSelectedType] = useState("")
  const [outSideClick,setOutSideClick] = useState(false);
  // const returnText = (index) =>{
  //    switch(index){
  //     case 0:
  //       return "Select"
  //     case 1:
  //       return "Pencil P"
  //     case 2:
  //         return "Shape R"
  //     case 3:
  //         return "Test T"
  //     case 4:
  //         return "Image"
  //     case 5:
  //         return "Undo"
  //     case 6:
  //       return "Redo"
  //     case 7:
  //       return "Eraser"
  //     case 8:
  //         return "Clear"
  //     case 9:
  //         return "Zoom"
  //     case 10:
  //         return "Save"
  //     default:
  //         return "Icon"

  //    }
  // }
  // var detectMobileDevice = function detectMobileDevice() {
  //   return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  // };
  // var isMobileDevice = detectMobileDevice();
  // const fillText =()=>{
  //   if(document.querySelectorAll(".drawing-board-toolbar-icon")){
  //     const NodeListData=  document.querySelectorAll(".drawing-board-toolbar-icon");
  //     NodeListData.forEach((NodeListDataElement,index)=>{
  //       let newnode = document.createElement("label");                 //`<label class="drawing-board-toolbar-iconLabel">Text T</label>`
  //       newnode.className="drawing-board-toolbar-iconLabel"
  //       newnode.innerText=returnText(index);
  //       NodeListDataElement.appendChild(newnode);
  //       // if(NodeListDataElement.style.left==="0px")
  //       //   NodeListDataElement.style.backgroundColor="#eee"
  //       // else
  //       //   NodeListDataElement.style.backgroundColor="white"
  //       // console.log("drawing-board-toolbar-icon",NodeListDataElement.style.left==="0px")
  //     })
  //   }
  // }
  // const iconClicked =()=>{
  //   if(isMobileDevice)
  //  { setTimeout(()=>{
  //     if(document.querySelectorAll(".drawing-board-toolbar-icon")){
  //       const NodeListData=  document.querySelectorAll(".drawing-board-toolbar-icon");
  //       NodeListData.forEach((NodeListDataElement,index)=>{
  //         if(NodeListDataElement.style.left!==null && NodeListDataElement.style.left!==undefined && (NodeListDataElement.style.left==="0px" || parseInt(NodeListDataElement.style.left)===-0))
  //           NodeListDataElement.style.backgroundColor="#eee"
  //         else
  //           NodeListDataElement.style.backgroundColor="white"
  //         console.log("drawing-board-toolbar-icon",index+1,":- ",parseInt(NodeListDataElement.style.left),"        ",parseInt(NodeListDataElement.style.left)>-1)
  //       })
  //     }
  //   },400)}
  // }
  // useEffect(()=>{
  //   if(isMobileDevice) {
  //     fillText();
  //     iconClicked();
  //   }
  // },[])
  return (
        // <div onClick={iconClicked} className="whiteboard-modal">
        //     <DrawingBoard  className="whiteboard-modal" style={{color:"#85888A"}} toolbarPlacement={"left"}/> 
        // </div>
        <div onClick={()=>setOutSideClick(true)} className="whiteboard-modal">
        <DrawingBoard 
           setLecturePdfFilePath={props.setLecturePdfFilePath}
           lecturePdfFilePath={props.lecturePdfFilePath}
           WhiteBoardEnable={props.WhiteBoardEnable}
           downloadFunctionCall={props?.downloadFunctionCall}
           setDownloadFunctionCall={props?.setDownloadFunctionCall}
           setOutSideClick={setOutSideClick}
           outSideClick={outSideClick}
           selectedType={selectedType} setSelectedType={setSelectedType}
           clearWhiteBoardData={props.clearWhiteBoardData}
           setClearWhiteBoardData={props.setClearWhiteBoardData}
           saveWhiteBoardData={props.saveWhiteBoardData}
           setSaveWhiteBoardData={props.setSaveWhiteBoardData}
        />
     </div>     
  );
}     
export default WhiteBoard;
