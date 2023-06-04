import {MinusOutlined, PlusOutlined, ZoomInOutlined} from "@ant-design/icons";
// import { useState } from "react";
import './footer.scss'
const Footer = ({zoom}) =>{
    return(
        <div className="footer-block">
            <div onClick={()=>zoom(0.8)} className="plus-icon">
              <MinusOutlined />
            </div>
            <div className="zoom-percentage">
                <ZoomInOutlined />
            </div>
            <div onClick={()=>zoom(1.25)} className="minus-icon">
               <PlusOutlined />
            </div>
        </div>
    )
}

export default Footer;