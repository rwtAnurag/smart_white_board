import "./header.scss"
import {CheckOutlined, DoubleRightOutlined} from "@ant-design/icons" 
import {useRef } from "react"
import useOutsideClick from "hooks/useOutsideClick";
const Header = (props) =>{
    const { 
        size,
        setSize,
        color,
        setColor,
        sizeColorTool,
        setSizeColorTool

    } = props;

    const wrapperRef = useRef(null);
    const close =()=>{
        setSizeColorTool(false);
    }
    useOutsideClick(wrapperRef, close);
    const handleSetColor = (colorCode) =>{
        setColor(colorCode)
    }

    return(
        <div ref={wrapperRef} onClick={()=>{setSizeColorTool(prev => !prev)}} className="whiteboard-header">
            <DoubleRightOutlined className={`header-icon ${sizeColorTool ? "minus_90" : ""}`}/>
          { sizeColorTool ? <div className="color-size-box">
               <div className="size-box">
                     <div onClick={()=>setSize(1)} style={{backgroundColor:`${size===1 ? "black" : ""}`}} className="size-1 blur_effect"></div>
                     <div onClick={()=>setSize(2)} style={{backgroundColor:`${size===2 ? "black" : ""}`}} className="size-2 blur_effect"></div>
                     <div onClick={()=>setSize(3)} style={{backgroundColor:`${size===3 ? "black" : ""}`}} className="size-3 blur_effect"></div>
                     <div onClick={()=>setSize(4)} style={{backgroundColor:`${size===4 ? "black" : ""}`}} className="size-4 blur_effect"></div>
                     <div onClick={()=>setSize(5)} style={{backgroundColor:`${size===5 ? "black" : ""}`}} className="size-5 blur_effect"></div>
                     <div onClick={()=>setSize(6)} style={{backgroundColor:`${size===6 ? "black" : ""}`}} className="size-6 blur_effect"></div>
                     <div onClick={()=>setSize(7)} style={{backgroundColor:`${size===7 ? "black" : ""}`}} className="size-7 blur_effect"></div>
                     <div onClick={()=>setSize(8)} style={{backgroundColor:`${size===8 ? "black" : ""}`}} className="size-8 blur_effect"></div>
                     <div onClick={()=>setSize(9)} style={{backgroundColor:`${size===9 ? "black" : ""}`}} className="size-9 blur_effect"></div>
                     <div onClick={()=>setSize(10)} style={{backgroundColor:`${size===10 ? "black" : ""}`}} className="size-10 blur_effect"></div>
                     <div onClick={()=>setSize(11)} style={{backgroundColor:`${size===11 ? "black" : ""}`}} className="size-11 blur_effect"></div>
                     <div onClick={()=>setSize(12)} style={{backgroundColor:`${size===12 ? "black" : ""}`}} className="size-12 blur_effect"></div>
                     <div onClick={()=>setSize(13)} style={{backgroundColor:`${size===13 ? "black" : ""}`}} className="size-13 blur_effect"></div>
                     <div onClick={()=>setSize(14)} style={{backgroundColor:`${size===14 ? "black" : ""}`}} className="size-14 blur_effect"></div>
                     <div onClick={()=>setSize(15)} style={{backgroundColor:`${size===15 ? "black" : ""}`}} className="size-15 blur_effect"></div>
                     <div onClick={()=>setSize(16)} style={{backgroundColor:`${size===16 ? "black" : ""}`}} className="size-16 blur_effect"></div>
                     <div onClick={()=>setSize(17)} style={{backgroundColor:`${size===17 ? "black" : ""}`}} className="size-17 blur_effect"></div>
               </div>
               <div className="color-box">
                   <div className="color-box1">
                       <div onClick={()=>handleSetColor("#fcba03")} style={{backgroundColor:"#fcba03"}} className="color-card"><CheckOutlined style={{display:`${ color ==="#fcba03" ? "" :"none" }`,position: "absolute"}}/></div>
                       <div onClick={()=>handleSetColor("#14fc03")} style={{backgroundColor:"#14fc03"}} className="color-card"><CheckOutlined style={{display:`${ color ==="#14fc03" ? "" :"none" }`,position: "absolute"}} /></div>
                       <div onClick={()=>handleSetColor("#050000")} style={{backgroundColor:"#050000"}} className="color-card"><CheckOutlined style={{display:`${ color ==="#050000" ? "" :"none" }`,position: "absolute",color:"#ffff"}}/></div>
                       <div onClick={()=>handleSetColor("#134fd1")}style={{backgroundColor:"#134fd1"}} className="color-card"><CheckOutlined style={{display:`${ color ==="#134fd1" ? "" :"none" }`,position: "absolute"}}/></div>
                       <div onClick={()=>handleSetColor("#ffff")} style={{backgroundColor:"#ffff"}} className="color-card"><CheckOutlined style={{display:`${ color ==="#ffff" ? "" :"none" }`,position: "absolute"}}/></div>
                       <div onClick={()=>handleSetColor("#0c702e")} style={{backgroundColor:"#0c702e"}} className="color-card"><CheckOutlined style={{display:`${ color ==="#0c702e" ? "" :"none" }`,position: "absolute"}}/></div>
                       <div onClick={()=>handleSetColor("#fa0217")} style={{backgroundColor:"#fa0217"}} className="color-card"><CheckOutlined style={{display:`${ color ==="#fa0217" ? "" :"none" }`,position: "absolute"}}/></div>
                       <div onClick={()=>handleSetColor("#c9c7c8")} style={{backgroundColor:"#c9c7c8"}} className="color-card"><CheckOutlined style={{display:`${ color ==="#c9c7c8" ? "" :"none" }`,position: "absolute"}}/></div>
                       <div onClick={()=>handleSetColor("#09ede6")} style={{backgroundColor:"#09ede6"}}className="color-card"><CheckOutlined style={{display:`${ color ==="#09ede6" ? "" :"none" }`,position: "absolute"}}/></div>
                       <div onClick={()=>handleSetColor("#fcf003")}style={{backgroundColor:"#fcf003"}} className="color-card"><CheckOutlined style={{display:`${ color ==="#fcf003" ? "" :"none" }`,position: "absolute"}}/></div>
                       <div onClick={()=>handleSetColor("#0317fc")} style={{backgroundColor:"#0317fc"}} className="color-card"><CheckOutlined style={{display:`${ color ==="#0317fc" ? "" :"none" }`,position: "absolute"}}/></div>
                       <div onClick={()=>handleSetColor("#fc7303")} style={{backgroundColor:"#fc7303"}}className="color-card"><CheckOutlined style={{display:`${ color ==="#fc7303" ? "" :"none" }`,position: "absolute"}}/></div>
                       <div onClick={()=>handleSetColor("#9d03fc")} style={{backgroundColor:"#9d03fc"}} className="color-card"><CheckOutlined style={{display:`${ color ==="#9d03fc" ? "" :"none" }`,position: "absolute"}}/></div>
                   </div>
               </div>
           </div> : null}
        </div>
    )
}

export default Header;