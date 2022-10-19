import React, {useEffect, useState} from "react";
import { Popover } from "antd";
import { FaClipboardList } from "react-icons/fa";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import DetailColorDescription from "./DetailColorDescription";
import { FontTechDescription } from "services/Employees/FontTechDescription"
import { IColorDescription }  from '../DataStructures/DataInterfaces'
 


function NoticeDecription() {
  const [dataFrontTechDes, DataFrontTechDes ] = useState<IColorDescription[]>([])
  const fontTechDescription = new FontTechDescription()
  useEffect(() => {
    try {
      fontTechDescription
        .getFontTechDescription(5)
        .then((res) => {
          if (res.status === 200) {
            DataFrontTechDes(res.data);    
          }
        })
        .catch(console.error);
    } catch (err) {
      console.log(err);
    }
  }, []);




  const noticeDescription = () => (
    <DetailColorDescription dataFrontTechDes={dataFrontTechDes} />
  );
  return (
    <Popover
      className="text-mango-primary-blue"
      placement="bottomLeft"
     
      content={noticeDescription}
      trigger="click"
    >
      <div className="relative cursor-pointer">
        {/* <FaClipboardList color="white" className="w-7 h-7 cursor-pointer" /> */}
        <svg xmlns="http://www.w3.org/2000/svg" width="26.905" height="29.895" viewBox="0 0 26.905 29.895">
<g id="Group_11480" data-name="Group 11480" transform="translate(-422.476 -7.117)">
<g id="Group_11481" data-name="Group 11481" transform="translate(422.476 7.117)">
<path id="Path_7525" data-name="Path 7525" d="M443.549,20.615V7.117H422.476V32.169h10.6V29.944h-8.341V9.34h16.564V20.615Z" transform="translate(-422.476 -7.117)" fill="#fff"></path>
<path id="Path_7526" data-name="Path 7526" d="M427.4,24.751h5.13V22.5H427.4" transform="translate(-423.169 -9.282)" fill="#fff"></path>
<path id="Path_7529" data-name="Path 7529" d="M427.4,28.655h2.9V26.432h-2.9" transform="translate(-423.169 -9.836)" fill="#fff"></path>
<path id="Path_7530" data-name="Path 7530" d="M427.4,20.96h10V18.705h-10" transform="translate(-423.169 -8.748)" fill="#fff"></path>
<path id="Path_7531" data-name="Path 7531" d="M427.4,17.207H439.27V14.952H427.4" transform="translate(-423.169 -8.22)" fill="#fff"></path>
</g>
<g id="Group_11479" data-name="Group 11479" transform="translate(432.013 19.643)">
<g id="Group_11478" data-name="Group 11478">
<path id="Path_8237" data-name="Path 8237" d="M443.222,39.167v.53a8.484,8.484,0,1,0-8.483-8.486h0a8.495,8.495,0,0,0,8.483,8.486v-1.06a7.429,7.429,0,1,1,5.247-2.176,7.429,7.429,0,0,1-5.247,2.176Z" transform="translate(-434.739 -22.728)" fill="#fff" stroke="#fff" strokeMiterlimit="10" strokeWidth="0.8"></path>
</g>
<path id="Path_8238" data-name="Path 8238" d="M445.283,30.466h-2.215v.819h1.109v4.509h-1.109v.817h3.217v-.817h-1Zm-1.225-1.451h1.225v-1.2h-1.225Z" transform="translate(-435.912 -23.444)" fill="#fff" stroke="#fff" strokeWidth="0.2"></path>
</g>
</g>
</svg>
      </div>
    </Popover>
  );
}

export default NoticeDecription;
