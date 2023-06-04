import './sideBar.scss'
import Icons from '../tools/icons/Icons';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { setWhiteBoardData } from 'redux/actions';
const SideBar= (props) =>{
    const {
        setClickedTool, 
        clickedTool, 
        shapesType, 
        setShapesType, 
        undo, 
        redo, 
        zoom,
        zoomvalue,
        clear,
        addText, 
        canvasElement, 
        canvas, 
        WhiteBoardEnable, 
        setSelectedType, 
        changeSelectedStrokeColor,
        lineColor,
        changeSelectedFillColor,
        changeSelectedStorkeWidth,
        lineWidth,
        setSelected,
        sizeColorTool,
        selectedType,
        deselectActiveObject,
        clearWhiteBoardData,
        setClearWhiteBoardData,
        downloadFunctionCall,
        setDownloadFunctionCall,
        lecturePdfFilePath,
        updatecanavsDataRedux,
        saveWhiteBoardData,
        setSaveWhiteBoardData
    } = props;
    useEffect(()=>{
            if(canvas!==undefined && !WhiteBoardEnable){
                // var json = canvas.toJSON();
                // let dataObj = {
                //     _fc:json,
                //     _history:props._history,
                //     _hasActive:true
                // }
                // props.setWhiteBoardData(dataObj)
                updatecanavsDataRedux();
            }
    },[WhiteBoardEnable])

    useEffect(()=>{
       if(saveWhiteBoardData){
        if(canvas!==undefined){
            updatecanavsDataRedux();
            setSaveWhiteBoardData(false)
        }
       }
    },[saveWhiteBoardData])

    useEffect(()=>{
        if(clearWhiteBoardData){      
            clear();
            setClearWhiteBoardData(false)
        } 
    },[clearWhiteBoardData])
    
    useEffect(()=>{
        if(canvas){
            let activeObject = canvas.getActiveObject();
            if(activeObject){
                if(activeObject?.type!==undefined && activeObject?.type === 'i-text' && activeObject?.id!==undefined){
                    console.log("print activeObject",activeObject)
                    // setSelected(activeObject?.id)  
                    activeObject.enterEditing();
                    activeObject.hiddenTextarea.focus();
                }
            }   
        }
        changeSelectedStrokeColor(lineColor)
        changeSelectedFillColor(lineColor)
    },[lineColor])
    useEffect(()=>{
        if(canvas){
            let activeObject = canvas.getActiveObject();
            if(activeObject){
                if(activeObject?.type!==undefined && activeObject?.type === 'i-text' && activeObject?.id!==undefined){
                    console.log("print activeObject",activeObject)
                    // setSelected(activeObject?.id)
                    activeObject.enterEditing();
                    activeObject.hiddenTextarea.focus();
                }
                
            }
        }
        changeSelectedStorkeWidth()
    },[lineWidth])

    useEffect(()=>{
       if(selectedType==="text"){
        if(canvas){
            let activeObject = canvas.getActiveObject();
            if(activeObject){
                if(activeObject?.type!==undefined && activeObject?.type === 'i-text' && activeObject?.id!==undefined){
                    // setSelected(activeObject?.id)
                    activeObject.enterEditing();
                    activeObject.hiddenTextarea.focus();
                }
            }
            
        }
       }
    },[sizeColorTool])

    function dragStart(e) {
        let whiteboard = document.querySelector('.whiteboard-movement.whiteBoard-enable')

        if(whiteboard) {
            whiteboard.style.width = `${whiteboard.clientWidth + (whiteboard.getBoundingClientRect().x - e.clientX)}px`
        }
    }

    return(
        <div className="sidebar-container">
            <span className='draggable-icon-container' draggable={true} onDrag={(e) => dragStart(e)} onDragEnd={(e) => {
                dragStart(e);
                setTimeout(() => {
                    const body = document.querySelector('body')
                    body.style.transition = 'width 0.8s ease'
                }, 1000)
            }}>:</span>
             <Icons   
                setLecturePdfFilePath={props.setLecturePdfFilePath}
                lecturePdfFilePath={lecturePdfFilePath}
                canUndo={props.canUndo}
                canvasElement={canvasElement}
                changeSelectedStrokeColor={changeSelectedStrokeColor}
                canRedo={props.canRedo}
                clickedTool={clickedTool}
                setSelectedType={setSelectedType}
                addText={addText}
                setClickedTool={setClickedTool}
                shapesType={shapesType}
                setShapesType={setShapesType}
                undo={undo}
                redo={redo}
                zoomvalue={zoomvalue}
                zoom={zoom}
                canvas={canvas}
                downloadFunctionCall={downloadFunctionCall}
               setDownloadFunctionCall={setDownloadFunctionCall}
                clear={clear}
                _history={props._history}
                deselectActiveObject={deselectActiveObject}
            />
             
        </div>
    )
}
const actionCreators = {
    setWhiteBoardData:setWhiteBoardData
  };
export default connect(null,actionCreators)(SideBar);